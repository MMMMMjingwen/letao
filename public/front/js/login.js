/**
 * Created by 马靖文 on 2018/1/15.
 */
;(function(){



   $('.btn-land').on('click',function(){
     var username=$("[name='username']").val()
     var password=$("[name='password']").val()

     if(!username){
       mui.toast('请输入用户名')
       return false
     };
     if(!password){
       mui.toast('请输入密码')
       return false
     };

     $.ajax({
       type:'post',
       url:'/user/login',
       data:{
         username:username,
         password:password
       },
       success:function(info){
         console.log(info);
         if(info.success){
           location.href='user.html'
         }
       }
     })



   })




})();
