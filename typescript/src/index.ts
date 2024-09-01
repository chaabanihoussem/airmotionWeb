import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  getDocs,
  getFirestore,
  writeBatch
} from 'firebase/firestore';

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
terminal.style.display = "none";
consoleDiv.style.display = "none";
var DeviceMac;
var deviceAuth = false;
// This is a frontend example of Esptool-JS using local bundle file
// To optimize use a CDN hosted version like
// https://unpkg.com/esptool-js@0.2.0/bundle.js
import { ESPLoader, FlashOptions, LoaderOptions, Transport } from "../../../lib";
import { serial } from "web-serial-polyfill";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
if (!navigator.serial && navigator.usb) navigator.serial = serial;

declare let Terminal; // Terminal is imported in HTML script
declare let CryptoJS; // CryptoJS is imported in HTML script
const firebaseConfig = {
  apiKey: "AIzaSyA5ULkaeEvPZQD7hCElrtrw9Yf4-OxaXYo",
  authDomain: "breathcontrol-95f8d.firebaseapp.com",
  projectId: "breathcontrol-95f8d",
  storageBucket: "breathcontrol-95f8d.appspot.com",
  messagingSenderId: "950703477235",
  appId: "1:950703477235:web:cb071bc9a1898bed300286",
  measurementId: "G-NF2XQREHS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let db = getFirestore(app);
export { app, db }
const term = new Terminal({ cols: 120, rows: 40 });
term.open(terminal);

let device = null;
let transport: Transport;
let esploader: ESPLoader;

var appbinary;
var partitionbinary;
var bootbinary;
var app0binary;
var i = 0;
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

function moveDongle() {
  if (i == 0) {
    i = 1;
    var id = setInterval(frame, 0);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        deviceUpdateProg.style.width = width + "%";
      }
    }
  }
}

consoleStopButton.style.display = "none";

const Device_url = "https://chaabanihoussem.github.io/QAhajeQ9G/airmotion/airmotion.bin"
const Device_boot_url = "https://chaabanihoussem.github.io/QAhajeQ9G/airmotion/airmotion_boot.bin"
const Device_part_url = "https://chaabanihoussem.github.io/QAhajeQ9G/airmotion/airmotion_part.bin"
const Device_app0_url = "https://chaabanihoussem.github.io/QAhajeQ9G/airmotion/airmotion_app0.bin"

const Dongle_url = "https://chaabanihoussem.github.io/QAhajeQ9G/dongle/dongle.bin"
const Dongle_part_url = "https://chaabanihoussem.github.io/QAhajeQ9G/dongle/dongle_part.bin"
const Dongle_boot_url = "https://chaabanihoussem.github.io/QAhajeQ9G/dongle/dongle_boot.bin"

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
  appbinary = await fetchBinaryFile(Device_url);
  bootbinary = await fetchBinaryFile(Device_boot_url);
  partitionbinary = await fetchBinaryFile(Device_part_url);
  app0binary = await fetchBinaryFile(Device_app0_url);
  var chip:string;
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
    chip = await esploader.main();
    term.writeln(chip);
    DeviceMac = (await esploader.getmac()).toUpperCase();
    term.writeln(DeviceMac);
  } catch (e) {
    console.error(e);
    term.writeln(`Error: ${e.message}`);
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }
  console.log("Settings done for :" + chip);
  if (!chip.includes('ESP32-C3')) {
    alert("Wrong device detected, please refresh the page and make sure you select the correct serial port");
    return;
  }

  signInWithEmailAndPassword(auth, "oneuser@papritech.com", "fasjdklfjltert13g8d6fg0o54w5# # #")
    .then(async () => {
      try {
        const collectionRef = collection(db, "devices")
        const querySnapshot = await getDocs(collectionRef)
        for (var queryDocumentSnapshot in querySnapshot.docs) {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          var macAddress = data[queryDocumentSnapshot].id;
          if (macAddress == DeviceMac) {
            term.writeln(`device found ${DeviceMac}`);
            deviceAuth = true;
          }

        }
        if (!deviceAuth) {
          term.writeln(`device 1 not found ${DeviceMac}`);
          alert("This is not A Papritech device");
          return;
        }else{
          doDeviceUpdate();
        }
        console.log('querySnapshot.size:', querySnapshot.size);

      } catch (ex) {
        console.error(`ERROR getDocuments():: ${ex.message}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  };

  async function doDeviceUpdate(){
  deviceUpdate.style.display = "none";
  consoleDiv.style.display = "none";
  airmotionUpdateProg.style.display = "block";

  /*************************  APP   *******************************/
  const fileArrayAPP = [];
  const offsetApp = parseInt('0x10000');
  fileArrayAPP.push({ data: appbinary, address: offsetApp });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArrayAPP,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }
  /*************************   BOOT   *******************************/
  const fileArrayBoot = [];
  const offsetBoot = parseInt('0x0');
  fileArrayBoot.push({ data: bootbinary, address: offsetBoot });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArrayBoot,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  } 
  /*************************   PARTITION   *******************************/
  const fileArraypart = [];
  const offsetpart = parseInt('0x8000');
  fileArraypart.push({ data: partitionbinary, address: offsetpart });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArraypart,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }
  /*****************  APP0    *********************/
  const fileArrayApp0 = [];
  const offsetApp0 = parseInt('0xe000');
  fileArrayApp0.push({ data: app0binary, address: offsetApp0  });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArrayApp0,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  } finally {
    alert(`Device updated successfully, please restart the device`);
  }

};

dongleUpdate.onclick = async () => {
  appbinary = await fetchBinaryFile(Dongle_url);
  bootbinary = await fetchBinaryFile(Dongle_boot_url);
  partitionbinary = await fetchBinaryFile(Dongle_part_url);
  let chip;
  if (device === null) {
    device = await navigator.serial.requestPort({});
    transport = new Transport(device, true);
  }
  moveDongle();
  try {
    const flashOptions = {
      transport,
      baudrate: 921600,
      terminal: espLoaderTerminal,
    } as LoaderOptions;
    esploader = new ESPLoader(flashOptions);

    chip = await esploader.main();
    term.writeln(chip);
    DeviceMac = (await esploader.getmac()).toUpperCase();
    term.writeln(DeviceMac);
  } catch (e) {
    console.error(e);
    term.writeln(`Error: ${e.message}`);
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }
  console.log("Settings done for :" + chip);

  if (!chip.includes('ESP32-S3')) {
    alert("Wrong device detected, please refresh the page and make sure you select the correct serial port");
    return;
  }
  signInWithEmailAndPassword(auth, "oneuser@papritech.com", "fasjdklfjltert13g8d6fg0o54w5# # #")
    .then(async () => {
      try {
        const collectionRef = collection(db, "devices")
        const querySnapshot = await getDocs(collectionRef)
        for (var queryDocumentSnapshot in querySnapshot.docs) {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          var macAddress = data[queryDocumentSnapshot].id;
          term.writeln(`device ${macAddress}`);
          if (macAddress == DeviceMac) {
            term.writeln(`device found ${DeviceMac}`);
            deviceAuth = true;
          }

        }
        if (!deviceAuth) {
          term.writeln(`device 2 not found ${DeviceMac}`);
          alert("This is not A Papritech device");
          return;
        }else{
          doDongleUpdate();
        }
        console.log('querySnapshot.size:', querySnapshot.size);

      } catch (ex) {
        console.error(`ERROR getDocuments():: ${ex.message}`);
      }

      // ...
    })
    .catch((error) => {
      console.error(error);
      // ...
    });
  };


async function doDongleUpdate(){
  dongleUpdate.style.display = "none";
  consoleDiv.style.display = "none";
  deviceUpdateProg.style.display = "block";
  /*************************  APP   *******************************/
  const fileArrayAPP = [];
  const offsetApp = parseInt('0x10000');
  fileArrayAPP.push({ data: appbinary, address: offsetApp });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArrayAPP,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }
  /*************************   BOOT   *******************************/
  const fileArrayBoot = [];
  const offsetBoot = parseInt('0x0');
  fileArrayBoot.push({ data: bootbinary, address: offsetBoot });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArrayBoot,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  } 
  /*************************   PARTITION   *******************************/
  const fileArraypart = [];
  const offsetpart = parseInt('0x8000');
  fileArraypart.push({ data: partitionbinary, address: offsetpart });
  try {
    const flashOptions: FlashOptions = {
      fileArray: fileArraypart,
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
    alert(`Please refresh the page, Error: ${e.message}`);
    return;
  }finally {
    alert(`Device updated successfully, please restart the device`);
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
  let output: string;
  console.log('fetchBinaryFile');
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Read the response as an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Convert ArrayBuffer to binary string
    output = arrayBufferToBinaryString(arrayBuffer);
    console.log('Binary string:', output.length);
  } catch (error) {
    console.error('Failed to fetch file:', error);
  }
  return output;
}

