<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">{{$t('public.addBatch')}}</block>
			</cu-custom>
		</view>
		<view class="batch">
			<text>{{$t('public.CollBatch')}}：</text>
			<input type="text" :name="batchNo" v-model="batchNo" @input="toBatchNo" :placeholder="bathInput" />
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
				<text>{{$t('public.productName')}}：</text>
				<text>{{$t('public.Cherry')}}</text>
			</view>
			<view class="cu-form-group">
				<text>{{$t('public.varieties')}}：</text>
				<picker @change="toVariety" :value="variety" :range="varietyList" range-key="name">
					<view class="picker">
						{{variety>-1?varietyList[varietyName].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
			<view class="infro-ng">
				<text>{{$t('index.certificateStorageHasg')}}：</text>
				<text>--</text>
			</view>
			<view class="infro-ng-input">
				<text>{{$t('public.Kilogramofbatch')}}：</text>
				<input type="text" :name="amount" v-model="amount" @input="toAmount" :placeholder="jininput" />
			</view>
			<view class="infro-ng-input">
				<text>{{$t('public.Sweetness')}}</text><text>：</text>
				<input type="text" :name="sweetness" v-model="sweetness" @input="toSweet" :placeholder="Sweetnessinput" />
			</view>
			<view class="cu-form-group cu-form-group-bg">
				<view class="title">{{$t('public.starttime1')}}：</view>
				<picker class="picker-border" mode="date" :value="startTime" @change="startDate">
					<view class="picker">
						{{startTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group cu-form-group-bg">
				<view class="title">{{$t('public.endTime1')}}：</view>
				<picker class="picker-border" mode="date" :value="endTime" @change="endDate">
					<view class="picker">
						{{endTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('public.picking')}}：</view>
				<picker @change="getPick" :value="pick" :range="pickList" range-key="name">
					<view class="picker">
						{{pick>-1?pickList[pickName].name:$t('public.Select')}}
					</view>
				</picker>
			</view>
			<view class="submit">
				<button type="default" @click="submit()">{{$t('public.save')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerList: [],
				indexInfor: -1,
				pickerfarm: -1,
				massifList: [],
				pickerarea: -1,
				indexDi: -1,
				varietyList: [],
				variety: -1,
				varietyName: -1,
				startTime:this.$t('public.startTime'),
				endTime: this.$t('public.endTime'),
				pick: -1,
				pickName: -1,
				pickList: [],
				batchNo:'',
				amount: '', 
				sweetness: '', 
				bathInput: this.$t('public.bathInput'),
				jininput: this.$t('public.jininput'),
				Sweetnessinput:this.$t('public.Sweetnessinput')
			}
		},
		created() {
			var that = this;
			this.$api.getFarmList({}).then((res) => {
				if (res.data.code == 200) {
					that.$data.pickerList = res.data.result.records
				}else {
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
		},
		methods: {
			PickerChange(e) {
				this.indexInfor = this.$data.pickerList[e.detail.value].id;
				this.pickerfarm = e.detail.value;
			},
			PickerChangeDi(e) {
				this.pickerarea = e.detail.value
				this.indexDi = this.$data.massifList[e.detail.value].id
			},
			toBatchNo(e) {
				this.batchNo = e.detail.value;
			},
			toVariety(e) {
				this.variety = this.$data.varietyList[e.detail.value].id;
				this.varietyName = e.detail.value;
			},
			toAmount(e) {
				this.amount = e.detail.value;
			},
			toSweet (e) {
				this.sweetness = e.detail.value;
			},
			startDate(e) {
				this.startTime = e.detail.value;
			},
			endDate(e) {
				this.endTime = e.detail.value;
			},
			getPick(e){
				this.pickName = e.detail.value
				this.pick = this.$data.pickList[e.detail.value].id
			},
			submit() {
				var that = this;
				that.$api.getBatchAdd({
					batchNo: that.$data.batchNo,
					farmId: that.$data.indexInfor,
					areaId: that.$data.indexDi,
					varietyId: that.$data.variety,
					amount: that.$data.amount,
					sweetness: that.$data.sweetness,
					startTime: that.$data.startTime,
					endTime: that.$data.endTime,
					employeeId: that.$data.pick
				}).then((res) => {
					if (res.data.code === 200) {
						uni.showToast({
							title: this.$t('public.BatchAdded'),
							icon: 'none',
							mask: true,
							duration: 1500,
						})
						setTimeout(function() {
							uni.redirectTo({
							    url: '/pages/batch/batch'
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
		display: flex;
		background: #fff;
		padding: 0upx 30upx;
		height: 100upx;
	}
	.batch text {
		line-height: 100upx;
		text-align: justify;
		color: #666666;
		font-size: 26upx;
	}
	.batch input {
		border: 1px solid #EDEDED;
		background: #fff;
		height: 85upx;
		border-radius: 10upx;
		margin-top: 6upx;
		font-size: 28upx;
		padding-left: 22upx;
		flex: 2;
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
		display: flex;
		background: #fff;
		padding: 0upx 30upx;
		height: 100upx;
		border-radius: 15upx;
		border-bottom: 1px solid rgba(39, 52, 125, 0.05);
	}
	.infro-ng input {
		border: 1px solid #EDEDED;
		background: #fff;
		height: 85upx;
		border-radius: 10upx;
		margin-top: 6upx;
		font-size: 28upx;
		padding-left: 22upx;
		flex: 2;
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
	.cu-form-group text.letter {
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
		margin-top: 40rpx;
	}
</style>
