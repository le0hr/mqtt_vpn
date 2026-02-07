import psycopg


conn_info = "dbname=test user=postgres password=080708 host=localhost port=5432"

with psycopg.connect(conn_info) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE id = %s", (1))
        user = cur.fetchone()
        print(user)