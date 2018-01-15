/**
 * Created by 马靖文 on 2018/1/13.
 */
$(function () {


  var page = 1;
  var pageSize = 5;
  render()
  //获取后台二级分类的数据
  function render() {

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info)
        $('tbody').html(template('menuTpl', info))
        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }


  //弹出模态框
  $('.pb-20').on('click', function () {
    $('#secondmodal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        $('.dropdown-menu').html(template('cellTpl', info))
      }
    })

  })
  // 表单验证
  var $form = $("#form");
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });
  //选中下拉列表并的到隐藏域的id值
  $('.dropdown-menu').on('click', '.list', function () {


    $('.cart-txt').text($(this).text())


    var id = $(this).data('id');

    $("[name='categoryId']").val(id);

    //$('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    //$('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')


  })





  //点击图片显示
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      console.log(data)
      var res = data.result.picAddr;
      $('.sec-img').attr('src', res)
    }
  });

  $('.btn-add').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      success: function (info) {
        console.log(info)
        render()
      }

    })
  })


});
