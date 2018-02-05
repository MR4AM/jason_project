<?php
    // 接收前端数据
    $account=isset($_GET['account'])?$_GET['account']:Null;
    $path="cust_mes.json";
    // 打开一个文件fopen
    $file=fopen($path,'r');
    // 获取文件大小（字节数）filesize
    $file_length=filesize($path);
    // 读取文件内容
    $content=fread($file,$file_length);
    $arr = json_decode($content,true);
    $data;
    foreach($arr as $item){
        foreach($item as $key=>$val){
            if($val==$account){
               echo "no";
               return false;
            }else{
                echo "yes";
                  return false;
            }
        }
    }
?>