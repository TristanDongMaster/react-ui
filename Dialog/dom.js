import './style.less'
class Dialog {
	constructor() {
		this.initTemplate = this.initTemplate.bind(this)
		this.showDialog = this.showDialog.bind(this)
		this.initDialog = this.initDialog.bind(this)
		this.hideDialog = this.hideDialog.bind(this)
	}
	initTemplate(param) {
		var $target = document.getElementById('dialog-overlay-dom')
		var templateObject = {
			title: '',
			content: '',
			buttonLeftText: '',
			buttonRightText: '',
			buttonCenterText: '',
			footer: ''
		}
		var templateStr = ''
		if ($target != undefined) {
			document.body.removeChild($target)
		}
		if (param) {
			if (param.title != '' && param.title != undefined) {
				templateObject.title = `<div class="dialog-header "> ${param.title}</div>`
			}
			if (param.content != '' && param.content != undefined) {
				if (param.isHTML) {
					templateObject.content = `<div class="dialog-body">${param.content}</div>`
				} else {
					templateObject.content = `<div class="dialog-body"><div class="dialog-text">
													 ${param.content}
												</div></div>`
				}
			}

			if (param.buttonLeftText != '' && param.buttonLeftText != undefined) {
				templateObject.buttonLeftText = `<span class="col col-50 dialog-action action-left">${param.buttonLeftText}</span>`
			}

			if (param.buttonRightText != '' && param.buttonRightText != undefined) {
				templateObject.buttonRightText = `<span class="col col-50 dialog-action action-right">${param.buttonRightText}</span>`
			}

			if (param.buttonCenterText != '' && param.buttonCenterText != undefined) {
				templateObject.buttonCenterText = `<span class="col dialog-action">${param.buttonCenterText}</span>`
			}

			templateObject.footer = `<div class="dialog-footer">
											${templateObject.buttonLeftText}
											${templateObject.buttonRightText}
											${templateObject.buttonCenterText}
										</div>`

			templateStr = `<div class="dialog-overlay hide" id="dialog-overlay-dom" role="dialog">
							<div class="dialog-container">
								${templateObject.title}
								${templateObject.content}
								${templateObject.footer}
							</div>
						</div>`
			document.body.insertAdjacentHTML('beforeend', templateStr)
		}
	}
	initDialog(param) {
		this.initTemplate(param)
		var $target = document.getElementById('dialog-overlay-dom') 
		if ($target) {
			if (typeof param.buttonLeftEventMethod == "function") {
				$target.addEventListener('click', ($event) => {
					if ($event.target.className.indexOf('action-left') > -1) {
						this.hideDialog()
						param.buttonLeftEventMethod()
					}
				})
			}
			if (typeof param.buttonRightEventMethod == "function") {
				$target.addEventListener('click', ($event) => {
					if ($event.target.className.indexOf('action-right') > -1) {
						this.hideDialog()
						param.buttonRightEventMethod()
					}

				})
			}
			if (typeof param.buttonCenterEventMethod == "function") {
				$target.addEventListener('click', ($event) => {
					if ($event.target.className.indexOf('dialog-action') > -1) {
						this.hideDialog()
						param.buttonCenterEventMethod()
					}

				})
			}
		}
	}
	showDialog(param) {
		this.initDialog(param)
		document.getElementById('dialog-overlay-dom').className = 'dialog-overlay'
	}
	hideDialog() {
		document.getElementById('dialog-overlay-dom').className = 'dialog-overlay hidden'
	}
}

/***
	param: {
		isHTML:false,//default
		title:'标题',
		content:'内容',
        buttonLeftText: "取消",
        buttonLeftEventMethod: function(){},
        buttonRightText: "去认证",
        buttonRightEventMethod: function(){
        	alert("去认证")
        },
        //buttonCenterText: "取消",
	    //buttonCenterEventMethod: function(){}
	}
	return void
*/
export function showDialog(param) {
	var dialogObject = new Dialog()
	dialogObject.showDialog(param)
}
export function hideDialog() {
	$('.dialog-overlay').addClass('hide')
}