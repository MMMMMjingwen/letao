/**
 * Created by 马靖文 on 2018/1/15.
 */
;(function(){
  var $form=$('.myform')

  //获取验证码
  $('.btn-num').on('click',function(e){
    e.preventDefault();
      $(this).prop('disabled',true).removeClass('mui-btn-primary').text('发送中...')

    $.ajax({
      type:'get',
      url:'/user/vCode',
      data:$form.serialize(),
      success:function(info){
        console.log(info.vCode);
         var count=2;
        var id=setInterval(function(){
          count--
          $('.btn-num').text(count+'秒后获取')

          if(count==0){
            console.log('za');
            $('.btn-num').prop('disabled',false).removeClass('disabled').addClass('mui-btn-primary').text('再次发送')
           clearInterval(id)
          }
        },2000)


      }
    })

  })



  //用户注册
  $('.btn-zc').on('click',function(e){
    e.preventDefault();

    //注册表单验证
    var username=$("[name='username']").val()
    var password=$("[name='password']").val()
    var repassword=$("[name='repassword']").val()
    var mobile=$("[name='mobile']").val()
    var vCode=$("[name='vCode']").val()
    if(!username){
      mui.toast('请输入用户名')
      return false;
    };
    if(!password){
      mui.toast('请输入密码')
      return false;
    };
    if(repassword!==password){
      mui.toast('两次密码不一致',{ duration:'long', type:'div' })
      return false;
    }
    if(!vCode){
      mui.toast('请输入手机验证')
      return false;
    }
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))){
      mui.toast('手机号格式不正确')
      return false;
    }

    $.ajax({
      type:'post',
      url:'/user/register',
      data:$form.serialize(),
      success:function(info){
        console.log(info)
        if(info.success){
          mui.toast('恭喜你完成了注册')
          location.href='login.html'
        }
      }
    })



  })

})();
