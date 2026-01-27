#pragma once

#include <PubSubClient.h>

#include "wifi.h"

class Mqtt{
public:
    Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port);
    void reconnect();
    PubSubClient mqttClient;
};