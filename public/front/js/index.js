/**
 * Created by 马靖文 on 2018/1/15.
 */
;(function(){

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005

  });



})();
