#include <Arduino.h>
#include <time.h>
#include <WiFi.h>

#include "./modules/gps.h"
#include "./modules/airSensor.h"
#include "./network/wifi.h"
#include "./network/mqtt.h"
#include "./storage/storage.h"
#include "./config.h"


Gps* gps;
Mqtt* mqtt;
Wifi* wifi;
Data* storage;
AirSensor* airSensor;

// =========================
// Shared data
// =========================
struct GpsSharedData {
    double lat;
    double lng;
    bool valid;
};

struct AirSharedData {
    float co;
    float alcohol;
    float co2;
    float toluene;
    float nh3;
    float acetone;
    bool valid;
};

GpsSharedData gpsData = {0.0, 0.0, false};
AirSharedData airData = {0, 0, 0, 0, 0, 0, false};

double prvLat = 0.0;
double prvLng = 0.0;
char message[256];
time_t logTime = 0;

SemaphoreHandle_t gpsMutex;
SemaphoreHandle_t airMutex;

// =========================
// Task handles
// =========================
TaskHandle_t gpsTaskHandle = nullptr;
TaskHandle_t airTaskHandle = nullptr;
TaskHandle_t networkTaskHandle = nullptr;

// =====================================================
// TASK 1: GPS task
// Continuously updates GPS position
// =====================================================
void gpsTask(void* pvParameters) {
    Serial.println("[GPS TASK] started");

    while(true) {
        gps->update();

        double lat, lng;

        if (gps->getPosition(&lng, &lat)) {
            if (xSemaphoreTake(gpsMutex, pdMS_TO_TICKS(10)) == pdTRUE) {
                gpsData.lat = lat;
                gpsData.lng = lng;
                gpsData.valid = true;
                xSemaphoreGive(gpsMutex);
            }
        }
        // Delay to prevent CPU overload
        vTaskDelay(pdMS_TO_TICKS(20));
    }
}

// =====================================================
// TASK 2: Air sensor task
// Continuously reads air sensor data
// =====================================================

void airTask(void* pvParameters) {
    Serial.println("[AIR TASK] started");

    for (;;) {
        float co, alcohol, co2, toluene, nh3, acetone;

        airSensor->readData(&co, &alcohol, &co2, &toluene, &nh3, &acetone);

        if (xSemaphoreTake(airMutex, pdMS_TO_TICKS(100)) == pdTRUE) {
            airData.co = co;
            airData.alcohol = alcohol;
            airData.co2 = co2;
            airData.toluene = toluene;
            airData.nh3 = nh3;
            airData.acetone = acetone;
            xSemaphoreGive(airMutex);
        }

        // Read every 2 seconds
        vTaskDelay(pdMS_TO_TICKS(2000));

    }
}

// =====================================================
// TASK 3: Network/storage task
// Tracks position changes and sends/stores data
// =====================================================
void networkTask(void* pvParameters) {
    Serial.println("[NETWORK TASK] started");

    for (;;) {
        double lat = 0.0, lng = 0.0;
        float co = 0, alcohol = 0, co2 = 0, toluene = 0, nh3 = 0, acetone = 0;
        bool gpsValid = false;
        bool airValid = false;

        // Reading of the location
        if (xSemaphoreTake(gpsMutex, pdMS_TO_TICKS(50)) == pdTRUE) {
            lat = gpsData.lat;
            lng = gpsData.lng;
            gpsValid = gpsData.valid;
            Serial.println(lat, 7);
            Serial.println(lng, 7);
            xSemaphoreGive(gpsMutex);
        }

        // Reading of the air data
        if (xSemaphoreTake(airMutex, pdMS_TO_TICKS(50)) == pdTRUE) {
            co = airData.co;
            alcohol = airData.alcohol;
            co2 = airData.co2;
            toluene = airData.toluene;
            nh3 = airData.nh3;
            acetone = airData.acetone;
            airValid = airData.valid;
            xSemaphoreGive(airMutex);
        }

        if (!gpsValid) {
            Serial.println("GPS: not valid yet");
            vTaskDelay(pdMS_TO_TICKS(1000));
            continue;
        }

        double dist = gps->GPS.distanceBetween(lat, lng, prvLat, prvLng);
        Serial.println(dist);
        if (dist >= MIN_DIST) {
            time(&logTime);

            storage->setData(&lat, &lng, &co, &alcohol, &co2, &toluene, &nh3, &acetone, &logTime);
            storage->writeData();

            if (WiFi.status() != WL_CONNECTED) {
                wifi->setupConnection(WIFI_SSID, WIFI_PASSWORD);
            }

            if (WiFi.status() == WL_CONNECTED && !mqtt->mqttClient.connected()) {
                mqtt->reconnect();
            }

            if (WiFi.status() == WL_CONNECTED && mqtt->mqttClient.connected()) {
                storage->startRead();\
                int bytesRead;
                do{
                    bytesRead = storage->readData(message);
                    mqtt->sendMessage(DEVICE_NAME, message);
                    bytesRead = storage->readData(message);
                }while (bytesRead > 0 &&
                    WiFi.status() == WL_CONNECTED &&
                    mqtt->mqttClient.connected()); 

                storage->endRead();

            } else {
                Serial.println("Network: no WiFi/MQTT, data saved locally");
                prvLat = lat;
                prvLng = lng;
            }
        } else {
            Serial.println("GPS: Too close to last sent point");
        }

        // Check every 2 seconds
        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

// =====================================================
// SETUP
// =====================================================
void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println("Setup: Booting...");

    wifi = new Wifi;
    gps = new Gps;
    mqtt = new Mqtt(wifi, MQTT_BROKERS_IP, MQTT_BROKERS_PORT, MQTT_USER, MQTT_PASWORD);
    storage = new Data;
    airSensor = new AirSensor;

    gpsMutex = xSemaphoreCreateMutex();
    airMutex = xSemaphoreCreateMutex();

    if (gpsMutex == nullptr || airMutex == nullptr) {
        Serial.println("Setup: Failed to create mutexes!");
        while (true) {
            delay(1000);
        }
    }

    // Create tasks
    xTaskCreate(
        gpsTask,           // function
        "GPS Task",        // name
        4096,              // stack size
        nullptr,           // parameters
        3,                 // priority
        &gpsTaskHandle    // handle
    );

    xTaskCreate(
        airTask,
        "Air Task",
        4096,
        nullptr,
        2,
        &airTaskHandle
    );

    xTaskCreate(
        networkTask,
        "Network Task",
        8192,
        nullptr,
        1,
        &networkTaskHandle
    );

    Serial.println("Setup: complete");
}

// =====================================================
// LOOP
// У FreeRTOS-варіанті loop можна лишити пустим
// =====================================================
void loop() {
}