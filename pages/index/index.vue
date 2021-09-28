<template>
	<view class="content">
		<view class="index-nav">
			<view class="iconfont icon-PersonalCenter" @click="toPersonal()">
				<text>{{$t('index.title')}}</text>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="toBatch()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon1.png" mode=""></image>
				<text>{{$t('index.batch')}}</text>
			</view>
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="toBreed()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon2.png" mode=""></image>
				<text>{{$t('index.Cultivation')}}</text>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="toCode()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon3.png" mode=""></image>
				<text>{{$t('index.printCode')}}</text>
			</view>
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="toScan()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon4.png" mode=""></image>
				<text>{{$t('index.Identify')}}</text>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="toSGS()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon5.png" mode=""></image>
				<text>{{$t('index.SGS')}}</text>
			</view>
			<view class="flex-sub bg-grey padding-sm margin-xs radius" @click="Print()">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/index-icon6.png" mode=""></image>
				<text>{{$t('index.addPrinter')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			
		},
		created() {
			var token = uni.getStorageSync('token');
			
			if (token == "" || token == undefined ) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		methods: {
			toPersonal() {
				uni.navigateTo({
					url: '../personal/personal',
				});
			},
			toBatch() {
				uni.navigateTo({
					url: '/pages/batch/batch',
				});
			},
			toBreed() {
				uni.navigateTo({
					url: '/pages/breed/breed',
				});
			},
			toSGS() {
				uni.navigateTo({
					url: '/pages/SGS/SGS',
				});
			},
			toCode() {
				uni.navigateTo({
					url: '/pages/printCode/printCode',
				});
			},
			toScan() {
				uni.navigateTo({
					url: '/pages/scan/scan',
				});
			},
			Print() {
				uni.navigateTo({
					url: '../print/print',
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		background: #F8F9FF;
		height: 100vh;
	}
	.bg-grey {
	    background-color: #FFFFFF;
	    border: 1px solid rgba(224, 228, 237, 0.17);
		text-align: center;
	}
	.flex-sub image {
		width: 192rpx;
		height: 164rpx;
	}
	.flex-sub text {
		color: #070D23;
		font-size: 30rpx;
		display: block;
		margin-top: 10rpx;
	}
	.index-nav {
		background: #36AB8A;
		padding: 27rpx 45rpx;
	}
	.index-nav .iconfont {
		color: #fff;
		font-size: 36rpx;
	}
	.index-nav .iconfont text {
		display: inline-block;
		text-align: center;
		font-size: 34rpx;
		width: 94%;
	}
	.margin-xs {
	    margin: 30rpx;
		margin-bottom: 0px;
	}
	.radius {
	    border-radius: 30rpx;
	}
	
	.index-nav {
		background: #36AB8A;
		padding: 27rpx 45rpx;
		height: 100rpx;
	}
	.index-nav .iconfont {
	    color: #fff;
	    font-size: 36rpx;
	}
</style>
