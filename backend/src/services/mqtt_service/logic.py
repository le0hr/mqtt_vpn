import json
from datetime import datetime
import logging
from ..aqi import get_final_aqi
from db import upsert_sensor_reading
from sqlalchemy import func

def process_mqtt_payload(payload_str: str):
    data = json.loads(payload_str)
    data["time"] = datetime.fromtimestamp(data["time"])
    data = get_final_aqi(data)

    record = {
        "time": data["time"],
        "co": data["co"],
        "alcohol": data["alcohol"],
        "co2": data["co2"],
        "toluene": data["toluene"],
        "nh3": data["nh3"],
        "acetone": data["acetone"],
        "lat": data.get("lat"),
        "lng": data.get("lng"),
        "geom": func.ST_GeogFromText(f"POINT({data['lng']} {data['lat']})")
    }

    upsert_sensor_reading(record)
    logging.info("Inserted reading with time %s", record["time"])
