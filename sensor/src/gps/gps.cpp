#include "./gps/gps.h"
#include "./gps/mqtt.h"
#include <iostream>

Gps::Gps(){
    Serial.println("GPS: Setting up GPS");
    // init gps variables
    TXPin = 13;
    RXPin = 15;
    GPSBaud = 9600;
    busConnection = new SoftwareSerial(RXPin, TXPin);
}
Gps::~Gps(){
    delete busConnection;
}
void Gps::getPosition(double* lng,double* lat){
    Serial.println("GPS: Reading GPS data");
    busConnection->begin(GPSBaud);
    start = millis();

    // Wait for valid response
    // Only return coordinates if we have a valid fix
    do{
        while(busConnection->available()){
            char c = busConnection->read();
            GPS.encode(c);
        }
    } while(!GPS.location.isValid());
    busConnection->end();
    
    *lng = GPS.location.lng();
    *lat = GPS.location.lat();
    


}