/*
 * Program that receives orders from the api
 */
 
#include <string.h>

//Available commands
#define LED "LED"
 
const int LED_PINS[] = {13, 12, 11};
const int N_LEDS = 3;
const int BUFFER_SIZE = 25;

char buffer[BUFFER_SIZE];

boolean led_states[] = {0, 0, 0};

void setup() {
 int i;
 
 Serial.begin(9600); 
 
 for(i = 0; i < N_LEDS; i++) {
   pinMode(LED_PINS[i], OUTPUT);
 }
}

void loop() {
  if(readBytes()) {
   //Command has been received
   processCommand();
  }
  delay(1000);
}

int readBytes() {
  int i;
  for(i = 0; Serial.available() && i < BUFFER_SIZE; i++) {
    buffer[i] = Serial.read();
  }
  
  //End of string
  buffer[i] = '\0';
  
  //Serial.println(buffer);
  
  return i;
}

void processCommand() {
  int i, j;
  const int device_letters = 3;
  char device[device_letters + 1];
  char id_buffer[device_letters];
  int id;
  
  //Read kind of device
  for(i = 0; i < device_letters; i++) {
   device[i] = buffer[i]; 
  }
  device[i] = '\0';
  
  for(j = 0; j < device_letters; j++, i++) {
    id_buffer[j] = buffer[i];
  }
  
  //Serial.println(device);
  //Serial.println(id_buffer);
  
  //Which one
  id = atoi(id_buffer);
  
  if(!strcmp(device, LED)) {
    changeLedState(id);
  }
  
}

inline void changeLedState(int led_id) {
 int state = led_states[led_id];
 
 if(state) {
   digitalWrite(LED_PINS[led_id], LOW);
 }
 
 else {
  digitalWrite(LED_PINS[led_id], HIGH); 
 }
 
 led_states[led_id] = !state;
}
