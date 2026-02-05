#pragma once

#include <ESP8266WiFi.h>


class Wifi{
public:
    Wifi(const char* ssid, const char* password);
    void setupConnection(const char* ssid, const char* password);

    WiFiClient wifiClient;
};