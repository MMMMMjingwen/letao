/**
 * Created by 马靖文 on 2018/1/11.
 */
$(function(){
  $(document).ajaxStart(function () {
    console.log("开始");
    NProgress.start();
  });

  $(document).ajaxStop(function () {

    setTimeout(function(){
      NProgress.done();
      console.log("结束");
    },500)

  });

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
     $('.modal').modal('show')

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
