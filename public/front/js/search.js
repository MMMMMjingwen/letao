/**
 * Created by 马靖文 on 2018/1/16.
 */
$(function(){

 //渲染搜索记录
  //获得数据
  //localStorage.setItem("lt_search_history",'["aa","cc","dd","gg"]')
  function getHistory(){
    var history = localStorage.getItem("lt_search_history") ||"[]"
    //console.log(history);
    var arr = JSON.parse(history);
    //console.log(arr);
    return arr
  }
  //数据渲染
  function render(){
    var arr=  getHistory()
    $('.lt_histroy').html( template('listTpl',{arr:arr}))
 }
  render()

//清空数据
  $('.lt_histroy').on('click','.btn-del',function(){
    mui.confirm('您确认要全部删除吗','温馨提示',["否" ,"是"],function(e){

      console.log(e);
      if(e.index== 1){
        localStorage.removeItem('lt_search_history')
        render()
      }
    })
  })


//删除单个数据

$('.lt_histroy').on('click','.btn-smdels',function(){
  var arr= getHistory();
  var index=$(this).data('index')
  console.log(index);
  mui.confirm('你确定要删除吗','温馨提示',['否','是'],function(e){
     //console.log(e);
     if(e.index==1){
       arr.splice(index,1)
       console.log(arr);
       localStorage.setItem('lt_search_history',JSON.stringify(arr))
       render()

     }




   })

})

// 添加数据
  //1. 历史记录最大不超过10
  //2. 如果搜索的历史记录，已经存在，需要把这个历史记录移动到最前面。

   $('.btn-search').on('click',function(){
     var arr= getHistory();
     var searchVal=$('.search-txt').val().trim();
     if(searchVal==''){
       mui.toast('请输入关键字')
       return
     }
     var index=arr.indexOf(searchVal) //searchVal第一次出现的索引
     if(index!=-1) { // 说明存在
       arr.splice(index,1)
     }
     if(arr.length >= 10){
       arr.pop()
     }
       arr.unshift(searchVal)
       console.log(arr);
      localStorage.setItem('lt_search_history',JSON.stringify(arr));
      render()
     $('.search-txt').val('')

      location.href='searchList.html?key='+searchVal
   })

});
