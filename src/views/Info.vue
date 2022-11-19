<template>
  <div id="info">
    <el-card style="user-select:none">
      <Row>
        <Col span="2" style="padding-left:10px;">
          <el-image style="width:75px;height:75px" :src="require('../assets/info_icon.png')">
          </el-image></Col>
        <Col span="22" style="padding-top:10px">
          <h1>基本信息</h1>
          <p>当前集群基础信息总览</p>
        </Col>
      </Row>
    </el-card>
    <Divider style="margin: 10px;"/>
    <Row>
      <Col span="16">
        <el-card style="height:700px;user-select:none">
          <h3 style="margin:10px">树结构图</h3>
          <el-scrollbar style="height:600px">
            <div class="echart" id="treeChart" style="height:800px;width:800px"></div>
          </el-scrollbar>
        </el-card>
      </Col>
      <Col span="8">
        <el-card class="notice">
          <Row>
            <Col><el-image class="image" :src="require('../assets/history.png')"></el-image></Col>
            <Col>
              <h3 style="margin-left:10px;line-height:40px;text-align:center;user-select:none">状态变更</h3>
            </Col>
          </Row>
          <div class="border" style="height:320px">
            <el-scrollbar style="height: 310px">
            <el-timeline style="padding:10px">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                <h3>{{activity.content}}</h3>
              </el-timeline-item>
            </el-timeline>
            </el-scrollbar>
          </div>
        </el-card>
        <el-card class="info">
          <Row>
            <Col><el-image class="image" :src="require('../assets/status.png')"></el-image></Col>
            <Col>
              <h3 style="margin-left:10px;line-height:40px;text-align:center;user-select:none">平台信息</h3>
            </Col>
          </Row>
          <div class="border" style="height:125px">
          <Row style="margin-top:8px;">
            <Col span="4">
              <el-image class="image-small" :src="require('../assets/time.png')"></el-image></Col>
            <Col >
              <h3>2022-11-12 15:32:57</h3>
              <p style="color:grey">统计截止时间</p>
            </Col>
          </Row>
          <Row style="margin-top:13px">
            <Col span="4">
              <el-image class="image-small" :src="require('../assets/node.png')"></el-image></Col>
            <Col span="6">
              <h3>13</h3>
              <p style="color:grey">机器数量</p>
            </Col>
            <Col span="4">
              <el-image class="image-small" :src="require('../assets/account.png')"></el-image></Col>
            <Col >
              <h3>1</h3>
              <p style="color:grey">用户数量</p>
            </Col>
          </Row>
          </div>
        </el-card>
      </Col>
    </Row>
  </div>
</template>
<script>
import * as echarts from "echarts";
import node_icon from '../assets/disk.png'
export default {
  name: 'Info',
  data () {
    return {
      treeData: {
        name: 'root',
        image_url: node_icon,
        class: ["rootNode"],
        children: [
          {
            name: 'children1',
            image_url: node_icon,
            children: [
              {
                name: 'grandchild',
                image_url: node_icon
              },
              {
                name: 'grandchild2',
                image_url: node_icon
              },
              {
                name: 'grandchild3',
                image_url: node_icon
              },
              {
                name: 'grandchild2',
                image_url: node_icon
              },
              {
                name: 'grandchild3',
                image_url: node_icon
              }
            ]
          },
          {
            name: 'children2',
            image_url: node_icon,
            children: [
              {
                name: 'grandchild',
                image_url: node_icon
              },
              {
                name: 'grandchild2',
                image_url: node_icon
              },
              {
                name: 'grandchild3',
                image_url: node_icon
              },
              {
                name: 'grandchild2',
                image_url: node_icon
              },
              {
                name: 'grandchild3',
                image_url: node_icon
              }
            ]
          },
        ]
      },

      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }],
    }
  },
  mounted () {
    this.initTreeChart()
  },
  methods: {
    initTreeChart(){
      const data = {
        name: 'flare',
        children: [
          {
            name: 'display',
            children: [
              { name: 'DirtySprite', value: 8833 },
              { name: 'LineSprite', value: 1732 },
              { name: 'RectSprite', value: 3623 }
            ]
          },
          {
            name: 'scale',
            children: [
              { name: 'IScaleMap', value: 2105 },
              { name: 'LinearScale', value: 1316 },
              { name: 'LogScale', value: 3151 },
              { name: 'OrdinalScale', value: 3770 },
              { name: 'QuantileScale', value: 2435 },
              { name: 'QuantitativeScale', value: 4839 },
              { name: 'RootScale', value: 1756 },
              { name: 'Scale', value: 4268 },
              { name: 'QuantitativeScale', value: 4839 },
              { name: 'RootScale', value: 1756 },
              { name: 'Scale', value: 4268 },
            ]
          }
        ]
      };
      let option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [data],
            top: '0%',
            left: '10%',
            bottom: '40px',
            right: '20%',
            symbol: 'image://'+node_icon,
            symbolSize: 40,
            edgeShape: 'polyline',
            edgeForkPosition: '53%',
            initialTreeDepth: 3,
            lineStyle: {
              width: 3
            },
            label: {
              fontSize: 20,
              lineHeight: 20,
              backgroundColor: '#fff',
              position: 'top',
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      const treeChart = echarts.init(document.getElementById("treeChart"));
      treeChart.setOption(option);
    },
  }
}
</script>
<style>
.node{
  width: 120px !important;
}
.name{
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  line-height: 1.2;
  color: rgb(90, 90, 90);
}
</style>
<style scoped>
#info {
  padding: 10px;
}
.notice{
  margin-left:10px;
  height:400px;
  padding: 10px 20px 10px;
}
.info{
  margin-left:10px;
  height:350px;
  padding:20px;
}
.border{
  background-color: rgb(253,253,255);
  padding-left: 7px;
  border: 3px;
  border-radius: 15px;
  border-style:solid;
  border-color: rgb(241, 241, 241);
}
.image{
  width: 40px;
  height: 40px;
}
.image-small{
  width: 35px;
  height: 35px;
}
</style>