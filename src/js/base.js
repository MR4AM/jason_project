define(function(){
    return{
        searchAjax(){
            // 头部搜索框ajax请求
            var timer;
            var res=$('.res').get(0);
            $('.insert').get(0).focus();
            $('.insert').get(0).oninput = function(){
                let key = $('.insert').get(0).value;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    ajax({
                        type:'jsonp',
                        url:'http://suggest.taobao.com/sug?code=utf-8&q='+key,
                        // data:{json:1,wd:key},
                        jsonpName:'callback',
                        success:function(data){
                            var data_arr=[];
                            data_arr=data.result;
                            var $ul=$('<ul/>');
                            var item_arr=[];
                            $.each($(data_arr),function(idx,item){
                                item_arr.push(item[0])
                            })
                            $ul.get(0).innerHTML=$.map(item_arr,function(val,idx){
                                return '<li>'+val+'</li>'
                            }).join('\n');
                            res.innerHTML = '';
                            res.appendChild($ul.get(0));
                            $('.res').on('click','li',function(){
                                // 这里的this指向事件源对象
                                $('.insert').get(0).value=$(this).html();
                            })
                        }
                    })
                    if(key==''){
                        res.style.display='none';
                    }else{
                        res.style.display='block';
                    }
                },500); 
            }
            
        },
         // 加载远程html文件，load取html结构
        loading(selheader,selnav,selfooter){
               console.log(this.searchAjax);
                $(selheader).load('../html/base.html header',function(){
            });
             $(selnav).load('../html/base.html #nav_top');
             $('.toTop').load('../html/base.html .toTop',function(){    
             });
            $(selfooter).load('../html/base.html footer');
        },
        // 三级联动
        threeAction(){
            let  province=document.querySelector('#province');
            let  city=document.querySelector('#city');
            let  count=document.querySelector('#count');
            let proIndex = 0;
            let cityIndex = 0;
            // 引用封装好的ajax插件发起异步请求
             ajax({
                data:{city:city},
                type:'get',
                url:'../api/region.json',
                success:function(res){
                    let arr=[];
                    arr=res.regions;
                    arr.forEach(function(item,idx){
                      var options=document.createElement('option');
                        options.innerHTML=item.name;
                        province.appendChild(options);
                    })
                    // 省份改变时，城市和区县对应改变   
                    province.onchange=function(){
                        getCity();
                        getCount();
                    }
                    // 城市改变时，区县对应改变
                     city.onchange=function(){
                        getCount();
                        checkWeather(city);
                    }
                    // 县区内容改变时查询天气
                    count.onchange=function(){
                        checkWeather(count);
                    }
                    getCity();
                    getCount();
                    //获取城市的数据
                        function getCity(){
                            //清除原来的城市信息
                            city.innerHTML = "";
                            //设置省份下拉列表备选选项的索引值（实现三级联动对应的核心）。
                            proIndex = province.selectedIndex;
                            // 遍历市区数组
                            var cityList=arr[proIndex].regions;
                            for(var j = 0; j <cityList.length;j++) {
                                var coption= document.createElement('option');
                                coption.innerHTML =cityList[j]['name'];
                                city.appendChild(coption);
                            }
                        }
                    //获取区县的数据
                    function getCount() {
                        //清除原来的区县信息
                        count.innerHTML = "";
                        //设置城市下拉列表备选选项的索引值（实现三级联动对应的核心）。
                        cityIndex = city.selectedIndex;
                        // 遍历区县数组
                        var countList = arr[proIndex].regions[cityIndex].regions; 
                        for(let k = 0; k < countList.length; k++) {
                            var doption = document.createElement('option');
                            doption.innerHTML = countList[k]['name'];
                            res=countList[k]['name'];
                            count.appendChild(doption);
                        }
                    }
                }
            })
        },
        // 添加购物车效果
      addcarAnimation(fathersel,btnsel,targetsel,duration){
           $(fathersel).on('click',btnsel,function(){
                $li=$(this).closest('li');
                $img=$li.children('img');
                $cloneImg=$img.clone();
                console.log($img.offset().left);
                $cloneImg.css({
                    position:'absolute',
                    left:$img.offset().left,
                    top:$img.offset().top,
                    width:$img.outerWidth()
                });
            $('body').append($cloneImg);
            $cloneImg.animate({
                left: $(targetsel).offset().left,
                top:$(targetsel).offset().top,
                opcatity:0.5,
                width:0,
            },duration);
          })  
        },
    }
})


// js代码备份（home.js商品ajax请求备份）
// 
        // 商品模块ajax请求
        // ajax({
        //     type:'get',
        //     url:'../api/productdata.json',
        //     success:function(res){
        //         prodata_arr=res.prodata;
        //         $.each($(prodata_arr),function(idx,item){
        //             // 生成结构函数
        //              function rendom(arr,selector){
        //                     var par=$.map($(arr),function(val){
        //                         return '<a href="#"><li><img src="'+val.imgurl+'"/><h2>'+val.name+'</h2><span>'+val.price+'</span></li></a>'
        //                     }).join('\n');
        //                     $(selector).html(par);
        //                 }
        //         // 根据模版加载对应json数据：手机数码模块
        //             if(item.name=='phone'){
        //                     var phone_arr=[];
        //                     phone_arr=item.prodata;
        //                     rendom(phone_arr,'.phone_det_right');
        //             }
        //             // 鞋服配饰模块
        //             if(item.name=='clothes'){
        //                     var phone_arr=[];
        //                     clothes_arr=item.prodata;
        //                     rendom(clothes_arr,'.clothes_det_right');
        //             }
        //             // 家居电器模块
        //             if(item.name=='family'){
        //                     var phone_arr=[];
        //                     family_arr=item.prodata;
        //                     rendom(family_arr,'.family_det_right');
        //             }
        //              // 家居生活模块
        //             if(item.name=='life'){
        //                     var phone_arr=[];
        //                     life_arr=item.prodata;
        //                     rendom(life_arr,'.life_det_right');
        //             }
        //              // 母婴玩具模块
        //             if(item.name=='mom_child'){
        //                     var phone_arr=[];
        //                     mom_child_arr=item.prodata;
        //                     rendom(mom_child_arr,'.mom_child_det_right');
        //             }
        //               // sport_outside模块
        //             if(item.name=='sport_outside'){
        //                     var phone_arr=[];
        //                     sport_outside_arr=item.prodata;
        //                     rendom(sport_outside_arr,'.sport_outside_det_right');
        //             }
        //               // makeup模块
        //             if(item.name=='makeup'){
        //                     var phone_arr=[];
        //                     makeup_arr=item.prodata;
        //                     rendom(makeup_arr,'.makeup_det_right');
        //             }
        //               // heathy_food模块
        //             if(item.name=='heathy_food'){
        //                     var phone_arr=[];
        //                     heathy_food_arr=item.prodata;
        //                     rendom(heathy_food_arr,'.heathy_food_det_right');
        //             }

        //         })
        //     }
        // })
// 登录注册页面备份
 // 登录/注册界面切换
    // $('.login_register').on('click','.denglu',function(){
    //     $('#lr_login').css('display','block');
    //     $('#lr_register').css('display','none');
    //     $('.denglu').css('color','#f00');
    //     $('.zhuce').css('color','#000');
    // }).on('click','.zhuce',function(){
    //      $('#lr_login').css('display','none');
    //     $('#lr_register').css('display','block');
    //      $('.denglu').css('color','#000');
    //     $('.zhuce').css('color','#f00');
    // }).on('click','#getCode',function(){
    //     // 获取验证码
    //      $('#showCode').html(com.randomCode(4));
    // }).on('blur','input',function(e){
    //       function delempty(selector,val){
    //              if(!/^\S{1,}$/.test($(selector).get(0).value.trim())){
    //                 $('.tips').html(''+val+'输入不能为空').css('display','block');
    //             }else{
    //                 $('.tips').css('display','none');
    //             }
    //       }
    //     // 注册检验
    //     switch(e.target.id){
    //         // 用户名非空验证
    //          case 'name':
    //              delempty('#name','用户名');
    //         // 用户名是否被占用验证
    //             ajax({
    //                 type:'get',
    //                 url:'../api/cust_mes.json',
    //                 success:function(res){
    //                      $.each(res,function(idx,item){
    //                         if($('#name').get(0).value.trim()==item.name){
    //                             $('.tips').html('该名字已被注册了哦，请换一个吧！').css('display','block');
    //                         }
    //                      })
    //                 }
    //             })
    //             return false;
    //              break;
    //         // 密码输入非空及密码强度验证
    //         case 'pas':
    //              delempty('#pas','密码');
    //              if(/^[a-zA-Z\d]{1,}$/.test($('#pas').get(0).value.trim())){
                    
    //              }else{
    //                 $('.tips').html('密码只能是数字或英文字母').css('display','block');
    //              }
    //                 if(/^[0-9]{6,}$/.test($('#pas').get(0).value.trim())){
    //                     $('.tips').html('密码安全性较弱').css('display','block');
    //                 }else if(/^[0-9a-zA-Z]{6,}$/.test($('#pas').get(0).value.trim())){
    //                     $('.tips').html('密码安全性一般').css('display','block');
    //                 }
    //                 // @#$%\^\&\*\!特殊字符
    //                 if(/^\S[a-zA-Z]{6,}$/.test($('#pas').get(0).value.trim())){
    //                     $('.tips').html('密码安全性较强').css('display','block');
    //                 }
    //              break;
    //         // 校验密码
    //         case 'confirm':
    //             if($('#pas').get(0).value.trim()!==$('#confirm').get(0).value.trim()){
    //                 $('.tips').html('输入密码不一致').css({
    //                     'display':'block',
    //                     // top:20+$('input').height()*3
    //                 });
    //                 return false;
    //             }else{
    //                 $('.tips').css('display','none');
    //             }
    //         break;
    //         // 校验手机号
    //         case 'phone':
    //             if(!/^1[34578]\d{9}$/.test($('#phone').get(0).value)){
    //                 $('.tips').html('手机号码格式不正确').css({
    //                     'display':'block',
    //                     // top:30+$('input').height()*4
    //                 });
    //                 return false;
    //             }else{
    //                 $('.tips').css('display','none');
    //             }
    //         break;
    //         // 校验邮箱
    //         case 'email':
    //             if(!/^[a-z0-9_\-\.]{2,}@[a-z\d\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test($('#email').get(0).value)){
    //              $('.tips').html('邮箱格式不正确').css({
    //                     'display':'block',
    //                     // top:40+$('input').height()*5
    //                 });
    //                 return false;
    //         }else{
    //                 $('.tips').css('display','none');
    //             }
    //         break;
    //         // 校验验证码
    //         case 'vcode':
    //             if($('#vcode').get(0).value.toLowerCase()!==$('#showCode').get(0).innerText.toLowerCase()){
    //                 console.log($('#vcode').get(0).value,$('#showCode').get(0).innerHTML)
    //                 $('.tips').html('验证码输入不正确').css('display','block');
    //             }else{
    //                 $('.tips').css('display','none');
    //             }
    //         break;
    //     }
    // }).on('click','#register',function(){
    //    if($('#lr_register input').get(0).value!==''&& $('#checkfile').get(0).checked){
    //         var name=$('#name').get(0).value;
    //         var pas=$('#pas').get(0).value;
    //         var phone=$('#phone').get(0).value;
    //         var email=$('#email').get(0).value;
    //         console.log(name,pas,phone,email);
    //         ajax({
    //             type:'get',
    //              // 提交注册信息到后台
    //             url:'../api/cust_mes.php?name='+name+'&pas='+pas+'&phone='+phone+'&email='+email,
    //         })
    //      }
    // }).on('blur','input',function(e){
    //     // 登录验证
    //     switch(e.target.id){
    //         case 'account':
    //         // ajax请求用户是否已注册
    //         var account=$('#account').get(0).value;
    //         console.log(account);
    //          ajax({
    //                 type:'get',
    //                 url:'../api/signcheck.php?account='+account,
    //                 success:function(res){
    //                     console.log(res);
    //                     // res=='yes'?alert('该用户名不存在'):'';
    //                 }
    //             })
    //     }
    // })