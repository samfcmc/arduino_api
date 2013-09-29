/*
 * Program that receives orders from the api
 */

#include <string.h>

const int LED_PINS[] = {
  13, 12, 11};
const int N_LEDS = 3;
const int BUFFER_SIZE = 25;

char buffer[BUFFER_SIZE];

boolean led_states[] = {
  false, false, false};

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

  delay(250);
}

int readBytes() {
  int i;
  for(i = 0; Serial.available() && i < BUFFER_SIZE - 1; i++) {
    buffer[i] = Serial.read();
  }

  //End of string
  buffer[i] = '\0';

  return i;
}

/*
 * processCommand: Read buffer and decode de command send
 * through serial communication. Commands should be like
 * DEV-ARGS (DEV = device to control size: 3 chars, 
 *            ARGS = arguments size: 4 chars)
 */ 
void processCommand() {
  int i, j;
  const int device_letters = 3;
  const int arguments_letters = 4;
  char device[device_letters + 1];
  char arguments[arguments_letters + 1];
  int id;

  //Read command
  for(i = 0; i < device_letters && i < BUFFER_SIZE; i++) {
    device[i] = buffer[i]; 
  }
  device[i] = '\0';
  
  //If command is not correct formatted
  if(buffer[i] != '-') {
   Serial.println("Error");
   return; 
  }
  
  //Read arguments  
  for(j = 0, i++; j < arguments_letters && buffer[i] != '\0'; j++, i++) {
    arguments[j] = buffer[i];
  }
  
  arguments[j] = '\0';
  
  //Serial.println(device);
  //Serial.println(arguments);

  //Which one
  executeCommand(device, arguments);
}

/*
 * executeCommand: HERE IS WHERE YOU ADD COMMANDS AND ARGUMENTS
 * AS YOU WANT AND AS IT RESPECTS THE SINTAX
 */
inline void executeCommand(char *device, char *arguments) {
 if(!strcmp(device, "LED")) {
  if(!strcmp(arguments, "STAT")) {
    //Get leds states
    getLedsStates();
  }
  else {
    //Change led state
    changeLedState(atoi(arguments));
  } 
 }
 
 else {
   Serial.println("No Device");
 }
   
}

/*
 * Commands section: Here you create functions that
 * execute the commands that you want
 */

inline void changeLedState(int led_id) {
  boolean state = led_states[led_id];

  if(state) {
    digitalWrite(LED_PINS[led_id], LOW);
  }

  else {
    digitalWrite(LED_PINS[led_id], HIGH); 
  }

  led_states[led_id] = !state;
  
  Serial.println(led_states[led_id]);
}

void getLedsStates() {
  int i, j;
  char message[N_LEDS + N_LEDS + 1];
  
  for(j = 0, i = 0; i < N_LEDS; i++, j++) {
    message[j] = led_states[i] ? '1' : '0';
    message[++j] = ':';
  }
    
  message[j] = '\0';
  Serial.println(message);
  
}



