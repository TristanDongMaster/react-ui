/**
    用户输入内容格式化
    参数:  str    String  用户输入内容
    格式:  stpe   String  格式化方式,'card_split'(default) 'mobile_split' idcard_split'
    */
import clearSpace from './clearSpace'    
export default function format (str, type) {
    type = type || 'card_split';
    var seg = [4,4,4,4,4,4];
    var maxlen = 50;
    switch(type){
        case 'card_split':
            seg = [4,4,4,4,4];
            maxlen = 20;
            break;
        case 'mobile_split':
            seg = [3,4,4];
            maxlen = 11;
            break;
        case 'idcard_split':
            seg = [6,8,4];
            maxlen = 18;
            break;
        default :
            break;
    }

    str = clearSpace(str).substr(0, maxlen);
    var start = 0;
    var result = [];
    for(var j = 0; j < seg.length; j++){
        var count = seg[j];
        var tmpstr = str.substr(start, count);
        if(tmpstr.length <= 0){
            break;
        }

        start = start + count;

        result.push(tmpstr);

        if(j == seg.length - 1){
            tmpstr = str.substr(start);
            if(tmpstr.length > 0){
                result.push(tmpstr);
            }
        }

    }

    return result.join(' ');
}

export function getSeg(type){
    type = type || 'card_split';
    var seg = [5,10,15,20,25,30];
    
    switch(type){
        case 'card_split':
            seg = [5,10,15,20,25,30];
            
            break;
        case 'mobile_split':
            seg = [4,9,14];
            break;
        case 'idcard_split':
            seg = [7,16,21];
            break;
        default :
            break;
    }
    return seg;
}