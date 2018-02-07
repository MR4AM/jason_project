require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom'
    },
    shim:{
        'zoom':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonZoom'
        },
    }
 })
require(['jquery','com_plus','base','config','zoom','ajax_plugin'],function($,common,base,config){       
        // 加载远程html文件，load取html结构
        base.loading('.detail_header','.detail_nav','.detail_footer');
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
 
        // 商品信息介绍
        // 根据url发起ajax请求
            var par=location.search;
            par=decodeURI(par);
            var url=par.substring(1);
            url=url.split('=');
            par=url[1];
            console.log(par);
        // 接收来自页面的参数然后发起请求
        function getAndajax(url){
             $.ajax({
                url:url,
                dataType:'json',
                data:{id:par},
                success:function(res){
                    $.each($(res),function(idx,item){
                          var imgurl=item.imgurl.substring(1);
                          imgurl='.'+imgurl;
                          console.log(imgurl);
                        var $pm_l=$('<img src="'+imgurl+'"/>').appendTo('.pro_mes_main_l');
                        var det_box=$(`
                            <h1>${item.name}</h1>
                            <div>
                                <p><span id="price">飞虎价：<del>￥${item.price}</del></span></p>
                                <p><span id="sale"><b>抢购价</b>￥${item.sale}</span></p>
                            </div>
                            <div>
                                <p>温馨提示：该商品不支持货到付款</p><p>配送至：</p>
                                <p>服务：由飞虎乐购配送并提供服务</p>
                            </div>
                            <div class="buybox">
                                <span id="buy">立即购买</span><span id="addTocar">加入购物车</span>
                            </div>

                            `).appendTo('.pro_mes_main_r');
                           // 引入放大镜插件
                        $('.pro_mes_main_l').jasonZoom({
                            // 放大区域的宽高
                                width:300,
                                height:300,
                            // 放大镜位置的定位方式
                                position:'zidingyi',
                            // 定位参数
                                positionSetX:0,
                                positionSetY:0,
                                gap:0
                            });
                    })
                }
            }) 
        }  
        getAndajax('../api/listtodetail.php');

       




})