#include "./gps/wifi.h"

Wifi::Wifi(const char* ssid, const char* password){
    setupConnection(ssid, password);
}
void Wifi::setupConnection(const char* ssid, const char* password){
    Serial.println("Setting up wifi connection");
        WiFi.begin(ssid, password);
        while(WiFi.status() != WL_CONNECTED){
            Serial.print('.');
            delay(500);

        }
        Serial.println("Connected successfully \n");
}