var app = getApp();
var encode = require("./encoding.js");
var jpPrinter = {　　　　
  createNew: function() {　　　　　　
    var jpPrinter = {};
    var data = "";
    var command = []

    jpPrinter.name = "";

    jpPrinter.init = function() {};

    jpPrinter.addCommand = function(content) { //
      var code = new encode.TextEncoder(
        'gb18030', {
          NONSTANDARD_allowLegacyEncoding: true
        }).encode(content)
      for (var i = 0; i < code.length; ++i) {
        command.push(code[i])
      }
    };
    /**
     * 
     * 
     */
    jpPrinter.setSize = function(pageWidght, pageHeight) { 
      data = "SIZE " + pageWidght.toString() + " mm" + "," + pageHeight.toString() + " mm" + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setGap = function (printGap) {
      data = "GAP " + printGap.toString() + " mm,0 mm\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     *
     */
    jpPrinter.setBline = function (printBline) { 
      data = "BLINE " + printBline.toString() + " mm,0 mm\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setOffset = function (offset) { 
      data = "OFFSET " + offset.toString() + " mm,0 mm\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setSpeed = function(printSpeed) {
      data = "SPEED " + printSpeed.toString() + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * 1<=printDensity<=15
     */
    jpPrinter.setDensity = function(printDensity) {
      data = "DENSITY " + printDensity.toString() + "\r\n";
      jpPrinter.addCommand(data)
    }

    /**
     * 
     * direction=0 || direction=1
     */
    jpPrinter.setDirection = function (direction) {
      data = "DIRECTION " + direction + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setReference = function (x, y) {
      data = "REFERENCE " + x + "," + y + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     *
     */
    jpPrinter.setShift = function (n) {
      data = "SHIFT " + n +"\r\n";
      jpPrinter.addCommand(data)
    };
   /**
    * 
    *  001:USA
    *  002:French
    *  003:Latin America
    *  034:Spanish
    *  039:Italian
    *  044:United Kingdom
    *  046:Swedish
    *  047:Norwegian
    *  049:German
    */
    jpPrinter.setCountry = function(country) {
      data = "COUNTRY " + country + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     *
     * 437:United States
     * 850:Multilingual
     * 852:Slavic
     * 860:Portuguese
     * 863:Canadian/French
     * 865:Nordic
     * 
     * Windows code page
     * 1250:Central Europe
     * 1252:Latin I
     * 1253:Greek
     * 1254:Turkish
     * 
     * 12×24 dot 
     * WestEurope:WestEurope
     * Greek:Greek
     * Hebrew:Hebrew
     * EastEurope:EastEurope
     * Iran:Iran
     * IranII:IranII
     * Latvian:Latvian
     * Arabic:Arabic
     * Vietnam:Vietnam
     * Uygur:Uygur
     * Thai:Thai
     * 1252:Latin I
     * 1257:WPC1257
     * 1251:WPC1251
     * 866:Cyrillic
     * 858:PC858
     * 747:PC747
     * 864:PC864
     * 1001:PC1001
     */
    jpPrinter.setCodepage = function(codepage) {
      data = "CODEPAGE " + codepage + "\r\n";
      jpPrinter.addCommand(data)
    }
    /**
     *
     */
    jpPrinter.setCls = function() {
      data = "CLS\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * dots
     * 200 DPI:1 mm = 8  dots
     * 300 DPI:1 mm = 12 dots
     */
    jpPrinter.setFeed = function(feed) {
      data = "FEED " + feed + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     *  dots
     * 200 DPI:1 mm = 8  dots 
     * 300 DPI:1 mm = 12 dots
     */
    jpPrinter.setBackFeed = function(backup) {
      data = "BACKFEED " + backup + "\r\n";
      jpPrinter.addCommand(data)
    }
    /**
     * 
     */
    jpPrinter.setFromfeed = function() {
      data = "FORMFEED\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * 
     * 
     */
    jpPrinter.setHome = function() { //
      data = "HOME\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setPagePrint = function() { 
      data = "PRINT 1,1\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * 
     *   
     * 1≤n≤65535
     */
    jpPrinter.setPrint = function (n) {
      data = "PRINT "+n+",1\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * level        :0-9
     * interval :1-4095
     */
    jpPrinter.setSound = function(level, interval) { //
      data = "SOUND " + level + "," + interval + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     *   dots
     */
    jpPrinter.setLimitfeed = function(limit) { // 
      data = "LIMITFEED " + limit + "mm\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     */
    jpPrinter.setSelfTest=function(){
      data = "SELFTEST\r\n";
      jpPrinter.addCommand(data)
    }
    /**
     * 
     * 
     * x X ，dots
     * y Y ，dots
     * width  ，dots
     * height ，dots
     */
    jpPrinter.setBar = function(x, y, width, height) { //
      data = "BAR " + x + "," + y + "," + width + "," + height + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * x_start X ，dots
     * y_start Y ，dots
     * x_end X ，dots
     * y_end Y ，dots
     * thickness ，dots
     */
    jpPrinter.setBox = function (x_start, y_start, x_end, y_end, thickness) {
      data = "BOX " + x_start + "," + y_start + "," + x_end + "," + y_end + "," + thickness + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
    * 
    * 
    * x ，（dot）
    * y ，（dot）
    * height ，（dot）
    *readable 0 ，1 
    *rotation ， 0,90,180,270
    * narrow bar ，（dots）
    * wide bar ，（dot）
    * content 
    */
    jpPrinter.setBarCode = function (x, y, codetype, height, readable, rotation, narrow, wide, content) {
      data = "BARCODE " + x + "," + y + ",\"" + codetype + "\"," + height + "," + readable + "," + rotation + "," + narrow + "," + wide + ",\"" + content + "\"\r\n"
      jpPrinter.addCommand(data)
    };

    /**
     * 
     * res
     */
    jpPrinter.setBitmap = function (x, y, mode, res) {
      console.log(res)
      var w = res.width;
      var h = res.height;
      var bitw = parseInt((w + 7) / 8) * 8;
      // var bitw = (parseInt(w) % 8) == 0 ? (parseInt(w) / 8) :( parseInt(w) / 8+1);
      var pitch = parseInt(bitw / 8);
      var bits = new Uint8Array(h * pitch);
      console.log("w=" + w + ", h=" + h + ", bitw=" + bitw + ", pitch=" + pitch + ", bits=" + bits.length);
      var cmd = "BITMAP " + x + "," + y + "," + pitch + "," + h + "," + mode + ",";
      console.log("add cmd: " + cmd);
      jpPrinter.addCommand(cmd);
      // for (var i=0; i<bits.length; i++) {
      //   bits[i] = 0;
      // }
      for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
          var color = res.data[(y * w + x) * 4 + 1];
          if (color <= 128) {
            bits[parseInt(y * pitch + x / 8)] |= (0x80 >> (x % 8));
          }
        }
      }
      for (var i = 0; i < bits.length; i++) {
        command.push((~bits[i]) & 0xFF);
      }
      console.log(command);
    };
  
    /**
     * 
     * 
     * x_start X ，dot
     * y_start Y ，dot
     * x_width ，dot
     * y_height ，dot
     */
    jpPrinter.setErase = function(x_start, y_start, x_width, y_height) {
      data = "ERASE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * 
     * x_start X ，dot
     * y_start Y ，dot
     * x_width ，dot
     * y_height ，dot
     */
    jpPrinter.setReverse = function(x_start, y_start, x_width, y_height) {
      data = "REVERSE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * 
     * x X 
     *  y Y 
     *  font 
     *  1 8×12 dot 
     *  2 12×20 dot 
     *  3 16×24 dot 
     *  4 24×32 dot 
     *  5 32×48 dot 
     *  6 14×19 dot OCR-B
     *  7 21×27 dot OCR-B
     *  8 14×25 dot OCR-A
     *  9 9×17 dot 
     *  10 12×24 dot 
     *  TSS16.BF2 16×16（GB）
     *  TSS20.BF2 20×20（G）
     *  TST24.BF2 24×24（）
     *  TSS24.BF2 24×24（GB ）
     *  K 24×24Font（KS ）
     * TSS32.BF2 32×32（GB ）
     * rotation （） 0， 90， 180， 270
     */
    jpPrinter.setText = function(x, y, font, rotation,x_, y_, str) { 
      data = "TEXT " + x + "," + y + ",\"" + font + "\"," + rotation + "," + x_ + "," + y_ + "," + "\"" + str + "\"\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * ｘ 
     * ｙ 
     * ECC level QRCODE 
     *   L 7%
     *   M 15%
     *   Q 25%
     *   H 30%
     * cell width 1-10
     * mode /
     *   A Auto
     *   M Manual
     * rotation （） 0，90，180，270
     
     */
    jpPrinter.setQrcode = function(x, y, level, width, mode, content) {
      data = "QRCODE " + x + "," + y + "," + level + "," + width + "," + mode + "," + 0 + ",\"" + content +"\"\r\n"
      jpPrinter.addCommand(data)
	  console.log("data===",data)
    };
    /**
     * Key1 
     * 
     * ON 
     * OFF 
     */
    jpPrinter.setKey1=function(n){
      data = "SET KYE1 "+n.toString+"\r\n"
      jpPrinter.addCommand(data)
    };
    /**
   * Key2 
   * 
   * ON 
   * OFF 
   */
    jpPrinter.setKey2 = function (n) {
      data = "SET KYE2 " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * /，
     * 
     * ON  
     * OFF 
     */
    jpPrinter.setPeel = function (n) {
      data = "SET PEEL " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     * 
     * 
     * ON 
     * OFF 
     */
    jpPrinter.setTear = function (n) {
      data = "SET TEAR " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
   * 
     * 
   * OFF 
   */
    jpPrinter.setStripper = function (n) {
      data = "SET STRIPPER " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     */
    jpPrinter.setHead = function (n) {
      data = "SET HEAD " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     */
    jpPrinter.setReprint = function (n) {
      data = "SET REPRINT " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };

    /**
     */
    jpPrinter.setRibbon = function (n) {
      data = "SET RIBBON " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    /**
     */
    jpPrinter.setCut = function (n) {
      data = "SET CUTTER " + n.toString + "\r\n"
      jpPrinter.addCommand(data)
    };
    jpPrinter.getData = function() {
      return command;
    };　　
    return jpPrinter;　
  }
};

module.exports.jpPrinter = jpPrinter;