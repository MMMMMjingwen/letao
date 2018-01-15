/**
 * Created by 马靖文 on 2018/1/11.
 */
;$(function(){
  $(document).ajaxStart(function () {
    //console.log("开始");
    NProgress.start();
  });

  $(document).ajaxStop(function () {

    setTimeout(function(){
      NProgress.done();
      //console.log("结束");
    },500)

  });

  //每次登陆的时候校验是否登陆过
  if(location.href.indexOf('login.html')==-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (data) {
        if(data.error === 400){
          //说明用户没有登录，跳转到登录页面
          location.href = "login.html";
        }
      }
    })
  }

  //二级显示隐藏的功能
  $('.child').prev().on('click',function(){
    $(this).next().slideToggle();
  })


  //侧边栏显示和隐藏
  $('.lt_menu').on('click',function(){
    $('.lt_silde').toggleClass('small')
    $('.lt_main').toggleClass('small')

  })

  //退出功能
  $('.lt_loginout').on('click',function(){
    $('#commodal').modal('show')

  })

  $('.btn-loginout').on('click',function(){

    $.ajax({
      type:"get",
      url:'/employee/employeeLogout',
      success:function(info){
        console.log(info)
        if(info.success){
          location.href = "login.html";
        }
      }
    })

  })
});




