#include "./gps/mqtt.h"
#include "./gps/wifi.h"
// #include "./gps/callback.h"


Mqtt::Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port,const char* user, const char* pass){
    mqttClient.setClient(wifi->wifiClient );
    Serial.println("MQTT: Setting up connection to mqtt server");
    mqttClient.setServer(brokers_IP, brokers_port);
    this->_user = user;
    this->_pass = pass;


}

void Mqtt::reconnect(){
    //  Timeout counter
    int attempts = 0;
    while (!mqttClient.connected() && attempts < 10){
        Serial.println("MQTT: Reconnecting to mqtt server");
        if (mqttClient.connect("testID",_user, _pass)){
            mqttClient.publish("gps1", "test message`");
        }  
        else{
            delay(1000);
            attempts++;
        }
    }
}


void Mqtt::sendMessage(const char* topic, const char* message){
    if (mqttClient.publish(topic,message)){
        Serial.println("MQTT:Message sent");
        Serial.print("MQTT:Message -- ");
        Serial.println(message);


    }
    else{
        Serial.println("MQTT:Message have not been sent");
    };

}