#include "./gps/mqtt.h"
#include "./gps/wifi.h"
// #include "./gps/callback.h"


Mqtt::Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port){
    mqttClient.setClient(wifi->wifiClient );
    Serial.print("Setting up connection to mqtt server");
    Serial.print("\n");
    mqttClient.setServer(brokers_IP, brokers_port);
    // mqttClient.setCallback(message_hendeling::callback);
    reconnect();

}

void Mqtt::reconnect(){
    while (!mqttClient.connected()){
            Serial.print("Reconnecting to mqtt server");
            Serial.print("\n");
            if (mqttClient.connect("ESP8266")){
                mqttClient.subscribe("gps1");
            }  
            else{
                delay(500);
            }
        }

}