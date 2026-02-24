#include "./gps/wifi.h"


void Wifi::setupConnection(const char* ssid, const char* password){
    int attempts = 0, logTime = 0;
    Serial.println("Wifi: Setting up wifi connection");
    WiFi.begin(ssid, password);
    while(WiFi.status() != WL_CONNECTED && attempts<10 ){
        Serial.print('.');
        delay(1000);
        attempts++;

    }
    if (WiFi.status() == WL_CONNECTED){
        Serial.println("Wifi: Connected successfully");
        // Time synchronization
        configTime(2 * 3600, 0, "pool.ntp.org");
        do{
            delay(500);
            logTime = time(nullptr);

        }while (logTime<10000000);

        Serial.println("Time: synchronized");
    }
    else{
        Serial.println("Wifi: Failed to connect");

    }
}