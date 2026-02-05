#pragma once

#include <LittleFS.h>
#include <ArduinoJson.h>



struct Storage
{
    time_t time;
    double lat;
    double lng;
    double polutionLevel;
};

class Data{
public:
    Data();
    void setData(double* lat, double* lng, double* polutionLevel, time_t* time );
    void writeData();
    void startRead();
    int readData(char* payload);
    void endRead();
private:
    Storage _storage;
    File _f;

};