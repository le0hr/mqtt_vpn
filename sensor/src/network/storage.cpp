#include "./storage.h"

// init struct
Data::Data(){
    Serial.println("Storage: Setting up storage");
    
    if (!LittleFS.begin()) {
        Serial.println("Storage: ERROR - LittleFS mount failed!");
        Serial.println("Storage: Attempting format+erase...");
        LittleFS.format();
        if (!LittleFS.begin()) {
            Serial.println("Storage: FATAL - LittleFS cannot mount!");
            return;
        }
    }
    
    // Debug: Check filesystem info
    FSInfo fsInfo;
    LittleFS.info(fsInfo);
    Serial.printf("Storage: FS Total: %d, Used: %d\n", fsInfo.totalBytes, fsInfo.usedBytes);
    
    _measurements.lat = 0;
    _measurements.lng = 0;
    _measurements.CO = 0;
    _measurements.alcohol = 0;
    _measurements.CO2 = 0;
    _measurements.toluene = 0;
    _measurements.NH3 = 0;
    _measurements.acetone = 0;
    _measurements.time = 0;
}

// struct setter 
void Data::setData(double* lat, double* lng, float* co, float* alcohol , float* co2, float* toluene, float* nh3, float* acetone, time_t* logTime){
    // Update data
    _measurements.lat = *lat;
    _measurements.lng = *lng;
    _measurements.CO = *co;
    _measurements.alcohol = *alcohol;
    _measurements.CO2 = *co2;
    _measurements.toluene = *toluene;
    _measurements.NH3 = *nh3;
    _measurements.acetone = *acetone;
    _measurements.time = *logTime;
    Serial.println("Storage: Data have been set ");

}

// add sensor data to storage
void Data::writeData(){
    _f = LittleFS.open("/log.bin", "a");
    
    if (!_f) {
        Serial.println("Storage: ERROR - Failed to open file for writing!");
        return;
    }
    
    size_t bytesWritten = _f.write((const uint8_t*)&_measurements, sizeof(_measurements));
    
    // Logging 
    if (bytesWritten == sizeof(_measurements)) {
        Serial.println("Storage: Data were wrote successfully.");
    } else {
        Serial.printf("Storage: Failed! Wrote %d of %d\n", bytesWritten, sizeof(_measurements));
    }
    _f.close(); 
}

void Data::startRead(){
    Serial.println("Storage: reading started");
    _f = LittleFS.open("/log.bin", "r");
    if (!_f) {
        Serial.println("Storage: ERROR - Failed to open file for reading!");
        return;
    }
    

}

// return a chunk of saved data as json string 
int Data::readData(char* payload){
    // if file exists or not empty, read from file
    if (!_f.size()){
        _f = LittleFS.open("/log.bin", "r");
        _f.read((uint8_t*)&_measurements, sizeof(_measurements));
    }
    
    if (!_f) {
        Serial.println("Storage: ERROR - Failed to open file for reading!");
    }

    JsonDocument doc;
    doc["lat"] = _measurements.lat;
    doc["lng"] = _measurements.lng;
    doc["time"] = _measurements.time;
    doc["co"]    = _measurements.CO;
    doc["alcohol"]    = _measurements.alcohol;
    doc["co2"]    = _measurements.CO2;
    doc["toluene"]    = _measurements.toluene;
    doc["nh3"]    = _measurements.NH3;
    doc["acetone"]    = _measurements.acetone;

    char buffer[256];

    serializeJson(doc, buffer);
    strcpy(payload, buffer);
    Serial.printf("Storage: chunk was read");

    return _f.available();

}

// copy unread data to new file
void Data::endRead(){
    File f_temp = LittleFS.open("/log1.bin", "a");
    while (_f.read((uint8_t*)&_measurements, sizeof(_measurements)) == sizeof(_measurements)){
        f_temp.write((const uint8_t*)&_measurements, sizeof(_measurements));
    }
    _f.close();
    LittleFS.remove("./log.bin");

    LittleFS.rename("./log1.bin", "./log.bin");
    f_temp.close();

    Serial.println("Storage: reading finished");

}
