#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <time.h>
#include "./gps/gps.h"
#include "./gps/wifi.h"
#include "./gps/config.h"
#include "./gps/mqtt.h"
#include "./storage.h"
#include "./airSensor.h"

// Init global variables 
double lng, lat, prvLat, prvLng;
float co,  alcohol ,  co2,  toluene,  nh3,  acetone;
char* message = "test";

time_t logTime;
Gps* gps;
Mqtt* mqtt;
Wifi* wifi;
Data* storage;
AirSensor* airSensor;

void setup() {
  Serial.begin(115200);
  
  // Init service variables 
  wifi = new Wifi;
  gps = new Gps;
  mqtt = new Mqtt(wifi, MQTT_BROKERS_IP, MQTT_BROKERS_PORT, MQTT_USER, MQTT_PASWORD);
  storage = new Data;
  airSensor = new AirSensor; 
  
  
  Serial.println("Setup complite\n");


}

void loop() {
  // Read sensors data

  
  // ------------------------------
  gps->getPosition(&lng, &lat);
  logTime = time(nullptr);  
  airSensor->readData(&co, &alcohol , &co2, &toluene, &nh3, &acetone);
  // ------------------------------

  // Sensor data managing 
  if (gps->GPS.distanceBetween(lat, lng, prvLat, prvLng)>=MIN_DIST){
    
    // If WiFI is connected, send saved data,
    // otherwise add data to the file
    storage->setData(&lat, &lng, &co, &alcohol , &co2, &toluene, &nh3, &acetone, &logTime);
    storage->writeData();
  
    if (WiFi.status()==WL_CONNECTED){
      storage->startRead();

      if (!mqtt->mqttClient.connected()) mqtt->reconnect();
    
      storage->readData(message);
    
      do{
        mqtt->sendMessage(DEVICE_NAME, message);  
      }while (wifi->wifiClient.status()==WL_CONNECTED
       && mqtt->mqttClient.connected()
       && storage->readData(message)>0);
    
       //  last chunk of data will be lost, solve later
      storage->endRead();
      prvLat = lat;
      prvLng = lng;
    }
    else{
      storage->writeData();
      wifi->setupConnection(WIFI_SSID, WIFI_PASSWORD);
    }
  }



}