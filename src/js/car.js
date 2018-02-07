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
        console.log(cookie_arr);
        var car_tabel=`<tr>
            <td>飞虎商品</td>
            <td></td>
            <td>商品名称</td>
            <td>商品数量</td>
            <td>商品单价</td>
            <td>飞虎总价</td>
            <td>操作</td></tr>`;
            $(car_tabel).prependTo('.car_main .container');
        $.each($(cookie_arr),function(idx,item){
            $(`<div>
                <img src="${item.imgurl}"/>
                <span>${item.name}</span>
                <span>数量：${item.qty}</span>
                <span>飞虎单价：${item.sale}</span>
                <span>飞虎总价：${item.sale*item.qty}</span>
                </div>`).appendTo('.car_main .container');
            var total=(item.sale*item.qty);
              total+=total;
            $('.totalPrice').get(0).innerHTML='总金额￥'+total;
        })
            
    
      
})