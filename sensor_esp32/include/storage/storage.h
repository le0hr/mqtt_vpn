#pragma once

#include <LittleFS.h>
#include <ArduinoJson.h>



struct Storage
{
    time_t time;
    double lat;
    double lng;
    // Air pollution measurements
    float CO;
    float alcohol;
    float CO2;
    float toluene;
    float NH3;
    float acetone;
};

class Data{
public:
    Data();
    void setData(double* lat, double* lng, float* co, float* alcohol , float* co2, float* toluene, float* nh3, float* acetone, time_t* logTime);
    void writeData();
    void startRead();
    int readData(char* payload);
    void endRead();
    Storage _measurements;
private:
File _f;

};