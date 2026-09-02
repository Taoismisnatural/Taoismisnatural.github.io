/* US-China comparison charts — red=China, blue=US, side-by-side */
(function () {
  var css = getComputedStyle(document.documentElement);
  var red  = css.getPropertyValue('--red').trim();    // 中国红
  var blue = css.getPropertyValue('--blue').trim();   // 美利坚蓝
  var ink  = css.getPropertyValue('--ink').trim();
  var muted= css.getPropertyValue('--muted').trim();
  var rule = css.getPropertyValue('--rule').trim();
  var bg2  = css.getPropertyValue('--bg2').trim();

  var SHARED = { animation:false, textStyle:{fontFamily:'PingFang SC,Microsoft YaHei,sans-serif'} };
  function base(anchor, h){ var c=echarts.init(document.getElementById(anchor),null,{renderer:'svg'}); c.setOption(SHARED); return c; }
  function resize(c){ window.addEventListener('resize', function(){ c.resize(); }); return c; }

  /* --- chart-gdp: nominal GDP trajectory 1980-2025 --- */
  var gdp = resize(base('chart-gdp',360));
  gdp.setOption({
    tooltip:{ trigger:'axis', appendToBody:true },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:{ left:56, right:20, top:44, bottom:36 },
    xAxis:{ type:'category', data:['1980','1990','2000','2010','2020','2025'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
    yAxis:{ type:'value', name:'万亿美元', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    series:[
      { name:'中国', type:'line', smooth:true, symbolSize:7, data:[0.19,0.36,1.21,6.09,14.69,19.50], itemStyle:{color:red}, lineStyle:{width:3,color:red}, areaStyle:{color:red+'22'} },
      { name:'美国', type:'line', smooth:true, symbolSize:7, data:[2.86,5.96,10.25,15.05,21.35,30.77], itemStyle:{color:blue}, lineStyle:{width:3,color:blue}, areaStyle:{color:blue+'1f'} }
    ]
  });

  /* --- chart-gdpsize: GDP scale & per-capita (two-panel) --- */
  var gs = resize(base('chart-gdpsize',320));
  gs.setOption({
    tooltip:{ trigger:'item', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:[ {left:'3%',right:'53%',top:60,bottom:40}, {left:'52%',right:'4%',top:60,bottom:40} ],
    xAxis:[
      { type:'category', data:['名义GDP','PPP GDP'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
      { type:'category', data:['人均名义GDP'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} }
    ],
    yAxis:[
      { type:'value', name:'万亿$', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
      { type:'value', name:'千$', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} }
    ],
    series:[
      { name:'中国', type:'bar', barWidth:26, xAxisIndex:0,yAxisIndex:0, data:[19.5,35.3], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:26, xAxisIndex:0,yAxisIndex:0, data:[30.8,30.5], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} },
      { name:'中国·人均', type:'bar', barWidth:26, xAxisIndex:1,yAxisIndex:1, data:[1.4], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国·人均', type:'bar', barWidth:26, xAxisIndex:1,yAxisIndex:1, data:[9.2], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-mfg: manufacturing key metrics (mixed units) --- */
  var mfg = resize(base('chart-mfg',340));
  mfg.setOption({
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'},
      formatter:function(p){ var u={0:'亿吨',1:'百万辆'}; var out=p[0].axisValueLevel||''; var rows=p.map(function(o){return o.marker+' '+o.seriesName+'：'+o.value+' '+(u[o.axisIndex]||'');}); return '粗钢/汽车<br/>'+rows.join('<br/>'); } },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:{ left:64, right:30, top:44, bottom:40 },
    xAxis:{ type:'category', data:['粗钢(亿吨)','汽车(百万辆)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink} },
    yAxis:{ type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    series:[
      { name:'中国', type:'bar', barWidth:44, data:[9.61,34.53], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:44, data:[0.82,12.79], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-energy: wind & solar capacity GW --- */
  var en = resize(base('chart-energy',340));
  en.setOption({
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:{ left:60, right:30, top:44, bottom:40 },
    xAxis:{ type:'category', data:['风电(GW)','太阳能(GW)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink} },
    yAxis:{ type:'value', name:'GW', nameTextStyle:{color:muted}, axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    series:[
      { name:'中国', type:'bar', barWidth:46, data:[640,1200], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:46, data:[159,154], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-tech: innovation (PCT patents & R&D intensity, two-panel) --- */
  var tech = resize(base('chart-tech',320));
  tech.setOption({
    tooltip:{ trigger:'item', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:[ {left:'3%',right:'53%',top:60,bottom:40}, {left:'52%',right:'4%',top:60,bottom:40} ],
    xAxis:[
      { type:'category', data:['PCT专利(件)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
      { type:'category', data:['R&D强度(%GDP)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} }
    ],
    yAxis:[
      { type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
      { type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} }
    ],
    series:[
      { name:'中国', type:'bar', barWidth:30, xAxisIndex:0,yAxisIndex:0, data:[73718], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:30, xAxisIndex:0,yAxisIndex:0, data:[52617], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} },
      { name:'中国·R&D', type:'bar', barWidth:30, xAxisIndex:1,yAxisIndex:1, data:[2.64], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}%',color:red,fontFamily:'DMMono'} },
      { name:'美国·R&D', type:'bar', barWidth:30, xAxisIndex:1,yAxisIndex:1, data:[3.4], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}%',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-mil: military forces comparison --- */
  var mil = resize(base('chart-mil',360));
  mil.setOption({
    tooltip:{ trigger:'axis', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:{ left:120, right:30, top:44, bottom:40 },
    xAxis:{ type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
    yAxis:{ type:'category', data:['国防预算(十亿$)','现役(万人)','航母(艘)','部署核弹(百枚)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink}, inverse:true },
    series:[
      { name:'中国', type:'bar', barWidth:16, data:[336,203.5,3,6.2], itemStyle:{color:red}, label:{show:true,position:'right',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:16, data:[954,133.3,11,50.4], itemStyle:{color:blue}, label:{show:true,position:'right',formatter:'{c}',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-co2: emissions (annual & per-capita, two-panel) --- */
  var co2 = resize(base('chart-co2',320));
  co2.setOption({
    tooltip:{ trigger:'item', appendToBody:true, axisPointer:{type:'shadow'} },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    grid:[ {left:'3%',right:'53%',top:60,bottom:40}, {left:'52%',right:'4%',top:60,bottom:40} ],
    xAxis:[
      { type:'category', data:['年排放(亿吨CO₂)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
      { type:'category', data:['人均(吨/人)'], axisLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} }
    ],
    yAxis:[
      { type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} },
      { type:'value', axisLabel:{color:muted}, splitLine:{lineStyle:{color:rule}} }
    ],
    series:[
      { name:'中国', type:'bar', barWidth:44, xAxisIndex:0,yAxisIndex:0, data:[155], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国', type:'bar', barWidth:44, xAxisIndex:0,yAxisIndex:0, data:[59], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} },
      { name:'中国·人均', type:'bar', barWidth:44, xAxisIndex:1,yAxisIndex:1, data:[9.1], itemStyle:{color:red}, label:{show:true,position:'top',formatter:'{c}',color:red,fontFamily:'DMMono'} },
      { name:'美国·人均', type:'bar', barWidth:44, xAxisIndex:1,yAxisIndex:1, data:[19.2], itemStyle:{color:blue}, label:{show:true,position:'top',formatter:'{c}',color:blue,fontFamily:'DMMono'} }
    ]
  });

  /* --- chart-radar: comprehensive national power --- */
  var radar = resize(base('chart-radar',460));
  radar.setOption({
    tooltip:{ appendToBody:true },
    legend:{ data:['中国','美国'], top:0, textStyle:{color:muted} },
    radar:{
      indicator:[
        {name:'经济总量',max:10},{name:'科技创新',max:10},{name:'军事实力',max:10},{name:'制造业',max:10},
        {name:'基础设施',max:10},{name:'能源资源',max:10},{name:'教育科研',max:10},{name:'文化影响',max:10},
        {name:'外交地缘',max:10},{name:'人口规模',max:10}
      ],
      radius:'62%',
      axisName:{color:ink,fontSize:12},
      splitLine:{lineStyle:{color:rule}},
      splitArea:{show:true,areaStyle:{color:[bg2,'#f2f2ec']}},
      axisLine:{lineStyle:{color:rule}}
    },
    series:[{
      type:'radar', symbolSize:3,
      data:[
        { name:'中国', value:[8.0,7.2,7.4,9.6,9.6,8.2,7.6,6.9,7.4,9.4], itemStyle:{color:red}, areaStyle:{color:red+'2e'} },
        { name:'美国', value:[9.2,9.7,9.9,8.2,7.2,8.8,9.4,9.2,9.0,7.0], itemStyle:{color:blue}, areaStyle:{color:blue+'24'} }
      ]
    }]
  });
})();