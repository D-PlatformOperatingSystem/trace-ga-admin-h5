<template>
	<view class="content">
		<view class="login-box">
			<view class="logo">
				<image src="https://trace.domchain.io/web_files_server/adminh5_img/logo.png" mode=""></image>
				<view class="logo-title">
					{{$t('index.title')}}
				</view>
			</view>
			<view class="form">
				<view class="form-input">
					<text>
						{{$t('login.phone')}}
					</text>
					<input type="number" v-model="mobile" :name="mobile" :placeholder="phone" />
				</view>
				<view class="form-input">
					<text>
						{{$t('login.password')}}
					</text>
					<input type="password" v-model="password" :placeholder="passwordIn" :name="password" />
				</view>
				<view class="form-button">
					<button type="default" @click="login()">
						{{$t('login.login')}}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstFocus: false,
				mobile: '',
				password: '',
				phone: this.$t('login.phoneInput'),
				passwordIn: this.$t('login.passwordInput'),
			}
		},
		onLoad() {

		},
		methods: {
			login(fn) {
				uni.showLoading({
					title: this.$t('login.loging'),
					mask: true
				})
				var that = this;
				that.$api.login({
					"password": that.password,
					"username": that.mobile,
					"captcha": "",
					"checkKey": ""
				}).then((res) => {
					if (res.data.code == 200) {
						uni.hideLoading();
						// token 
						uni.setStorageSync('token', res.data.result.token);
						that.$api.tokenConfig.setToken(res.data.result.token);
						uni.setStorageSync('username', res.data.result.userInfo.username);
						uni.setStorageSync('telephone', res.data.result.userInfo.telephone);
						uni.setStorageSync('sex', res.data.result.userInfo.sex);
						uni.setStorageSync('birthday', res.data.result.userInfo.birthday);
						uni.navigateTo({
							url: '/pages/index/index'
						});
					} else if (res.data.code != 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							mask: true,
							duration: 2000
						})
					}
				}).catch((err) => {});
			}
		}
	}
</script>

<style scoped>
	.login-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(https://trace.domchain.io/web_files_server/adminh5_img/loginBg.png);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.logo {
		text-align: center;
	}

	.logo image {
		width: 188rpx;
		height: 188rpx;
		margin-top: 200rpx;
	}

	.logo .logo-title {
		color: #fff;
		font-size: 36rpx;
		font-weight: 500;
		letter-spacing: 1px;
		margin-top: 40rpx;
	}

	.form {
		background: #fff;
		border-radius: 20rpx;
		min-height: 30rpx;
		margin: 0px 48rpx;
		padding: 30rpx;
		margin-top: 168rpx;
	}

	.form-input {
		display: flex;
		border: 1px solid #EDEDED;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		height: 96rpx;
	}

	.form-input:nth-of-type(1) {
		margin-top: 30rpx;
	}

	.form-input text {
		line-height: 96rpx;
		padding-left: 20rpx;
		color: #636363;
		flex: .7;
	}

	.form-input input {
		margin-left: 20rpx;
		padding-left: 10rpx;
		height: 90rpx;
		flex: 2;
	}

	.form-button button {
		background: #36AB8A;
		color: #fff;
		font-size: 32rpx;
		border: none;
		border-radius: 48rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-top: 70rpx;
		margin-bottom: 40rpx;
	}
</style>
