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
double lng, lat, prvLng, prvLat;
double polutionLevel;
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
  wifi = new Wifi(WIFI_SSID, WIFI_PASSWORD);
  gps = new Gps;
  mqtt = new Mqtt(wifi, MQTT_BROKERS_IP, MQTT_BROKERS_PORT, MQTT_USER, MQTT_PASWORD);
  storage = new Data;
  airSensor = new AirSensor; 
  
  // Time synchronization
  configTime(2 * 3600, 0, "pool.ntp.org");
  do{
    delay(500);
    logTime = time(nullptr);

  }while (logTime<10000000);

  Serial.println("Time: synchronized");
  Serial.println("Setup complite\n");


}

void loop() {
  // Read sensors data

  
  // ------------------------------
  gps->getPosition(&lng, &lat);
  logTime = time(nullptr);  
  airSensor->readData()
  // ------------------------------

  // Sensor data managing 
  if (gps->GPS.distanceBetween(lat, lng, prvLat, prvLng)>=MIN_DIST){
    
    // If WiFI is connected, send saved data,
    // otherwise add data to the file
    storage->setData(&lat, &lng, &polutionLevel, &logTime);
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
    }
    else{
      storage->writeData();
      wifi->setupConnection(WIFI_SSID, WIFI_PASSWORD);
    }
  }



}