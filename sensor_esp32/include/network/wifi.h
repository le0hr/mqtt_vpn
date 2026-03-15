#pragma once

#include <WiFi.h>


class Wifi{
public:
    void setupConnection(const char* ssid, const char* password);

    WiFiClient wifiClient;
};