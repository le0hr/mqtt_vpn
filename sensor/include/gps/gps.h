#pragma once

#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>


class Gps{
public:
    TinyGPSPlus GPS;
    SoftwareSerial* busConnection;
    uint32_t GPSBaud;
    int RXPin, TXPin, start;
    String data;
    void getPosition(double* lng,double* lat);
    Gps();
    ~Gps();
};
