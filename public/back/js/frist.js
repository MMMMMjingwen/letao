/**
 * Created by 马靖文 on 2018/1/13.
 */

;(function(){
 // 后台获取一级数据
  var page=1;
  var pageSize=5;
  render()
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        //console.log(info)

        $('tbody').html(template('oneTpl',info))
        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages: Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,p) {
             page = p;
            render();
          }
        });
      }
    })
  }


//表单验证
  var $form = $("#form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类的名称"
          },

        },

      }
    }
  });


//点击添加分类 弹出模态框
  $('.pb-20').on('click',function(){
    $('#fristmodal').modal('show');
  })


  $("#form").on('success.form.bv',function(e){

    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info)
        if (info.success) {
          $('#fristmodal').modal('hide');
          render();
        }
        //$form.data('bootstrapValidator').resetForm();
        $form.data("bootstrapValidator").resetForm();
        $form[0].reset();
      }

    })

  })



})();