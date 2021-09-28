import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.js'
import api from '@/common/vmeitime-http/'
import VueI18n from "vue-i18n";
Vue.prototype.$api = api
Vue.use(VueI18n);
const i18n = new VueI18n({ 
	locale: localStorage.getItem('locale') || 'en',
	messages: { 
		'zh-CN': require('./locale/zh_CN.js').lang,
		'en': require('./locale/en_US.js').lang
	}
})
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App,
})
app.$mount()

 



