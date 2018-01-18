/**
 * Created by 马靖文 on 2018/1/16.
 */
$(function(){


     var id=tools.getSearch("productid");

      console.log(id);

  //渲染页面
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id,
    },
    success:function(info){
      console.log(info);


      $('.product').html( template('Tpl',info))
      ///初始化轮播图
      mui('.mui-slider').slider({
        interval:1000
      });
      //初始化数字输入框
      mui('.mui-numbox').numbox()

      //点击尺码框改变样式
      $('.chima').on('click','span',function(){
        //console.log('hhaha');
        $(this).addClass('now').siblings().removeClass('now')
      })
    }
  })


  //点击加入购物车，去购物车页面
  $('.btn-car').on('click',function(){
    if(!$('span').hasClass('now')){
      mui.toast('请选择尺码')
      return
    }
    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
       if(e.index==0){
         var productId=$('.only').data('id');
         console.log(productId);
         var  num=$("[type='number']").data('num');
         var size=$('.size').data('size')
         $.ajax({

           type:'post',
           url:'/cart/addCart',
           data:{
             productId:productId,
             num:num,
             size:size
           },
           success:function(info){
             console.log(info)
              location.href='cart.html'
           }
         })

       }
    })
  })

});