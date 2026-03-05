from fastapi import FastAPI
from fastapi_mqtt import FastMQTT, MQTTConfig
from config import settings
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import logging 
import datetime
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],             
    allow_credentials=True,          
    allow_methods=["*"],             
    allow_headers=["*"],             
)

mqtt_config = MQTTConfig(
    host=settings.mqtt_host,
    port=settings.mqtt_port,
    username=settings.mqtt_user,
    password=settings.mqtt_password,
    keepalive=60,
    version=5
)
conn_info = "dbname={0} user={1} password={2} host={3} port={4}".format(
    settings.db_name,
    settings.db_user,
    settings.db_password,
    settings.db_host,
    settings.db_port,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

fast_mqtt = FastMQTT(config=mqtt_config)
fast_mqtt.init_app(app)

@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
    logger.info("Connected: ")

@fast_mqtt.subscribe("Esp8266")
async def message_handler(client, topic, payload, qos, properties):
    logger.info(payload.decode())
    
    data = json.loads(payload.decode())
    data['time'] = datetime.datetime.fromtimestamp(float(data['time']))
    logger.info(data['time'])

    data = get_final_aqi(data)

    with psycopg2.connect(conn_info) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO sensor_readings (time, co, alcohol, co2, toluene, nh3, acetone, max, lat, lng) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, time",
                (data['time'], data['co'], data['alcohol'], data['co2'],
                  data['toluene'], data['nh3'], data['acetone'],
                  max(data['co'], data['alcohol'], data['co2'],data['toluene'], data['nh3'], data['acetone']),
                  data['lat'],data['lng']))
            user = cur.fetchone()
            logger.info(user)


@app.get("/data")
async def get_data_from_db():
    logging.info("received")
    with psycopg2.connect(conn_info) as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM sensor_readings LIMIT 100;",
            )
            data = cur.fetchall()
            for row in data:
                for key, value in row.items():
                    if isinstance(value, (datetime.datetime, datetime.date)):
                        row[key] = value.isoformat()
            
            return data

def calculate_aqi_subindex(cp, breakpoints):
    for c_low, c_high, i_low, i_high in breakpoints:
        if c_low <= cp <= c_high:
            return ((i_high - i_low) / (c_high - c_low)) * (cp - c_low) + i_low
    last_bp = breakpoints[-1]
    if cp > last_bp[1]:
        return last_bp[3] 
    return 0

def get_final_aqi(data_ppm):
    config = {
        "co":      [(0, 4.4, 0, 50), (4.5, 9.4, 51, 100), (9.5, 12.4, 101, 150), (12.5, 15.4, 151, 200), (15.5, 50, 201, 500)],
        "alcohol": [(0, 10, 0, 50), (11, 30, 51, 100), (31, 70, 101, 150), (71, 150, 151, 200), (151, 1000, 201, 500)],
        "co2": [(400, 600, 0, 50), (601, 1000, 51, 100), (1001, 1500, 101, 150), (1501, 2500, 151, 200), (2501, 5000, 201, 500)],
        "toluene":  [(0, 0.2, 0, 50), (0.3, 1.0, 51, 100), (1.1, 5.0, 101, 150), (5.1, 15.0, 151, 200), (15.1, 100, 201, 500)],
        "nh3":     [(0, 10, 0, 50), (11, 20, 51, 100), (21, 35, 101, 150), (36, 50, 151, 200), (51, 200, 201, 500)],
        "acetone":  [(0, 50, 0, 50), (51, 150, 51, 100), (151, 300, 101, 150), (301, 500, 151, 200), (501, 2000, 201, 500)],
    }

    sub_indices = {}
    for gas, ppm in data_ppm.items():
        if gas in config:
            data_ppm[gas] = round(calculate_aqi_subindex(ppm, config[gas]))

    

    return data_ppm



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=2000)