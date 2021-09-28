<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">
					{{$t('scan.scanBind')}}
				</block>
			</cu-custom>
		</view>
		<view class="scan">
			<image src="https://trace.domchain.io/web_files_server/adminh5_img/scan.png" mode="" @click="scan()">
			</image>
			<view class="scan-text">
				{{message}}
			</view>
			<button class="uni-scan"  @tap="scanCode()">
				<text>
					{{$t('scan.scanStart')}}
				</text>
			</button>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="pop-center">
				<view class="pop-title">
					{{$t('scan.bindInfor')}}
				</view>
				<view class="pop-kuai">
					<view class="title-put">
						<image src="https://trace.domchain.io/web_files_server/adminh5_img/icon2.png" mode="">
						</image>
						<text>
							{{$t('scan.ExpressInfor')}}
						</text>
					</view>
					<view class="pop-tip">
						<text>{{$t('scan.WaybillNo')}}：</text>
						<text>{{waybillNo}}</text>
					</view>
					<view class="cu-form-group cuform-padd">
						<view class="title">
							{{$t('scan.company')}}
						</view>
						<picker @change="PickerChange" :value="indexInfor" :range="companyList" range-key="name">
							<view class="picker">
								{{indexInfor!= ""?companyList[pickerfarm].name:$t('public.Select')}}
							</view>
						</picker>
					</view>
				</view>
				<view class="pop-kuai">
					<view class="title-put">
						<image class="wid-im"
							src="https://trace.domchain.io/web_files_server/adminh5_img/icon3.png" mode=""></image>
						<text>
							{{$t('scan.Tracea')}}
						</text>
					</view>
					<view class="pop-tip">
						<text>{{$t('public.productName')}}：</text>
						<text>{{infroCode.productName}}</text>
					</view>
					<view class="pop-tip">
						<text class="">{{$t('public.varieties')}}：</text>
						<text>{{infroCode.varietyName}}</text>
					</view>
					<view class="pop-tip">
						<text class="">{{$t('scan.weight')}}：</text>
						<text>{{infroCode.weight}}{{$t('public.jin')}}</text>
					</view>
					<view class="pop-tip">
						<text>{{$t('public.CollBatch')}}：</text>
						<text>{{infroCode.batchNo}}</text>
					</view>
					<view class="pop-tip">
						<text>{{$t('public.farm')}}：</text>
						<text>{{infroCode.farmName}}</text>
					</view>
					<view class="pop-tip">
						<text>{{$t('public.parcel')}}：</text>
						<text>{{infroCode.areaName}}</text>
					</view>
				</view>
				<view class="pop-footer">
					<button type="default" @click="cancel()">{{$t('public.cancel')}}</button>
					<button type="default" @click="toBind()">{{$t('scan.binding')}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: this.$t('scan.scancode'),
				sanCode: "",
				split: '---',
				infroCode: '',
				waybillNo: '',
				resultList: [],
				companyList: [],
				indexInfor: "",
				pickerfarm: "",
				tx_hash: '',
			}
		},
		created() {
			this.$api.getServicesList({}).then((res) => {
				if (res.data.code === 200) {
					this.$data.companyList = res.data.result.records;
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 2000
					})
				}
			}).catch((err) => {});
		},
		methods: {
			PickerChange(e) {
				this.indexInfor = this.$data.companyList[e.detail.value].code;
				this.pickerfarm = e.detail.value;
				console.log(this.indexInfor);
			},
			cancel() {
				this.$refs.popup.close();
				this.message = this.$t('scan.scancode');
				this.$data.infroCode = [];
				this.resultList = [];
			},
			scanCode (e) {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						_self.image = tempFilePaths[0];
						_self.iconcheck = 1;
						_self.chooseImg(_self.image);
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			chooseImg(path) {
				var token = uni.getStorageSync('token');
				var imgURL = 'https://trace.domchain.io/admin-api/cherry/cherryTraceQrCodeExpress/scan';
				var temp = "temp";
				var that = this;
				uni.uploadFile({
					url: imgURL,
					method: 'POST',
					formData: {
						img: path,
						biz: temp
					},
					filePath: path,
					name: 'file',
					header: {
						"X-Access-Token": token
					},
					success: (res) => {
						console.log(res)
						that.imageCover = JSON.parse(res.data).result;
						var scanType = that.imageCover.format;
						var codeUrl = that.imageCover.txt;
						if (scanType === "QR_CODE") {
							var arr = codeUrl.split('tx_hash=');
							that.tx_hash = arr[1];
							that.$api.getTraceQrCodeForBind({
								traceQrCode: that.tx_hash
							}).then((res) => {
								if (res.data.code === 200) {
									that.$data.infroCode = res.data.result;
									if (that.resultList.length === 0 ) {
										that.resultList.push(scanType);
									}else {
										for (let i in that.resultList) {
											var result =  that.resultList[i];
											if(result != scanType){
												that.resultList.push(scanType);
											}else {
												uni.showToast({
													title: this.$t('scan.traccode'),
													icon: 'none',
													mask: true,
													duration: 2000,
												})
											}
										}
									}
									if (that.resultList.length === 2) {
										that.$refs.popup.open();
									}
									that.message = this.$t('scan.traccode');
								} else {
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										mask: true,
										duration: 2000,
									})
								}
							}).catch((err) => {});
						} else if (scanType === "CODE_128") {
							that.waybillNo = codeUrl;
							if (that.resultList.length === 0 ) {
								that.resultList.push(scanType);
							}else {
								for (let i in that.resultList) {
									var result =  that.resultList[i];
									if(result != scanType){
										that.resultList.push(scanType);
									}else {
										uni.showToast({
											title: this.$t('scan.waybillCode'),
											icon: 'none',
											mask: true,
											duration: 2000,
										})
									}
								}
							}
							that.message = this.$t('scan.waybillCode');
							if (that.resultList.length === 2) {
								that.$refs.popup.open();
							}
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			toBind(e) {
				if (this.indexInfor === "") {
					uni.showToast({
						title: this.$t('scan.selectExpress'),
						icon: 'none',
						mask: true,
						duration: 2000,
					})
				} else {
					this.$api.getTraceQrCode({
						expressCode: this.indexInfor,
						expressOrderNo: this.waybillNo,
						qrCode: this.tx_hash
					}).then((res) => {
						if (res.data.code === 200) {
							uni.showToast({
								title: this.$t('scan.BindSucc'),
								icon: 'none',
								mask: true,
								duration: 1500,
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/scan/scan',
								});
							}, 1600);
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								duration: 2000
							})
						}
					}).catch((err) => {});
				}
			}
		}
	}
</script>

<style scoped>
	.scan {
		text-align: center;
	}

	.scan image {
		height: 355upx;
		width: 354upx;
		margin-top: 142upx;
	}

	.scan .scan-text {
		color: #070D23;
		font-size: 30upx;
		margin-top: 65upx;
	}

	.pop-center {
		min-height: 1040upx;
		width: 692upx;
		margin: 0 auto;
		background: #F9FAFC;
		border-radius: 30upx;
		padding: 0px 30upx;
	}

	.pop-title {
		color: #070D23;
		font-size: 34upx;
		text-align: center;
		font-weight: 600;
		padding-top: 28upx;
	}

	.pop-kuai {
		background: #fff;
		padding: 30upx;
		margin-top: 28upx;
		border-radius: 6upx;
	}

	.title-put {
		margin-bottom: 25upx;
	}

	.title-put image {
		width: 28upx;
		height: 30upx;
		vertical-align: sub;
	}

	.title-put .wid-im {
		width: 40upx;
		height: 32upx;
	}

	.title-put text {
		color: #333333;
		font-size: 30upx;
		padding-left: 15upx;
	}

	.pop-tip {
		margin-bottom: 20upx;
	}

	.pop-tip:nth-last-child(1) {
		margin-bottom: 0;
	}

	.pop-tip text:nth-of-type(1) {
		color: #666666;
		font-size: 26upx;
	}

	.pop-tip text:nth-of-type(2) {
		color: #666666;
		font-size: 26upx;
		padding-left: 8upx;
	}

	.pop-tip text.tab-em {
		letter-spacing: 2em;
		margin-right: -2em;
	}

	.pop-footer {
		display: flex;
		margin-top: 60upx;
		margin-bottom: 40upx;
	}

	.pop-footer button:nth-of-type(1) {
		background: #E5E7E6;
		border-radius: 6upx;
		color: #9E9E9E;
		font-size: 30upx;
		height: 90upx;
		line-height: 90upx;
		flex: 1;
		margin-right: 30upx;
	}

	.pop-footer button:nth-of-type(2) {
		background: #36AB8A;
		border-radius: 6upx;
		color: #fff;
		font-size: 30upx;
		height: 90upx;
		line-height: 90upx;
		flex: 1;
		margin-left: 30upx;
	}

	.uni-scan {
		height: 110rpx;
		border: 1px solid #8EBFA9;
		border-radius: 55rpx;
		background: #F3F8F6;
		text-align: center;
		line-height: 110rpx;
		width: 590rpx;
		margin-bottom: 40rpx;
		margin-top: 80rpx;
	}

	.uni-scan text {
		color: #1D7F53;
		font-size: 30rpx;
		font-weight: 600;
		display: inline;
		padding-left: 14px;
		position: relative;
		top: 0rpx;
	}

	.cu-form-group {
		min-height: 40rpx !important;
		height: 40rpx !important;
	}

	.cu-form-group .title {
		text-align: justify;
		padding-right: 30rpx;
		font-size: 26rpx !important;
		position: relative;
		height: 40rpx !important;
		line-height: 40rpx !important;
		color: #666666 !important;
	}

	.cu-form-group picker .picker {
		text-align: left !important;
	}
</style>
