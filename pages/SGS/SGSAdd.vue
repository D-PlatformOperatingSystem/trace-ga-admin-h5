<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">
					{{$t('SGS.addAutn')}}
				</block>
			</cu-custom>
		</view>
		<view class="cu-form-group cu-form-group-bg">
			<view class="title">{{$t('SGS.cerDate')}}：</view>
			<picker class="picker-border" mode="date" :value="issueTime" @change="SGSData">
				<view class="picker">
					{{issueTime}}
				</view>
			</picker>
		</view>
		<view class="batch">
			<text>{{$t('SGS.ExpTime')}}：</text>
			<text>--</text>
		</view>
		<view class="batch-infor">
			<view class="cu-form-group">
				<view class="title">{{$t('public.farm')}}：</view>
				<picker @change="PickerChange" :value="indexInfor" :range="pickerList" range-key="name">
					<view class="picker">
						{{indexInfor>-1?pickerList[pickerfarm].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('public.parcel')}}：</view>
				<picker @change="PickerChangeDi" :value="indexDi" :range="massifList" range-key="name">
					<view class="picker">
						{{indexDi>-1?massifList[pickerarea].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
		</view>
		<view class="batch-infor">
			<view class="infro-ng">
				<text class="">{{$t('public.productName')}}：</text>
				<text>{{$t('public.Cherry')}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('public.varieties')}}：</view>
				<picker @change="toVariety" :value="variety" :range="varietyList" range-key="name">
					<view class="picker">
						{{variety>-1?varietyList[varietyName].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="">{{$t('public.liable')}}：</view>
				<picker @change="getPick" :value="pick" :range="pickList" range-key="name">
					<view class="picker">
						{{pick>-1?pickList[pickName].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
		</view>
		<view class="infro-upload">
			<view class="title">{{$t('SGS.certificate')}}：</view>
			<view class="upload-front" @tap="upload()">
				<view class="" v-if="iconcheck == 0">
					<view class="iconfont icon-plus"></view>
					<view class="upload-text">
						{{$t('SGS.SGSpicture')}}
					</view>
				</view>
				<view class="" v-else>
					<image :src="image" mode=""></image>
				</view>
			</view>
		</view>
		<view class="submit">
			<button type="default" @click="submit()">
				{{$t('breed.preserve')}}
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				issueTime: '2021-06-15',
				pickerList: [],
				indexInfor: -1,
				pickerfarm: -1,
				massifList: [],
				pickerarea: -1,
				indexDi: -1,
				varietyList: [],
				variety: -1,
				varietyName: -1,
				pick: -1,
				pickName: -1,
				pickList: [],
				iconcheck: 0,
				image: '' ,
				imageCover: '',
			}
		},
		created() {
			var that = this;
			this.$api.getFarmList({}).then((res) => {
				if (res.data.code == 200) {
					that.$data.pickerList = res.data.result.records
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 2000
					})
				}
			}).catch((err) => {});
			this.$api.getAreaList({}).then((res) => {
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
			this.$api.getVarietyList({}).then((res) => {
				if (res.data.code == 200) {
					that.$data.varietyList = res.data.result.records
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 2000
					})
				}
			}).catch((err) => {});
			this.$api.getEmployeesList({}).then((res) => {
				if (res.data.code == 200) {
					that.$data.pickList = res.data.result.records
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
			SGSData(e) {
				this.issueTime = e.detail.value;
			},
			PickerChange(e) {
				this.indexInfor = this.$data.pickerList[e.detail.value].id;
				this.pickerfarm = e.detail.value;
			},
			PickerChangeDi(e) {
				this.pickerarea = e.detail.value
				this.indexDi = this.$data.massifList[e.detail.value].id
			},
			toVariety(e) {
				this.variety = this.$data.varietyList[e.detail.value].id;
				this.varietyName = e.detail.value;
			},
			getPick(e){
				this.pick = this.$data.pickList[e.detail.value].id
				this.pickName = e.detail.value
			},
			upload (e) {
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
				var imgURL = this.$api.imgUrl;
				var temp = "temp";
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
						let img = JSON.parse(res.data).message;
						this.imageCover = img;
						console.log(this.imageCover)
						 uni.showToast({
							title: this.$t('breed.Upload'),
							icon: 'none',
							duration: 800
						});
					},
					fail: () => {},
					complete: () => {}
				})
			},
			submit () {
				var that = this;
				that.$api.getSgsAdd({
					issueTime: that.$data.issueTime,
					farmId: that.$data.indexInfor,
					areaId: that.$data.indexDi,
					varietyId: that.$data.variety,
					employeeId: that.$data.pick,
					sgsImg: this.imageCover,
				}).then((res) => {
					if (res.data.code === 200) {
						uni.showToast({
							title: this.$t('SGS.addae'),
							icon: 'none',
							mask: true,
							duration: 1500,
						})
						setTimeout(function() {
							uni.redirectTo({
							    url: '/pages/SGS/SGS'
							});
						}, 2000);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {});
			}
		}
	}
</script>

<style scoped>
	.body {
		background: #F8F9FF !important;
		height: 100vh;
	}
	.keep {
		padding-right: 30rpx;
	}
	.batch {
		background: #fff;
		padding: 0upx 30upx;
		height: 100upx;
	}
	.batch text {
		line-height: 100upx;
	}
	.batch text:nth-of-type(1) {
		text-align: justify;
		color: #666666;
		font-size: 26upx;
	}
	.batch text:nth-of-type(2) {
		color: #414141;
		font-size: 28upx;
		padding-left: 10upx;
	}
	.batch-infor {
		margin-top: 15upx;
	}
	.cu-form-group {
		border-radius: 15upx;
		border-bottom: 1px solid rgba(39, 52, 125, 0.05);
		padding: 0px 30upx;
	}
	.title {
		color: #666666;
		font-size: 26upx;
	}
	.cu-form-group uni-picker::after {
	    font-family: cuIcon;
	    display: block;
	    content: "\e6a3";
	    position: absolute;
	    font-size: 17px;
	    color: #D6D9E3 !important;
	    line-height: 100upx;
	    width:60upx;
	    text-align: center;
	    top: 0;
	    bottom: 0;
	    right: -20upx;
	    margin: auto;
	}
	.cu-form-group uni-picker .picker {
	    line-height: 100upx;
	    font-size: 28upx;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: left;
	}
	.cu-form-group .title {
	    text-align: justify;
	    padding-right: 10upx;
	    font-size: 26upx;
	    position: relative;
	    height: 60upx;
	    line-height: 60upx;
	}
	.infro-ng {
		background: #fff;
		padding: 0upx 30upx;
		height: 100upx;
		border-radius: 15upx;
		border-bottom: 1px solid rgba(39, 52, 125, 0.05);
	}
	.infro-ng text {
		line-height: 100upx;
	}
	.infro-ng text:nth-of-type(1) {
		text-align: justify;
		color: #666666;
		font-size: 26upx;
	}
	.infro-ng text:nth-of-type(2) {
		color: #414141;
		font-size: 28upx;
		padding-left: 10upx;
	}
	.infro-ng text.letter {
		letter-spacing: 2em;
		margin-right: -2em;
	} 
	.cu-form-group .letter {
		letter-spacing: 2em;
		margin-right: -2em;
	} 
	.infro-ng-input {
		display: flex;
		background: #fff;
		padding: 0upx 30upx;
		height: 100upx;
		border-radius: 15upx;
		border-bottom: 1px solid rgba(39, 52, 125, 0.05);
	}
	.infro-ng-input text {
		line-height: 100upx;
		text-align: justify;
		color: #666666;
		font-size: 26upx;
	}
	.infro-ng-input input {
		border: 1px solid #EDEDED;
		background: #fff;
		height: 85upx;
		border-radius: 10upx;
		margin-top: 6upx;
		font-size: 28upx;
		padding-left: 22upx;
		flex: 2;
	}
	.uni-input-placeholder {
	    color: #C4C4C4 !important;
	}
	.infro-ng-input text.letter {
		letter-spacing: 2em;
		margin-right: -2em;
	}
	.cu-form-group-bg uni-picker::after {
	    font-family: iconfont;
	    display: block;
	    content: "\e64d";
	    position: absolute;
	    font-size: 32rpx;
	    color: #97BAB0 !important;
	    line-height: 90rpx;
	    width: 102rpx;
	    text-align: center;
	    top: 0;
	    bottom: 0;
	    right: -10px;
	    margin: auto;
	}
	.picker-border {
		border: 1px solid #EDEDED !important;
		border-radius: 10upx;
	}
	.cu-form-group-bg .title{
	    text-align: justify;
	    padding-right: 0px;
	    font-size: 26upx;
	    position: relative;
	    height: 60upx;
	    line-height: 60upx;
	}
	.cu-form-group-bg uni-picker .picker {
	    line-height: 80upx;
	    font-size: 28upx;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: left;
		padding-left: 22upx;
	}
	.thrich {
		letter-spacing: 1em;
		margin-right: -1em;
	}
	.infro-upload {
		background: #fff;
		margin-top: 20upx;
		padding: 30upx;
	}
	.upload-front {
		border: 1px solid #EDEDED;
		margin: 30upx 60upx;
		min-height: 238upx;
		border-radius: 10upx;
		text-align: center;
	}
	.upload-front .icon-plus {
		color: #EAECF1;
		font-size: 66upx;
		margin-top: 42upx;
	}
	.upload-front .upload-text {
		color: #C5CBDA;
		font-size: 24upx;
		margin-top: 27upx;
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
	.cu-form-group-bg picker .picker{
	    padding-left: 22rpx;
	}
	.cu-form-group picker .picker {
	    line-height: 100rpx;
	    font-size: 28rpx;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: left;
	}
	/* #endif */
	.submit {
		background: #fff;
	}
	.submit button {
		height: 92rpx;
		width: 80%;
		background: #36AB8A;
		border: none;
		border-radius: 50rpx;
		line-height: 92rpx;
		color: #fff;
		font-size: 34rpx;
		margin-bottom: 50rpx;
	}
</style>
