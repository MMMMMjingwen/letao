
mui('.mui-scroll-wrapper').scroll({
  indicators:false
});

mui(".mui-slider").slider({
  interval: 1000
});

  var tools={
    getSearchObj:function(){
      var search=decodeURI(location.search)
      search= search.slice(1)
      //console.log(search);
      var arr=search.split('&')
      //console.log(arr);
      var obj={};
      for(var i = 0; i < arr.length; i++) {
        var k=arr[i].split('=')[0]
        //console.log(k);
        var v=arr[i].split('=')[1]
        //console.log(v);
        obj[k]=v;
      }
      return obj
    },

    getSearch:function(key){
      return this.getSearchObj()[key]
    }
  }


