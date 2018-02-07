require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1'
    },
    shim:{
    }
 })
require(['jquery','com_plus','ajax_plugin'],function($,com){
    // 加载远程html文件，load取html结构
    $('.h_top').load('../html/base.html #header_top');
    $('.logo').load('../html/base.html header .logo')
     $('nav').load('../html/base.html #nav_top');
    $('footer').load('../html/base.html footer');
    // 登录/注册界面切换
    $('.login_register').on('click','.denglu',function(){
        $('#lr_login').css('display','block');
        $('#lr_register').css('display','none');
        $('.denglu').css('color','#f00');
        $('.zhuce').css('color','#000');
    }).on('click','.zhuce',function(){
         $('#lr_login').css('display','none');
        $('#lr_register').css('display','block');
         $('.denglu').css('color','#000');
        $('.zhuce').css('color','#f00');
    }).on('click','#getCode',function(){
        // 获取验证码
         $('#showCode').html(com.randomCode(4));
    }).on('blur','input',function(e){
          function delempty(selector,val){
                 if(!/^\S{1,}$/.test($(selector).get(0).value.trim())){
                    $('.tips').html(''+val+'输入不能为空').css('display','block');
                }else{
                    $('.tips').css('display','none');
                }
          }
        // 注册检验
        switch(e.target.id){
            // 用户名非空验证
             case 'name':
                 delempty('#name','用户名');
            // 用户名是否被占用验证
                ajax({
                    type:'get',
                    url:'../api/cust_mes.json',
                    success:function(res){
                         $.each(res,function(idx,item){
                            if($('#name').get(0).value.trim()==item.name){
                                $('.tips').html('该名字已被注册了哦，请换一个吧！').css('display','block');
                            }
                         })
                    }
                })
                return false;
                 break;
            // 密码输入非空及密码强度验证
            case 'pas':
                 delempty('#pas','密码');
                 if(/^[a-zA-Z\d]{1,}$/.test($('#pas').get(0).value.trim())){
                    
                 }else{
                    $('.tips').html('密码只能是数字或英文字母').css('display','block');
                 }
                    if(/^[0-9]{6,}$/.test($('#pas').get(0).value.trim())){
                        $('.tips').html('密码安全性较弱').css('display','block');
                    }else if(/^[0-9a-zA-Z]{6,}$/.test($('#pas').get(0).value.trim())){
                        $('.tips').html('密码安全性一般').css('display','block');
                    }
                    // @#$%\^\&\*\!特殊字符
                    if(/^\S[a-zA-Z]{6,}$/.test($('#pas').get(0).value.trim())){
                        $('.tips').html('密码安全性较强').css('display','block');
                    }
                 break;
            // 校验密码
            case 'confirm':
                if($('#pas').get(0).value.trim()!==$('#confirm').get(0).value.trim()){
                    $('.tips').html('输入密码不一致').css({
                        'display':'block',
                        // top:20+$('input').height()*3
                    });
                    return false;
                }else{
                    $('.tips').css('display','none');
                }
            break;
            // 校验手机号
            case 'phone':
                if(!/^1[34578]\d{9}$/.test($('#phone').get(0).value)){
                    $('.tips').html('手机号码格式不正确').css({
                        'display':'block',
                        // top:30+$('input').height()*4
                    });
                    return false;
                }else{
                    $('.tips').css('display','none');
                }
            break;
            // 校验邮箱
            case 'email':
                if(!/^[a-z0-9_\-\.]{2,}@[a-z\d\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test($('#email').get(0).value)){
                 $('.tips').html('邮箱格式不正确').css({
                        'display':'block',
                        // top:40+$('input').height()*5
                    });
                    return false;
            }else{
                    $('.tips').css('display','none');
                }
            break;
            // 校验验证码
            case 'vcode':
                if($('#vcode').get(0).value.toLowerCase()!==$('#showCode').get(0).innerText.toLowerCase()){
                    console.log($('#vcode').get(0).value,$('#showCode').get(0).innerHTML)
                    $('.tips').html('验证码输入不正确').css('display','block');
                }else{
                    $('.tips').css('display','none');
                }
            break;
        }
    }).on('click','#register',function(){
       if($('#lr_register input').get(0).value!==''&& $('#checkfile').get(0).checked){
            var name=$('#name').get(0).value;
            var pas=$('#pas').get(0).value;
            var phone=$('#phone').get(0).value;
            var email=$('#email').get(0).value;
            console.log(name,pas,phone,email);
            ajax({
                type:'get',
                 // 提交注册信息到后台
                url:'../api/cust_mes.php?name='+name+'&pas='+pas+'&phone='+phone+'&email='+email,
            })
         }
    }).on('blur','input',function(e){
        // 登录验证
        switch(e.target.id){
            case 'account':
            // ajax请求用户是否已注册
            var account=$('#account').get(0).value;
            console.log(account);
             ajax({
                    type:'get',
                    url:'../api/signcheck.php?account='+account,
                    success:function(res){
                        console.log(res);
                        // res=='yes'?alert('该用户名不存在'):'';
                    }
                })
        }
    })

})