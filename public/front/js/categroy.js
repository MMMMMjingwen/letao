/**
 * Created by 马靖文 on 2018/1/15.
 */
;(function(){

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false,
  });
  //一级分类查询
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info)
      $('.fristName').html(template('oneTpl',info))
    }
  })

  //获取一级分类id
  $('.mui-scroll').on('click' ,'.list', function (){
    var id=$(this).data('id')
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function(info){
        console.log(info);
        $('.brand').html(template('twoTpl',info))
      }
    })



  })





})();