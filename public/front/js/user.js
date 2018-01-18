/**
 * Created by 马靖文 on 2018/1/18.
 */
$(function(){

  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function(info){
      console.log(info);
      $('.user').html(template('tpl1',info))
    }
  })



});
