#pragma once

#include <PubSubClient.h>

#include "wifi.h"

class Mqtt{
public:
    Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port, const char* user, const char* pass);
    void reconnect();
    void sendMessage(const char* topic, const char* message);
    PubSubClient mqttClient;

private:
    const char* _pass;
    const char* _user;

};