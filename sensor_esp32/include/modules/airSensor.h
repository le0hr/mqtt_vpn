#pragma once

#include <MQUnifiedsensor.h>
#include <SPI.h>
#include <Mcp320x.h>

#define Board                   ("ESP8266") 
#define Pin                     (A0)       
#define Type                    ("MQ-135") 
#define Voltage_Resolution      (3.3)      
#define ADC_Bit_Resolution      (12)
#define RatioMQ3CleanAir        (60)

#define SPI_CS       D3
#define ADC_VREF     3300
#define ADC_CLK      1600000

class AirSensor{
public:
    MQUnifiedsensor* MQ3;
    MCP3208 adc;
    SPISettings spiSettings;

    AirSensor();
    void readData(float* LPG, float* CH4, float* CO, float* alcohol, float* benzene, float* hexane);

};