require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
    },
    shim:{
        
    }
 })
require(['jquery','com_plus','base','config','ajax_plugin'],function($,common,base){
    $('.car_header').load('../html/base.html header #header_top');
    $('.car_footer').load('../html/base.html footer');
    // 购物车cookie去重
    var jason_list=[];
        function removeDouble(){
            var cookies=document.cookie;
            cookies=cookies.split('; ');
            cookies.forEach(function(item){
                var arr=item.split('=');
                if(arr[0]==='res'){
                    jason_list=JSON.parse(arr[1]);
                    for(var i=0;i<jason_list.length;i++){
                        for(var j=i+1;j<jason_list.length;j++){
                            if(jason_list[i].id===jason_list[j].id){
                                jason_list[i].qty=jason_list[i].qty*1+jason_list[j].qty*1;
                                jason_list.splice(j,1);
                                j--;
                            }
                        }
                    }
                }
            });
            return jason_list;   
        }
        removeDouble(jason_list);
        uploadCookie(jason_list);
        // 重新加载cookies
        function uploadCookie(res){
            var now=new Date();
            now.setDate(now.getDate()+7);
            document.cookie='res='+JSON.stringify(res)+';expires='+now.toUTCString()+';path=/';
        }
        // 获取去重后的cookie，写入数组，然后生成在页面中
        var cookie_arr=[];
         var cookies=document.cookie;
            cookies=cookies.split('; ');  
                cookies.forEach(function(item){
                  var arr=item.split('=');
                  if(arr[0]==='res'){
                     cookie_arr=JSON.parse(arr[1]);
                  }
                }); 
        createCarlist(cookie_arr);
        function createCarlist(arr){
            var total=0;
            var car_thead=`<tr>
                <td class="checkbox"><input type="checkbox" />全选</td>
                <td class="colnum">
                <span>飞虎商品</span>
                <span>商品名称</span>
                <span>商品数量</span>
                <span>商品单价</span>
                <span>飞虎总价</span>
                <span>操作</span>
                </td></tr>`;
                $(car_thead).prependTo('.car_table');
            $.each($(arr),function(idx,item){
                $(`<tr>
                    <td class="checkbox"><input type="checkbox" /></td>
                    <td class="colcontent">
                    <div id="${item.id}">
                    <span id="propic"><img src="${item.imgurl}"/></span>
                    <span id="proname">${item.name}</span>
                    <span id="proqty">数量：${item.qty}</span>
                    <span id="prosale">飞虎单价：${item.sale}</span>
                    <span id="prototal">飞虎总价：${item.sale*item.qty}</span>
                    <span id="act"><b id="del">删除</b>/<strong>收藏</strong></span>
                    </div></td></tr>`).appendTo('.car_table');
                    total+=item.sale*item.qty;
            }) 
            $('.total_mon').html('总金额：'+'<span style="color:red;">'+'￥'+total+'</span>')
        }
        // 删除单条购物车及清空购物车操作
        $('.car_main').on('click',function(e){
            switch(e.target.id){
                case 'del':
                // 从页面上移除所有单挑商品
                var targetTr=e.target.parentNode.parentNode.parentNode.parentNode;
                $('.car_table').get(0).removeChild(targetTr);
                // 移除商品列表对应数组的商品对象并更新cookie
                $.each($(cookie_arr),function(idx,item){
                    if(item.id==e.target.parentNode.parentNode.id){
                        $('.car_table').html('');
                        cookie_arr.splice(idx,1);
                        createCarlist(cookie_arr);
                        uploadCookie(cookie_arr);
                    }
                })
                break;
                case 'clearAll':
                cookie_arr=[];
                $('.car_table').html('');
                createCarlist(cookie_arr);
                uploadCookie(cookie_arr);
                break;
                case 'shopmore':
                location.href='../home.html';
            }
        })

            
    
      
})