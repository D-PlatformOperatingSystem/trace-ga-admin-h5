<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">{{$t('breed.BatchInfor')}}</block>
			</cu-custom>
		</view>
		<view class="batch">
			<text>{{$t('public.CollBatch')}}：</text>
			<text>{{detail.batchNo}}</text>
		</view>
		<view class="batch-infor">
			<view class="batch">
				<text>{{$t('public.farm')}}：</text>
				<text>{{detail.farmId_dictText}}</text>
			</view>
			<view class="batch">
				<text>{{$t('public.parcel')}}：</text>
				<text>{{detail.areaId_dictText}}</text>
			</view>
		</view>
		<view class="batch-infor">
			<view class="infro-ng">
				<text>{{$t('public.productName')}}：</text>
				<text>{{$t('public.Cherry')}}</text>
			</view>
			<view class="infro-ng">
				<text >{{$t('public.varieties')}}</text>：
				<text>{{detail.varietyId_dictText}}</text>
			</view>
			<view class="infro-ng infro-block">
				<text>{{$t('index.certificateStorageHasg')}}：</text>
				<text selectable="true" @longpress="copyText">{{detail.txHash}}</text>
			</view>
			<view class="batch">
				<text>{{$t('public.Kilogramofbatch')}}：</text>
				<text>{{detail.amount}}</text>
			</view>
			<view class="infro-ng-input">
				<text >{{$t('public.Sweetness')}}</text><text>：</text>
				<text>{{detail.sweetness}}</text>
			</view>
			<view class="batch">
				<text>{{$t('public.starttime1')}}：</text>
				<text>{{detail.startTime}}</text>
			</view>
			<view class="batch">
				<text>{{$t('public.endTime1')}}：</text>
				<text>{{detail.endTime}}</text>
			</view>
			<view class="batch">
				<text>{{$t('public.picking')}}：</text>
				<text>{{detail.employeeId_dictText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: [],
			}
		},
		onLoad(option) {
			this.$api.getBatchList({
				id: option.id
			}).then((res) => {
				console.log(res);
				if (res.data.code === 200) {
					this.detail = res.data.result.records[0];
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 2000
					})
				}
			}).catch((err) => {});
		},
		created() {
			
		},
		methods: {
			copyText () {
				uni.setClipboardData({
				data: this.detail.txHash,
				success() {
					uni.showToast({
						title: this.$t('print.Copied'),
						icon:'none',
						position:'top'
						})
					}
				})
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
	.infro-block {
		display: flex;
	}
	.infro-block text:nth-of-type(1) {
		/* flex: 1;
		display: block; */
	}
	.infro-block text:nth-of-type(2) {
		flex: 2;
		display: block;
		word-wrap: break-word;
		/* white-space: nowrap; */
		overflow: hidden;
		line-height: 30upx;
		padding-top: 20upx;
		/* text-overflow: ellipsis; */
	}
</style>
