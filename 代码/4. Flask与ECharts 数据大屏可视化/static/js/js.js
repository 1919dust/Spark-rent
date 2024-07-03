
$(function () {
setInterval(get_r1_data, 2000*1);
setInterval(echarts_l2, 2000*1);
setInterval(echarts_l3, 2000*1);
setInterval(echarts_c1, 2000*1);
setInterval(map, 2000*1);
setInterval(echarts_r1, 2000*1);
setInterval(echarts_r21, 2000*1);
setInterval(echarts_r22, 2000*1);
setInterval(echarts_r3, 2000*1);
function get_r1_data() {
	
	$.ajax({
		url: "/l1",
		success: function(data) {
			// data=JSON.parse(data)
			
			$("#order").html(data.order)
			$("#profit").html(data.profit)
			$("#customer").html(data.customer)
			$("#ATV").html(data.ATV)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
function echarts_l2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_l2'));


            $.ajax({
                url:'/l2',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
			
						tooltip: {
							trigger: 'axis'
						},
						color: ['#03b48e', '#3893e5'],
						legend: {
						  right: '5%',
						  top: '40%',
						  orient: 'vertical',
						  textStyle: {
							  fontSize: 12,
							  color: 'rgba(255,255,255,0.7)',
						  },
						},

						radar: [{
							indicator: [{
								text: '平均面积',
								max: 100
							}, {
								text: '房间数量',
								max: 5
							}, {
								text: '客厅数量',
								max: 3
							}, {
								text: '楼层层数',
								max: 30
							}, {
								text: '均价',
								max: 10000
							}],

							center: ['50%', '50%'],
							radius: '70%',
							startAngle: 90,
							splitNumber: 4,
							shape: 'circle',
						
							name: {
								padding:-5,
								formatter: '{value}',
								textStyle: {
									fontSize:10,
									color: 'rgba(255,255,255,.7)'
								}
							},
							splitArea: {
								areaStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							}
						}, ],
						series: [{
							name: '雷达图',
							type: 'radar',
							tooltip: {
								trigger: 'item'
							},
							data: [{
								name: '佛山市',
								value: data['new_customer'],
								lineStyle: {
									normal: { 
										color:'#03b48e',
										width:2,
									}
								},
								areaStyle: {
									normal: {
										color: '#03b48e',
										opacity:.4
									}
								},
								symbolSize: 0,
							  
							}, {
								name: '深圳市',
								value: data['old_customer'],
								symbolSize: 0,
								lineStyle: {
									normal: { 
										color:'#3893e5',
										width:2,
									}
								},
									 areaStyle: {
									normal: {
										color: 'rgba(19, 173, 255, 0.5)'
									}
								}
							}]
						}, ]
					};
		 


		         myChart.setOption(option);
		 
				window.addEventListener("resize",function(){
					myChart.resize();
				});


                }
            })




		}
function echarts_l3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_l3'));
        $.ajax({
                url:'/l3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
							legend: {
								icon:"circle",
								top: "0",
								width:'100%',
								right: 'center',
										itemWidth: 12,
										itemHeight: 10,
							 data: ['楼层数', '房间数量'],
							 textStyle: {
								 color: "rgba(255,255,255,.5)" },
						 },
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow',
									lineStyle: {
										 color: '#dddc6b'
									 }
								 }
							},

							 xAxis: [{
							    type: 'category',
								boundaryGap: false,
								axisLabel:  {
											rotate: -45,
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
										},
									},
								axisLine: {
											lineStyle: { 
												color: 'rgba(255,255,255,.1)'
											}
								},
				  
						   data: data['index']
				  
							}, {
				  
								axisPointer: {show: false},
								axisLine: {  show: false},
								position: 'bottom',
				  
							}],
					 
						  yAxis: [
						   {
									type: 'value',
									axisTick: {show: false},
								   // splitNumber: 6,
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
								   axisLabel:  {
									formatter: "{value}",
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
											},
										},
					
									splitLine: {
										lineStyle: {
											 color: 'rgba(255,255,255,.1)'
										}
									}
								}],
						 series: [
							 {
							 name: '房间数量',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: 'rgba(31, 174, 234, 1)',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(31, 174, 234, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(31, 174, 234, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#1f7eea',
									 borderColor: 'rgba(31, 174, 234, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['old_customer']
					 
						 }, 
					 {
							 name: '楼层数',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: '#6bdd9b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#6bdd9b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['new_customer']
					 
						 }, 
							  ]
					 
					 };
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
		            }
		})
		
    }
function echarts_c1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('echart_c11'));
		var myChart2 = echarts.init(document.getElementById('echart_c12'));
        $.ajax({
                url:'/c1',
                success:function (data) {
					$("#month_sales").html(data.sales)
					$("#year_sales").html(data.year_sales)					
					
					var option1 = {
							title: {
								text: '市覆盖率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['sales'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['achieving_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['target'] - data['sales'],
									}]
					
							}]
						}

					var option2 = {
							title: {
								text: '区域覆盖率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['year_sales'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['year_achieving_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['year_target'] - data['year_sales'],
									}]
					
							}]
						}
					
					myChart1.setOption(option1);
					myChart2.setOption(option2);
					window.addEventListener("resize",function(){
						myChart1.resize();
						myChart2.resize();
					});
				    }
		})
		
		
    }
function map() {
        // 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('map_1'));
        $.ajax({
                url:'/map',
                success:function (data) {

					var data =data['data']					
					var geoCoordMap = {
					 '广州市': [113.365116, 22.772595],
                        '韶关市': [113.800265, 23.902566],
                        '深圳市': [114.229205, 22.81253],
                        '珠海市': [113.262652, 22.392048],
                        '汕头市': [116.552551, 23.105891],
                        '佛山市': [112.975184, 23.463622],
                        '江门市': [112.165431, 22.385018],
                        '湛江市': [110.645401, 21.227394],
                        '茂名市': [110.706788, 21.521023],
                        '肇庆市': [112.830493, 23.545762],
                        '惠州市': [114.514451, 22.660747],
                        '梅州市': [116.368468, 23.73304],
                        '汕尾市': [115.606537, 23.471865],
                        '河源市': [115.419311, 23.243785],
                        '阳江市': [112.307824, 21.704174],
                        '清远市': [112.994804, 24.927347],
                        '东莞市': [114.229205, 22.81253],
                        '中山市': [113.568743, 22.411912],
                        '潮州市': [116.91704, 23.531662],
                        '揭阳市': [116.552551, 23.105891],
                        '云浮市': [112.47658, 22.704009],
					};
					var convertData = function (data) {
						var res = [];
						for (var i = 0; i < data.length; i++) {
							var geoCoord = geoCoordMap[data[i].name];
							if (geoCoord) {
								res.push({
									name: data[i].name,
									value: geoCoord.concat(data[i].value)
								});
							}
						}
						return res;
					};

					option = {
						title: {
							text: '广东省房源分布',
							subtext: '20大数据3班-林佳豪-张浩明-宋琦斌',
							left: 'center',
							textStyle: {
								color: 'rgba(255,255,255,0.7)',
								fontSize:18
							}
						},
						tooltip : {
							trigger: 'item',
							formatter: function (params) {
								  if(typeof(params.value)[2] == "undefined"){
									return params.name + ' : ' + params.value;
								  }else{
									return params.name + ' : ' + params.value[2];
								  }
								}
						},
					  
						geo: {
							map: 'china',
							label: {
								emphasis: {
									show: false
								}
							},
							roam: true,//禁止其放大缩小
							itemStyle: {
								normal: {
									areaColor: '#4c60ff',
									borderColor: '#002097'
								},
								emphasis: {
									areaColor: '#293fff'
								}
							}
						},
						series : [
							{
								name: '消费金额',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: convertData(data),
								symbolSize: function (val) {
									return val[2] / 150;
								},
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#ffeb7b'
									}
								}
							}
							

							,


						]
					};
					
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
					

				    }
		})
		
		
}

function echarts_r1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r1'));

        $.ajax({
                url:'/r1',
                success:function (data) {
                    // data=JSON.parse(data)

					var option = {
						title: {
							x: 'center',
							y: 0,
							textStyle:{
								color:'#B4B4B4',
								fontSize:16,
								fontWeight:'normal',
							},
							
						},
						tooltip: {
							trigger: 'axis',
							backgroundColor:'rgba(255,255,255,0.2)',
							axisPointer: {
								type: 'shadow',
								label: {
									show: true,
									backgroundColor: 'rgba(255,255,255,0.7)',
								}
							}
						},
						legend: {
							textStyle: {
							  fontSize: 12,
								color: 'rgba(255,255,255,0.7)'
							},
							top:'7%',
						},
						grid:{
							x:'12%',
							width:'82%',
							y:'12%',
						},
						xAxis: {
							data: data['index'],
							splitNumber:4,
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)'
								}
							},
							
							axisLabel:  {
										rotate: -45,
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							
							axisTick:{
								show:false,
							},
						},
						yAxis: [{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
									}
								},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							},
							{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
								}
							},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
						}],
						
						series: [
									{
									name: '租金/元',
									type: 'bar',
									barGap: '-100%',
									barWidth: 10,
									itemStyle: {
										normal: {
											barBorderRadius: 5,
											color: new echarts.graphic.LinearGradient(
												0, 0, 0, 1,
												[
													{offset: 0, color: 'rgba(0,254,204,0.4)'},
													// {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
													{offset: 1, color: 'rgba(38,144,207,0.1)'}
												]
											)
										}
									},
									z: -12,
									
									data: data['sales']
								},
								 {
								name: '',
								type: 'bar',
								barWidth: 10,
								itemStyle: {
									normal: {
										barBorderRadius: 5,
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(0,254,204,0.8)'},
												{offset: 1, color: 'rgba(38,144,207,0.8)'}
											]
										)
									}
								},
								data: data['profit']
							}, 
						  
						  
						  {
							name: '面积/平方米',
							type: 'line',
							smooth: true,
							showAllSymbol: true,
							symbol: 'emptyCircle',
							symbolSize: 8,
							yAxisIndex: 1,
							itemStyle: {
									normal: {
									color:'#3893e5'},
							},
							data: data['profit_rate']
						}, 
						
			 
						
			 
					   ]
					};
						
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
		})
    }	
function echarts_r21() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r21'));

        $.ajax({
                url:'/r21',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
				 grid: {
				   top: '0%',
				   bottom: '10%',
				   left:'25%',
				 },

				 yAxis: {
				   data: data['product'],
				   axisLine: {
					 show: false,
					 lineStyle: {
					   color: "rgba(255,255,255,0.7)",
					 },
				   },
				   axisTick: {
					 show: false
				   },
				   axisLabel: {
					 interval: 0,
					 fontSize: 12
				   }
				 },
				 xAxis: [
					   {show: false}
				 ],
				 series: [
				   {
					 type: "bar",
					 barWidth: "40%",
					 barGap: 5,
					 itemStyle: {
					   normal: {
						 color: new echarts.graphic.LinearGradient(1, 0, 0, 0,
						   [
							 {
							   offset: 0,
							   color: "#00fecc"
							 },
							 {
							   offset: 0.8,
							   color: "#2690cf"
							 }
						   ],
						   false
						 ),
					   },
					 },
					label: {
					  normal: {
						  show: true,
						  fontSize: 10,
						  fontWeight: 'normal',
						  color: '#ffffff',
						  position: 'right',
					  }
					},
					 data:data['sales']
				   },

				 ]
			   };
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
			}
		})	
    }
function echarts_r22() {//产品四象限图
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r22'));
        $.ajax({
                url:'/r22',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {	    
					 color: [
						'rgb(255,235,0)', 'rgb(37,214,245)', 'rgb(255,0,255)'
					],
					legend: {
						y: 'top',
						top: '0%',
						data: data['type'],
						itemHeight:10,
						textStyle: {
							color: 'rgba(255,255,255,0.7)',
							fontSize: 10
						}
					},
					tooltip: {
						trigger: 'axis',
						formatter: "{a} <br/>{c} ",
						    },
					
					grid: {
					   top: '15%',
					   right:'10%',
					   bottom: '10%',
					 },
					
					xAxis: {
						  splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					yAxis: {
								splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					series: [
								{ name: data['type'][0],
								  symbolSize: 10,
								  data: data['data'][0],
								  type: 'scatter',
								},
								{ name: data['type'][1],
								  symbolSize: 10,
								  data: data['data'][1],
								  type: 'scatter'
								},
								{ name: data['type'][2],
								  symbolSize: 10,
								  data: data['data'][2],
								  type: 'scatter',
								　markLine: {
											symbol: 'none',
											data: [
								　　　　　　　　{
												yAxis: data['profit_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'利润平均线',
													fontSize:10,
													padding: [-13, -20, 15, -45]
												}},
												{
												xAxis: data['sales_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'销售额平均线',
													fontSize:10,
													
													}
											}
										  ]
									 }, 								  
								}
							  ]
							};
				 
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
		
			}
		})	
		
    }
function echarts_r3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r3'));
        $.ajax({
                url:'/r3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
					  tooltip: {
						trigger: 'axis',
						axisPointer: {
						  type: 'shadow' 
						}
					  },
					  legend: { padding:[20, 0, 0 ,0],				
						textStyle: {
									color: 'rgba(255,255,255,0.7)',
									fontSize: 10
					  }},
					  grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					  },
					  xAxis: {
							show: false
						},
					  yAxis: {
						type: 'category',
						data: ['房租均价', '房源数量', '房源均面积'],
						axisTick: {show: false},
						axisLine:{show: false},
						axisLabel: {
								textStyle: {
									color: 'rgba(255,255,255,0.7)',
								}},
					  },
					  series: [
						{
						  name: '至尊套房',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(37,214,245)'},
						  data: data['data'][0]
						},
						{
						  name: '轻奢房源',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(30,178,204)'},
						  data: data['data'][1]
						},
						{
						  name: '平价租房',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(7,152,179)'},
						  data: data['data'][2]
						},
					  ]
					};
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
				})
			

			}
	
})



		
		
		


		









