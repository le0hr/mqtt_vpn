#include "./gps/gps.h"
#include "./gps/mqtt.h"
#include <iostream>

Gps::Gps(){
    // init gps variables
    RXPin = 13;
    TXPin = 15;
    GPSBaud = 9600;
    busConnection = new SoftwareSerial(RXPin, TXPin);
}
Gps::~Gps(){
    delete busConnection;
}
void Gps::getPosition(double* lng,double* lat){
    busConnection->begin(GPSBaud);
    start = millis();

    // wait for valid response (increased to 60 seconds for GPS lock)
    do{
        while(busConnection->available()){
            char c = busConnection->read();
            GPS.encode(c);
            Serial.print(c);
        }
    } while(millis() - start < 60000);
    busConnection->end();
    
    // only return coordinates if we have a valid fix
    if(GPS.location.isValid()){
        *lng = GPS.location.lng();
        *lat = GPS.location.lat();
    } else {
        *lng = 0;
        *lat = 0;
        Serial.println("GPS: No valid fix acquired");
    }


}