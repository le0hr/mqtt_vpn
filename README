# 🌿 EcoMonitor Cherkasy: Mobile Air Quality Mapping

**EcoMonitor** is an open-source, community-driven project aimed at tracking and visualizing real-time air quality across Cherkasy, Ukraine. 

By combining low-cost DIY sensors with the everyday routes of local cyclists, we are building a dynamic, city-wide map of the air we breathe. Air pollution is invisible, but together, we can bring it to light.

## 🚲 The Concept: Cyclists as Environmental Sentinels

Traditional air quality monitoring relies on expensive, stationary stations. Our approach is different: **mobility and community.**

We designed a dirt-cheap, portable sensor that anyone can attach to their bicycle. As cyclists ride through different neighborhoods, parks, and traffic-heavy streets, the device continuously collects air quality and location data. This paints a highly accurate, constantly updating picture of the city's ecological state.

## 🛠 The Hardware: Accessible & Affordable

The barrier to entry is extremely low. The entire sensor node costs around **$5 - $7** to assemble and requires no advanced engineering skills.

| Component | Purpose |
| :--- | :--- |
| **ESP8266** | The brain of the device. Reads data and transmits it via Wi-Fi/Hotspot. |
| **MQ-135** | A cheap but effective gas sensor that detects CO2, Ammonia, Benzene, and smoke. |
| **K2-GPS** | Tracks the exact latitude and longitude of the air sample. |
| **Power Bank** | Any standard USB power bank keeps the device running during a ride. |

## 🏗 Architecture & Data Flow

The system is designed to be lightweight and fast, ensuring that a cyclist's exact route and air readings are processed in near real-time.

1. **Data Collection:** The ESP8266 reads gas levels from the MQ-135 and coordinates from the GPS. Then, saves data to flash memory, or transmits.    
2. **Transmission:** The payload is formatted as JSON and published to our backend over **MQTT** (using a mobile hotspot, or home network).
3. **Processing & Storage:** A Python backend subscribes to the MQTT topic, processes the readings (calculating the AQI), and securely stores them in a **PostgreSQL** database.
4. **Visualization:** The web frontend fetches the latest database records and displays interactive, color-coded markers on a map of Cherkasy.

## 🚀 How to Get Involved

We need your help to cover the whole city! You don't need to be a programmer to contribute.

* **For Cyclists:** Build a sensor (or request one from us), attach it to your handlebars, turn on your phone's Wi-Fi hotspot, and just ride your usual routes!
* **For Developers:** * Clone this repository: `git clone https://github.com/le0hr/ecomonitor.git`
  * Help us improve the backend MQTT handler or optimize the database queries.
  * Enhance the frontend map UI (Leaflet/Mapbox) to show historical heatmaps.
* **For Citizens:** Share the map on social media. Public awareness is the first step toward cleaner air.

## ⚙️ Local Development Setup

*Instructions on how to run the backend and frontend locally will be added here soon.*

---
*Made with love for a cleaner Cherkasy.*