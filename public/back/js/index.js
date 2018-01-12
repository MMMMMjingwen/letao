/**
 * Created by 马靖文 on 2018/1/11.
 */
;(function(){
  var square=echarts.init(document.querySelector('.square'));
  var round=echarts.init(document.querySelector('.round'));

  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };
  square.setOption(option);
  option1 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年12月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['nike','addias','new branlance','etigger','puma']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'nike'},
          {value:310, name:'addias'},
          {value:234, name:'new branlance'},
          {value:135, name:'etigger'},
          {value:1548, name:'puma'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  round.setOption(option1);
})();