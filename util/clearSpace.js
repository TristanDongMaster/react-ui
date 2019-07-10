//清除字符串内部的空格
export default  function clearSpace(str){
        var result = [], len = str.length;
        for(var i = 0; i < len; i++){
            if (str[i] == ' ') {
                continue;
            }
            result.push(str[i]);
        }
        return result.join('');
    }