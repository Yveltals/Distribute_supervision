<template>
<div id="Node">
    <el-card style="user-select:none">
      <Row>
        <Col span="2" style="padding-left: 10px;">
          <el-image style="width:75px;height:75px" :src="top_icon">
          </el-image></Col>
        <Col span="22" style="padding-top:10px">
          <h1>工作负载</h1>
          <p>访问服务的实际载体，包含对节点数据日志收集与监控</p>
        </Col>
      </Row>
    </el-card>
    <Divider style="margin: 10px;"/>
    <el-card style="height:700px;padding:10px">
        <h3>节点ID:{{this.$store.state.nodeId}}</h3>
        <Row>
          <Col span="9">
            <div class="echart" id="radarChart" style="width:450px;height:450px"></div>
          </Col>
          <Col>
            <Row class="stride">
              <Col span="4"><div class="echart" id="pieChart1" style="width:100px;height:100px"></div></Col>
              <Col span="5" class="col">
                <h3>4%</h3>
                <h3 style="color:rgb(170, 170, 170)">CPU</h3>
              </Col>
              <Col span="5" class="col">
                <h3>0.52 core</h3>
                <h3 style="color:rgb(170, 170, 170)">已使用</h3>
              </Col>
              <Col span="5" class="col">
                <h3>14 core</h3>
                <h3 style="color:rgb(170, 170, 170)">总计</h3>
              </Col>
            </Row>
            <Row class="stride">
              <Col span="4"><div class="echart" id="pieChart2" style="width:100px;height:100px"></div></Col>
              <Col span="5" class="col">
                <h3>12%</h3>
                <h3 style="color:rgb(170, 170, 170)">内存</h3>
              </Col>
              <Col span="5" class="col">
                <h3>2.72 Gi</h3>
                <h3 style="color:rgb(170, 170, 170)">已使用</h3>
              </Col>
              <Col span="5" class="col">
                <h3>22.94 Gi</h3>
                <h3 style="color:rgb(170, 170, 170)">总计</h3>
              </Col>
            </Row>   
            <Row class="stride">
              <Col span="4"><div class="echart" id="pieChart3" style="width:100px;height:100px"></div></Col>
              <Col span="5" class="col">
                <h3>26%</h3>
                <h3 style="color:rgb(170, 170, 170)">容器组</h3>
              </Col>
              <Col span="5" class="col">
                <h3>29</h3>
                <h3 style="color:rgb(170, 170, 170)">已使用</h3>
              </Col>
              <Col span="5" class="col">
                <h3>110</h3>
                <h3 style="color:rgb(170, 170, 170)">总计</h3>
              </Col>
            </Row>   
            <Row class="stride">
              <Col span="4"><div class="echart" id="pieChart4" style="width:100px;height:100px"></div></Col>
              <Col span="5" class="col">
                <h3>21%</h3>
                <h3 style="color:rgb(170, 170, 170)">本地存储</h3>
              </Col>
              <Col span="5" class="col">
                <h3>9.11 GB</h3>
                <h3 style="color:rgb(170, 170, 170)">已使用</h3>
              </Col>
              <Col span="5" class="col">
                <h3>42.93 GB</h3>
                <h3 style="color:rgb(170, 170, 170)">总计</h3>
              </Col>
            </Row>         
          </Col>
        </Row>
        <Button @click="backToList" class="back_button">返回</Button>  
    </el-card>
</div>
</template>
<script>
import * as echarts from "echarts";
export default {
    name: 'Node',
    data () {
    return {
        top_icon: require('../assets/node_icon.png'),
    }
    },
    created () {
        
    },
    mounted() {
        this.initPieChart1()
        this.initPieChart2()
        this.initPieChart3()
        this.initPieChart4()
        this.initRadarChart() 
    },
    methods: {
        backToList(){
            this.$router.replace("/admins/list")
        },

        initRadarChart() {
          const option = {
            tooltip: {
              show: false,
            },
            legend: {
              show: false,
            },
            radar: {
              shape: 'circle',
              indicator: [
                { name: 'CPU', max: 6500 },
                { name: '本地存储', max: 16000 },
                { name: '内存', max: 30000 },
                { name: '容器组', max: 38000 },
              ],
              splitArea: {
                areaStyle: {
                  color: ['#f9fcff'],
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#D3D3D3'
                }
              },
              splitLine: {
                lineStyle: {
                  width: 2,
                  color: '#f3f3f3'
                }
              }
            },
            series: [
              {
                type: 'radar',
                data: [
                  {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: 'Allocated Budget',
                    symbolSize: 2,
                    areaStyle: {
                      color: 'rgba(100, 100, 100, 0.6)'
                    },
                    lineStyle: {
                      width: 2,
                      color: 'rgba(100, 100, 100, 0.7)'
                    }
                  },
                ],
              }
            ]
          };
          const pieChart = echarts.init(document.getElementById("radarChart"));// 图标初始化
          pieChart.setOption(option);// 渲染页面
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            pieChart.resize();
          });
        },
        initPieChart1() {
          // let chartData = [];
          // for (let key in this.emotionsData) {
          //   var obj = {};
          //   obj.name = scoreEmoMap[key];
          //   obj.value = this.emotionsData[key];
          //   chartData.push(obj);
          // }
          const option = {
            tooltip: {
              show: false,
            },
            legend: {
              show: false,
            },
            series: [
              {
                type: 'pie',
                label:{
                    show: false,
                },
                radius: ['40%', '70%'],
                data: [
                  { value: 30, name: 'CPU已使用' },
                  { value: 70, name: 'CPU未使用' },
                ],
                itemStyle: {
                  normal: {
                    color: function (colors) {
                      var colorList = [
                        '#0099CC',
                        '#daebfa',
                      ];
                      return colorList[colors.dataIndex];
                    }
                  },
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          const pieChart = echarts.init(document.getElementById("pieChart1"));
          pieChart.setOption(option);
        },
        initPieChart2() {
          const option = {
            tooltip: {
              show: false,
            },
            legend: {
              show: false,
            },
            series: [
              {
                type: 'pie',
                label:{
                    show: false,
                },
                radius: ['40%', '70%'],
                data: [
                  { value: 30, name: 'CPU已使用' },
                  { value: 70, name: 'CPU未使用' },
                ],
                itemStyle: {
                  normal: {
                    color: function (colors) {
                      var colorList = [
                        '#0099CC',
                        '#daebfa',
                      ];
                      return colorList[colors.dataIndex];
                    }
                  },
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          const pieChart = echarts.init(document.getElementById("pieChart2"));// 图标初始化
          pieChart.setOption(option);// 渲染页面
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            pieChart.resize();
          });
        },
        initPieChart3() {
          const option = {
            tooltip: {
              show: false,
            },
            legend: {
              show: false,
            },
            series: [
              {
                type: 'pie',
                label:{
                    show: false,
                },
                radius: ['40%', '70%'],
                data: [
                  { value: 30, name: 'CPU已使用' },
                  { value: 70, name: 'CPU未使用' },
                ],
                itemStyle: {
                  normal: {
                    color: function (colors) {
                      var colorList = [
                        '#0099CC',
                        '#daebfa',
                      ];
                      return colorList[colors.dataIndex];
                    }
                  },
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          const pieChart = echarts.init(document.getElementById("pieChart3"));// 图标初始化
          pieChart.setOption(option);// 渲染页面
          window.addEventListener("resize", () => {
            pieChart.resize();
          });
        },
        initPieChart4() {
          const option = {
            tooltip: {
              show: false,
            },
            legend: {
              show: false,
            },
            series: [
              {
                type: 'pie',
                label:{
                    show: false,
                },
                radius: ['40%', '70%'],
                data: [
                  { value: 30, name: 'CPU已使用' },
                  { value: 70, name: 'CPU未使用' },
                ],
                itemStyle: {
                  normal: {
                    color: function (colors) {
                      var colorList = [
                        '#0099CC',
                        '#daebfa',
                      ];
                      return colorList[colors.dataIndex];
                    }
                  },
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          const pieChart = echarts.init(document.getElementById("pieChart4"));// 图标初始化
          pieChart.setOption(option);// 渲染页面
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            pieChart.resize();
          });
        },
    }
}
</script>
<style scoped>
#Node{
    padding: 10px;
}
.stride{
  margin: 10px 0px 10px;
  width: 700px;
  background: #f9fcff;
}
.col{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.test{
  color: #daebfa
}
.back_button{
    position:absolute;
    bottom:15px;
    width: 130px;
}
</style>