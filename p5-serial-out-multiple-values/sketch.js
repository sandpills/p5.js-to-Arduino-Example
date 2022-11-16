let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14401'; // fill in your serial port name here

let val1Out = 0;         // for outgoing data
let val2Out = 0;

 
function setup() {
  createCanvas(400, 300);          // make the canvas
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.list();                   // list the serial ports
  serial.open(portName);           // open a serial port
  serial.on('error', serialError); // callback for errors
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to server
}

function draw() {
  // black background, white text:
  background(0);
  fill(255,255,0);
  noStroke();
  ellipse(mouseX, mouseY, 20);
  
  //texts
  textSize(20);
  fill(255);
  text('MouseX value: ' + val1Out, 10, 30);
  text('MouseX value: '+ val2Out, 10, 60);
  valueOut();
}

function valueOut() {
  // map the mouseY to a range from 0 to 255:
  let val1 = int(map(mouseX, 0, height, 0, 250));
  val1Out = int(constrain(val1, 0, 255));
  let val2 = int(map(mouseY, 0, height, 0, 250));
  val2Out = int(constrain(val2, 0, 255));
  
  // send it out the serial port:
  serial.write(val1Out + ',');
  serial.write(val2Out + ',');
  serial.write('\n');
  
  // console.log(val1Out + ',' + val2Out + '\n')
}


function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log("port " + i + ": " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}
