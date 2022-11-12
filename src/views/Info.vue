<template>
  <div id="info">
    <el-card>
      <Row>
        <Col span="2" style="padding-left: 10px;">
          <el-image style="width:75px;height:75px" :src="top_icon">
          </el-image></Col>
        <Col span="22" style="padding-top:10px">
          <h1>基本信息</h1>
          <p>当前集群基础信息总览</p>
        </Col>
      </Row>
    </el-card>
    <Row>
      <Col span="16">
        <h3 style="margin:10px">树结构图</h3>
        <el-card style="height:700px">
        </el-card>
      </Col>
      <Col span="8">
        <h3 style="margin:10px">状态变更</h3>
        <el-card style="margin-left:10px;height:700px;padding: 20px;">
          <el-timeline>
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
        </el-card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import * as echarts from "echarts";
  export default {
    name: 'Info',
    data () {
      return {
        top_icon: require('../assets/info_icon.png'),
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
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
      }
    },
    created () {
      
    },
    methods: {
    
    }
  }
</script>
<style scoped>
#info {
  padding: 10px;
}
</style>