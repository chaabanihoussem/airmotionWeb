
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire477f"];
var parcelRegister = parcelRequire.register;
parcelRegister("ffLTo", function(module, exports) {

$parcel$export(module.exports, "ESP32S2ROM", () => $b1ad68293915d7eb$export$4fb717d12681de23);

var $2JmMA = parcelRequire("2JmMA");

var $6U85j = parcelRequire("6U85j");
class $b1ad68293915d7eb$export$4fb717d12681de23 extends (0, $2JmMA.ROM) {
    constructor(){
        super(...arguments);
        this.CHIP_NAME = "ESP32-S2";
        this.IMAGE_CHIP_ID = 2;
        this.MAC_EFUSE_REG = 0x3f41a044;
        this.EFUSE_BASE = 0x3f41a000;
        this.UART_CLKDIV_REG = 0x3f400014;
        this.UART_CLKDIV_MASK = 0xfffff;
        this.UART_DATE_REG_ADDR = 0x60000078;
        this.FLASH_WRITE_SIZE = 0x400;
        this.BOOTLOADER_FLASH_OFFSET = 0x1000;
        this.FLASH_SIZES = {
            "1MB": 0x00,
            "2MB": 0x10,
            "4MB": 0x20,
            "8MB": 0x30,
            "16MB": 0x40
        };
        this.SPI_REG_BASE = 0x3f402000;
        this.SPI_USR_OFFS = 0x18;
        this.SPI_USR1_OFFS = 0x1c;
        this.SPI_USR2_OFFS = 0x20;
        this.SPI_W0_OFFS = 0x58;
        this.SPI_MOSI_DLEN_OFFS = 0x24;
        this.SPI_MISO_DLEN_OFFS = 0x28;
        this.TEXT_START = (0, (/*@__PURE__*/$parcel$interopDefault($6U85j))).text_start;
        this.ENTRY = (0, (/*@__PURE__*/$parcel$interopDefault($6U85j))).entry;
        this.DATA_START = (0, (/*@__PURE__*/$parcel$interopDefault($6U85j))).data_start;
        this.ROM_DATA = (0, (/*@__PURE__*/$parcel$interopDefault($6U85j))).data;
        this.ROM_TEXT = (0, (/*@__PURE__*/$parcel$interopDefault($6U85j))).text;
    }
    async getPkgVersion(loader) {
        const numWord = 3;
        const block1Addr = this.EFUSE_BASE + 0x044;
        const addr = block1Addr + 4 * numWord;
        const word3 = await loader.readReg(addr);
        const pkgVersion = word3 >> 21 & 0x0f;
        return pkgVersion;
    }
    async getChipDescription(loader) {
        const chipDesc = [
            "ESP32-S2",
            "ESP32-S2FH16",
            "ESP32-S2FH32"
        ];
        const pkgVer = await this.getPkgVersion(loader);
        if (pkgVer >= 0 && pkgVer <= 2) return chipDesc[pkgVer];
        else return "unknown ESP32-S2";
    }
    async getChipFeatures(loader) {
        const features = [
            "Wi-Fi"
        ];
        const pkgVer = await this.getPkgVersion(loader);
        if (pkgVer == 1) features.push("Embedded 2MB Flash");
        else if (pkgVer == 2) features.push("Embedded 4MB Flash");
        const numWord = 4;
        const block2Addr = this.EFUSE_BASE + 0x05c;
        const addr = block2Addr + 4 * numWord;
        const word4 = await loader.readReg(addr);
        const block2Ver = word4 >> 4 & 0x07;
        if (block2Ver == 1) features.push("ADC and temperature sensor calibration in BLK2 of efuse");
        return features;
    }
    async getCrystalFreq(loader) {
        return 40;
    }
    _d2h(d) {
        const h = (+d).toString(16);
        return h.length === 1 ? "0" + h : h;
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
parcelRegister("6U85j", function(module, exports) {
module.exports = JSON.parse("{\"entry\":1073907696,\"text\":\"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\",\"text_start\":1073905664,\"data\":\"ZCv9PzaLAkDBiwJAhpACQEqMAkDjiwJASowCQKmMAkByjQJA5Y0CQI2NAkDAigJAC40CQGSNAkDMjAJACI4CQPaMAkAIjgJAr4sCQA6MAkBKjAJAqYwCQMeLAkACiwJAx44CQD2QAkDYiQJAZZACQNiJAkDYiQJA2IkCQNiJAkDYiQJA2IkCQNiJAkDYiQJAZI4CQNiJAkBZjwJAPZACQA==\",\"data_start\":1073622012}");

});



//# sourceMappingURL=esp32s2.3530013c.js.map
