from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    mqtt_host: str
    mqtt_port: int
    mqtt_user: str
    mqtt_password: str

    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_password: str

    model_config = SettingsConfigDict(env_file='../.env')


settings = Settings()