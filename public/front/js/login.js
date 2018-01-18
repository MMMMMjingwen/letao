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
         if(info.error==403){
           mui.toast(info.message)
         }
         if(info.success){
           var search=location.search
           //获取地址栏的参数
           console.log(search);
           //判断是跳转到user页面还是购物车页面，
           // 购物车地址栏上有参数，
           // 判断是否有参数来判断跳转懂啊哪一个页面
           if(search.indexOf('retUrl')!=-1){
             search=search.replace('?retUrl=','')
             location.href=search
           }
           location.href='user.html'
         }
       }
     })



   })




})();
