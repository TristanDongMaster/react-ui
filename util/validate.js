    export default new Validate()
    function Validate(){
        
    }
    //银行卡
    Validate.prototype.bankcardNo = function (val){
        var reg = /^[1-9]\d{15}\d{0,3}\D{0}$/; //16-19
        var reg = /^[1-9]\d{14}\d{0,5}\D{0}$/; //15-20

        if(val.length === 0){
            return {
                result:false,
                msg:'请输入卡号'
            };
        }
        if(!reg.test(val)){
            return {
                result:false,
                msg:'卡号有误'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    
    //用户名
    Validate.prototype.fullname = function (val){
        var _checked = checkUserName(val);
        if(_checked == 3){
            return {
                result:false,
                msg:'姓名格式有误'
            };
        }else if(_checked == 2){
            return {
                result:false,
                msg:'请先填写持卡人姓名'
            };
        }else if(_checked == 1){
            return {
                result:false,
                msg:'持卡人姓名最多20个字，最少2个字'
            };
        }
        return {
            result:true,
            msg:''
        };
        
    }
    function checkUserName(val){
        if( val.length >= 20 || val.length < 2 ){
            return 1;
        }else if( val.length <= 0 ){
            return 2;
        }else if( !Validate.prototype.checkEngChiAndCharacters( val ) ){
            return 3;
        }
    }
    //汉字英文字母和特殊字符
    Validate.prototype.checkEngChiAndCharacters = function(val){
        var checkFirstWord = /^[\u4e00-\u9fa5a-zA-Z]/gi;
        var checkLastWord = /[\u4e00-\u9fa5a-zA-Z]$/gi;
        var checkMiddleWord = /^[\u4e00-\u9fa5a-zA-Z·]{0,}$/gi;
        //return /^(?!\．)(?!.*?．$)^[\u4e00-\u9fa5a-zA-Z·]+$/gi.test( val.replace(/\./g,'·').replace(/\。/g,'·').replace(/\．/g,'·') );
        return checkFirstWord.test( val) && checkLastWord.test( val) && checkMiddleWord.test( val )
    }
    //激活码校验：只支持数字和字母
    Validate.prototype.checkEngAndNum = function(val){
        var reg = /^[0-9a-zA-Z]+$/;

        if(val.length === 0){
            return {
                result:false,
                msg:'请输入激活码'
            };
        }
        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入正确的激活码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //身份证 
    Validate.prototype.iDCard = function (idCard) {
        
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        if (!regIdCard.test(idCard)) {
            return {
                result:false,
                msg:'请输入正确的身份证号！'
            };
        }

        if (idCard.length == 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return {
                        result:true,
                        msg:''
                    };
                } else {
                    return {
                    result:false,
                    msg:'请输入正确的身份证号！'
                };
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return {
                        result:true,
                        msg:''
                    };
                } else {
                    return {
                        result:false,
                        msg:'请输入正确的身份证号！'
                    };
                }
            }
        }
        return {
            result:true,
            msg:''
        };
    }
    //cvv2
    Validate.prototype.cvv2 = function (val){
        var reg = /^\d{3}$/;

        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入卡背面末尾3位数'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //信用卡有效期    
    Validate.prototype.exptime = function (val){
        var reg  = /^\d{4}$/
        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入4位数的有效期，格式如：08/25,输入0825'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //手机号码     
    Validate.prototype.mobileNo = function (val){
        var reg = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;
        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入11位的手机号码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }

    //验证码
    Validate.prototype.authCode = function (val){
        var reg = /^\d{6}$/;

        if(val.length <= 0){
            return {
                result:false,
                msg:'请输入短信验证码'
            };
        }

        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入6位短信验证码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //密码长度校验
    Validate.prototype.passport = function(val){
        if(val.length<6||val.length>20){
            return {
                result:false,
                msg:'请输入合法长度的密码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //支付密码校验
    Validate.prototype.paypass = function(val){
        //支持由6-20位字母、数字、特殊字符，至少包含其中2类以上字符组合
        //全特殊字符：`-=[]\;',./~!@#$%^&*()_+{}|:"<>? 空格
        if(val.length<6){
            return {
                result:false,
                msg:'支付密码最少6位'
            };
        }
        if(val.length>20){
            return {
                result:false,
                msg:'支付密码最多20位'
            };
        }
        var regNumber = /\d/
        var regChar = /[A-Za-z]/
        var regSpecialChar = /[\`\-\=\[\]\\\;\'\,\.\/\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?]/
        var regIllegalChar = /[^A-Za-z0-9\`\-\=\[\]\\\;\'\,\.\/\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?]/
        var nubRst = regNumber.test(val)
        var charRst = regChar.test(val)
        var specialCharRst = regSpecialChar.test(val)
        var illegalCharRst = regIllegalChar.test(val)
        if(illegalCharRst){
            return {
                result:false,
                msg:'支付密码中包含不支持的符号'
            }
        }
        if(nubRst*1+charRst*1+specialCharRst*1<2){
            return {
                result:false,
                msg:'字母、数字、特殊字符（不包含空格），至少包含其中2类以上字符组合'
            }
        }
        return {
            result:true,
            msg:''
        };
    }
    Validate.prototype.email = function (val) {
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return reg.test(val);
    }
    //输入长度校验
    Validate.prototype.lenMN = function(val, m, n){
        if(val.length<m||val.length>n){
            return {
                result:false,
                msg:'请输入合法长度'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    //为空校验
    Validate.prototype.notEmpty = function(val){
        if(val.length<=0){
            return {
                result:false,
                msg:'请输入不能为空'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    Validate.prototype.onlyNumber = function(val){
        var regNumber = /^[0-9]*$/;
        var nubRst = regNumber.test(val);
        if(!nubRst){
            return {
                result:false,
                msg:'非数字'
            }
        }
        return {result:true,msg:""};
    }
    Validate.prototype.isChn = function(val){
        var regChinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        if(!regChinese.test(val)){
           return {
                result:false,
                msg:'非中文'
            }
        }
        return {result:true,msg:""};
    }
    Validate.prototype.onlyChn = function(val){
        for(var i=0; i<val.length; i++){
            if(!Validate.prototype.isChn(val[i]).result){
                return {
                    result:false,
                    msg:'非中文'
                }
            }
        }
        return {result:true,msg:""};
    }
    