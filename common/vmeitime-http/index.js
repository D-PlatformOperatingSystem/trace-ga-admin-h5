import http from './interface'
var rootUrl = 'https://trace.domchain.io/admin-api'
var baseUrl = `${rootUrl}`;
var imgUrl = `${baseUrl}/sys/common/upload`;
export const tokenConfig = {
	token: uni.getStorageSync('token'),
	username: uni.getStorageSync('username'),
	birthday: uni.getStorageSync('birthday'),
	sex: uni.getStorageSync('sex'),
	telephone: uni.getStorageSync('telephone'),
	setToken(data) {
		this.token = data
	}
}
export const login = (data) => {
	http.interceptor.request = (config) => {
		config.method = "POST"
	}
	return http.request({
		baseUrl: baseUrl,
		url: '/sys/mLogin',
		dataType: 'json',
		data,
	})
}
export const getBatchList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryBatch/list',
		dataType: 'json',
		data,
	})
}
export const getFarmList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryFarm/list',
		dataType: 'json',
		data,
	})
}
export const getAreaList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryArea/list',
		dataType: 'json',
		data,
	})
}
export const getEmployeesList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryEmployees/list',
		dataType: 'json',
		data,
	})
}

export const getVarietyList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryVariety/list',
		dataType: 'json',
		data,
	})
}

export const getPlantType = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryPlantType/list',
		dataType: 'json',
		data,
	})
}

export const getBatchAdd = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"X-Access-Token": tokenConfig.token
		}
	}
	return http.request({
		url: '/cherry/cherryBatch/add',
		dataType: 'json',
		data,
	})
}
export const getBatchQuery = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryBatch/queryById',
		dataType: 'json',
		data,
	})
}
export const getCherryPlantList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryPlant/list',
		dataType: 'json',
		data,
	})
}
export const getPlantAdd = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"X-Access-Token": tokenConfig.token
		}
	}
	return http.request({
		url: '/cherry/cherryPlant/add',
		dataType: 'json',
		data,
	})
}
export const getSgsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherrySgs/list',
		dataType: 'json',
		data,
	})
}
export const getSgsAdd = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"X-Access-Token": tokenConfig.token
		}
	}
	return http.request({
		url: '/cherry/cherrySgs/add',
		dataType: 'json',
		data,
	})
}
export const getTraceQrCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"X-Access-Token": tokenConfig.token,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
	return http.request({
		url: '/cherry/cherryTraceQrCodeExpress/bindExpress',
		dataType: 'json',
		data,
	})
}
export const getTraceQrCodeForBind = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryTraceQrCodeExpress/queryByTraceQrCodeForBind',
		dataType: 'json',
		data,
	})
}
export const getServicesList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryExpress/list',
		dataType: 'json',
		data,
	})
}
export const getStatQrCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryTraceQrCode/statQrCode',
		dataType: 'json',
		data,
	})
}
export const getQrCodeForPrint = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
				"X-Access-Token": tokenConfig.token
			},
			config.method = "GET"
	}
	return http.request({
		url: '/cherry/cherryTraceQrCode/listQrCodeForPrint',
		dataType: 'json',
		data,
	})
}
export const getUpload = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"X-Access-Token": tokenConfig.token
		}
	}
	return http.request({
		url: '/cherry/cherryTraceQrCodeExpress/scan',
		dataType: 'json',
		data,
	})
}


export default {
	tokenConfig,
	imgUrl,
	login,
	getBatchList,
	getFarmList,
	getAreaList,
	getBatchAdd,
	getEmployeesList,
	getVarietyList,
	getBatchQuery,
	getCherryPlantList,
	getPlantType,
	getPlantAdd,
	getSgsList,
	getSgsAdd,
	getTraceQrCode,
	getTraceQrCodeForBind,
	getServicesList,
	getStatQrCode,
	getQrCodeForPrint,
	getUpload
}
