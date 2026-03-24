from sqlalchemy import insert, select, update ,func
from .connection import engine
from .models import sensor_readings, applicants
import json
def upsert_sensor_readings(data):
    point = data['geom']

    find_stmt = (
        select(sensor_readings.c.id)
        .where(func.ST_DWithin(sensor_readings.c.geom, point, 50))
        .limit(1)
    )

    with engine.begin() as conn:
        result = conn.execute(find_stmt)
        row = result.fetchone()
        if row:
            stmt = (
                update(sensor_readings)
                .where(sensor_readings.c.id == row.id)
                .values(data)
            )
        else:
            stmt = insert(sensor_readings).values(data)
        conn.execute(stmt)

def fetch_sensor_readings():
    stmt = select(
    sensor_readings.c.id,
    sensor_readings.c.time,
    sensor_readings.c.co,
    sensor_readings.c.alcohol,
    sensor_readings.c.co2,
    sensor_readings.c.toluene,
    sensor_readings.c.nh3,
    sensor_readings.c.acetone,
    func.ST_AsGeoJSON(sensor_readings.c.geom).label("geom")
)

    with engine.begin() as conn:
        result = conn.execute(stmt)

        rows = []

        for row in result:
            row_dict = dict(row._mapping)

            if row_dict["geom"]:
                row_dict["geom"] = json.loads(row_dict["geom"])

            rows.append(row_dict)

    return rows


def fetch_dots_number():
    stmt = select(func.count()).select_from(sensor_readings)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        count = result.scalar()
    return count

def fetch_volunteers_number():
    stmt = select(func.count()).select_from(applicants)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        count = result.scalar()
    return count

def insert_applicants(data):
    data = data.model_dump()
    stmt = insert(applicants).values(data)
    with engine.begin() as conn:
        conn.execute(stmt)

