const int ledPin1 = 3;
const int ledPin2 = 5;
byte brightness1;
byte brightness2;

void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available() > 0) {
    brightness1 = Serial.parseInt();               // read first part of string as int
    analogWrite(ledPin1, brightness1);
    brightness2 = Serial.parseInt();                    // read second part of string as int            
    analogWrite(ledPin2, brightness2);   
  }
}
