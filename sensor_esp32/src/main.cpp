#include <Arduino.h>
#include <time.h>
#include "./modules/gps.h"
#include "./modules/airSensor.h"
#include "./network/wifi.h"
#include "./network/mqtt.h"
#include "./storage/storage.h"
#include "./config.h"

// TODO:
// Fix issue with MQUnifiedsensor (invalid adc data transforming)

// // Init global variables 
double lng, lat, prvLat, prvLng;
float co,  alcohol ,  co2,  toluene,  nh3,  acetone;
char message[256];

time_t logTime;
Gps* gps;
Mqtt* mqtt;
Wifi* wifi;
Data* storage;
AirSensor* airSensor;

void setup() {
  Serial.begin(115200);
  
  // // Init service variables 
  wifi = new Wifi;
  gps = new Gps;                      // use hardware UART
  mqtt = new Mqtt(wifi, MQTT_BROKERS_IP, MQTT_BROKERS_PORT, MQTT_USER, MQTT_PASWORD);
  storage = new Data;
  airSensor = new AirSensor; 
  
  
  Serial.println("Setup complite\n");


}

void loop() {
  // Read sensors data

  // ------------------------------
  gps->getPosition(&lng, &lat);
  airSensor->readData(&co, &alcohol , &co2, &toluene, &nh3, &acetone);
  // // ------------------------------
  prvLat = 100;
  prvLng = 100;
  // Sensor data managing 
  if (gps->GPS.distanceBetween(lat, lng, prvLat, prvLng)>=MIN_DIST){
    
    // If WiFI is connected, send saved data,
    // otherwise add data to the file
    storage->setData(&lat, &lng, &co, &alcohol , &co2, &toluene, &nh3, &acetone, &logTime);
    storage->writeData();
    
    if (WiFi.status()==WL_CONNECTED && mqtt->mqttClient.connected()){
      storage->startRead();

    
      storage->readData(message);
      Serial.println("test message");
      do{
        mqtt->sendMessage(DEVICE_NAME, message);  
      }while (WiFi.status()==WL_CONNECTED
       && mqtt->mqttClient.connected()
       && storage->readData(message)>0);
    
       //  last chunk of data will be lost, solve later
      storage->endRead();
      prvLat = lat;
      prvLng = lng;
      delay(1000);
    }
    else{
      storage->writeData();
      wifi->setupConnection(WIFI_SSID, WIFI_PASSWORD);
      mqtt->reconnect();
    }
    delay(1000);
  }



}