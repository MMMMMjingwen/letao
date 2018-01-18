/**
 * Created by 马靖文 on 2018/1/16.
 */
$(function(){

  var key=tools.getSearch("key");
  $('.search-txt').val(key)


  //渲染页面
  function render(){
    var param={};
      param.page=1;
     param.pageSize=10;
     param.proName=$('.search-txt').val().trim()
    var $now=$('.proList a.now')
    if($now.length > 0){
      var type=$now.data('type')
      var value=$now.find('span').hasClass('fa-angle-down')? 2:1
      param[type]=value
    }
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:param,
      success:function(info){
        console.log(info);
        setTimeout(function(){
          $('.lt-shopping').html(template('listTpl',info))
        },1000)
        //$('.wait').hide();

      }

    })

  }
  render()
  //点击搜索按钮渲染页面
  $('.btn-search').on('click',function(){
     $('.search-txt').val();
    render()
  })

//给带now类的标签注册点击事件
  $('.proList [data-type]').on('click',function(){
    // 如果a便签有now类 就切换箭头的方向

    if($(this).hasClass('now')){
      $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      //如果没有该类的话，就添加now类并且改变箭头的方向
      $(this).addClass('now').siblings().removeClass('now')
       //$(this).siblings().find('span').addClass('fa-angle-down').removeClass('fa-angle-up')
      $('.proList span').addClass('fa-angle-down').removeClass('fa-angle-up')

    }

    render()
  })



});