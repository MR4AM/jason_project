require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom'
    },
    shim:{
        
    }
 })
require(['jquery','com_plus','base','ajax_plugin'],function($,common,base){
    base.loading('.list_header','.list_nav','.list_footer');
     // 搜索框吸顶(滚动条滚动时触发)
       $(window).scroll(function(){
          common.catchTop($('#header_main').get(0),$('.catchTop').get(0));
          if(window.scrollY>1000){
            $('.toTop').css('display','block');
          }else{
            $('.toTop').css('display','none');
          }
       })
      // 返回顶部按钮
        $('.toTop').click(function(){
            common.toTop();
        })
        // 远程加载html导航条结构
        $('.list_main_nav').load('../home.html #nav_left',function(){
               // 根据导航条分类发起ajax请求
             var data_gory;
             var par='';
             cateGory('#nav_left');
             function cateGory(selector){
                 $(selector).on('click',function(e){
                    console.log(e.target.id);
                switch(e.target.id){
                    case 'phone':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'life_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'kitchen_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'heathy_ele':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'makeup':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'cooker':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'life':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'clothes':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'watch':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'beauty':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'bag':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'sport':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'mom_child':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                    case 'heathy_food':
                    data_gory=e.target.id;
                    listAjax(data_gory);
                    listHref(data_gory);
                    break;
                }
            })
        }
              function listHref(data){
                 par+='?'+'category'+'='+data;
                location.href='list.html'+par;
              }
          // 导航条分类ajax请求函数
              function listAjax(data){
                    $.ajax({
                    url:'../api/list.php',
                    dataType:'json',
                     data:{category:data},
                    success:function(res){
                        console.log(res);
                    },
                })
              }
        });
        // 根据url发起ajax请求
        var par=location.search;
        par=decodeURI(par);
        var url=par.substring(1);
        url=url.split('=');
        par=url[1];
        console.log(par);
        $.ajax({
                url:'../api/list.php',
                dataType:'json',
                data:{category:par},
                success:function(res){
                   $.each($(res),function(idx,item){
                        var ul=$.map($(res),function(val){
                            return '<li><img src="'+val.imgurl+'" id="'+val.id+'"/><h2>'+val.name+'</h2><span>￥'+val.price+'</span><br/><button>快速购买</button><button id="addTocar">加入购物车</button></li>'
                        }).join('\n');
                        $('.list_main_r_m').html(ul);
                   })
                }
            }) 

            // 点击页面任意商品位置实现跳转到详情页ajax请求
               function detailAjax(data){
                    $.ajax({
                    url:'../api/listtodetail.php',
                    dataType:'json',
                     data:{id:data},
                    success:function(res){
                        console.log(res);
                    },
                })
              }
               function detailHref(data){
                var newpar='';
                 newpar+='?'+'id'+'='+data;
                location.href='detail.html'+newpar;
              }
               // 延时500ms执行点击页面跳转到详情页
            setTimeout(function(){
               $('.list_main_r').on('click','img',function(e){
                    detailAjax(e.target.id);
                    detailHref(e.target.id);
              })
            },500)
        // 添加购物车效果
        base.addcarAnimation('.list_main_r_m','#addTocar','.nav_top_r',500);
      
})