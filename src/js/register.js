require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1'
    },
    shim:{
    }
 })
require(['jquery','com_plus','ajax_plugin'],function($,common){
     // 加载远程html文件，load取html结构
    $('.h_top').load('../html/base.html #header_top');
    $('.logo').load('../html/base.html header .logo')
     $('nav').load('../html/base.html #nav_top');
    $('footer').load('../html/base.html footer');
      var checkLength=0;
    $('.register_main').on('change','input',function(e){
         function delempty(selector,val){
                 if(!/^\S{1,}$/.test($(selector).get(0).value.trim())){
                    $('.tips').html(''+val+'输入不能为空').css('display','block');
                    return false;
                }else{
                    $('.tips').css('display','none');
                }
          }
           var namecheck;
        // 注册检验
        switch(e.target.id){
            // 用户名非空验证
             case 'name':
                 delempty('#name','用户名');
            // 用户名是否被占用验证
                var name=$('#name').get(0).value;
                $.ajax({
                    url:'../api/check.php',
                    data:{'tryname':name},
                    success:function(data){
                        console.log(data);
                        if(data=='exsit'){
                             $('.tips').html('该名字已被注册了哦，请换一个吧！').css('display','block');
                                return false;
                        }else{
                            checkLength=1;
                            console.log(checkLength);
                        }
                    }
                })
                checkLength++;
                break;
            // 密码输入非空及密码强度验证
            case 'pas':
                 delempty('#pas','密码');
                 if(/^[a-zA-Z\d]{1,}$/.test($('#pas').get(0).value.trim())){
                    checkLength++;
                    console.log(checkLength);
                 }else{
                    $('.tips').html('密码只能是数字或英文字母').css('display','block');
                    return false;
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
                    });
                    return false;
                }else{
                    $('.tips').css('display','none');
                    checkLength++;
                    console.log(checkLength);
                }
            break;
            // 校验手机号
            case 'phone':
                if(!/^1[34578]\d{9}$/.test($('#phone').get(0).value)){
                    $('.tips').html('手机号码格式不正确').css({
                        'display':'block',
                    });
                    return false;
                }else{
                    $('.tips').css('display','none');
                    checkLength++;
                    console.log(checkLength);
                }
            break;
            // 校验邮箱
            case 'email':
                if(!/^[a-z0-9_\-\.]{2,}@[a-z\d\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test($('#email').get(0).value)){
                 $('.tips').html('邮箱格式不正确').css({
                        'display':'block',
                    });
                    return false;
            }else{
                    $('.tips').css('display','none');
                    checkLength++;
                    console.log(checkLength);
                }
            break;
            // 校验验证码
            case 'vcode':
                if($('#vcode').get(0).value.toLowerCase()!==$('#showCode').get(0).innerText.toLowerCase()){
                    console.log($('#vcode').get(0).value,$('#showCode').get(0).innerHTML)
                    $('.tips').html('验证码输入不正确').css('display','block');
                    return false;
                }else{
                    $('.tips').css('display','none');
                    checkLength++;
                    console.log(checkLength);
                }
            break;
        }
    }).on('click','#getCode',function(){
         // 获取验证码
         $('#showCode').html(common.randomCode(4));
    }).on('click','#register',function(){
            console.log(confirmname);
            console.log($('#registerbox input').length-1);
        if(checkLength==$('#registerbox input').length-1 || checkLength>$('#registerbox input').length-1 && $('#checkfile').get(0).checked){
            console.log(666);
            var confirmname =$('#name').get(0).value;
            var password=$('#pas').get(0).value;
            var phone=$('#phone').get(0).value;
            var email=$('#email').get(0).value;
            $.ajax({
                url:'../api/register.php',
                data:{'confirmname':confirmname ,'password':password,'phone':phone,'email':email},
                success:function(res){
                    console.log(res);
                    if(res=='success'){
                        $('#registerbox input').val('');
                       alert(''+confirmname+',恭喜你成为飞虎乐购会员!')
                      location.href='http://localhost:2122/html/login.html';
                    }
                }
            })
           
            
         }
    })
})