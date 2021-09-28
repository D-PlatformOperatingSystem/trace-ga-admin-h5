var encode = require("./encoding.js")
var app = getApp();
var jpPrinter = {　　　　
  createNew: function() {　　　　　　
    var jpPrinter = {};
    var data = [];
    var bar = ["UPC-A", "UPC-E", "EAN13", "EAN8", "CODE39", "ITF", "CODABAR", "CODE93", "CODE128"];
    jpPrinter.name = "";
    /**
     * ESC @ 
     *
     */
    jpPrinter.init = function() { 
      data.push(27)
      data.push(64)
    };
    /**
    *LF 
    *
    */
    jpPrinter.setPrint = function () { 
      data.push(10)
    };
    /**
     * ESC 
     * 
     */
    jpPrinter.setPrintAndFeed = function (n) { 
      data.push(27)
      data.push(74)
      data.push(n)
    };
    /**
     * ESC d
     */
    jpPrinter.setPrintAndFeedRow = function (n) {
      data.push(27)
      data.push(100)
      data.push(n)
    };
     /**
      * HT 
      */
    jpPrinter.setHorTab = function () {
      data.push(9)
    };
    /**
     * ESC $ 
     * 1mm=8dot
     */
    jpPrinter.setAbsolutePrintPosition = function (where) {
      data.push(27)
      data.push(36)
      data.push(parseInt(where % 256))
      data.push(parseInt(where / 256))
    };
    /**
     * ESC \
     * 1mm=8dot
     */
    jpPrinter.setRelativePrintPositon = function (where) { 
      data.push(27)
      data.push(92)
      data.push(parseInt(where % 256))
      data.push(parseInt(where / 256))
    };
    /**
     * ESC a 
     * 
     */
    jpPrinter.setSelectJustification = function (which) {
      data.push(27)
      data.push(97)
      data.push(which)
    };
    /**
     * GS L 
     * 1mm=8dot
     */
    jpPrinter.setLeftMargin = function (n) {
      data.push(29)
      data.push(76)
      data.push(parseInt(n % 256))
      data.push(parseInt(n / 256))
    };
    /**
     * GS W 
     * 1mm=8dot
     */
    jpPrinter.setPrintingAreaWidth = function (width) {
      data.push(29)
      data.push(87)
      data.push(parseInt(width % 256))
      data.push(parseInt(width / 256))
    };
    /**
     * 1mm=8dot
     */
    jpPrinter.setHorizontalAndVertical=function(x,y){
      data.push(29)
      data.push(80)
      data.push(x)
      data.push(y)
    };
    /**
     * DLE DC4 
     */
    jpPrinter.setCashboxPulse=function(n,m,t){
      data.push(16)
      data.push(20)
      data.push(n)
      data.push(m)
      data.push(t)
    };
    /**
     * ESC c 3 
     */
    jpPrinter.setPrintPageSignal=function(n){
      data.push(27)
      data.push(99)
      data.push(51)
      data.push(n)
    };
    /**
     * ESC c 4 
     */
    jpPrinter.setSensorToStopPrint = function (n) {
      data.push(27)
      data.push(99)
      data.push(52)
      data.push(n)
    };
    /**
     * ESC c 5 
     */
    jpPrinter.setSelectKey = function (n) {
      data.push(27)
      data.push(99)
      data.push(53)
      data.push(n)
    };
    /**
     * ESC p 
     */
    jpPrinter.setCashCashboxPulse=function(m,t1,t2){
      data.push(27)
      data.push(112)
      data.push(m)
      data.push(t1)
      data.push(t2)
    };
    /**
     * ESC = 
     */
    jpPrinter.setSelectPrinter=function(n){
      data.push(27)
      data.push(112)
      data.push(n)
    };
    /**
     * ESC 2 
     */
    jpPrinter.setDefaultLineSpace=function(){
      data.push(27)
      data.push(50)
    };
    /**
     * ESC 3 
     * 1mm=8dot
     */
    jpPrinter.setLineSpace = function (n) {
      data.push(27)
      data.push(51)
      data.push(n)
    };
    /**
     * ESC SP 
     * 1mm=8dot
     */
    jpPrinter.setCharacterRightSpace=function(n){
      data.push(27)
      data.push(32)
      data.push(n)
    };
    /**
     * ESC !
     */
    jpPrinter.setPrintMode = function (mode) { //
      data.push(27)
      data.push(33)
      data.push(mode)
    }
    /**
     * ESC % 
     */
    jpPrinter.setUserDefinitionCharacter=function(n){
      data.push(27)
      data.push(37)
      data.push(n)
    };
    /**
     * ESC – 
     */
    jpPrinter.setUnderlineMode=function(n){
      data.push(27)
      data.push(45)
      data.push(n)
    };
    /**
     * ESC ? 
     */
    jpPrinter.setCancleUserDefinitionCharacter = function(n){
      data.push(27)
      data.push(63)
      data.push(n)
    };
    /**
     * ESC E 
     */
    jpPrinter.setBoldMode=function(n){
      data.push(27)
      data.push(69)
      data.push(n)
    };
    /**
     * ESC G 
     */
    jpPrinter.setDoublePrintMode=function(n){
      data.push(27)
      data.push(71)
      data.push(n)
    };
    /**
     * ESC M 
     */
    jpPrinter.setSelectFont=function(n){
      data.push(27)
      data.push(77)
      data.push(n)
    };
    /**
     * ESC R 
     */
    jpPrinter.setInternationalCharacters=function(n){
      data.push(27)
      data.push(82)
      data.push(n)
    };
    /**
     * ESC V 
     */
    jpPrinter.setRotate90=function(n){
      data.push(27)
      data.push(86)
      data.push(n)
    };
    /**
     * ESC t 
     */
    jpPrinter.setCodePage=function(n){
      data.push(27)
      data.push(116)
      data.push(n)
    };
    /**
     * ESC { 
     */
    jpPrinter.setInvertPrintMode = function (n) {
      data.push(27)
      data.push(123)
      data.push(n)
    };
    /**
     * GS ! 
     */
    jpPrinter.setCharacterSize=function(n){
      data.push(29)
      data.push(33)
      data.push(n)
    };
    /**
     * GS B 
     */
    jpPrinter.setReverseMode=function(n){
      data.push(29)
      data.push(66)
      data.push(n)
    };


  
    function convertPartialToBitmap(w, start_y, bith, pitch, res) {
      console.log('convert bitmap: ' + w + ', ' + start_y + ', ' + bith + ', ' + pitch);
      var bits = new Uint8Array(bith*pitch);
      data.push(29) // 0x1D
      data.push(118) // 0x76
      data.push(48) // 0x30
      data.push(0) // 0x00
      data.push(parseInt(pitch % 256));
      data.push(parseInt(pitch / 256));
      data.push(parseInt(bith % 256));
      data.push(parseInt(bith / 256));
      for (var y = 0; y < bith; y++) {
        for (var x = 0; x < w; x++) {
          var color = res.data[((y + start_y) * w + x) * 4];
          if (color < 128) {
              bits[parseInt(y * pitch + x/8)] |= (0x80 >> (x%8));
          }
        }
      }
      for(var i=0; i<bits.length; i++) {
        data.push(bits[i]);
      }
    }

    function convertToMultiBitmap(res) {
      var w = res.width;
      var h = res.height;
      const BLOCK_SIZE = 128;
      var pitch = parseInt((w+7)/8);
      var block = parseInt((h + BLOCK_SIZE - 1) / BLOCK_SIZE);

      console.log(w + "--" + h);

      for(var i=0; i<block; i++) {
        var bith = BLOCK_SIZE;
        if(i * BLOCK_SIZE + bith > h) {
          bith = h - i * BLOCK_SIZE;
        }
        convertPartialToBitmap(w, i*BLOCK_SIZE, bith, pitch, res);
      }
      console.log(data);
    }

    function convertToSingleBitmap(res) {
      console.log(res)
      var w = res.width;
      var h = res.height;
      var bitw = parseInt((w+7)/8)*8;
      var bith = h;
      var pitch = parseInt(bitw / 8);
      var bits = new Uint8Array(bith*pitch);
      console.log(w + "--" + h);
      console.log("bitw="+bitw+", bith="+bith+", pitch="+pitch);
      data.push(29) // 0x1D
      data.push(118) // 0x76
      data.push(48) // 0x30
      data.push(0) // 0x00
      data.push(parseInt(pitch % 256));
      data.push(parseInt(pitch / 256));
      data.push(parseInt(bith % 256));
      data.push(parseInt(bith / 256));
      console.log(res.data.length)
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var color = res.data[(y * w + x) * 4];
          if (color < 128) {
              bits[parseInt(y * pitch + x/8)] |= (0x80 >> (x%8));
          }
        }
      }
      for(var i=0; i<bits.length; i++) {
        data.push(bits[i]);
      }
    }

    /**
     * GS v 0 
     *
     */
    jpPrinter.setBitmap = function (res) { 
      console.log(res)
      convertToSingleBitmap(res) // 
      //convertToMultiBitmap(res) // 
      console.log(data);
    };

    /**
     * GS H 
     */
    jpPrinter.setHRIPosition = function (position) { 
      data.push(29)
      data.push(72)
      data.push(position)
    };
    /**
     * GS f 
     */
    jpPrinter.setHRIFont = function (font) {
      data.push(29)
      data.push(102)
      data.push(font)
    };
    /**
     * GS h 
     * 2 ≤ n ≤ 6
     */
    jpPrinter.setBarcodeWidth = function (width) {
      data.push(29)
      data.push(119)
      if (width > 6) {
        width = 6;
      }
      if (width < 2) {
        width = 1;
      }
      data.push(width)
    };
    /**
     * GS h 
     * 1 ≤ n ≤ 255
     */
    jpPrinter.setBarcodeHeight = function (height) {
      data.push(29)
      data.push(104)
      data.push(height)
    };
    /**
     * 
     */
    jpPrinter.setCode128 = function (content) {
      data.push(29)
      data.push(107)
      data.push(73)
      var code = new encode.TextEncoder(
        'gb18030', {
          NONSTANDARD_allowLegacyEncoding: true
        }).encode(content)
      data.push(code.length)
      for (var i = 0; i < code.length; ++i) {
        data.push(code[i])
      }
    };
    /**
     * 
     */
    jpPrinter.setBarcodeContent = function (t, content) {
      var ty = 73;
      data.push(29)
      data.push(107)
      switch (t) {
        case bar[0]:
          ty = 65;
          break;
        case bar[1]:
          ty = 66;
          break;
        case bar[2]:
          ty = 67;
          break;
        case bar[3]:
          ty = 68;
          break;
        case bar[4]:
          ty = 69;
          break;
        case bar[5]:
          ty = 70;
          break;
        case bar[6]:
          ty = 71;
          break;
        case bar[7]:
          ty = 72;
          break;
        case bar[8]:
          ty = 73;
          break;
      }
      data.push(ty)
      data.push(content)
    };
    /**
     * FS !
     */
    jpPrinter.setChineseCharacterMode=function(n){
      data.push(28)
      data.push(33)
      data.push(n)
    };
    /**
     * FS & 
     */
    jpPrinter.setSelectChineseCharacter=function(){
      data.push(28)
      data.push(38)
    };
    /**
    * FS . 
    */
    jpPrinter.setCancelChineseCharacter = function () {
      data.push(28)
      data.push(46)
    };
    /**
     * FS - 
     */
    jpPrinter.setCancelUnderLine=function(n){
      data.push(28)
      data.push(45)
      data.push(n)
    };
    /**
     * FS S
     */
    jpPrinter.setChineseCharacterSpace=function(n1,n2){
      data.push(28)
      data.push(83)
      data.push(n1)
      data.push(n2)
    };
    /**
     * FS
     */
    jpPrinter.setChineseCharacteHeightWidth=function(n){
      data.push(28)
      data.push(87)
      data.push(n)
    };
    /**
     * GS 
     */
    jpPrinter.setBlackMaskOffset = function (p,a,m,n) {
      data.push(29)
      data.push(40)
      data.push(70)
      data.push(p%256)
      data.push(p/256)
      data.push(a)
      data.push(m)
      data.push(n%256)
      data.push(n/256)
    };
    /**
     * GS FF 
     */
    jpPrinter.setBlackMarkStart = function () {//
      data.push(29)
      data.push(12)
    };
    /**
     * GS V 
     * 
     */
    jpPrinter.setCutter= function () {
      data.push(29)
      data.push(86)
      data.push(1)
    } ;
    
     /**
     * GS V
     */
    jpPrinter.setCut = function (n) {
      data.push(29)
      data.push(86)
      data.push(101)
      data.push(n)
    };
    /**
     * ESC B 
     */
    jpPrinter.setSound = function (n, t) { //
      data.push(27)
      data.push(66)
      if (n < 0) {
        n = 1;
      } else if (n > 9) {
        n = 9;
      }
      if (t < 0) {
        t = 1;
      } else if (t > 9) {
        t = 9;
      }
      data.push(n)
      data.push(t)
    };
    /**
     * ESC C
     */
    jpPrinter.setOrderTip=function(m,t,n){
      data.push(27)
      data.push(67)
      if (m < 0) {
        m = 1;
      } else if (m > 20) {
        n = 20;
      }
      if (t < 0) {
        t = 1;
      } else if (t > 20) {
        t = 20;
      }
      if (n < 0) {
        n = 1;
      } else if (n > 3) {
        n = 3;
      }
      data.push(m)
      data.push(t)
      data.push(n)
    };
    /**
     * 
     */
    jpPrinter.setSelectSizeOfModuleForQRCode = function(n) { //
      data.push(29)
      data.push(40)
      data.push(107)
      data.push(3)
      data.push(0)
      data.push(49)
      data.push(67)
      if (n > 15) {
        n = 15
      }
      if (n < 1) {
        n = 1
      }
      data.push(n)
    };
    /**
     * 
     */
    jpPrinter.setSelectErrorCorrectionLevelForQRCode = function(n) { 
      data.push(29)
      data.push(40)
      data.push(107)
      data.push(3)
      data.push(0)
      data.push(49)
      data.push(69)
      data.push(n)
    };
    /**
     
     */
    jpPrinter.setStoreQRCodeData = function(content) {
      var code = new encode.TextEncoder(
        'gb18030', {
          NONSTANDARD_allowLegacyEncoding: true
        }).encode(content)
      data.push(29)
      data.push(40)
      data.push(107)
      data.push(parseInt((code.length + 3) % 256))
      data.push(parseInt((code.length + 3) / 256))
      data.push(49)
      data.push(80)
      data.push(48)
      for (var i = 0; i < code.length; ++i) {
        data.push(code[i])
      }
    };
    /**
     *
     */
    jpPrinter.setPrintQRCode = function() { 
      data.push(29)
      data.push(40)
      data.push(107)
      data.push(3)
      data.push(0)
      data.push(49)
      data.push(81)
      data.push(48)
    };
    /**
     * 
     */
    jpPrinter.setText = function (content) { 
      var code = new encode.TextEncoder(
        'gb18030', {
          NONSTANDARD_allowLegacyEncoding: true
        }).encode(content)
      for (var i = 0; i < code.length; ++i) {
        data.push(code[i])
      }
    };
    /**
     * 
     */
    jpPrinter.setUserCommand = function (content) { //
      data.push(content)
    };
    
   
    jpPrinter.getData = function() { //
      return data;
    };
    jpPrinter.clearData = function () { //
      if(data.length>0){
        data.clearData
      }
    };
    return jpPrinter;　
  },

  Query: function() {
    var queryStatus = {};
    var buf;
    var dateView;
    queryStatus.getRealtimeStatusTransmission = function(n) { //
      /*
     
      */
      buf = new ArrayBuffer(3)
      dateView = new DataView(buf)
      dateView.setUint8(0, 16)
      dateView.setUint8(1, 4)
      dateView.setUint8(2, n)
      queryStatus.query(buf)
    }

    queryStatus.query = function(buf) {
      wx.writeBLECharacteristicValue({
        deviceId: app.BLEInformation.deviceId,
        serviceId: app.BLEInformation.writeServiceId,
        characteristicId: app.BLEInformation.writeCharaterId,
        value: buf,
        success: function(res) {

        },
        complete: function(res) {
          console.log(res)
          buf = null
          dateView = null;
        }
      })
    }
    return queryStatus;
  }

};

module.exports.jpPrinter = jpPrinter;