#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "HX711.h"
#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h> // Required for Firebase

// Pin definitions
#define DOUT D5
#define CLK D6

// Firebase Configuration
#define FIREBASE_HOST "https://iot-weighing-machine-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "4aqVLyn4cw4I6cZxi3tYLIulzaRrCvxyYTKl8e2s"

// WiFi Configuration
#define WIFI_SSID "Noob1ee mobile"
#define WIFI_PASSWORD "NC253411"

// Initialize the HX711 and LCD
HX711 scale;
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Calibration factor for load cell
float calibration_factor = -101525;

// Firebase objects
FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

void setup() {
  Serial.begin(115200);

  // Initialize HX711
  scale.begin(DOUT, CLK);
  scale.set_scale(calibration_factor);
  scale.tare();

  // Initialize LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  // Firebase configuration
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Measure weight
  float weight = scale.get_units(5);
  String timestamp = String(millis());

  // Check if weight exceeds 2 KG
  if (weight > 2.0) {
    // Display "Weight exceeds" message on LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Weight exceeds");
    
    // Send notification to Firebase
    if (Firebase.ready()) {
      String path = "/measurements/" + timestamp;
      
      // Store weight
      if (Firebase.setFloat(firebaseData, path + "/weight", weight)) {
        Serial.println("Weight data stored in Firebase");
      } else {
        Serial.println("Failed to store weight data in Firebase");
        Serial.println(firebaseData.errorReason());
      }

      // Store timestamp
      if (Firebase.setString(firebaseData, path + "/timestamp", timestamp)) {
        Serial.println("Timestamp stored in Firebase");
      } else {
        Serial.println("Failed to store timestamp in Firebase");
        Serial.println(firebaseData.errorReason());
      }

      // Store notification
      if (Firebase.setString(firebaseData, path + "/notification", "Weight exceeds 2 KG")) {
        Serial.println("Notification sent to Firebase");
      } else {
        Serial.println("Failed to send notification to Firebase");
        Serial.println(firebaseData.errorReason());
      }
    }
  } else {
    // Display weight on LCD if within limit
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Weight: ");
    lcd.setCursor(0, 1);
    lcd.print(weight, 3);
    lcd.print(" KG");

    // Store weight and timestamp in Firebase
    if (Firebase.ready()) {
      String path = "/measurements/" + timestamp;

      if (Firebase.setFloat(firebaseData, path + "/weight", weight)) {
        Serial.println("Weight data stored in Firebase");
      } else {
        Serial.println("Failed to store weight data in Firebase");
        Serial.println(firebaseData.errorReason());
      }

      if (Firebase.setString(firebaseData, path + "/timestamp", timestamp)) {
        Serial.println("Timestamp stored in Firebase");
      } else {
        Serial.println("Failed to store timestamp in Firebase");
        Serial.println(firebaseData.errorReason());
      }
    }
  }

  // Print weight to serial monitor
  Serial.print("Weight: ");
  Serial.print(weight, 3);
  Serial.println(" KG");

  delay(1000); // Delay before the next reading
}
