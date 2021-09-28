/**
 * html 5+ 
 * 2021.04.23 uni-app
 * @auth boolTrue
 */

//#ifdef APP-PLUS
let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
let Intent = plus.android.importClass("android.content.Intent");
let IntentFilter = plus.android.importClass("android.content.IntentFilter");
let BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
let UUID = plus.android.importClass("java.util.UUID");
let Toast = plus.android.importClass("android.widget.Toast");
let MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

let invoke = plus.android.invoke;
let btAdapter = BluetoothAdapter.getDefaultAdapter();
let activity = plus.android.runtimeMainActivity();

let btSocket = null;
let btInStream = null;
let btOutStream = null;
let setIntervalId = 0;

let btFindReceiver = null;
let btStatusReceiver = null; 
//#endif
var blueToothTool = {
	state : {
		bluetoothEnable: false,
		bluetoothState: "", 
		discoveryDeviceState: false, 
		readThreadState: false, 
	},
	options : {
		/**
		 * 
		 * @param {String} state
		 */
		listenBTStatusCallback: function(state) {},
		/**
		 * 
		 * @param {Device} newDevice
		 */
		discoveryDeviceCallback: function(newDevice) {},
		/**
		 *
		 */
		discoveryFinishedCallback: function() {},
		/**
		 *
		 * @param {Array} dataByteArr
		 */
		readDataCallback: function(dataByteArr) {},
		/**
		 * 
		 * @param {Exception} e
		 */
		connExceptionCallback: function(e) {}
	},
	init(setOptions) {
		Object.assign(this.options, setOptions);
		this.state.bluetoothEnable = this.getBluetoothStatus();
		this.listenBluetoothStatus();
	},
	shortToast(msg) {
		Toast.makeText(activity, msg, Toast.LENGTH_SHORT).show();
	},
	/**
	 * 
	 * @return {boolean}
	 */
	isSupportBluetooth() {
		if(btAdapter != null) {
			return true;
		}
		return false;
	},
	/**
	 * 
	 * @return {boolean} 
	 */
	getBluetoothStatus() {
		if(btAdapter != null) {
			return btAdapter.isEnabled();
		}
		return false;
	},
	/**
	 * 
	 * @param activity
	 * @param requestCode
	 */
	turnOnBluetooth() {
		if(btAdapter == null) {
			shortToast("");
			return;
		}
		if(!btAdapter.isEnabled()) {
			if(activity == null) {
				shortToast("activity");
				return;
			} else {
				let intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
				let requestCode = 1;
				activity.startActivityForResult(intent, requestCode);
				return;
			}
		} else {
			shortToast("");
		}
	},
	/**
	 * 
	 */
	turnOffBluetooth() {
		if(btAdapter != null && btAdapter.isEnabled()) {
			btAdapter.disable();
		}
		if(btFindReceiver != null) {
			try {
				activity.unregisterReceiver(btFindReceiver);
			} catch(e) {

			}
			btFindReceiver = null;
		}
		this.state.bluetoothEnable = false;
		this.cancelDiscovery();
		closeBtSocket();

		if(btAdapter != null && btAdapter.isEnabled()) {
			btAdapter.disable();
			shortToast("");
		} else {
			shortToast("");
		}
	},
	/**
	 * 
	 * @return {Array} connetedDevices
	 */
	getPairedDevices() {
		let pairedDevices = [];

		let pairedDevicesAndroid = null;
		if(btAdapter != null && btAdapter.isEnabled()) {
			pairedDevicesAndroid = btAdapter.getBondedDevices();
		} else {
			shortToast("");
		}

		if(!pairedDevicesAndroid) {
			return pairedDevices;
		}

		let it = invoke(pairedDevicesAndroid, "iterator");
		while(invoke(it, "hasNext")) {
			let device = invoke(it, "next");
			pairedDevices.push({
				"name": invoke(device, "getName"),
				"address": invoke(device, "getAddress")
			});
		}
		return pairedDevices;
	},
	/**
	 * 
	 */
	discoveryNewDevice() {
		if(btFindReceiver != null) {
			try {
				activity.unregisterReceiver(btFindReceiver);
			} catch(e) {
				console.error(e);
			}
			btFindReceiver = null;
			this.cancelDiscovery();
		}
		let Build = plus.android.importClass("android.os.Build");
		
        if(Build.VERSION.SDK_INT >= 6.0){
			
        }
		let options = this.options
		btFindReceiver = plus.android.implements("io.dcloud.android.content.BroadcastReceiver", {
			"onReceive": function(context, intent) {
				plus.android.importClass(context);
				plus.android.importClass(intent);
				let action = intent.getAction();

				if(BluetoothDevice.ACTION_FOUND == action) { // 
					let device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
					let newDevice = {
						"name": plus.android.invoke(device, "getName"),
						"address": plus.android.invoke(device, "getAddress")
					}
					options.discoveryDeviceCallback && options.discoveryDeviceCallback(newDevice);
				}
				if(BluetoothAdapter.ACTION_DISCOVERY_FINISHED == action) { // 
					cancelDiscovery();
					options.discoveryFinishedCallback && options.discoveryFinishedCallback();
				}
			}
		});
		let filter = new IntentFilter();
		filter.addAction(BluetoothDevice.ACTION_FOUND);
		filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
		activity.registerReceiver(btFindReceiver, filter);
		btAdapter.startDiscovery(); //
		this.state.discoveryDeviceState = true;
	},
	/**
	 * 
	 * @param {Activity} activity
	 */
	listenBluetoothStatus() {
		if(btStatusReceiver != null) {
			try {
				activity.unregisterReceiver(btStatusReceiver);
			} catch(e) {
				console.error(e);
			}
			btStatusReceiver = null;
		}
		btStatusReceiver = plus.android.implements("io.dcloud.android.content.BroadcastReceiver", {
			"onReceive": (context, intent)=> {
				plus.android.importClass(context);
				plus.android.importClass(intent);

				let action = intent.getAction();
				switch(action) {
					case BluetoothAdapter.ACTION_STATE_CHANGED:
						let blueState = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, 0);
						let stateStr = "";
						switch(blueState) {
							case BluetoothAdapter.STATE_TURNING_ON:
								stateStr = "STATE_TURNING_ON";
								break;
							case BluetoothAdapter.STATE_ON:
								this.state.bluetoothEnable = true;
								stateStr = "STATE_ON";
								break;
							case BluetoothAdapter.STATE_TURNING_OFF:
								stateStr = "STATE_TURNING_OFF";
								break;
							case BluetoothAdapter.STATE_OFF:
								stateStr = "STATE_OFF";
								this.state.bluetoothEnable = false;
								break;
						}
						this.state.bluetoothState = stateStr;
						this.options.listenBTStatusCallback && this.options.listenBTStatusCallback(stateStr);
						break;
				}
			}
		});
		let filter = new IntentFilter();
		filter.addAction(BluetoothAdapter.ACTION_STATE_CHANGED);
		activity.registerReceiver(btStatusReceiver, filter);
		if(this.state.bluetoothEnable) {
			this.options.listenBTStatusCallback && this.options.listenBTStatusCallback('STATE_ON');
		}
	},
	/**
	 * @param {Stirng} address
	 * @return {Boolean}
	 */
	connDevice(address, callback) {
		let InputStream = plus.android.importClass("java.io.InputStream");
		let OutputStream = plus.android.importClass("java.io.OutputStream");
		let BluetoothSocket = plus.android.importClass("android.bluetooth.BluetoothSocket");

		this.cancelDiscovery();
		if(btSocket != null) {
			this.closeBtSocket();
		}
		this.state.readThreadState = false;

		try {
			let device = invoke(btAdapter, "getRemoteDevice", address);
			btSocket = invoke(device, "createRfcommSocketToServiceRecord", MY_UUID);
		} catch(e) {
			console.error(e);
			shortToast("");
			callback(false)
			return false;
		}
		try {
			invoke(btSocket, "connect");
			this.readData(); //
			this.shortToast("");
			callback(true)
		} catch(e) {
			console.error(e);
			this.shortToast("");
			callback(false)
			try {
				btSocket.close();
				btSocket = null;
			} catch(e1) {
				console.error(e1);
			}
			return false;
		}
		return true;
	},
	/**
	 * 
	 * @param {Object} address
	 * @return {Boolean}
	 */
	disConnDevice() {
		if(btSocket != null) {
			this.closeBtSocket();
		}
		this.state.readThreadState = false;
		this.shortToast("");
	},
	/**
	 * 
	 * @param {Object} address
	 * @return {Boolean}
	 */
	closeBtSocket() {
		this.state.readThreadState = false;
		if(!btSocket) {
			return;
		}
		try {
			btSocket.close();
		} catch(e) {
			console.error(e);
			btSocket = null;
		}
	},
	/**
	 * 
	 */
	cancelDiscovery() {
		if(btAdapter.isDiscovering()) {
			btAdapter.cancelDiscovery();
		}
		if(btFindReceiver != null) {
			activity.unregisterReceiver(btFindReceiver);
			btFindReceiver = null;
		}
		this.state.discoveryDeviceState = false;
	},
	/**
	 * 
	 * @param {Object} activity
	 * @param {Function} callback
	 * @return {Boolean}
	 */
	readData() {
		if(!btSocket) {
			this.shortToast("");
			return false;
		}
		try {
			btInStream = invoke(btSocket, "getInputStream");
			btOutStream = invoke(btSocket, "getOutputStream");
		} catch(e) {
			console.error(e);
			this.shortToast("");
			this.closeBtSocket();
			return false;
		}
		this.read();
		this.state.readThreadState = true;
		return true;
	},
	/**
	 *
	 */
	read() {
		let setTimeCount = 0;
		clearInterval(setIntervalId);
		setIntervalId = setInterval(()=> {
			setTimeCount++;
			if(this.state.readThreadState) {
				let t = new Date().getTime();
				if(setTimeCount % 20 == 0) {
					try {
						btOutStream.write([0b00]);
					} catch(e) {
						this.state.readThreadState = false;
						this.options.connExceptionCallback && this.options.connExceptionCallback(e);
					}
				}
				let dataArr = [];
				while(invoke(btInStream, "available") !== 0) {
					let data = invoke(btInStream, "read");
					dataArr.push(data);
					let ct = new Date().getTime();
					if(ct - t > 20) {
						break;
					}
				}
				if(dataArr.length > 0) {
					this.options.readDataCallback && this.options.readDataCallback(dataArr);
				}
			}
		}, 40);
	},
	/**
	 * 
	 * @param {String} dataStr
	 * @return {Boolean}
	 */
	sendData(dataStr) {
		if(!btOutStream) {
			this.shortToast("！");
			return;
		}
		let bytes = invoke(dataStr, 'getBytes', 'gbk');
		try {
			btOutStream.write(bytes);
		} catch(e) {
			return false;
		}
		return true;
	},
	sendByteData(byteData) {
		if(!btOutStream) {
			this.shortToast("！");
			return;
		}
		try {
			btOutStream.write(byteData);
		} catch(e) {
			return false;
		}
		return true;
	}
}

module.exports = blueToothTool