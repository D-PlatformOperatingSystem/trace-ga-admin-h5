<template>
	<view class="body">
		<view class="personal-banner">
			<view class="fixed">
				<cu-custom :isBack="true" bgColor="text-white">
					<block slot="content">{{$t('login.personal')}}</block>
				</cu-custom>
			</view>
			<view class="personal-name">
				<view class="person-tou">
					<image src="https://trace.domchain.io/web_files_server/adminh5_img/header.svg" mode=""></image>
				</view>
				<text>{{username}}</text>
			</view>
		</view>
		<view class="personal-list">
			<view class="personal-item">
				<text class="iconfont icon-mobilePhone"></text>
				<text>{{$t('login.phone')}}</text>
				<text>{{telephone}}</text>
			</view>
			<view class="personal-item">
				<text class="iconfont icon-gender"></text>
				<text>{{$t('login.sex')}}</text>
				<text v-if="sex === 1">{{$t('login.male')}}</text>
				<text v-else>{{$t('login.female')}}</text>
			</view>
			<view class="personal-item">
				<text class="iconfont icon-birthday"></text>
				<text>{{$t('login.birthday')}}</text>
				<text>{{birthday}}</text>
			</view>
			<view class="personal-item" @click="toLanguage">
				<text class="iconfont icon-LanguageSwitch"></text>
				<text>{{$t('login.language')}}</text>
				<text>{{$t('login.lang')}}</text>
			</view>
			<view class="footer">
				<button type="default" @click="toLogin()">
					{{$t('login.Logout')}}
				</button>
			</view>
		</view>
		<uni-popup ref="language" type="center">
			<view class="language" >
				<view class="zh" @click="handove('zh-CN')">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-China"></use>
					</svg>
					<text>简体中文</text>
				</view>
				<view class="en" @click="handove('en')">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-USA"></use>
					</svg>
					<text>English</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				birthday:'',
				sex: '',
				telephone: '',
			}
		},
		onLoad() {
			
		},
		created() {
			this.username = uni.getStorageSync('username');
			this.birthday = uni.getStorageSync('birthday');
			this.sex = uni.getStorageSync('sex');
			this.telephone = uni.getStorageSync('telephone');
		},
		onShow() {
			
		},
		methods: {
			toLogin() {
				this.username = "";
				this.birthday = "";
				this.sex = "";
				this.telephone = "";
				uni.navigateTo({
					url:"../login/login"
				})
			},
			toLanguage() {
				this.$refs.language.open();
			},
			handove(item){
				this.$i18n.locale = item;
				localStorage.setItem('locale', item);
				this.$refs.language.close();
			},
		}
	}
</script>

<style scoped>
	body {
		background-color: #fff !important;
		padding-bottom: 60rpx;
	}
	.personal-banner {
		background: url(https://trace.domchain.io/web_files_server/adminh5_img/banner.png) no-repeat;
		position: relative;
		height: 100%;
		width: 101%;
		background-size: 100%;
		padding-bottom: 60rpx;
	}
	.personal-name {
		text-align: center;
	}
	.person-tou {
		width: 136rpx;
		height: 136rpx;
		background: #fff;
		border-radius: 100%;
		margin: 0 auto;
		text-align: center;
		margin-top: 50rpx;
	}
	.person-tou image {
		width: 100%;
		height: 126rpx
	}
	.personal-name text {
		display: block;
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		margin-top: 22rpx;
	}
	.personal-list {
		padding: 0px 30rpx;
	}
	.personal-item {
		border-bottom: 1px solid #F3F4F4;
		padding: 34rpx 0px;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	.personal-item text:nth-of-type(1) {
		font-size: 28rpx;
		color: #A7A7A7;
		display: block;
		margin-top: 2px;
	}
	.personal-item text:nth-of-type(2) {
		color: #070D23;
		font-size: 26rpx;
		padding-left: 20rpx;
		display: inline-block;
	}
	.personal-item text:nth-of-type(3) {
		color: #9B9DAD;
		font-size: 26rpx;
		text-align: right;
		display: inline-block;
		flex: 2;
	}
	.cu-form-group {
	    background-color: #ffffff;
	    padding: 0px 0px;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    min-height: 50px;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
		border-bottom: 1px solid #F3F4F4;
	}
	.cu-form-group text {
		font-size: 28rpx;
		color: #A7A7A7;
	}
	.cu-form-group .title {
	    text-align: justify;
	   color: #070D23;
	   font-size: 26rpx;
	   padding-left: 20rpx;
	   display: inline-block;
	}
	.cu-form-group uni-picker .picker {
	    line-height: 50px;
	    font-size: 14px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    width: 100%;
	    text-align: right;
		color: #36AB8A;
	}
	.footer {
		margin-top: 100rpx;
	}
	uni-button:after {
	    content: " ";
	    width: 200%;
	    height: 200%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    border: 0px solid rgba(0,0,0,.2);
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    box-sizing: border-box;
	    border-radius: 10px;
	}
	.footer button {
		border: none;
		background: #36AB8A;
		color: #fff;
		border-radius: 16rpx;
		font-size: 34rpx;
		outline: none;
	}
</style>
<style scoped>
	.language {
		border-radius: 10upx;
		min-height: 50upx;
		width: 300upx;
		background: #fff;
	}
	.zh {
		height: 88upx;
		line-height: 88upx;
		border-bottom: 1px solid #f2f2f2;
		padding-left: 60upx;
	}
	.icon {
		width: 1.2em; height: 1.2em;
		vertical-align: -0.20em;
		fill: currentColor;
		overflow: hidden;
	}
	.zh text {
		padding-left: 10upx;
	}
	.en {
		height: 88upx;
		line-height: 88upx;
		padding-left: 60upx;
	}
	.en text {
		padding-left: 10upx;
	}
	.en .icon {
		width: 1.45em; height: 1.45em;
		vertical-align: -0.32em;
		fill: currentColor;
		overflow: hidden;
	}
</style>