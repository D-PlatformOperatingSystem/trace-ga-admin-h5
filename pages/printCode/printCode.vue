<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">{{$t('index.printCode')}}</block>
			</cu-custom>
		</view>
		<view class="numb_nav">
			<view :class="index == 0 ? 'left-text' : 'left-title'" @click="load(0)">
				<view class="nav_tes_text">{{$t('public.sort')}}</view>
			</view>
			<view :class="index == 1 ? 'left-text' : 'left-title'" @click="load(1)">
				<view class="nav_tes_text">{{$t('public.screen')}}</view>
			</view>
		</view>
		<view class="tab_numb">
			<view class="tab-list">
				<view class="tab-item" @click="toDetail(item.id)" v-for="(item,index) in batchLish" :key="index">
					<view class="tab-content">
						<view class="tab-li">
							<text>{{$t('public.CollBatch')}}：</text>
							<text>
								{{item.batchNo}}
							</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.farm')}}：</text>
							<text>{{item.farmId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.parcel')}}：</text>
							<text>{{item.areaId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.productName')}}：</text>
							<text>{{$t('public.Cherry')}}</text>
						</view>
						<view class="tab-li ">
							<text>{{$t('public.varieties')}}</text>：
							<text>{{item.varietyId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.completionDate')}}：</text>
							<text>{{item.endTime}}</text>
							<button type="default" class="tab-li-btn" @click="getCode(item.id)">{{$t('index.printCode')}}</button>
						</view>
					</view>
				</view>
				<view class="null" v-show="nullData">
					<image src="https://trace.domchain.io/web_files_server/adminh5_img/null.png" mode=""></image>
					<view class="null-text">{{$t('public.null')}}</view>
				</view>
			</view>
		</view>
		<uni-popup ref="sort" type="bottom">
			<view class="popup-bottom">
			    <view class="pop-title">
					<text class="iconfont icon-SortingProblem"></text>
					<text>{{$t('public.sortOrder')}}</text>
				</view>
				<view class="pop-radio">
					<radio-group class="block" @change="RadioChangeSort">
						<view class="cu-form-group">
							<view class="title">{{$t('public.positive')}}</view>
							<radio class='radio' :class="radiosort=='asc'?'checked':''"
								:checked="radiosort=='asc'?true:false" value="asc"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">{{$t('public.Reverse')}}</view>
							<radio class='radio' :class="radiosort=='desc'?'checked':''"
								:checked="radiosort=='desc'?true:false" value="desc"></radio>
						</view>
					</radio-group>
				</view>
				<view class="pop-title">
					<text class="iconfont icon-sort"></text>
					<text>{{$t('public.properties')}}</text>
				</view>
				<view class="pop-radio">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="title">{{$t('public.CollBatch')}}</view>
							<radio class='radio' :class="radio=='batchNo'?'checked':''"
								:checked="radio=='batchNo'?true:false" value="batchNo"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">{{$t('public.completionDate')}}</view>
							<radio class='radio' :class="radio=='endTime'?'checked':''" 
							:checked="radio=='endTime'?true:false" value="endTime"></radio>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="pop-footer">
				<button @click="batchresetSort()" type="default">{{$t('public.Reset')}}</button>
				<button @click="batchSort()" type="default">{{$t('public.confirm')}}</button>
			</view>
		</uni-popup>
		<uni-popup ref="screen" type="bottom" >
			<view class="popup-bottom ">
				<view class="pop-title-sub">
				  	<text>{{$t('public.completionDate')}}</text>
				</view>
				<view class="popup-padd">
					<view class="cu-form-group cu-form-group-bg">
						<picker mode="date" :value="startTime" @change="DateChange">
							<view class="picker">
								{{startTime}}
							</view>
						</picker>
					</view>
					<view class="cu-zhi">{{$t('public.to')}}</view>
					<view class="cu-form-group cu-form-group-bg">
						<picker mode="date" :value="endTime" @change="DateEndChange">
							<view class="picker">
								{{endTime}}
							</view>
						</picker>
					</view>
				</view>
				<view class="pop-title-sub">
				  	<text>{{$t('public.farm')}}</text>
				</view>
				<view class="cu-form-group cuform-padd">
					<view class="title">{{$t('public.farm')}}</view>
					<picker @change="PickerChange" :value="indexInfor" :range="pickerList" range-key="name">
						<view class="picker">
							{{indexInfor>-1?pickerList[pickerfarm].name:$t('public.Select')}}
						</view>
					</picker>
				</view>
				<view class="pop-title-sub">
				  	<text>{{$t('public.parcel')}}</text>
				</view>
				<view class="cu-form-group cuform-padd">
					<view class="title">{{$t('public.parcel')}}</view>
					<picker @change="PickerChangeDi" :value="indexDi" :range="massifList" range-key="name">
						<view class="picker">
							{{indexDi>-1?massifList[pickerarea].name:$t('public.Select')}}
						</view>
					</picker>
				</view>
			</view>
			<view class="pop-footer">
				<button type="default" @click="batchScreenReset()">{{$t('public.Reset')}}</button>
				<button type="default" @click="batchScreen()">{{$t('public.confirm')}}</button>
			</view>
		</uni-popup>
		<uni-popup ref="code" type="bottom" :mask-click="false">
			<view class="code_box">
				<view class="code_wet">
					<view class="code-title">
						{{$t('public.weight')}}：
					</view>
					<view class="code-bu">
						<view class="code-btn" :class="weightClass == index ? 'code-active': ''" @click="getWeight(item.weight,index)" v-for="(item,index) in weightList" :key="index">
							{{item.weight}}{{$t('public.jin')}}
						</view>
					</view>
				</view>
				<view class="code_num">
					<view class="code_num_text">
						{{$t('public.notPrinted')}}：
					</view>
					<view class="code_num_ber">
						{{codeNum}}
					</view>
				</view>
				<view class="code_input">
					<view class="code_text">
						{{$t('public.printQuantity')}}：
					</view>
					<view class="code_pod">
						<view class="reduce" @click="reduceNum()">-</view>
						<view class="input">
							<input type="number" :value="total" @input="countVal" @click="countValTop" v-model="total" disabled="disabled" />
						</view>
						<view class="add" @click="addNum()">+</view>
					</view>
				</view>
				<view class="footer">
					<button type="default" @click="deter()">{{$t('public.confirm')}}</button>
					<button type="default" @click="cancalWeight()">{{$t('public.cancel')}}</button>
				</view>
			</view>
		</uni-popup>
		<canvas canvas-id="canvasOut" class="canvas"></canvas>
	</view>
</template>

<script>
	import tsc from '@/common/libs/tsc.js'
	import esc from '@/common/libs/esc.js'
	export default {
		data() {
			return {
				color: 0,
				index: 0,
				startTime: '2021-05-30',
				endTime: '2021-06-01',
				btn: 0,
				batchLish: [],
				page: 1,
				pageSize: 10,
				pageTotal: 0,
				isNoMoreData: false,
				loadingText: '',
				nullData: false,
				radiosort: 'desc',
				radio: 'batchNo',
				indexInfor: -1,
				pickerfarm: -1,
				indexDi: -1,
				pickerarea: -1,
				pickerList: [],
				massifList: [],
				and: '',
				total: 1,
				weightList: [],
				weightClass: 0,
				codeNum: 0,
				batchId: '',
				weiNum: 0,
				imageURL:'',
				canvasWidth: 100,
				canvasHeight: 100,
				imageSrc: '',
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
		onLoad() {
			
		},
		mounted() {
			
		},
		created() {
			this.getData();
			this.deviceId = uni.getStorageSync("deviceId");
			this.serviceId = uni.getStorageSync("serviceId");
			this.characteristicId = uni.getStorageSync("characteristicId");
		},
		onShow() {
			this.getDataList();
		},
		methods: {
			getData () {
				var that = this;
				that.$api.getFarmList({}).then((res) => {
					if (res.data.code == 200) {
						that.$data.pickerList = res.data.result.records;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
				that.$api.getAreaList({}).then((res) => {
					if (res.data.code == 200) {
						that.$data.massifList = res.data.result.records
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
			},
			getDataList () {
				var that = this;
				that.$api.getBatchList({
					pageSize: that.pageSize,
					pageNo: that.page
				}).then((res) => {
					if (res.data.code === 200) {
						that.$data.batchLish = res.data.result.records;
						that.page = that.$data.batchLish.length == that.pageSize ? ++that.page :that.page;
						if (that.$data.batchLish.length === 0 ) {
							that.nullData=true
						}else {
							that.nullData=false
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
			},
			load (e) {
				this.index = e;
				if(e === 0) {
					this.$refs.sort.open()
				} else if(e === 1) {
					this.$refs.screen.open()
				}
			},
			loadBtn(e) {},
			RadioChangeSort(e) {
				this.radiosort = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			DateChange(e) {
				this.startTime = e.detail.value;
			},
			DateEndChange (e) {
				this.endTime = e.detail.value;
			},
			PickerChange(e) {
				this.indexInfor = this.$data.pickerList[e.detail.value].id
				console.log(this.indexInfor)
				this.pickerfarm = e.detail.value
			},
			PickerChangeDi(e) {
				this.pickerarea = e.detail.value
				this.indexDi = this.$data.massifList[e.detail.value].id
			},
			getCode (id) {
				var that = this;
				that.batchId = id;
				that.$api.getStatQrCode ({
					batchId: that.batchId
				}).then((res) => {
					if (res.data.code === 200) {
						that.$data.weightList = res.data.result.stat;
						that.codeNum = that.$data.weightList[0].unPrinted;
						that.weiNum = that.$data.weightList[0].weight;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
				that.$refs.code.open()
			},
			getWeight (id,index) {
				this.codeNum = this.$data.weightList[index].unPrinted;
				this.weightClass  = index;
				this.weiNum = id;
			},
			countValTop () {
				uni.showToast({
					title: this.$t('print.Onlyone'),
					icon: 'none'
				});
			},
			// countVal (e) {
				
			// 	this.total = e.detail.value;
				
			// 	if (this.total == 0) {
			// 		uni.showToast({
			// 			title: this.$t('print.numbePrinted'),
			// 			icon: 'none'
			// 		});
			// 	}else if (this.total >= this.codeNum ){
			// 		uni.showToast({
			// 			title: this.$t('print.cannot'),
			// 			icon: "none"
			// 		})
			// 		return;
			// 	}
			// },
			reduceNum () {
				uni.showToast({
					title: this.$t('print.oneCopysan'),
					icon: 'none'
				})
				// if(this.total <= 1) {
				// 	uni.showToast({
				// 		title: this.$t('print.numbePrinted'),
				// 		icon: 'none'
				// 	})
				// 	return;
				// }
				// this.total = this.total - 1;
			},
			addNum () {
				uni.showToast({
					title: this.$t('print.oneCopysan'),
					icon: 'none'
				})
				// if (this.total >= this.codeNum ) {
				// 	uni.showToast({
				// 		title: this.$t('print.cannot'),
				// 		icon: "none"
				// 	})
				// 	return;
				// }
				// var number = parseInt(this.total)
				// this.total = number + 1;
			},
			cancalWeight () { 
				this.$refs.code.close()
				this.total = 1;
			},
			deter (id) { 
				var that = this;
				if (uni.getStorageSync("deviceId") == '' ) {
					uni.navigateTo({
						url: '../print/print'
					})
				} else {
					that.$api.getQrCodeForPrint ({
						batchId: that.batchId,
						count: that.total,
						weight: that.weiNum
					}).then((res) => {
						if (res.data.code === 200) {
							for (let i in res.data.result) {
								var result =  res.data.result[i];
								that.imageSrc = result;
								console.log(that.imageSrc);
								that.printPhoto();
							}
							this.$refs.code.close()
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								duration: 2000
							})
						}
					}).catch((err) => {});
				}
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
						command.setQrcode(54, 9, "M", 5, "A",that.imageSrc)
						command.setPrint(1)
						that.prepareSend(command.getData())
					},
					complete: function(res) {
						uni.showLoading({
							title: this.$t('print.PrEss'),
							mask: true
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
							uni.showLoading({
								title: this.$t('print.PrEss'),
								mask: true
							}) 
						}
					},
					fail: function(res) {
						uni.showToast({
							title: this.$t('print.PrSucc'),
							icon: 'success',
							duration: 2000
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
			batchSort() {
				const that = this
				let data = {}
				if (that.$data.indexInfor === -1 &&
					that.$data.pickerfarm === -1 &&
					that.$data.indexDi === -1 &&
					that.$data.pickerarea === -1 &&
					that.$data.startTime === '2021-05-30' &&
					that.$data.endTime === '2021-06-01') {
					data = {
						order: that.$data.radiosort,
						column: that.$data.radio,
					}
				} else {
					data = {
						order: that.$data.radiosort,
						column: that.$data.radio,
						farmId: that.$data.indexInfor,
						areaId: that.$data.indexDi,
						startTime: that.$data.startTime,
						endTime: that.$data.endTime
					}
				}
				this.getDataList();
				this.$refs.sort.close()
			},
			batchresetSort() {
				let that = this
				this.$data.radiosort = 'desc'
				this.$data.radio = 'batchNo'
				let data = {}
				if (that.$data.indexInfor === -1 &&
					that.$data.pickerfarm === -1 &&
					that.$data.indexDi === -1 &&
					that.$data.pickerarea === -1 &&
					that.$data.startTime === '2021-05-30' &&
					that.$data.endTime === '2021-06-01') {
					data = {}
				} else {
					data = {
						farmId: that.$data.indexInfor,
						areaId: that.$data.indexDi,
						startTime: that.$data.startTime,
						endTime: that.$data.endTime
					}
				}
				this.getDataList();
				this.$refs.sort.close()
			},
			batchScreen() {
				const that = this
				that.and = "and";
				let data = {
					order: that.$data.radiosort,
					column: that.$data.radio,
					farmId: that.$data.indexInfor,
					areaId: that.$data.indexDi,
					startTime: that.$data.startTime,
					endTime: that.$data.endTime,
					superQueryMatchType: that.and,
					superQueryParams: JSON.stringify([
						{
							rule :"ge",
							type:"date",
							val: that.$data.startTime,
							field:"startTime"
						},
						{
							rule:"le",
							type:"date",
							val: that.$data.endTime,
							field: "endTime"
						}
					])
					
				}
				if (that.$data.indexInfor === -1 &&
					that.$data.pickerfarm === -1 &&
					that.$data.indexDi === -1 &&
					that.$data.pickerarea === -1 &&
					that.$data.startTime === '2021-05-30' &&
					that.$data.endTime === '2021-06-01') {
					data = {
						order: that.$data.radiosort,
						column: that.$data.radio,
					}
				} else {
					data = {
						order: that.$data.radiosort,
						column: that.$data.radio,
						farmId: that.$data.indexInfor,
						areaId: that.$data.indexDi,
						startTime: that.$data.startTime,
						endTime: that.$data.endTime,
						superQueryMatchType: that.and,
						superQueryParams: JSON.stringify([
							{
								rule :"ge",
								type:"date",
								val: that.$data.startTime,
								field:"startTime"
							},
							{
								rule:"le",
								type:"date",
								val: that.$data.endTime,
								field: "endTime"
							}
						])
					}
				}
				this.getDataList();
				this.$refs.screen.close()
			},
			batchScreenReset() {
				const that = this;
				that.$data.indexInfor = -1;
				that.$data.pickerfarm = -1;
				that.$data.indexDi = -1;
				that.$data.pickerarea = -1;
				that.$data.startTime = '2021-05-30';
				that.$data.endTime = '2021-06-01';
				this.getDataList();
				this.$refs.screen.close()
			},
			getListMore() {
				var that = this;
				if (that.isNoMoreData) return false;
				that.$api.getBatchList({
					pageSize: that.pageSize,
					pageNo: that.page
				}).then((res) => {
					if (res.data.code === 200) {
						that.$data.pageTotal = res.data.result.total;
						if(that.$data.pageTotal > 10) {
							that.isNoMoreData = that.$data.batchLish.length == that.pageSize ? false :true; 
							that.page = that.$data.batchLish.length == that.pageSize ? ++that.page :that.page;
							that.$data.batchLish = that.$data.batchLish.concat(res.data.result.records);
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
			},
			toDetail(id) {
				console.log(id)
				this.$api.getBatchList({
					id: id
				}).then((res) => {
					if (res.data.code === 200) {
						uni.navigateTo({
							url: '/pages/printCode/printCodeInfro?id=' +id
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
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
		onReachBottom() {
			this.getListMore();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getListMore();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style scoped>
	.body {
		background: #F8F9FF !important;
		min-height: 100vh;
	}
	.icon-plus {
		padding-right: 30rpx;
	}
	.numb_nav {
		background-color: #ffffff;
		color: #666666;
		box-shadow: 0px 3px 3px 0px rgb(235 235 235 / 40%);
		border-radius: 5px;
		display: flex;
		position: fixed;
		width: 100%;
		z-index: 99;
	}
	.numb_nav view {
		flex: 1;
		text-align: center;
		line-height: 80rpx;
	}
	.nav_tes .nav_tes_text {
		color: #36AB8A;
		font-weight: 600;
		border-bottom: 2px solid #36AB8A;
		display: block;
		line-height: 80rpx;
		width: 164rpx;
		margin: 0 auto;
	}
	.numb_nav_sub {
		background-color: #ffffff;
		color: #666666;
		box-shadow: 0px 3px 3px 0px rgb(235 235 235 / 40%);
		border-radius: 5px;
		margin-top: 30rpx;
		display: flex;
	}
	.tab_numb {
		margin: 0px 30rpx;
		margin-top: 112rpx;
	}
	.tab-item {
		margin-top: 30rpx;
		border-radius: 16rpx;
		background: #fff;
		min-height: 10rpx;
		padding-bottom: 40rpx;
	}
	.tab-top {
		background: #E1E5EE;
		border-radius: 16rpx 16rpx 0px 0px;
		padding: 0px 28rpx;
		display: flex;
		height: 72rpx;
	}
	.tab-top-head {
		flex: .4;
	}
	.tab-top-head image {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		margin-top: 8rpx;
	}
	.tab-top-name {
		flex: 2;
		line-height: 72rpx;
		color: #070D23;
		font-size: 30rpx;
	}
	.tab-top-state {
		flex: 1;
	}
	.tab-top-state {
		text-align: right;
	}
	.red text {
		color: #FF5151;
	}
	.blue text {
		color: #518EFF;
	}
	.green text {
		color: #00BF9D;
	}
	.tab-top-state text:nth-of-type(1) {
		line-height: 72rpx;
		font-size: 24rpx;
		padding-right: 20rpx;
	}
	.tab-top-state text:nth-of-type(2) {
		font-size: 24rpx;
		border: 3px solid rgba(255, 255, 255, 0.5);
		border-radius: 50%;
	}
	.tab-content {
		padding: 30rpx 30rpx;
		padding-bottom: 0px;
	}
	.tab-li {
		margin-top: 18rpx;
	}
	.tab-li text:nth-of-type(1) {
		color: #666666;
		font-size: 26rpx;
		text-align: justify;
	}
	.tab-li text:nth-of-type(2) {
		color: #9B9DAD;
		font-size: 24rpx;
		padding-left: 10rpx;
	}
	.tab-li text.green-text {
		color: #36AB8A;
	}
	.tab-em text:nth-of-type(1) {
		letter-spacing: 2em;
		margin-right: -2em;
	}
	.left-text .nav_tes_text {
		color: #36AB8A;
		font-weight: 600;
		border-bottom: 2px solid #36AB8A;
		display: block;
		line-height: 80rpx;
		width: 164rpx;
		margin: 0 auto;
	}
	.popup-bottom {
		background: #F8F9FF;
		height: calc(100vh - 89px);
		padding: 0px 30rpx;
	}
	.pop-title {
		padding: 30rpx 0px;
		padding-bottom: 0px;
	}
	.pop-title text:nth-of-type(1) {
		color: #C7CBD8;
		font-size: 32rpx;
		vertical-align: bottom;
	}
	.pop-title text:nth-of-type(2) {
		color: #070D23;
		font-size: 28rpx;
		padding-left: 15rpx;
	}
	.pop-radio {
		background: #fff;
		padding: 0px 30rpx;
		border: 1px solid rgba(224, 228, 237, 0.17);
		border-radius: 16rpx;
		min-height: 10rpx;
		margin-top: 30rpx;
	}
	.cu-form-group .title {
	    text-align: justify;
	    padding-right: 0px;
	    font-size: 28rpx;
	    position: relative;
	    height: 30px;
	    line-height: 30px;
		color: #414141;
	}
	.pop-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
	}
	.pop-footer button:nth-of-type(1) {
		border-radius: 0px;
		background: #E5E7E6;
		color: #36AB8A;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		flex: 1;
	}
	.pop-footer button:nth-of-type(2) {
		border-radius: 0px;
		background: #36AB8A;
		color: #FFFFFF;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		flex: 1;
	}
	.pop-title-sub {
		padding: 30rpx 0px;
	}
	.pop-title-sub text{
		color: #070D23;
		font-size: 28rpx;
	}
	.cu-form-group-bg {
		margin-bottom: 0rpx;
		border-radius: 10rpx;
		height: 90rpx;
		padding-left: 20upx;
		flex: 1;
	}
	.cu-form-group-bg:nth-last-child(1) {
		margin-bottom: 0px;
	}
	.cu-form-group+.cu-form-group {
	    border-top: 0.5px solid #eee;
	}
	.cu-form-group-bg .title[data-v-677505bc] {
	    text-align: justify;
	    padding-right: 0px;
	    font-size: 28rpx;
	    position: relative;
	    height: 60rpx;
	    line-height: 60rpx;
	    color: #414141;
	    padding-left: 20rpx;
	}
	.cu-form-group-bg uni-picker::after {
	    font-family: iconfont;
	    display: block;
	    content: "\e64d";
	    position: absolute;
	    font-size: 32rpx;
	    color: #97BAB0;
	    line-height: 90rpx;
	    width: 102rpx;
	    text-align: center;
	    top: 0;
	    bottom: 0;
	    right: -10px;
	    margin: auto;
	}
	
	.cu-form-group uni-picker .picker {
	    line-height: 90rpx;
	    font-size: 14px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: right !important;
		padding-right: 20rpx;
	}
	.cu-form-group-bg uni-picker .picker {
	    line-height: 90rpx;
	    font-size: 14px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: center !important;
		padding-right: 20rpx;
	}
	.popup-padd {
		padding-top: 0rpx;
		padding-bottom: 0px;
		display: flex;
	}
	.pop-type {
		display: flex;
	}
	.pop-type button{
		border: 1px solid #D6D9E3;
		border-radius: 10rpx;
		background-color: #fff;
		color: #414141;
		font-size: 28rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-right: 0;
		outline: none;
		margin-left: 0rpx;
	}
	.pop-type .button-mo {
		border: 1px solid #36AB8A;
		border-radius: 10rpx;
		background-color: #fff;
		color: #36AB8A;
		font-size: 28rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 0;
		margin-right: 0;
		outline: none;
	}
	.pop-type button{
		margin-left: 30rpx;
	}
	.pop-type button:nth-of-type(1) {
		margin-left: 0rpx;
	}
	.cuform-padd {
		padding: 0px 20upx;
	}
	.cu-zhi {
		padding: 0px 54upx;
		line-height: 90upx;
		color: #B9BAC5;
	}
	.tab-li-btn {
		background: #36AB8A;
		color: #fff;
		width: auto;
		height: 54upx;
		font-size: 28upx;
		line-height: 54upx;
		float: right;
	}
	.null {
		text-align: center;
		margin-top: 276rpx;
		/* display: none; */
	}
	.null image {
		width: 372rpx;
		height: 372rpx;
		text-align: center;
	}
	.null-text {
		color: #333;
		font-size: 36rpx;
		text-align: center;
		margin-top: 20rpx;
		font-weight: 600;
	}
	/* #ifdef  MP-WEIXIN */
	.cu-form-group-bg picker::after {
	    font-family: iconfont;
	    display: block;
	    content: "\e64d";
	    position: absolute;
	    font-size: 32rpx;
	    color: #97BAB0;
	    line-height: 100rpx;
	    width: 102rpx;
	    text-align: center;
	    top: 0;
	    bottom: 0;
	    right: -10rpx;
	    margin: auto;
	}
	.cu-form-group-bg picker {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    padding-right: 80rpx;
	    overflow: hidden;
	    position: relative;
	}
	/* #endif */
	.code_box {
		background: #fff;
		min-height: 40rpx;
		margin: 30rpx 20rpx;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
	}
	.code_wet {
		
	}
	.code-title {
		color: #666666;
		font-size: 30rpx;
	}
	.code-btn {
		background: #F1F1F1;
		height: 60rpx;
		width: 176rpx;
		border-radius: 30rpx;
		color: #999;
		font-size: 24rpx;
		text-align: center;
		line-height: 60rpx;
		display: inline-block;
		margin-right: 60rpx;
		margin-top: 23rpx;
		border: 1px solid #F1F1F1;
	}
	.code-active {
		background: #ECFFFA;
		border: 1px solid #36AB8A;
		color: #36AB8A;
	}
	.code-btn:nth-child(3n) {
		margin-right: 0;
	}
	/* .code-active:nth-child(3n) {
		margin-right: 0;
	} */
	.code_num {
		margin-top: 50rpx;
		display: flex;
	}
	.code_num .code_num_text {
		color: #666666;
		font-size: 30rpx;
		flex: 1;
	}
	.code_num .code_num_ber {
		color: #666;
		font-size: 28rpx;
		text-align: center;
		flex: 1;
	}
	.code_input {
		display: flex;
		margin-top: 50rpx;
	}
	.code_text {
		flex: 1;
		color: #666666;
		font-size: 30rpx;
		line-height: 70rpx;
	}
	.code_pod {
		flex: 1;
		display: flex;
	}
	.code_pod .reduce {
		width: 120rpx;
		height: 70rpx;
		background-color: #36AB8A;
		color: #fff;
		font-size: 48rpx;
		text-align: center;
		border-radius: 12rpx 0px 0px 12rpx;
		line-height: 70rpx;
	}
	.code_pod input {
		text-align: center;
		height: 70rpx;
		border-bottom: 1px solid #F1F1F1;
		border-top: 1px solid #F1F1F1;
		line-height: 70rpx;
		color: #666666;
		font-size: 28rpx;
	}
	.code_pod .add {
		width: 120rpx;
		height: 70rpx;
		background-color: #36AB8A;
		color: #fff;
		font-size: 48rpx;
		text-align: center;
		border-radius: 0px 12rpx 12rpx 0rpx;
		line-height: 70rpx;
	}
	.footer {
		margin-top: 70rpx;
		display: flex;
	}
	.footer button:nth-of-type(1) {
		background: #36AB8A;
		border-radius: 6rpx;
		color: #fff;
		font-size: 28rpx;
		height: 70rpx;
		width: 266rpx;
	}
	.footer button:nth-of-type(2) {
		background: #4471CB;
		border-radius: 6rpx;
		color: #fff;
		font-size: 28rpx;
		height: 70rpx;
		width: 266rpx;
	}
</style>
