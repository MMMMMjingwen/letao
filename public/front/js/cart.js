/**
 * Created by 马靖文 on 2018/1/17.
 */
$(function(){

  function render(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      success:function(info){
        console.log(info);
        if(info.error==400){
          location.href='login.html'
        }
        setTimeout(function(){
          $('.cart-box').html( template('Tpl',{list:info}) )
          //结束下拉刷新
          mui(".mui-scroll").pullRefresh().endPulldownToRefresh();
        },1000)

      }
    });
  }

  //功能1 下拉刷新
    mui.init({
      pullRefresh:{
        container:'.mui-scroll',
        down:{
          auto: true,
          callback:function(){
            render();
          }
        }}

    });


 //功能2 点击删除按钮 删除商品
  $('.cart-box').on('tap','.btn-del',function(){
    var that=this;
    mui.confirm('你是否要删除该商品','温馨提示',['否','是'],function(e){
      if(e.index==1){
        var data=that.dataset;
        console.log(data);
        var id=data.id;
        $.ajax({
          type:'get',
          url:'/cart/deleteCart',
          data:{
            id:[id],
          },
          success:function(info){
            console.log(info);
            if(info.error==400){
              location.href='login.html'
            }
            if(info.success){
              render();
            }

          }
        })
      }
    })


  })

 //功能3  点击编辑按钮，修改商品
   $('.cart-box').on('tap','.btn-edit',function(){

     var data=this.dataset;
     console.log(data);
     var html=template('tpl2',data)
     html=html.replace(/\n/g,'')

     mui.confirm( html, '编辑商品',['确定','取消'],function(e){

      if(e.index==0){
        var size=$('.chima span.now').text()
        var num=$("[type='number']").val()
        var id=data.id
        //console.log(size);
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
             id:id,
            size:size,
            num:num
          },
          success:function (info){
            console.log(info);
            if(info.success){
              render()
            }

        },
        })
      }
    })
     mui('.mui-numbox').numbox();
     //给修改的尺码和数量修改并渲染到页面上
     $('.chima span').on('tap',function(){
       $(this).addClass('now').siblings().removeClass('now')
     })
  })


  //点击check标签，生成对应的价格
   $('.cart-box').on('change','.ck',function(){
     if($('.ck:checked').length>0){
       var price=$('.btn-del').data('price')
       var num=$('.btn-del').data('num')
       var total=0;
       for(var i=0; i<=$('.ck:checked').length; i++){
            total +=price*num
       }
       $('.tot').text(total)
     }else{

       $('.tot').text('00:00')
     }

   })

})