#include "airSensor.h"

AirSensor::AirSensor(){
    Serial.println("AirSensor: Setting up the sensor.");

    MQ3 = new MQUnifiedsensor(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, Type);
    MQ3->setRegressionMethod(1); //_PPM =  a*ratio^b
    MQ3->init(); 

    Serial.print("AirSensor: Calibrating the sensor.");
    float calcR0 = 0;
    for(int i = 1; i<=10; i ++)
    {
        MQ3->update(); // Update data, the arduino will read the voltage from the analog pin
        calcR0 += MQ3->calibrate(RatioMQ3CleanAir);
        Serial.print(".");
    }
    MQ3->setR0(calcR0/10);
    Serial.println("  done!.");
    
}

void AirSensor::readData(float* co, float* alcohol , float* co2, float* toluene, float* nh3, float* acetone){
    MQ3->update();
    
    MQ3->setA(605.18); MQ3->setB(-3.937);   // CO detection
    *co = MQ3->readSensor(false, 0);
    
    MQ3->setA(77.255); MQ3->setB(-3.18);   // Alcohol detection
    *alcohol = MQ3->readSensor(false, 0);
    
    MQ3->setA(110.47); MQ3->setB(-2.862);   // CO2 detection
    *co2 = MQ3->readSensor(false, 0);
    
    MQ3->setA(44.947); MQ3->setB(-3.445);   // Toluene detection
    *toluene = MQ3->readSensor(false, 0);
    
    MQ3->setA(102.2); MQ3->setB(-2.473);   // NH3 detection
    *nh3 = MQ3->readSensor(false, 0);
    
    MQ3->setA(34.668); MQ3->setB(-3.369);   // Acetone detection
    *acetone = MQ3->readSensor(false, 0);
    Serial.println("AirSensor: data was read");






}