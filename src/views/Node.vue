<template>
<div id="node">
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
    <el-card style="height:700px">
        <h3>节点ID:{{this.$store.state.nodeId}}</h3>
        <div><img src="../assets/demo.png" alt="" class="img">  </div>
        <Button @click="backToList" class="back_button">返回</Button>  
    </el-card>
</div>
</template>
<script>

export default {
    name: 'Node',
    data () {
    return {
        top_icon: require('../assets/node_icon.png'),
    }
    },
    created () {
    
    },
    methods: {
        backToList(){
            this.$router.replace("/admins/list")
        },
    }
}
</script>
<style scoped>
#node{
    padding: 10px;
}
.back_button{
    position:absolute;
    bottom:15px;
    width: 130px;
}
</style>