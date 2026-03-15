#include "./modules/gps.h"
#include <iostream>

Gps::Gps() {
    Serial.println("GPS: Setting up GPS");
    // init gps variables
    TXPin = 16;
    RXPin = 17;
    GPSBaud = 9600;
    bus = new SoftwareSerial(RXPin, TXPin);
    bus->begin(GPSBaud);
}
Gps::~Gps(){
}
void Gps::getPosition(double* lng,double* lat){
    Serial.println("GPS: Reading GPS data");
    start = millis();

    // Wait for valid response, but break on timeout
    while (millis() - start < 5000 && !GPS.location.isValid()){
        while(bus->available()){
            GPS.encode(bus->read());
        }
    }

    *lng = GPS.location.lng();
    *lat = GPS.location.lat();
    Serial.println(*lng);
    Serial.println(*lat);
}
