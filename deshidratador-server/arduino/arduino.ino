#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <Wire.h>
#include <Adafruit_AHTX0.h>
#include <WebSocketsClient.h>

// Credenciales de la red Wi-Fi
const char* ssid = "Lopez";
const char* password = "13355161";

// Dirección IP, puerto y ruta del endpoint HTTP
const char* serverIP = "192.168.0.1";//cambiar aqui la ip 
const int serverPort = 3000;
const char* apiPathCheck = "api/check/healthy";
const char* apiPathSensors = "api/sensors";

// Sensor AHTX0
Adafruit_AHTX0 aht;

// Variables para almacenar los últimos valores enviados
float lastTemperature = NAN;
float lastHumidity = NAN;

// WebSocket client
WebSocketsClient webSocket;
bool webSocketConnected = false;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.println("WebSocket desconectado!");
            webSocketConnected = false;
            break;
        case WStype_CONNECTED:
            Serial.println("WebSocket conectado!");
            webSocketConnected = true;
            // Suscribirse al canal de configuración
            {
                JSONVar subscribeMsg;
                subscribeMsg["event"] = "subscribe";
                subscribeMsg["channel"] = "send_config_data";
                String subscribeString = JSON.stringify(subscribeMsg);
                webSocket.sendTXT(subscribeString);
            }
            break;
        case WStype_TEXT:
            Serial.printf("Mensaje WebSocket recibido: %s\n", payload);
            break;
        case WStype_BIN:
            Serial.printf("Mensaje binario WebSocket recibido, longitud: %u\n", length);
            break;
        case WStype_PING:
            Serial.println("WebSocket recibió ping!");
            break;
        case WStype_PONG:
            Serial.println("WebSocket recibió pong!");
            break;
    }
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.println("Inicio del setup para ESP32");

  Wire.begin();

  if (!aht.begin()) {
    Serial.println("No se pudo encontrar el sensor AHT. ¡Verifica las conexiones!");
    while (1) delay(10);
  }
  Serial.println("Sensor AHT encontrado.");

  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi: ");
  Serial.println(ssid);

  int connectionAttempts = 0;
  const int maxAttempts = 20;

  while (WiFi.status() != WL_CONNECTED && connectionAttempts < maxAttempts) {
    delay(500);
    Serial.print(".");
    connectionAttempts++;
  }

  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi conectado");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());

    // Inicializar WebSocket
    webSocket.begin(serverIP, serverPort, "/socket.io/?EIO=4");
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(5000);
    webSocket.enableHeartbeat(15000, 3000, 2);

    sendHttpGetRequest(); // GET inicial
  } else {
    Serial.println("No se pudo conectar a WiFi. Reiniciando...");
    delay(5000);
    ESP.restart();
  }

  Serial.println("Fin del setup para ESP32");
}

void loop() {
  webSocket.loop();

  sensors_event_t humidityEvent, temperatureEvent;
  aht.getEvent(&humidityEvent, &temperatureEvent);

  float temperature = roundf(temperatureEvent.temperature * 100) / 100.0;
  float humidity = roundf(humidityEvent.relative_humidity * 100) / 100.0;

  Serial.print("Temperatura: "); Serial.print(temperature, 2); Serial.println(" °C");
  Serial.print("Humedad: "); Serial.print(humidity, 2); Serial.println(" %");

  sendSensorData(temperature, humidity);

  if (webSocketConnected) {
    JSONVar data;
    data["event"] = "sensor_data";
    data["data"]["temperature"] = temperature;
    data["data"]["humidity"] = humidity;
    data["timestamp"] = millis();
    String jsonString = JSON.stringify(data);
    webSocket.sendTXT(jsonString);
  }

  lastTemperature = temperature;
  lastHumidity = humidity;

  delay(5000);
}

void sendHttpGetRequest() {
  Serial.println("Inicio de sendHttpGetRequest()");
  WiFiClient client;
  HTTPClient http;

  String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/" + apiPathCheck;

  Serial.print("Conectando a (GET): ");
  Serial.println(url);

  http.begin(client, url);
  Serial.println("Conexión HTTP iniciada (GET)");

  int httpCode = http.GET();
  Serial.printf("Código de respuesta HTTP (GET): %d\n", httpCode);

  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Respuesta del endpoint (GET):");
      Serial.println(payload);
    } else {
      Serial.println("Error en la petición HTTP (GET)");
    }
  } else {
    Serial.printf("Error de conexión HTTP (GET): %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void sendSensorData(float temperature, float humidity) {
  WiFiClient client;
  HTTPClient http;

  String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/" + apiPathSensors;

  Serial.print("Conectando a (POST): ");
  Serial.println(url);

  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");

  JSONVar sensorData;
  sensorData["temperature"] = temperature;
  sensorData["humidity"] = humidity;

  String requestBody = JSON.stringify(sensorData);
  int httpResponseCode = http.POST(requestBody);

  Serial.printf("Código de respuesta HTTP (POST): %d\n", httpResponseCode);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Respuesta del servidor:");
    Serial.println(response);
  } else {
    Serial.printf("Error en POST: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
}