/* US profile charts */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();     // 美利坚蓝
  var accent2 = style.getPropertyValue('--accent2').trim();   // 中国红(基准)
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  /* --- chart-gdp: nominal GDP trajectory --- */
  var gdp = echarts.init(document.getElementById('chart-gdp'), null, { renderer: 'svg' });
  gdp.setOption({
    animation:false,
    tooltip:{ trigger:'axis', appendToBody:true },
    legend:{ data:['美国','中国'], top:0, textStyle:{ color:muted } },
    grid:{ left:52, right:20, top:42, bottom:36 },
    xAxis:{ type:'category', data:['1990','2000','2010','2020','2025'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
    yAxis:{ type:'value', name:'万亿美元', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    series:[
      { name:'美国', type:'line', smooth:true, symbolSize:7, data:[5.96,10.25,15.05,21.35,30.77], itemStyle:{color:accent}, lineStyle:{width:3,color:accent}, areaStyle:{color:accent+'22'} },
      { name:'中国', type:'line', smooth:true, symbolSize:7, data:[0.36,1.21,6.09,14.69,19.50], itemStyle:{color:accent2}, lineStyle:{width:3,color:accent2}, areaStyle:{color:accent2+'1f'} }
    ]
  });
  window.addEventListener('resize', function(){ gdp.resize(); });

  /* --- chart-energy: US electricity mix --- */
  var en = echarts.init(document.getElementById('chart-energy'), null, { renderer: 'svg' });
  en.setOption({
    animation:false,
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'} },
    grid:{ left:80, right:40, top:20, bottom:40 },
    xAxis:{ type:'value', name:'发电占比 %', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    yAxis:{ type:'category', data:['化石能源','非水可再生','核电','水电'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink} },
    series:[{
      name:'约2025占比', type:'bar', barWidth:22, max:100,
      data:[{value:58,itemStyle:{color:accent}},{value:19,itemStyle:{color:accent}},{value:18,itemStyle:{color:accent}},{value:5,itemStyle:{color:accent+'aa'}}],
      label:{ show:true, position:'right', formatter:'{c}%', color:muted, fontFamily:'DMMono' }
    }]
  });
  window.addEventListener('resize', function(){ en.resize(); });

  /* --- chart-companies: Big Tech market cap --- */
  var cmp = echarts.init(document.getElementById('chart-companies'), null, { renderer: 'svg' });
  cmp.setOption({
    animation:false,
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'} },
    grid:{ left:56, right:40, top:20, bottom:40 },
    xAxis:{ type:'value', name:'万亿美元', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    yAxis:{ type:'category', data:['Apple','Microsoft','NVIDIA','Alphabet','Amazon','Meta'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink}, inverse:true },
    series:[{
      name:'约2025市值', type:'bar', barWidth:18,
      data:[3.3,3.2,3.0,2.4,2.2,1.6],
      itemStyle:{color:accent},
      label:{ show:true, position:'right', formatter:'{c}万亿$', color:muted, fontFamily:'DMMono' }
    }]
  });
  window.addEventListener('resize', function(){ cmp.resize(); });

  /* --- chart-co2: annual CO2 emission --- */
  var co2 = echarts.init(document.getElementById('chart-co2'), null, { renderer: 'svg' });
  co2.setOption({
    animation:false,
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['美国','中国'], top:0, textStyle:{color:muted} },
    grid:{ left:56, right:20, top:42, bottom:36 },
    xAxis:{ type:'category', data:['2024 年度排放(亿吨CO₂)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink} },
    yAxis:{ type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    series:[
      { name:'美国', type:'bar', barWidth:64, data:[59.1], itemStyle:{color:accent}, label:{show:true,position:'top',formatter:'59.1亿吨\n占全球11.1%',color:muted,fontSize:11} },
      { name:'中国', type:'bar', barWidth:64, data:[155.4], itemStyle:{color:accent2}, label:{show:true,position:'top',formatter:'155.4亿吨\n占全球29.2%',color:muted,fontSize:11} }
    ]
  });
  window.addEventListener('resize', function(){ co2.resize(); });

  /* --- chart-radar: comprehensive power --- */
  var radar = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  radar.setOption({
    animation:false,
    tooltip:{ appendToBody:true },
    legend:{ data:['美国','中国'], top:0, textStyle:{color:muted} },
    radar:{
      indicator:[
        {name:'经济总量',max:10},{name:'科技创新',max:10},{name:'军事实力',max:10},{name:'制造业',max:10},
        {name:'基础设施',max:10},{name:'能源资源',max:10},{name:'教育科研',max:10},{name:'文化影响',max:10},
        {name:'外交地缘',max:10},{name:'人口规模',max:10}
      ],
      radius:'62%',
      axisName:{color:ink,fontSize:12},
      splitLine:{lineStyle:{color:rule}},
      splitArea:{show:true,areaStyle:{color:[bg2,'#f7f7f3']}},
      axisLine:{lineStyle:{color:rule}}
    },
    series:[{
      type:'radar', symbolSize:3,
      data:[
        { name:'美国', value:[9.2,9.7,9.9,8.2,7.2,8.8,9.4,9.2,9.0,7.0], itemStyle:{color:accent}, areaStyle:{color:accent+'2e'} },
        { name:'中国', value:[8.0,7.2,7.4,9.6,9.6,8.2,7.6,6.9,7.4,9.4], itemStyle:{color:accent2}, areaStyle:{color:accent2+'24'} }
      ]
    }]
  });
  window.addEventListener('resize', function(){ radar.resize(); });
})();