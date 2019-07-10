import './style.less'

export function showToast(param){
  var t1 = '',t2='',t3='';
  var temp = 
    `<div class="vh5-trace-mask" id="vh5-trace-mask">
    <div class="vh5-trace"  role="trace">`+
          param.content +
      `</div>
      </div>`
  var div = document.createElement('div')  
  div.innerHTML =  temp

  document.body.appendChild(div)
  t1 = setTimeout(()=>{
    document.querySelector('.vh5-trace').className = 'vh5-trace vh5-trace-hide'
    t2 = setTimeout(()=>{
      document.body.removeChild(div)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t1)
    },1000)
  },2000)


  document.querySelector('.vh5-trace').addEventListener('click', ($event) => {
    //return
    if($event.target) {
      if($event.target.className.includes('vh5-trace-hide')){
        return
      }else{
        document.querySelector('.vh5-trace').className = 'vh5-trace vh5-trace-hide'
      }
      t3 = setTimeout(()=>{
        document.body.removeChild(div)
        clearTimeout(t3)
        clearTimeout(t2)
        clearTimeout(t1)
      },1000)
    }
  })
}