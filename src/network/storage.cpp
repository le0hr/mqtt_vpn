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
    
    _storage.lat = 0;
    _storage.lng = 0;
    _storage.polutionLevel = 0;
    _storage.time = 0;
}

// struct setter 
void Data::setData(double* lat, double* lng, double* polutionLevel, time_t* time){
    _storage.lat = *lat;
    _storage.lng = *lng;
    _storage.polutionLevel = *polutionLevel;
    _storage.time = *time;
     Serial.println("Storage: Setted up");

}

// add sensor data to storage
void Data::writeData(){
    _f = LittleFS.open("/log.bin", "a");
    
    if (!_f) {
        Serial.println("Storage: ERROR - Failed to open file for writing!");
        return;
    }
    
    size_t bytesWritten = _f.write((const uint8_t*)&_storage, sizeof(_storage));
    
    // Logging 
    if (bytesWritten == sizeof(_storage)) {
        Serial.println("Storage: Data were wrote successfully.");
    } else {
        Serial.printf("Storage: Failed! Wrote %d of %d\n", bytesWritten, sizeof(_storage));
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
        _f.read((uint8_t*)&_storage, sizeof(_storage));
    }
    
    if (!_f) {
        Serial.println("Storage: ERROR - Failed to open file for reading!");
    }

    JsonDocument doc;
    doc["time"] = _storage.time;
    doc["p"]    = serialized(String(_storage.polutionLevel, 2));
    
    JsonObject gps = doc.createNestedObject("gps");
    gps["lat"] = _storage.lat;
    gps["lng"] = _storage.lng;

    char buffer[256];

    serializeJson(doc, buffer);
    strcpy(payload, buffer);
    Serial.printf("Storage: chunk was read");

    return _f.available();

}

// copy unread data to new file
void Data::endRead(){
    File f_temp = LittleFS.open("/log1.bin", "a");
    while (_f.read((uint8_t*)&_storage, sizeof(_storage)) == sizeof(_storage)){
        f_temp.write((const uint8_t*)&_storage, sizeof(_storage));
    }
    _f.close();
    LittleFS.remove("./log.bin");

    LittleFS.rename("./log1.bin", "./log.bin");
    f_temp.close();

    Serial.println("Storage: reading finished");

}
