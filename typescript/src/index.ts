const deviceUpdate = document.getElementById("deviceUpdate") as HTMLButtonElement;
const dongleUpdate = document.getElementById("dongleUpdate") as HTMLButtonElement;
const consoleStartButton = document.getElementById("consoleStartButton") as HTMLButtonElement;
const consoleStopButton = document.getElementById("consoleStopButton") as HTMLButtonElement;
const terminal = document.getElementById("terminal");
const programDiv = document.getElementById("program");
const consoleDiv = document.getElementById("console");
const lblConsoleBaudrate = document.getElementById("lblConsoleBaudrate");
const lblConsoleFor = document.getElementById("lblConsoleFor");
const table = document.getElementById("fileTable") as HTMLTableElement;
var airmotionUpdateProg = document.getElementById("myBarAirmotion");
var deviceUpdateProg = document.getElementById("myBarDevice");
airmotionUpdateProg.style.display = "none";
deviceUpdateProg.style.display = "none";
// This is a frontend example of Esptool-JS using local bundle file
// To optimize use a CDN hosted version like
// https://unpkg.com/esptool-js@0.2.0/bundle.js
import { ESPLoader, FlashOptions, LoaderOptions, Transport } from "../../../lib";
import { serial } from "web-serial-polyfill";
if (!navigator.serial && navigator.usb) navigator.serial = serial;

declare let Terminal; // Terminal is imported in HTML script
declare let CryptoJS; // CryptoJS is imported in HTML script

const term = new Terminal({ cols: 120, rows: 40 });
term.open(terminal);

let device = null;
let transport: Transport;
let chip: string = null;
let esploader: ESPLoader;
let fwbinary : string;

consoleStopButton.style.display = "none";

const Device_url ="https://chaabanihoussem.github.io/QAhajeQ9G/airmotion.bin"
const Dongle_url ="https://chaabanihoussem.github.io/QAhajeQ9G/dongle.bin"


const espLoaderTerminal = {
  clean() {
    term.clear();
  },
  writeLine(data) {
    term.writeln(data);
  },
  write(data) {
    term.write(data);
  },
};

deviceUpdate.onclick = async () => {
fetchBinaryFile(Device_url);
 if (device === null) {
   device = await navigator.serial.requestPort({});
   transport = new Transport(device, true);
 }
 move();
 try {
   const flashOptions = {
     transport,
     baudrate: 921600,
     terminal: espLoaderTerminal,
   } as LoaderOptions;
   esploader = new ESPLoader(flashOptions);
   const  chip = await esploader.main();
    term.writeln(chip);
    
    // Temporarily broken
    var mac= await chip.readMac();
    term.writeln(mac);
 } catch (e) {
   console.error(e);
   term.writeln(`Error: ${e.message}`);
 }

 console.log("Settings done for :" + chip);
 if(chip != 'ESP32-C3 (revision 3)'){
  term.writeln(`Error: wrong device`);
  return;
 }
 deviceUpdate.style.display = "none";
 consoleDiv.style.display = "none";
 airmotionUpdateProg.style.display = "block";
 const fileArray = [];
 const offset = parseInt('0x10000');
 fileArray.push({ data: fwbinary, address: offset });
 try {
   const flashOptions: FlashOptions = {
     fileArray: fileArray,
     flashSize: "keep",
     eraseAll: false,
     compress: true,
     reportProgress: (fileIndex, written, total) => {
      var elem = document.getElementById("myBarAirmotion");
      width = Math.round((written / total) * 100);
      elem.style.width = width + "%";
      term.writeln(`percentage: ${width}`);
     },
     calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image)),
   } as FlashOptions;
   await esploader.writeFlash(flashOptions);
 } catch (e) {
   console.error(e);
   term.writeln(`Error: ${e.message}`);
 } finally {
   // Hide progress bars and show erase buttons
   for (let index = 1; index < table.rows.length; index++) {
     table.rows[index].cells[2].style.display = "none";
     table.rows[index].cells[3].style.display = "initial";
   }
 }

};
var i =0;
var width = 0;
function move() {
  if (i == 0) {
    i = 1;
    var id = setInterval(frame, 0);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        airmotionUpdateProg.style.width = width + "%";
      }
    }
  }
}
dongleUpdate.onclick = async () => {
  fetchBinaryFile(Dongle_url);
  if (device === null) {
    device = await navigator.serial.requestPort({});
    transport = new Transport(device, true);
  }
  
  try {
    const flashOptions = {
      transport,
      baudrate: 921600,
      terminal: espLoaderTerminal,
    } as LoaderOptions;
    esploader = new ESPLoader(flashOptions);

    chip = await esploader.main();
    term.writeln(chip);
    // Temporarily broken
    var mac= await esploader.flashId();
    term.writeln(mac);
  } catch (e) {
    console.error(e);
    term.writeln(`Error: ${e.message}`);
  }

  console.log("Settings done for :" + chip);
  
  if(chip != 'ESP32-S3'){
    term.writeln(`Error: wrong device`);
    return;
   }
  dongleUpdate.style.display = "none";
  consoleDiv.style.display = "none";
  deviceUpdateProg.style.display = "block";
  const fileArray = [];
  const offset = parseInt('0x10000');
  fileArray.push({ data: fwbinary, address: offset });

  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArray,
      flashSize: "keep",
      eraseAll: false,
      compress: true,
      reportProgress: (fileIndex, written, total) => {
        var elem = document.getElementById("myBarDevice");
        width = Math.round((written / total) * 100);
        elem.style.width = width + "%";
        term.writeln(`percentage: ${width}`);
       },
      calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image)),
    } as FlashOptions;
    await esploader.writeFlash(flashOptions);
  } catch (e) {
    console.error(e);
    term.writeln(`Error: ${e.message}`);
  } finally {
    // Hide progress bars and show erase buttons
    for (let index = 1; index < table.rows.length; index++) {
      table.rows[index].cells[2].style.display = "none";
      table.rows[index].cells[3].style.display = "initial";
    }
  }

};


/**
 * The built in HTMLTableRowElement object.
 * @external HTMLTableRowElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement}
 */

/**
 * Remove file row from HTML Table
 * @param {HTMLTableRowElement} row Table row element to remove
 */
function removeRow(row: HTMLTableRowElement) {
  const rowIndex = Array.from(table.rows).indexOf(row);
  table.deleteRow(rowIndex);
}

/**
 * Clean devices variables on chip disconnect. Remove stale references if any.
 */
function cleanUp() {
  device = null;
  transport = null;
  chip = null;
}

let isConsoleClosed = false;
consoleStartButton.onclick = async () => {
  if (device === null) {
    device = await navigator.serial.requestPort({});
    transport = new Transport(device, true);
  }
  lblConsoleFor.style.display = "block";
  lblConsoleBaudrate.style.display = "none";
  consoleStartButton.style.display = "none";
  consoleStopButton.style.display = "initial";
  programDiv.style.display = "none";

  await transport.connect(921600);
  isConsoleClosed = false;

  while (true && !isConsoleClosed) {
    const val = await transport.rawRead();
    if (typeof val !== "undefined") {
      term.write(val);
    } else {
      break;
    }
  }
  console.log("quitting console");
};

consoleStopButton.onclick = async () => {
  isConsoleClosed = true;
  if (transport) {
    await transport.disconnect();
    await transport.waitForUnlock(1500);
  }
  term.reset();
  lblConsoleBaudrate.style.display = "initial";
  consoleStartButton.style.display = "initial";
  consoleStopButton.style.display = "none";
  lblConsoleFor.style.display = "none";
  programDiv.style.display = "initial";
  cleanUp();
};


function arrayBufferToBinaryString(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}
async function fetchBinaryFile(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Read the response as an ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();

      // Convert ArrayBuffer to binary string
      fwbinary = arrayBufferToBinaryString(arrayBuffer);
      console.log('Binary string:', fwbinary.length);
  } catch (error) {
      console.error('Failed to fetch file:', error);
  }
}







