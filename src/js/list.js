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
                            return '<li><img src="'+val.imgurl+'" id="'+val.id+'"/><h2>'+val.name+'</h2><span>￥'+val.price+'</span><br/><button>快速购买</button><button>加入购物车</button></li>'
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
               $('.list_main').on('click',function(e){
                    detailAjax(e.target.id);
                    detailHref(e.target.id);
              })
            },500)  
})