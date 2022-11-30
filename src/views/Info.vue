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
            <div class="echart" id="treeChart" style="height:700px;width:700px"></div>
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
            <el-timeline v-if="$store.state.message.length>0" style="padding:10px">
              <el-timeline-item
                v-for="(item,index) in $store.state.message" :key="index" :color="item.color" :timestamp="item.timestamp">
                <h3>{{item.content}}</h3>
              </el-timeline-item>
            </el-timeline>
            <el-timeline v-else style="padding:10px">
              <el-timeline-item :timestamp="$store.state.time">
                <h3>暂无状态变更通知</h3>
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
              <h3>{{$store.state.time}}</h3>
              <p style="color:grey">统计截止时间</p>
            </Col>
          </Row>
          <Row style="margin-top:13px">
            <Col span="4">
              <el-image class="image-small" :src="require('../assets/node.png')"></el-image></Col>
            <Col span="6">
              <h3>{{$store.state.nodesId.length}}</h3>
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
      message_null: [{
        content: '暂无状态变更通知',
        timestamp: '2018-04-12 20:46',
      }],
    }
  },
  mounted () {
    setTimeout(() => { this.initTreeChart() }, 500);
  },
  methods: {
    getMessage(){
      this.getRequest('/api/getMessage?limit='+10).then(res=>{
        console.log(res)
        if(!res.code){ 
          this.message = []
          for(let i=0;i<res.data.length;++i){
            let tmp;
            tmp.content = res.data[i].name
            tmp.timestamp = res.data[i].timestamp
            tmp.size = 'large'
            if(res.data[i].online){
              tmp.content += '上线'
              tmp.color = '#0bbd87'
            }
            else{
              tmp.content += '下线'
            }
            this.message.push(tmp)
          }
          this.$Message.success('配置成功');
          this.formVisable = false
        }
        else this.$Message.error(res.msg);
      }) 
    },
    initTreeChart(){
      const data = {
        name: 'root',
        children: [
          {
            name: 'websocket1',
            children: [
              { name: 'node1',},
            ]
          },
          {
            name: 'websocket2',
            children: [
              { name: 'node4',},
            ]
          }
        ]
      }
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
            data: [this.$store.state.tree],
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