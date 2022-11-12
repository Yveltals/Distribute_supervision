<template>
  <div id="list">
    <Modal v-model="formVisable" title="配置信息" class-name="vertical-center-modal">
      <div slot="footer"></div>
      <Form ref="formData" :model="formData" :rules="formRule" :label-width="120">
        <FormItem label="IP地址" prop="ip">
            <Input v-model="formData.ip" placeholder="请输入IP地址"></Input>
        </FormItem>
        <FormItem label="心跳时间" prop="heart">
            <Input v-model="formData.heart" placeholder="请输入心跳时间"></Input>
        </FormItem>
        <FormItem label="状态同步时间" prop="status">
            <Input v-model="formData.status" placeholder="请输入状态同步时间"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit('formData')">提交</Button>
            <Button @click="reset('formData')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>

    <el-card>
      <Row>
        <Col span="2" style="padding-left: 10px;">
          <el-image style="width:75px;height:75px" :src="top_icon">
          </el-image></Col>
        <Col span="22" style="padding-top:10px">
          <h1>服务组件</h1>
          <p>提供集群内部各服务组件的健康状况监控，可以查看当前集群的健康状态的运行时间，能够帮助用户监控集群的健康状况并及时定位问题</p>
        </Col>
      </Row>
    </el-card>
    <Divider style="margin: 10px;"/>
    
    <el-card style="height: 630px;">
      <div style="height:48px;background-color:rgb(252, 252, 255)">
        <Row style="padding-top:3px">
          <Col span="4"><Select v-model="select" style="width:200px;">
            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select>
          </Col>
          <Col span="14" class="search">
            <Input placeholder="输入查询条件, 按Enter键进行过滤" v-model="searchName" @keyup.enter.native="search">
              <template #prefix><Icon style="color:grey;font-size:21px" type="ios-search"/></template>
            </Input>
          </Col>
          <Col span="1" style="text-align:center;line-height:36px;">
            <Icon style="cursor:pointer;color:grey;font-size:21px" type="md-refresh" />
          </Col>
          <Col span="5"><Button class="set_button" @click="showForm" shape="circle">管理配置</Button></Col>
        </Row>
      </div>
      <Divider style="margin: 0px;"/>
      <el-table
        :data="curData" style="width:100%;user-select:none" v-loading="loading"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="机器" prop="name" sortable width="240">
          <template slot-scope="scope">
            <Row style="cursor:pointer;">
              <Col span="6"><el-image style="width:40px;height:40px" :src="list_icon"></el-image></Col>
              <Col style=";text-align:center;line-height:40px"><h3 @click="handle(scope.row.id)">{{ scope.row.name }}</h3></Col>
            </Row>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" sortable width="220">
          <template slot-scope="scope">
            <h3 style="color:rgb(85,85,85)"><Icon color="#00AA00" type="md-radio-button-on" /> 运行中</h3>
          </template>
        </el-table-column>
        <el-table-column label="所属项目" prop="group" width="290">
          <template slot-scope="scope">
            <h3>kubesphere-controller</h3>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="date" sortable width="220">
          <template slot-scope="scope">
            <h3><Icon type="md-time" /> &emsp;{{ scope.row.date }}</h3>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Page :total="total" :page-size="6" showPage-elevator @on-change="change" style="position:absolute;bottom:15px"/>
    </el-card>
  </div>
</template>

<script>    
  export default {
    name: 'List',
    data () {
      return {
        formVisable: false,
        formData: {
          ip: '',
          heart: '',
          status: '',
        },
        formRule: {
          ip: [{ required: true, message: 'IP不能为空', trigger: 'blur' }],
          heart: [{ required: true, message: '请设置心跳时间', trigger: 'blur' }],
          status: [{ required: true, message: '请设置状态同步时间', trigger: 'blur' }]
        },
        select: '运行中', //下拉选项
        total: 10,
        curData: [],
        tableData: [
          {id:0,date:'2016-05-02',name:'机器1',}, {id:1,date:'2016-05-04',name:'机器2',}, {id:2,date:'2016-05-01',name:'机器3',}, {id:3,date:'2016-05-03',name:'机器4',},
          {id:4,date:'2016-05-02',name:'机器1',}, {id:5,date:'2016-05-04',name:'机器2',}, {id:6,date:'2016-05-01',name:'机器3',},
          {id:8,date:'2016-05-02',name:'机器1',}, {id:9,date:'2016-05-04',name:'机器2',}, {id:10,date:'2016-05-01',name:'机器3',},
        ],
        top_icon: require('../assets/top_icon.png'),
        list_icon: require('../assets/list_icon.png'),
        optionList: [{value:'运行中',label:'运行中'},{value:'已停止',label:'已停止'}],
        loading: false,
        curPage: 1,
        searchName: '',
      }
    },
    created () {
      this.showPage(0)
    },
    methods: {
      handle(nodeId){
        console.log(nodeId)
        this.$store.state.nodeId = nodeId
        this.$router.replace("/admins/node");
      },
      getCourseList(){
        this.loading = true
        this.getRequest('/api/manage/getAllCourses').then(res=>{
          console.log(res)
          this.tableData = res.data.courses
          this.total = this.tableData.length
          this.showPage(6*(this.curPage-1))
          this.formData = {}
        })
      },
      submit (name) {
        console.log(this.formData)
        return
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.postRequest('/api/manage/addCourse',this.formData).then(res=>{
              console.log(res)
              if(!res.code){ 
                this.$Message.success('添加成功');
                this.formVisable = false
                this.getCourseList() 
              }
              else this.$Message.error(res.msg);
            }) 
          } else {
              this.$Message.error('请填写必要信息');
          }
        })
      },
      search(){
        if(this.searchName.length<=0){
          this.showPage(0)
          return
        }
        this.curData = []
        for(let i=0;i<this.total; i++){
          if(this.tableData[i].name == this.searchName){
            this.curData.push(this.tableData[i])
          }
        }
      },
      showPage(page){
        this.curData = []
        for(let i=page;i<this.total && i<page+6; i++){
          this.curData.push(this.tableData[i])
        }
        this.loading = false
      },
      change(page){
        this.curPage = page
        this.showPage(6*(page-1))
      },
      reset (name) {
          this.$refs[name].resetFields();
      },
      showForm(){
        this.formData = {}
        this.formVisable = true
      },
    }
  }
</script>
<style scoped>
.set_button {
  width: 120px;
  border: 0;
  color: #fff !important;
  background-color: #1a1d29d8 !important;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
}
#list {
  padding: 10px;
}
#list p{
  font-size:15px;
  color:grey
}
</style>
<style>
.search .ivu-input{
  border-color: #f3f7fd !important;
  background: #f3f7fd !important;
  border-radius: 33px !important;
}
.el-card{
  margin: 5px;
  color: rgb(63, 63, 63) !important;
}
.el-card__body{
  padding: 5px !important;
}
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
.vertical-center-modal .ivu-modal{
    top: 0;
}
</style>