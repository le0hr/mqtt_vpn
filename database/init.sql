CREATE TABLE sensor_readings (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    co FLOAT,
    alcohol FLOAT,
    co2 FLOAT,
    toluene FLOAT,
    nh3 FLOAT,
    acetone FLOAT,
    max FLOAT,
    lat FLOAT,
    lng FLOAT
);

INSERT INTO sensor_readings (time, co, alcohol, co2, toluene, nh3, acetone,max, lat, lng)
VALUES (NOW(), 0.45, 0.12, 0.05, 0.01, 0.002, 0.001, 100, 49.444, 32.059);
INSERT INTO sensor_readings (time, co, alcohol, co2, toluene, nh3, acetone,max, lat, lng)
VALUES (NOW(), 0.45, 0.12, 0.05, 0.01, 0.002, 0.001, 100, 49.444, 32.059);