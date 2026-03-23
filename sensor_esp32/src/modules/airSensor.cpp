#include "modules/airSensor.h"
#define R0 39.657
AirSensor::AirSensor() : adc(ADC_VREF, SPI_CS), 
spiSettings(ADC_CLK, MSBFIRST, SPI_MODE0){
    pinMode(SPI_CS, OUTPUT);
    digitalWrite(SPI_CS, HIGH);
    SPI.begin(D8, D9, D10, SPI_CS);
    
    Serial.println("AirSensor: Setting up the sensor.");
    MQ3 = new MQUnifiedsensor(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, Type);
    MQ3->setRegressionMethod(1); //_PPM =  a*ratio^b
    MQ3->init(); 

    Serial.print("AirSensor: Calibrating the sensor.");
    MQ3->setR0(R0);
    Serial.println("  done!.");
    
}

void AirSensor::readData(float* co, float* alcohol , float* co2, float* toluene, float* nh3, float* acetone){
    *co =1000000000000000;
    *alcohol=1000000000000000;
    *co2=1000000000000000;
    *toluene=1000000000000000;
    *nh3=1000000000000000;
    *acetone=1000000000000000;
    
    for (int i = 0; i<50;i++){
        SPI.beginTransaction(spiSettings);
        uint16_t raw = adc.read(MCP3208::Channel::SINGLE_0);
        SPI.endTransaction();
        MQ3->externalADCUpdate(raw);
        
        MQ3->update();
        
        MQ3->setA(605.18); MQ3->setB(-3.937);   // CO detection
        *co = min(MQ3->readSensor(false, 0), *co);
        
        MQ3->setA(77.255); MQ3->setB(-3.18);   // Alcohol detection
        *alcohol = min(MQ3->readSensor(false, 0), *alcohol);
        
        MQ3->setA(110.47); MQ3->setB(-2.862);   // CO2 detection
        *co2 = min(MQ3->readSensor(false, 0), *co2);
        
        MQ3->setA(44.947); MQ3->setB(-3.445);   // Toluene detection
        *toluene = min(MQ3->readSensor(false, 0), *toluene);
        
        MQ3->setA(102.2); MQ3->setB(-2.473);   // NH3 detection
        *nh3 = min(MQ3->readSensor(false, 0), *nh3);
        
        MQ3->setA(34.668); MQ3->setB(-3.369);   // Acetone detection
        *acetone = min(MQ3->readSensor(false, 0), *acetone);
    }
    Serial.println("AirSensor: data was read");
    Serial.println(*alcohol);






}