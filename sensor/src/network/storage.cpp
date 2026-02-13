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
    _measurements.LPG = 0;
    _measurements.CH4 = 0;
    _measurements.CO = 0;
    _measurements.alcohol = 0;
    _measurements.benzene = 0;
    _measurements.hexane = 0;
    _measurements.time = 0;
}

// struct setter 
void Data::setData(double* lat, double* lng, float* LPG, float* CH4, float* CO, float* alcohol, float* benzene, float* hexane, time_t* time ){
    // Update data
    _measurements.lat = *lat;
    _measurements.lng = *lng;
    _measurements.LPG = *LPG;
    _measurements.CH4 = *CH4;
    _measurements.CO = *CO;
    _measurements.alcohol = *alcohol;
    _measurements.benzene = *benzene;
    _measurements.hexane = *hexane;
    _measurements.time = *time;
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
    doc["time"] = _measurements.time;
    doc["LPG"]    = _measurements.LPG;
    doc["CH4"]    = _measurements.CH4;
    doc["CO"]    = _measurements.CO;
    doc["alcohol"]    = _measurements.alcohol;
    doc["benzene"]    = _measurements.benzene;
    doc["hexane"]    = _measurements.hexane;
    doc["lat"] = _measurements.lat;
    doc["lng"] = _measurements.lng;

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
