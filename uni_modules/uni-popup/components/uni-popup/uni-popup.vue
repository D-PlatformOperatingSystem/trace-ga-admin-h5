<template>
	<view v-if="showPopup" class="uni-popup" :class="[popupstyle, isDesktop ? 'fixforpc-z-index' : '']" @touchmove.stop.prevent="clear">
		<view @touchstart="touchstart" >
				<uni-transition key="1" v-if="maskShow" name="mask" mode-class="fade" :styles="maskClass" :duration="duration" :show="showTrans" @click="onTap" />
		</view>
	
		<uni-transition key="2" :mode-class="ani" name="content" :styles="transClass" :duration="duration" :show="showTrans" @click="onTap">
			<view class="uni-popup__wrapper" :style="{ backgroundColor: bg }" :class="[popupstyle]" @click="clear"><slot /></view>
		</uni-transition>
		<!-- #ifdef H5 -->
		<keypress v-if="maskShow" @esc="onTap" />
		<!-- #endif -->
	</view>
</template>

<script>
// #ifdef H5
import keypress from './keypress.js'
// #endif


export default {
	name: 'uniPopup',
	components: {
		// #ifdef H5
		keypress
		// #endif
	},
	props: {
		// 
		animation: {
			type: Boolean,
			default: true
		},

		type: {
			type: String,
			default: 'center'
		},
		// maskClick
		maskClick: {
			type: Boolean,
			default: true
		},
		backgroundColor: {
			type: String,
			default: 'none'
		},
		safeArea:{
			type: Boolean,
			default: true
		}
	},

	watch: {
		/**
		 */
		type: {
			handler: function(type) {
				if (!this.config[type]) return
				this[this.config[type]](true)
			},
			immediate: true
		},
		isDesktop: {
			handler: function(newVal) {
				if (!this.config[newVal]) return
				this[this.config[this.type]](true)
			},
			immediate: true
		},
		/**
		 * 
		 * @param {Object} val
		 */
		maskClick: {
			handler: function(val) {
				this.mkclick = val
			},
			immediate: true
		},
		safeArea: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			duration: 300,
			ani: [],
			showPopup: false,
			showTrans: false,
			popupWidth: 0,
			popupHeight: 0,
			config: {
				top: 'top',
				bottom: 'bottom',
				center: 'center',
				left: 'left',
				right: 'right',
				message: 'top',
				dialog: 'center',
				share: 'bottom'
			},
			maskClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.5)'
			},
			transClass: {
				position: 'fixed',
				left: 0,
				right: 0
			},
			maskShow: true,
			mkclick: true,
			popupstyle: this.isDesktop ? 'fixforpc-top' : 'top'
		}
	},
	computed: {
		isDesktop() {
			return this.popupWidth >= 500 && this.popupHeight >= 500
		},
		bg() {
			if (this.backgroundColor === '' || this.backgroundColor === 'none') {
				return 'transparent'
			}
			return this.backgroundColor
		}
	},
	mounted() {
		const fixSize = () => {
			const { windowWidth, windowHeight, windowTop, safeAreaInsets } = uni.getSystemInfoSync()
			this.popupWidth = windowWidth
			this.popupHeight = windowHeight + windowTop
			// 
			if(this.safeArea){
				this.safeAreaInsets = safeAreaInsets
			}else{
				this.safeAreaInsets = 0
			}
		}
		fixSize()
		// #ifdef H5
		window.addEventListener('resize', fixSize)
		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('resize', fixSize)
		})
		// #endif
	},
	created() {
		this.mkclick = this.maskClick
		if (this.animation) {
			this.duration = 300
		} else {
			this.duration = 0
		}
		this.messageChild = null
		// TODO 
		this.clearPropagation = false
	},
	methods: {
		/**
		 * 
		 */
		closeMask() {
			this.maskShow = false
		},
		/**
		 * 
		 */
		disableMask() {
			this.mkclick = false
		},
		// TODO nvue 
		clear(e) {
			// #ifndef APP-NVUE
			e.stopPropagation()
			// #endif
			this.clearPropagation = true
		},
		
		open(direction) {
			let innerType = ['top', 'center', 'bottom', 'left', 'right', 'message', 'dialog', 'share']
			if (!(direction && innerType.indexOf(direction) !== -1)) {
				direction = this.type
			}
			if (!this.config[direction]) {
				return
			}
			this[this.config[direction]]()
			this.$emit('change', {
				show: true,
				type: direction
			})
		},
		close(type) {
			this.showTrans = false
			this.$emit('change', {
				show: false,
				type: this.type
			})
			clearTimeout(this.timer)
			// // 
			// this.customOpen && this.customClose()
			this.timer = setTimeout(() => {
				this.showPopup = false
			}, 300)
		},
		touchstart(){
			this.clearPropagation = false
		},
		
		onTap() {
			if(this.clearPropagation) return
			if (!this.mkclick) return
			this.close()
		},
		/**
		 * 
		 */
		top(type) {
			this.popupstyle = this.isDesktop ? 'fixforpc-top' : 'top'
			this.ani = ['slide-top']
			this.transClass = {
				position: 'fixed',
				left: 0,
				right: 0,
				backgroundColor: this.bg
			}
			if (type) return
			this.showPopup = true
			this.showTrans = true
			this.$nextTick(() => {
				if (this.messageChild && this.type === 'message') {
					this.messageChild.timerClose()
				}
			})
		},
		/**
		 * 
		 */
		bottom(type) {
			this.popupstyle = 'bottom'
			this.ani = ['slide-bottom']

			this.transClass = {
				position: 'fixed',
				left: 0,
				right: 0,
				bottom: 0,
				paddingBottom: (this.safeAreaInsets && this.safeAreaInsets.bottom) || 0,
				backgroundColor: this.bg
			}
			if (type) return
			this.showPopup = true
			this.showTrans = true
		},
		/**
		 * 
		 */
		center(type) {
			this.popupstyle = 'center'
			this.ani = ['zoom-out', 'fade']
			this.transClass = {
				position: 'fixed',
				/* #ifndef APP-NVUE */
				display: 'flex',
				flexDirection: 'column',
				/* #endif */
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
				justifyContent: 'center',
				alignItems: 'center'
			}
			if (type) return
			this.showPopup = true
			this.showTrans = true
		},
		left(type) {
			this.popupstyle = 'left'
			this.ani = ['slide-left']
			this.transClass = {
				position: 'fixed',
				left: 0,
				bottom: 0,
				top: 0,
				backgroundColor: this.bg,
				/* #ifndef APP-NVUE */
				display: 'flex',
				flexDirection: 'column'
				/* #endif */
			}
			if (type) return
			this.showPopup = true
			this.showTrans = true
		},
		right(type) {
			this.popupstyle = 'right'
			this.ani = ['slide-right']
			this.transClass = {
				position: 'fixed',
				bottom: 0,
				right: 0,
				top: 0,
				backgroundColor: this.bg,
				/* #ifndef APP-NVUE */
				display: 'flex',
				flexDirection: 'column'
				/* #endif */
			}
			if (type) return
			this.showPopup = true
			this.showTrans = true
		}
	}
}
</script>
<style lang="scss" scoped>
.uni-popup {
	position: fixed;
	/* #ifndef APP-NVUE */
	z-index: 99;
	/* #endif */
	&.top,
	&.left,
	&.right {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}
	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		&.left,
		&.right {
			/* #ifdef H5 */
			padding-top: var(--window-top);
			/* #endif */
			/* #ifndef H5 */
			padding-top: 0;
			/* #endif */
			flex: 1;
		}
	}
}

.fixforpc-z-index {
	/* #ifndef APP-NVUE */
	z-index: 999;
	/* #endif */
}

.fixforpc-top {
	top: 0;
}
</style>
