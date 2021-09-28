<template>
	<view class="body">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="content">{{$t('index.batch')}}</block>
			</cu-custom>
		</view>
		<view class="numb_nav">
			<view :class="index == 0 ? 'left-text' : 'left-title'" @click="load(0)">
				<view class="nav_tes_text">
					{{$t('public.sort')}}
				</view>
			</view>
			<view :class="index == 1 ? 'left-text' : 'left-title'" @click="load(1)">
				<view class="nav_tes_text">
					{{$t('public.screen')}}
				</view>
			</view>
		</view>
		<view class="tab_numb">
			<view class="add-btn" @click="getKeep()">
				<view class="iconfont icon-plus">
					{{$t('public.addBatch')}}
				</view>
			</view>
			<view class="tab-list">
				<view class="tab-item" @click="toBatchEdit(item.id)" v-for="(item,index) in batchLish" :key="index">
					<view class="tab-top">
						<view class="tab-top-head">
							<image src="https://trace.domchain.io/web_files_server/adminh5_img/head.png" mode=""></image>
						</view>
						<view class="tab-top-name">
							{{item.employeeId_dictText}}
						</view>
						<view class="tab-top-state red" v-if="item.batchStatus===''">
							<text>
								{{$t('public.notStarted')}}
							</text>
							<text class="iconfont icon-dian1"></text>
						</view>
						<view class="tab-top-state blue" v-if="item.batchStatus===''">
							<text>
								{{$t('public.hand')}}
							</text>
							<text class="iconfont icon-dian1"></text>
						</view>
						<view class="tab-top-state green" v-if="item.batchStatus===''">
							<text>
								{{$t('public.Completed')}}
							</text>
							<text class="iconfont icon-dian1"></text>
						</view>
					</view>
					<view class="tab-content">
						<view class="tab-li">
							<text>{{$t('public.CollBatch')}}：</text>
							<text>{{item.batchNo}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.farm')}}：</text>
							<text>{{item.areaId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.parcel')}}：</text>
							<text>{{item.farmId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.productName')}}：</text>
							<text>
								{{$t('public.Cherry')}}
							</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.varieties')}}：</text>
							<text>{{item.varietyId_dictText}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.startDate')}}：</text>
							<text>{{item.startTime}}</text>
						</view>
						<view class="tab-li">
							<text>{{$t('public.completionDate')}}：</text>
							<text>{{item.endTime}}</text>
						</view>
					</view>
				</view>
				<view class="null" v-show="nullData">
					<image src="https://trace.domchain.io/web_files_server/adminh5_img/null.png" mode=""></image>
					<view class="null-text">
						{{$t('public.null')}}
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="sort" type="bottom">
			<view class="popup-bottom">
				<view class="pop-title">
					<text class="iconfont icon-SortingProblem"></text>
					<text>
						{{$t('public.sortOrder')}}
					</text>
				</view>
				<view class="pop-radio">
					<radio-group class="block" @change="RadioChangeSort">
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.positive')}}
							</view>
							<radio class='radio' :class="radiosort=='asc'?'checked':''"
								:checked="radiosort=='asc'?true:false" value="asc"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.Reverse')}}
							</view>
							<radio class='radio' :class="radiosort=='desc'?'checked':''"
								:checked="radiosort=='desc'?true:false" value="desc"></radio>
						</view>
					</radio-group>
				</view>
				<view class="pop-title">
					<text class="iconfont icon-sort"></text>
					<text>
						{{$t('public.properties')}}
					</text>
				</view>
				<view class="pop-radio">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.CollBatch')}}
							</view>
							<radio class='radio' :class="radio=='batchNo'?'checked':''"
								:checked="radio=='batchNo'?true:false" value="batchNo"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.startDate')}}
							</view>
							<radio class='radio' :class="radio=='startTime'?'checked':''"
								:checked="radio=='startTime'?true:false" value="startTime"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.completionDate')}}
							</view>
							<radio class='radio' :class="radio=='endTime'?'checked':''"
								:checked="radio=='endTime'?true:false" value="endTime"></radio>
						</view>
						<view class="cu-form-group">
							<view class="title">
								{{$t('public.liable')}}
							</view>
							<radio class='radio' :class="radio=='updateBy'?'checked':''"
								:checked="radio=='updateBy'?true:false" value="updateBy"></radio>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="pop-footer">
				<button @click="batchresetSort()" type="default">
					{{$t('public.Reset')}}
				</button>
				<button @click="batchSort()" type="default">
					{{$t('public.confirm')}}
				</button>
			</view>
		</uni-popup>
		<uni-popup ref="screen" type="bottom">
			<view class="popup-bottom ">
				<view class="popup-padd">
					<view class="cu-form-group cu-form-group-bg">
						<view class="title">
							{{$t('public.startDate')}}
						</view>
						<picker mode="date" :value="startTime" @change="DateChange">
							<view class="picker">
								{{startTime}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group cu-form-group-bg">
						<view class="title">
							{{$t('public.endDate')}}
						</view>
						<picker mode="date" :value="endTime" @change="DateEndChange">
							<view class="picker">
								{{endTime}}
							</view>
						</picker>
					</view>
				</view>
				<view class="pop-title-sub">
					<text>
						{{$t('public.farm')}}
					</text>
				</view>
				<view class="cu-form-group cuform-padd">
					<view class="title">
						{{$t('public.farm')}}
					</view>
					<picker @change="PickerChange" :value="indexInfor" :range="pickerList" range-key="name">
						<view class="picker">
							{{indexInfor>-1?pickerList[pickerfarm].name:$t('public.Select')}}
						</view>
					</picker>
				</view>
				<view class="pop-title-sub">
					<text>
						{{$t('public.parcel')}}
					</text>
				</view>
				<view class="cu-form-group cuform-padd">
					<view class="title">
						{{$t('public.parcel')}}
					</view>
					<picker @change="PickerChangeDi" :value="indexDi" :range="massifList" range-key="name">
						<view class="picker">
							{{indexDi>-1?massifList[pickerarea].name:$t('public.Select')}}
						</view>
					</picker>
				</view>
			</view>
			<view class="pop-footer">
				<button type="default" @click="batchScreenReset()">
					{{$t('public.Reset')}}
				</button>
				<button type="default" @click="batchScreen()">
					{{$t('public.confirm')}}
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: 0,
				index: 0,
				indexInfor: -1,
				pickerfarm: -1,
				indexDi: -1,
				pickerarea: -1,
				pickerList: [],
				massifList: [],
				startTime: '2021-05-30',
				endTime: '2021-06-01',
				radiosort: 'desc',
				radio: 'batchNo',
				btn: 0,
				batchLish: [],
				page: 1,
				pageSize: 10,
				pageTotal: 0,
				isNoMoreData: false, 
				loadingText: '',
				navigateID: '',
				and: '',
				nullData: false,
			}
		},
		onLoad() {
			
		},
		created() {
			var token = uni.getStorageSync('token');
			this.getDataList();
			this.getData();
		},
		methods: {
			load(e) {
				this.index = e
				if (e === 0) {
					this.$refs.sort.open()
				} else if (e === 1) {
					this.$refs.screen.open()
				}
			},
			loadBtn(e) {
				console.log(e);
			},
			RadioChangeSort(e) {
				this.radiosort = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			DateChange(e) {
				this.startTime = e.detail.value
			},
			DateEndChange(e) {
				this.endTime = e.detail.value
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
			getKeep() {
				uni.navigateTo({
					url: '/pages/batch/batchAdd'
				})
			},
			toBatchEdit(id) {
				this.$api.getBatchList({
					id: id
				}).then((res) => {
					if (res.data.code === 200) {
						uni.navigateTo({
							url: '/pages/batch/batchEdit?id='+id
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
			addBatchStatus(arr) {
				arr.forEach(elem => {
					const starttime = Date.parse(elem.startTime)
					const endtime = Date.parse(elem.endTime)
					const currenttime = Date.parse(new Date())
					if (currenttime < starttime) {
						elem.batchStatus = this.$t('public.notStarted')
					} else if (currenttime > endtime) {
						elem.batchStatus = this.$t('public.Completed')
					} else {
						elem.batchStatus = this.$t('public.hand')
					}
				})
			},
			getData() {
				const that = this;
				this.$api.getFarmList({}).then((res) => {
					if (res.data.code == 200) {
						that.$data.pickerList = res.data.result.records;
					}else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {
				});
				this.$api.getAreaList({}).then((res) => {
					if (res.data.code == 200) {
						that.$data.massifList = res.data.result.records
					}else {
						uni.showToast({
							title: res.data.message,
							icon: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {
				});
			},
			getDataList() {
				let that = this;
				this.$api.getBatchList({
					pageSize: that.pageSize,
					pageNo: that.page
				}).then((res) => {
					if (res.data.code === 200) {
						that.addBatchStatus(res.data.result.records);
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
				}).catch((err) => {
				});
			},
			batchScreen() {
				const that = this
				that.and = "and";
				that.page = 0;
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
				that.page = 0;
				that.getDataList();
				that.$refs.screen.close()
			},
			batchSort() {
				const that = this
				let data = {};
				that.page = 0;
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
				that.$data.radiosort = 'desc'
				that.$data.radio = 'batchNo';
				that.page = 0;
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
			getListMore() {
				var that = this;
				if (that.isNoMoreData) return false;
				that.$api.getBatchList({
					pageSize: that.pageSize,
					pageNo: that.page
				}).then((res) => {
					if (res.data.code === 200) {
						that.addBatchStatus(res.data.result.records)
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
				}).catch((err) => {
					
				});
			},
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
		background: #f8f9ff !important;
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
		color: #36ab8a;
		font-weight: 600;
		border-bottom: 2px solid #36ab8a;
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
		background: #e1e5ee;
		border-radius: 16rpx 16rpx 0px 0px;
		padding: 0px 28rpx;
		display: flex;
		height: 72rpx;
	}

	.tab-top-head {
		flex: 0.4;
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
		color: #070d23;
		font-size: 30rpx;
	}

	.tab-top-state {
		flex: 1;
	}

	.tab-top-state {
		text-align: right;
	}

	.red text {
		color: #ff5151;
	}

	.blue text {
		color: #518eff;
	}

	.green text {
		color: #00bf9d;
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
		padding: 0px 30rpx;
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
		color: #9b9dad;
		font-size: 24rpx;
		padding-left: 10rpx;
	}

	.tab-em text:nth-of-type(1) {
		letter-spacing: 2em;
		margin-right: -2em;
	}

	.left-text .nav_tes_text {
		color: #36ab8a;
		font-weight: 600;
		border-bottom: 2px solid #36ab8a;
		display: block;
		line-height: 80rpx;
		width: 164rpx;
		margin: 0 auto;
	}

	.popup-bottom {
		background: #f8f9ff;
		height: calc(100vh - 89px);
		padding: 0px 30rpx;
	}

	.pop-title {
		padding: 30rpx 0px;
		padding-bottom: 0px;
	}

	.pop-title text:nth-of-type(1) {
		color: #c7cbd8;
		font-size: 32rpx;
		vertical-align: bottom;
	}

	.pop-title text:nth-of-type(2) {
		color: #070d23;
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
		color: #999999;
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
		background: #e5e7e6;
		color: #36ab8a;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		flex: 1;
	}

	.pop-footer button:nth-of-type(2) {
		border-radius: 0px;
		background: #36ab8a;
		color: #ffffff;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		flex: 1;
	}

	.pop-title-sub {
		padding: 30rpx 0px;
	}

	.pop-title-sub text {
		color: #070d23;
		font-size: 28rpx;
	}

	.cu-form-group-bg {
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		height: 90rpx;
		padding-left: 20upx;
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
		color: #97bab0;
		line-height: 90rpx;
		width: 102rpx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -10px;
		margin: auto;
	}

	.cu-form-group-bg uni-picker .picker {
		line-height: 90rpx;
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right !important;
		padding-right: 20rpx;
	}

	.popup-padd {
		padding-top: 30rpx;
		padding-bottom: 0px;
	}

	.pop-type {
		display: flex;
	}

	.pop-type button {
		border: 1px solid #d6d9e3;
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
		border: 1px solid #36ab8a;
		border-radius: 10rpx;
		background-color: #fff;
		color: #36ab8a;
		font-size: 28rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 0;
		margin-right: 0;
		outline: none;
	}

	.pop-type button:nth-of-type(2) {
		margin-left: 30rpx;
	}

	.cuform-padd {
		padding: 0px 20upx;
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
</style>
