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
        $('.list_main_nav').load('../index.html #nav_left',function(){
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
        var pro_arr=[];
        function create(arr){
           $.each($(arr),function(idx,item){
                var ul=$.map($(arr),function(val){
                    return '<li><img src="'+val.imgurl+'" id="'+val.id+'"/><h2>'+val.name+'</h2><span>￥'+val.price+'</span><br/><button>快速购买</button><button id="addTocar">加入购物车</button></li>'
                }).join('\n');
                $('.list_main_r_m').html(ul);
           })
        }

        $.ajax({
                url:'../api/list.php',
                dataType:'json',
                data:{category:par},
                success:function(res){
                    pro_arr=res;   
                    // create(res);
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
        // 分页加载
            var pageNo=1;
            var qty=20;
            tab(pageNo,qty);
            function tab(pageNo,qty){
                $.ajax({
                    url:'../api/page.php',
                    data:{'category':par,'pageNo':pageNo,'qty':qty},
                    dataType:'json',
                    success:function(res){
                        var data_arr=res.data;
                        create(data_arr);
                         // 价格查询及排序
                            $('.selectbox').on('click',function(e){
                                switch(e.target.id){
                                    case 'lowTohigh':
                                    var arr1=data_arr.sort(function(a,b){return a.price- b.price});
                                    create(arr1);
                                    break;
                                    case 'highTolow':
                                     var arr2=data_arr.sort(function(a,b){return a.price- b.price}).reverse();
                                    create(arr2);
                                    break;
                                    case 'priceCheck':
                                    var minPrice=$('#low').val();
                                    var maxPrice=$('#high').val();
                                    priceFliter(minPrice,maxPrice);
                                    function priceFliter(minPrice,maxPrice){
                                        var arr3=data_arr.filter(function(item){
                                            return item.price>=minPrice &&item.price<=maxPrice;
                                        });
                                        create(arr3);
                                    }
                                    break;
                                }
                            })
                        // 处理分页
                        let pageQty = Math.ceil(res.total/res.qty);
                        $('#page').html('');
                        for(let i=1;i<=pageQty;i++){
                            var span=$('<span/>');
                            console.log(span);
                            $(span).html(i);
                            if(i===res.pageNo){
                               $(span).addClass('active');
                            }
                            $(span).appendTo('#page');
                        }
                        $('')
                    }
                })    
            }
        $('#page').on('click',function(e){
            let newpageNo=e.target.innerText*1;
             tab(newpageNo,qty);
        })
      
})