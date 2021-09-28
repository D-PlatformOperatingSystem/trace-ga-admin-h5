<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">
					{{$t('print.ConBlue')}}
				</block>
			</cu-custom>
		</view>
		<view class="button">
			<button type="default" @tap="switchBluetooth">
				{{$t('print.TurnBlue')}}
			</button>
		</view>
		<view class="bluetooth-list" v-if="devData.length!=0">
			<view class="blue-title">
				{{$t('print.equipment')}}
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/loading.gif" mode=""></image>
			</view>
			<view class="bluetooth" v-for="(item,index) in devData" :key="index">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/blue.png" mode=""></image>
				<view class="blue-name">
					<view class="blue-text">{{item.name}}</view>
					<view class="blue-text-id">{{item.deviceId}}</view>
				</view>
				<button type="default" @click="onConn(item)">
					{{$t('print.connect')}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tsc from '@/common/libs/tsc.js'
	import esc from '@/common/libs/esc.js'
	export default {
		data() {
			return {
				devData: [],
				currDev: null,
				bbb: uni.getStorageSync('bbb'),
				canvasWidth: 100,
				canvasHeight: 100,
				imageSrc: '../../static/wechat.png',
				buffSize: [],
				oneTimeData: 0,
				looptime: 0,
				currentTime: 1,
				lastData: 0,
				printNum: [],
				printNumIndex: 0,
				printerNum: 1,
				currentPrint: 1,
				isReceiptSend: false,
				isQuery: false,
				deviceId: '',
				characteristicId: '',
				serviceId: '',
			}
		},
		methods: {
			switchBluetooth(e) {
				if (e.mp.detail) {
					uni.openBluetoothAdapter({
						success: res => {
							uni.showLoading({
								title: this.$t('print.Seadevices'),
								mask: true
							})
							this.startSearchBTDev()
						},
						fail: err => {
							uni.showModal({
								title: this.$t('print.tip'),
								content: this.$t('print.PleaseBlue'),
								showCancel: false,
								buttonText: this.$t('public.confirm'),
								success: function(res) {
									if (res.confirm) {
										uni.showToast({
											title: this.$t('print.userQ'),
											icon: 'success',
											duration: 2000
										})
									} else if (res.cancel) {
										uni.showToast({
											title: this.$t('print.userC'),
											icon: 'success',
											duration: 2000
										})
									}
								}
							});
						}
					})
				} else {
					uni.closeBluetoothAdapter({
						success: res => {
							uni.showToast({
								title: this.$t('print.moduleClose'),
								icon: 'success',
								duration: 2000
							})
						},
						fail: err => {
							uni.showToast({
								title: this.$t('print.closeBlue'),
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			},
			startSearchBTDev() {
				this.devData = []; 
				this.onListenerBTDevFound(this);
				this.getBTAdapterState().then(res => {
					let available = res.available;
					let discovering = res.discovering;
					if (res.available) {
						if (res.discovering) {
							this.stopDisBisBTDev()
						}
						this.startDisBTDev().then(res => {
							uni.hideLoading();
						}).catch(err => {
							uni.showToast({
								title: err
							})
						})
					} else {
						uni.showToast({
							title: this.$t('print.NativeBlue'),
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			getBTAdapterState(fn) {
				return new Promise((resolve, reject) => {
					uni.getBluetoothAdapterState({
						success: res => {
							resolve(res)
						},
						fail: err => {
							uni.showToast({
								title: this.$t('print.getAdapter'),
								icon: 'success',
								duration: 2000
							})
							reject(BTStatus[err.errCode])
						}
					})
				})
			},
			onListenerBTDevFound(that) {
				uni.onBluetoothDeviceFound(res => {
					let dev = res.devices[0];
					if (dev.name && dev.localName) {
						let arr = that.devData.filter(item => item.deviceId === dev.deviceId)
						if (arr.length > 0) {
							let n = that.devData.indexOf(arr[0])
							let rssi = Math.floor(Math.max(0, dev.RSSI + 100) / 10)
							if (rssi <= 0) {
								that.devData.splice(n, 1)
							} else {
								that.devData[n].RSSI = rssi
							}
						} else {
							that.devData.push(dev)
						}
					}
					that.devData.forEach((currentValue, index, ) => {
						that.devData[index].services = []
					})
				})
			},
			startDisBTDev() {
				return new Promise((resolve, reject) => {
					uni.startBluetoothDevicesDiscovery({
						allowDuplicatesKey: true, 
						success: res => {
							resolve(res)
						},
						fail: err => {
							uni.showToast({
								title: this.$t('print.starSearch'),
								icon: 'success',
								duration: 2000
							})
							reject(BTStatus[err.errCode])
						}
					})
				})
			},
			onConn(item) {
				var that = this;
				if (uni.getStorageSync('deviceId')) {
					uni.showToast({
						title: this.$t('print.BlueCon'),
						icon: 'none',
						duration: 2000
					})
					return
				}
				uni.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log(res)
					}
				})
				uni.showLoading({
					title: this.$t('print.conProg'),
					mask: true
				}) 
				let deviceId = item.deviceId;
				uni.createBLEConnection({
					deviceId: deviceId,
					success: (res) => {
						if (res.errMsg == "createBLEConnection:ok") {
							that.deviceId = deviceId;
							setTimeout(function() {
								that.getBLEServices(that.deviceId)
							}, 1500)
							uni.setStorageSync("deviceId", that.deviceId)
						} else {
							uni.showToast({
								title: this.$t('print.reconnect'),
								icon: 'none',
								duration: 2000
							})
						}

					},
				})
			},
			getBLEServices() {
				var that = this;
				let deviceId = that.deviceId;
				uni.getBLEDeviceServices({
					deviceId: deviceId,
					success: (res) => {
						console.log("res*****", res)
						let serviceId = "";
						if (res.services.length == 0) {
							uni.hideNavigationBarLoading() 
							uni.showToast({
								title: this.$t('print.BlueRe'),
								icon: 'none',
								duration: 2000
							})
						}
						for (var s = 0; s < res.services.length; s++) {
							let serviceId = res.services[s].uuid
							uni.getBLEDeviceCharacteristics({
								deviceId: deviceId,
								serviceId: serviceId,
								success: (res) => {
									for (var c = 0; c < res.characteristics.length; c++) {
										var dataWrite = res.characteristics[c].properties.write;
										var uuid = res.characteristics[c].uuid;
										if (dataWrite) {
											let characteristicId = uuid;
											for (var index in that.devData) {
												if (that.devData[index].deviceId == deviceId) {
													uni.hideLoading();
													uni.showToast({
														title: this.$t('print.Bluesuc'),
														icon: 'success',
														duration: 2000
													})
													uni.hideNavigationBarLoading(); 
													that.serviceId = serviceId;
													that.characteristicId = characteristicId;
													uni.setStorageSync("characteristicId",
														characteristicId) 
													uni.setStorageSync("serviceId",
														serviceId) 
													that.devData[index].services.push({
														serviceId: that.serviceId,
														characteristicId: that
															.characteristicId
													})
													that.devData.length = 0;
													uni.navigateTo({
														url: "../index/index"
													})
													break
												}
											}
											let arr = that.devData.filter((currentValue,
												index) => {
												return that.devData[index].deviceId ===
													deviceId
											})
										}
									}
								}
							})
						}
					},
					fail(res) {
						console.log(res)
					},
				})
			},
			initPhoto() {
				var that = this
				const ctx_out = uni.createCanvasContext('canvasOut', this);
				var png = that.imageSrc;
				uni.getImageInfo({
					src: png,
					success(res) {
						that.canvasWidth = res.width,
						that.canvasHeight = res.height,
						ctx_out.drawImage(png, 0, 0);
						ctx_out.draw();
					}
				})
			},
			printPhoto() {
				var that = this;
				var canvasWidth = that.canvasWidth
				var canvasHeight = that.canvasHeight
				var command = tsc.jpPrinter.createNew()
				command.setCls()
				command.setSize(40, 30)
				command.setGap(8)
				command.setStripper("ON")
				command.setCls()
				uni.canvasGetImageData({
					canvasId: 'canvasOut',
					x: 0,
					y: 0,
					width: canvasWidth,
					height: canvasHeight,
					success: function(res) {
						command.setQrcode(58, 10, "M", 4.5, "A",
							"https://trace.domchain.io/h5?type=cherry_trace_qr_code&tx_hash=0x971bd5876f86857a3769464538fedb58df1f4f529c253151c0ca6657f299bd63"
							)
						command.setPrint(1)
						that.prepareSend(command.getData())
					},
					complete: function(res) {
						uni.showToast({
							title: this.$t('print.PrEss'),
							icon: 'success',
							duration: 2000
						})
					},
					fail: function(res) {
						console.log(res)
						uni.showToast({
							title: this.$t('print.canvas'),
							icon: 'none',
						})
					}
				})
			},
			prepareSend(buff) { 
				var that = this
				var time = that.oneTimeData;
				var looptime = parseInt(buff.length / time);
				var lastData = parseInt(buff.length % time);
				that.looptime = looptime + 1
				that.lastData = lastData
				that.currentTime = 1
				that.Send(buff)
			},
			Send(buff) {
				var that = this
				var currentTime = that.currentTime
				var loopTime = that.looptime
				var lastData = that.lastData
				var onTimeData = that.oneTimeData
				var printNum = that.printerNum
				var currentPrint = that.currentPrint
				var buf
				var dataView
				if (currentTime < loopTime) {
					buf = new ArrayBuffer(onTimeData)
					dataView = new DataView(buf)
					for (var i = 0; i < onTimeData; ++i) {
						dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
					}
				} else {
					buf = new ArrayBuffer(lastData)
					dataView = new DataView(buf)
					for (var i = 0; i < lastData; ++i) {
						dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
					}
				}
				uni.writeBLECharacteristicValue({
					deviceId: that.deviceId,
					serviceId: that.serviceId,
					characteristicId: that.characteristicId,
					value: buf,
					success: function(res) {
						if (currentPrint == printNum) {
							uni.showToast({
								title: this.$t('print.PrSucc'),
								icon: 'success',
								duration: 2000
							})
						}
					},
					fail: function(e) {
						wx.showToast({
							title: this.$t('print.PrintPage') + currentPrint + this.$t('print.failed'),
							icon: 'none',
						})
					},
					complete: function() {
						currentTime++
						if (currentTime <= that.looptime) {
							that.currentTime = currentTime
							that.Send(buff)
						} else {
							if (currentPrint == printNum) {
								that.looptime = 0
								that.lastData = 0
								that.currentTime = 1
								that.isReceiptSend = false
								that.currentPrint = 1
							} else {
								currentPrint++
								that.currentPrint = currentPrint
								that.currentTime = 1
								that.Send(buff)
							}
						}
					}
				})
			},
		},
		onReady() {
			var list = []
			var numList = []
			var j = 0
			for (var i = 20; i < 200; i += 10) {
				list[j] = i;
				j++
			}
			for (var i = 1; i < 10; i++) {
				numList[i - 1] = i
			}
			this.buffSize = list
			this.oneTimeData = list[0]
			this.printNum = numList
			this.printerNum = numList[0]
			this.initPhoto();
		},
	}
</script>

<style scoped>
	.body {
		background: #EFEFEF !important;
		min-height: 100vh;
	}

	.icon-jiahao {
		padding-right: 30rpx;
	}

	.button {
		margin-top: 40rpx;
	}

	.button button {
		height: 90rpx;
		width: 60%;
		margin: 0 auto;
		background: #35C9A4;
		color: #fff;
		border-radius: 45rpx;
		font-size: 32rpx;
		box-shadow: 0px 3px 7px 0px rgba(88, 88, 88, 0.35);
		line-height: 90rpx;
	}

	.bluetooth-list {
		padding: 30rpx;
	}

	.blue-title {
		color: #AEAEAE;
		font-size: 28rpx;
		padding-left: 20rpx;
		padding-bottom: 15rpx;
	}

	.blue-title image {
		width: 60rpx;
		height: 60rpx;
		position: relative;
		top: 18rpx;
	}

	.bluetooth {
		background: #FFFFFF;
		border-radius: 15rpx;
		height: 100rpx;
		margin-top: 20rpx;
		display: flex;
		padding: 25rpx 30rpx;
	}

	.bluetooth image {
		width: 31rpx;
		height: 37rpx;
		margin-top: 10rpx;
	}

	.blue-name {
		flex: 2;
	}

	.blue-text {
		color: #333333;
		padding-left: 23rpx;
		font-size: 30rpx;
		margin-top: 0rpx;
	}

	.blue-text-id {
		font-size: 24rpx;
		color: #ccc;
		padding-left: 23rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 450rpx;
	}

	.bluetooth button {
		height: 60rpx;
		background: #35C9A4;
		border-radius: 50rpx;
		color: #fff;
		font-size: 28rpx;
		width: 148rpx;
		line-height: 60rpx;
		float: right;
	}
</style>
