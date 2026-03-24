from sqlalchemy import insert, select, func
from .connection import engine
from .models import sensor_readings, applicants, update

def update_sensor_readings(data):
    point = func.ST_GeogFromText(f"POINT({data['lng']} {data['lat']})")

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
    stmt = select(sensor_readings)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        rows = [dict(row._mapping) for row in result.fetchall()]
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

