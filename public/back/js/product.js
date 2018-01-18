/**
 * Created by 马靖文 on 2018/1/14.
 */
;(function(){
  var page = 1;
  var pageSize = 5;
  var imgs=[ ];
  render()
  function render() {

    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        $('tbody').html(template('proTpl', info))
        //渲染分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, p) {
            page = p
            render()
          }
        })

      }
    })
  }

// 弹出模态框
  $('.pb-20').on('click', function () {

    $('#proModal').modal('show')
    //渲染下拉列表
    $.ajax({
      type: 'get',
      url: ' /category/querySecondCategoryPaging',
      data: {
        page:page,
        pafeSize:pageSize
      },
      success:function(info){
        //console.log(info)
        $('.dropdown-menu').html( template('menTpl' ,info))
      }
    })
  })

  //显示当前的二级分类
  $('.dropdown-menu').on('click','.seco',function(){
    $('.second-txt').text($(this).text())

    var id=$(this).data('id')
    $("[name='brandId']").val(id)

    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')

  })

  //表单验证

  var $form=$('#form')
  $form.bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'不可以为空'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'不可以为空'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'不可以为空'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'不可以为空'
          },
          regexp: {
            regexp:/^[1-9]\d*$/,
            message: '输入合法库存'
          }
        }
      },
      size: {
        validators:{
          notEmpty:{
            message:'不可以为空'
          },
          regexp: {
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators:{
          notEmpty:{
            message:'不可以为空'
          }
        }
      },
      price: {
        validators:{
          notEmpty:{
            message:'不可以为空'
          }
        }
      },
      brandLogo: {
        validators:{
          notEmpty:{
            message:'请传入三张图片'
          }
        }
      },
    },

  })


  //图片初步上传
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      //console.log(data);
      console.log(data.result);
      var res=(data.result.picAddr);
      //console.log(res);

       imgs.push(data.result);
      $('[name="brandLogo"]').val(res)

      $('.img-box').append('<img  height="100" src="'+res+'">')
      if(imgs.length>3){
        return
      }
      if(imgs.length==3){

        $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
      }else{
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','INVALID')
      }


    }
  })

   //表单注册成功事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();

    var param=$('#form').serialize()

    param+='&picName1='+imgs[0].picName+'&picAddr1='+imgs[0].picAddr;
    param+='&picName2='+imgs[1].picName+'&picAddr2='+imgs[1].picAddr;
    param+='&picName3='+imgs[2].picName+'&picAddr3='+imgs[2].picAddr;


    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:param,
      success:function(info){
        console.log(info)
        if(info.success){
           render()
          $('#proModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true)
          $('.second-txt').text('请输入二级分类');
          $('.img-box img').remove()
          imgs=[];
        }
      }
    })

  })
    ;





  })();



