#pragma once

#include <LittleFS.h>
#include <ArduinoJson.h>



struct Storage
{
    time_t time;
    double lat;
    double lng;
    // Air pollution measurements
    float LPG;
    float CH4;
    float CO;
    float alcohol;
    float benzene;
    float hexane;
};

class Data{
public:
    Data();
    void setData(double* lat, double* lng, float* LPG, float* CH4, float* CO, float* alcohol, float* benzene, float* hexane, time_t* time );
    void writeData();
    void startRead();
    int readData(char* payload);
    void endRead();
    Storage _measurements;
private:
File _f;

};