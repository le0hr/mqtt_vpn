#pragma once

#include <MQUnifiedsensor.h>

#define Board                   ("ESP8266") 
#define Pin                     (A0)       
#define Type                    ("MQ-3") 
#define Voltage_Resolution      (3.3)      
#define ADC_Bit_Resolution      (10)
#define RatioMQ3CleanAir        (60)

class AirSensor{
public:
    MQUnifiedsensor* MQ3;
    AirSensor();
    void readData(float* LPG, float* CH4, float* CO, float* alcohol, float* benzene, float* hexane);

};