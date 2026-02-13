from fastapi import FastAPI
from fastapi_mqtt import FastMQTT, MQTTConfig
from config import settings
import psycopg
import json
import logging 
import datetime

app = FastAPI()

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

    with psycopg.connect(conn_info) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO data (time, lat, lng) VALUES (%s, %s, %s) RETURNING id, time",
                (data['time'], data['lat'], data['lng'])
            )
            user = cur.fetchone()
            logger.info(user)


