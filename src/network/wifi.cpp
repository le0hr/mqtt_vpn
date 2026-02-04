#include "./gps/wifi.h"

Wifi::Wifi(const char* ssid, const char* password){
    setupConnection(ssid, password);
}
void Wifi::setupConnection(const char* ssid, const char* password){
    int attempts = 0;
    Serial.println("Wifi: Setting up wifi connection");
    WiFi.begin(ssid, password);
    while(WiFi.status() != WL_CONNECTED && attempts<10 ){
        Serial.print('.');
        delay(1000);
        attempts++;

    }
    if (WiFi.status() == WL_CONNECTED){
        Serial.println("Wifi: Connected successfully");
    }
    else{
        Serial.println("Wifi: Failed to connect");

    }
}