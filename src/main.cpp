#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <esp_wireguard.h>
#include <PubSubClient.h>
#include <time.h>

#include "./gps/gps.h"
#include "./gps/wifi.h"
#include "./gps/config.h"

// test wifi config
const char* ssid = "tishon";
const char* password = "0936444759";
Gps* gps;
// wireguard vpn init
wireguard_config_t wg_config = ESP_WIREGUARD_CONFIG_DEFAULT();
wireguard_ctx_t ctx = {0};
esp_err_t err = ESP_FAIL;
esp_err_t esp_wireguard_init(wireguard_config_t *config, wireguard_ctx_t *ctx);

//mqtt and network init


void setup() {
  Serial.begin(115200);
  Wifi wifi(MY_SSID, PASSWORD);
  gps = new Gps;
  
  // time sync
  // (crucial for wg)
  configTime(2 * 3600, 0, "pool.ntp.org");

  // wg config
  wg_config.private_key ="WI3i8RI7NOM2NbI0eUHkGoFCgXloD1oXwLaCAiSZDW8=";
  wg_config.listen_port = 2008;
  wg_config.public_key = "EKJ1ewjni0n826dkHW+qh+tqjpDfGsdEooDR02rAylo=";
  wg_config.endpoint = "91.244.52.63";
  wg_config.port = 2008;
  wg_config.address = "10.10.0.2";
  wg_config.preshared_key = NULL;
  wg_config.netmask = "255.255.255.0";
  
  // start up of wg client
  err = esp_wireguard_init(&wg_config, &ctx);
  Serial.print(err);

  // connecting to host
  err = esp_wireguard_connect(&ctx);

  Serial.print(err);

}

void loop() {
  double lng, lat;

  gps->getPosition(&lng, &lat);
  Serial.println(lng);
  Serial.println(lat);

}