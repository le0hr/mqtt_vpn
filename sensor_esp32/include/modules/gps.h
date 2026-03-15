#pragma once

#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>


class Gps{
public:
    TinyGPSPlus GPS;
    SoftwareSerial* bus;          // reference to hardware serial port
    uint32_t GPSBaud;
    int RXPin, TXPin, start;
    String data;
    void getPosition(double* lng,double* lat);
    Gps();
    ~Gps();
};
