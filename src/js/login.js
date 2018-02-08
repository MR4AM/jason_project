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
   $('.loginbox').on('change','input',function(e){
        switch(e.target.id){
            case 'account':
            // 用户名是否被占用验证
                var name=$('#account').get(0).value;
                $.ajax({
                    url:'../api/check.php',
                    data:{'tryname':name},
                    success:function(data){
                        console.log(data);
                        if(data=='exsit'){
                             // $('.tips').html('该名字已被注册了哦，请换一个吧！').css('display','block');
                             alert('该名字已被注册了哦，请换一个吧！');
                                return false;
                        }else{
                            checkLength=1;
                            console.log(checkLength);
                        }
                    }
                })
        }
   })

})