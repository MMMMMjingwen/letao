/**
 * Created by 马靖文 on 2018/1/14.
 */
$(function () {

  var page = 1;
  var pageSize = 5;
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
        console.log(info)
          $('.dropdown-menu').html( template('menTpl' ,info))
      }
    })
  })

  //显示当前的二级分类
  $('.dropdown-menu').on('click','.seco',function(){
    $('.second-txt').text($(this).text())
    $id=$(this).data('id')

  })

  //表单验证
   $('form').bootstrapValidator({
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
       invalid: 'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
     },

     fields:{
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
           }
         }
       },
       size:{
         validators:{
           notEmpty:{
             message:'不可以为空'
           }
         }
       },
       oldPrice:{
         validators:{
           notEmpty:{
             message:'不可以为空'
           }
         }
       },
       price:{
         validators:{
           notEmpty:{
             message:'不可以为空'
           }
         }
       },
     },

   })


});