
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire477f"];
var parcelRegister = parcelRequire.register;
parcelRegister("lKDUi", function(module, exports) {

$parcel$export(module.exports, "ESP32H2ROM", () => $fd5cd99181aa3fe4$export$2184cd7dbcdab15a);

var $2JmMA = parcelRequire("2JmMA");

var $d8Am0 = parcelRequire("d8Am0");
class $fd5cd99181aa3fe4$export$2184cd7dbcdab15a extends (0, $2JmMA.ROM) {
    constructor(){
        super(...arguments);
        this.CHIP_NAME = "ESP32-H2";
        this.IMAGE_CHIP_ID = 16;
        this.EFUSE_BASE = 0x60008800;
        this.MAC_EFUSE_REG = this.EFUSE_BASE + 0x044;
        this.UART_CLKDIV_REG = 0x3ff40014;
        this.UART_CLKDIV_MASK = 0xfffff;
        this.UART_DATE_REG_ADDR = 0x6000007c;
        this.FLASH_WRITE_SIZE = 0x400;
        this.BOOTLOADER_FLASH_OFFSET = 0x0;
        this.FLASH_SIZES = {
            "1MB": 0x00,
            "2MB": 0x10,
            "4MB": 0x20,
            "8MB": 0x30,
            "16MB": 0x40
        };
        this.SPI_REG_BASE = 0x60002000;
        this.SPI_USR_OFFS = 0x18;
        this.SPI_USR1_OFFS = 0x1c;
        this.SPI_USR2_OFFS = 0x20;
        this.SPI_MOSI_DLEN_OFFS = 0x24;
        this.SPI_MISO_DLEN_OFFS = 0x28;
        this.SPI_W0_OFFS = 0x58;
        this.USB_RAM_BLOCK = 0x800;
        this.UARTDEV_BUF_NO_USB = 3;
        this.UARTDEV_BUF_NO = 0x3fcef14c;
        this.TEXT_START = (0, (/*@__PURE__*/$parcel$interopDefault($d8Am0))).text_start;
        this.ENTRY = (0, (/*@__PURE__*/$parcel$interopDefault($d8Am0))).entry;
        this.DATA_START = (0, (/*@__PURE__*/$parcel$interopDefault($d8Am0))).data_start;
        this.ROM_DATA = (0, (/*@__PURE__*/$parcel$interopDefault($d8Am0))).data;
        this.ROM_TEXT = (0, (/*@__PURE__*/$parcel$interopDefault($d8Am0))).text;
    }
    async getChipDescription(loader) {
        return this.CHIP_NAME;
    }
    async getChipFeatures(loader) {
        return [
            "BLE",
            "IEEE802.15.4"
        ];
    }
    async getCrystalFreq(loader) {
        // ESP32H2 XTAL is fixed to 32MHz
        return 32;
    }
    _d2h(d) {
        const h = (+d).toString(16);
        return h.length === 1 ? "0" + h : h;
    }
    async postConnect(loader) {
        const bufNo = await loader.readReg(this.UARTDEV_BUF_NO) & 0xff;
        loader.debug("In _post_connect " + bufNo);
        if (bufNo == this.UARTDEV_BUF_NO_USB) loader.ESP_RAM_BLOCK = this.USB_RAM_BLOCK;
    }
    async readMac(loader) {
        let mac0 = await loader.readReg(this.MAC_EFUSE_REG);
        mac0 = mac0 >>> 0;
        let mac1 = await loader.readReg(this.MAC_EFUSE_REG + 4);
        mac1 = mac1 >>> 0 & 0x0000ffff;
        const mac = new Uint8Array(6);
        mac[0] = mac1 >> 8 & 0xff;
        mac[1] = mac1 & 0xff;
        mac[2] = mac0 >> 24 & 0xff;
        mac[3] = mac0 >> 16 & 0xff;
        mac[4] = mac0 >> 8 & 0xff;
        mac[5] = mac0 & 0xff;
        return this._d2h(mac[0]) + ":" + this._d2h(mac[1]) + ":" + this._d2h(mac[2]) + ":" + this._d2h(mac[3]) + ":" + this._d2h(mac[4]) + ":" + this._d2h(mac[5] + 2);
    }
    getEraseSize(offset, size) {
        return size;
    }
}

});
parcelRegister("d8Am0", function(module, exports) {
module.exports = JSON.parse("{\"entry\":1082132112,\"text\":\"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\",\"text_start\":1082130432,\"data\":\"EACDQEIKgECSCoBA6gqAQI4LgED6C4BAqAuAQA4JgEBKC4BAiguAQP4KgEC+CIBAMguAQL4IgEAcCoBAYgqAQJIKgEDqCoBALgqAQHIJgECiCYBAKgqAQFIOgECSCoBAEg2AQAoOgED+B4BAMg6AQP4HgED+B4BA/geAQP4HgED+B4BA/geAQP4HgED+B4BArgyAQP4HgEAwDYBACg6AQA==\",\"data_start\":1082403756}");

});



//# sourceMappingURL=esp32h2.c31a4b24.js.map
