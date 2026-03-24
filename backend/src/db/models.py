from sqlalchemy import MetaData, Table, Row, Column, Integer, String, TIMESTAMP, Float
from geoalchemy2 import Geography

metadata_obj = MetaData()

sensor_readings =  Table(
    "sensor_readings",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("time",TIMESTAMP ),
    Column("co",Integer ),
    Column("alcohol",Integer ),
    Column("co2",Integer ),
    Column("toluene",Integer ),
    Column("nh3",Integer ),
    Column("acetone",Integer ),
    Column("lat",Float ),
    Column("lng",Float ),
    Column("geom", Geography(geometry_type="POINT", srid=4326)),
)

applicants = Table(
    "applicants",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("email", String),
    Column("phone_number", String),
    Column("message", String)
)
