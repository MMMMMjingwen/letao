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
    },2000)

  });

  //二级显示隐藏的功能
   $('.child').prev().on('click',function(){
     $(this).next().slideToggle();
  })

  //

});
