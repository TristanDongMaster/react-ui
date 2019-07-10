import './style.less'
export function showMsgBanner(text){
  hideMsgBanner()
  var temp = 
    `<div class="msg-banner" id="msg-banner-dom">
          <i class="icon-delet"></i> ${text}
        </div>`
  document.body.insertAdjacentHTML('beforeend', temp)
}
/**
隐藏loading提示
**/
export function hideMsgBanner(){
  var loadingNode = document.querySelector('#msg-banner-dom')
    if(loadingNode !==null){
        document.body.removeChild(loadingNode)
    }
}