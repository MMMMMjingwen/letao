/**
 * Created by 马靖文 on 2018/1/11.
 */
<<<<<<< HEAD
;(function(){
  var $form=$('form');

  $form.bootstrapValidator({

    //配置校验时的图标,
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验的规则
    //字段，你想要校验哪些字段
    fields: {
      //username对应的表单中name属性。
      username: {
        //username的规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message:"用户名不存在"
          }
        }

      },
      password: {

        //password的规则
        validators: {
          notEmpty: {
            message: "用户密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度是6-12位"
          },
          callback: {
            message:"密码错误"
          }
        }

      }
    }

  });


  $form.on("success.form.bv", function (e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data: $form.serialize(),
      success:function(info){
        if(info.success){
          location.href='index.html';
        }
        if(info.error === 1000){

          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }

        if(info.error === 1001){
          //alert("密码错误");

          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })

  //重置
  $("[type='reset']").on('click',function(){
     $form.data('bootstrapValidator').resetForm()
=======

;(function () {
  var $form = $('form');
  //初始化表单
  $form.bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验的字段
    fields:{
        username:{
          validators:{
            notEmpty:{
               message:'用户名不可以为空'
            },
            callback:{
              message:'用户名不存在'
            },
          },
        },

      password:{
        validators:{
          notEmpty:{
            message:'密码不可以为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码的长度必须在6-12之间'
          },
          callback:{
            message:'密码错误'
          },
        }
      }
    },

  })


//注册表单验证成功事件
  $form.on('success.form.bv',function(e){
    e.preventDefault() // 阻止form表单的跳转功能
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      datatype:'json',
      data: $form.serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          location.href='index.html'
        }
        if(info.error==1000){
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID' , 'callback')
        };
        if(info.error==1001){
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID' , 'callback')
        }
      }
    })


  })

  //重置样式
  $('[type=reset]').on('click',function(){
    $form.data('bootstrapValidator').resetForm()
>>>>>>> login
  })
})();



