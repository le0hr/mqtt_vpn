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
    
    if(isinf(calcR0)) {Serial.println("AirSensor: Connection issue, R0 is infinite (Open circuit detected) please check your wiring and supply"); while(1);}
    if(calcR0 == 0){Serial.println("AirSensor: Connection issue found, R0 is zero (Analog pin shorts to ground) please check your wiring and supply"); while(1);}
    MQ3->serialDebug(true);
}

void AirSensor::readData(float* LPG, float* CH4, float* CO, float* alcohol, float* benzene, float* hexane){
    MQ3->update();
    
    MQ3->setA(44771); MQ3->setB(-3.245);   // LPG detection
    *hexane = MQ3->readSensor(false, 0);
    
    MQ3->setA(2*pow(10,31)); MQ3->setB(19.01);   // CH4 detection
    *CH4 = MQ3->readSensor(false, 0);
    
    MQ3->setA(521853); MQ3->setB(-3.821);   // CO detection
    *CO = MQ3->readSensor(false, 0);
    
    MQ3->setA(0.3934); MQ3->setB(-1.504);   // Alcohol detection
    *alcohol = MQ3->readSensor(false, 0);
    
    MQ3->setA(4.8387); MQ3->setB(-2.68);   // Benzene detection
    *benzene = MQ3->readSensor(false, 0);
    
    MQ3->setA(7585.3); MQ3->setB(-2.849);   // Hexane detection
    *hexane = MQ3->readSensor(false, 0);
    Serial.println("AirSensor: data was read")






}