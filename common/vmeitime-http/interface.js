
export default {
	config: {
		baseUrl: "https://trace.domchain.io/admin-api",
		header: {
			'content-type': 'application/json'
		},
		data: {},
		method: "POST",
		dataType: "json",  
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method

		return new Promise((resolve, reject) => {
			let _config = null
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				_reslog(response)
				
				if (statusCode === 200) { //
					if(response.data.code==405){
						uni.clearStorageSync()
						uni.showToast({
							title: response.data.message,
							icon: 'none',
							mask: true,
							duration: 1500,
						})
						setTimeout(function() {
							uni.redirectTo({
							    url: '/pages/login/login'
							});
						}, 1600);
					}else{
						resolve(response);
					}
				} else if (statusCode === 500) {
					var token = uni.getStorageSync('token');
					if(token && response.data.message.includes("Token")){
						uni.clearStorageSync();
						uni.showToast({
							title: response.data.message,
							icon: 'none',
							mask: true,
							duration: 2000,
						})
						setTimeout(function() {
							uni.redirectTo({
							    url: '/pages/login/login'
							});
						}, 2100);
					}
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				if (_config.data) {
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		if (req.data) {
		}
	}
}

function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		if (res.config.data) {
		}
	}
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}

