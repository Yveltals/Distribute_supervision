<template>
  <div id="list">
    <Modal v-model="formVisable" title="配置信息" class-name="vertical-center-modal">
      <div slot="footer"></div>
      <Form ref="formData" :model="formData" :rules="formRule" :label-width="120">
        <FormItem label="IP地址" prop="ip">
            <Input v-model="formData.ip" placeholder="请输入IP地址"></Input>
        </FormItem>
        <FormItem label="状态同步间隔" prop="status">
            <Input v-model="formData.interval" placeholder="请输入状态同步时间(s)"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit('formData')">提交</Button>
            <Button @click="reset('formData')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>

    <el-card style="user-select:none">
      <Row>
        <Col span="2" style="padding-left: 10px;">
          <el-image style="width:75px;height:75px" :src="top_icon">
          </el-image></Col>
        <Col span="22" style="padding-top:10px">
          <h1>服务节点</h1>
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
          <Col span="5"><Button class="set_button" @click="exportExcel" shape="circle">导出数据</Button></Col>
        </Row>
      </div>
      <Divider style="margin: 0px;"/>
      <el-table
        :data="curData" style="width:100%;user-select:none" v-loading="loading"
        :default-sort = "{prop: 'date', order: 'descending'}"
        id="print"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="机器" prop="name" sortable width="230">
          <template slot-scope="scope">
            <Row style="cursor:pointer;">
              <Col span="6"><el-image style="width:40px;height:40px" :src="list_icon"></el-image></Col>
              <Col style=";text-align:center;line-height:40px"><h3 @click="handle(scope.row)">{{ scope.row.name }}</h3></Col>
            </Row>
          </template>
        </el-table-column>
        <el-table-column label="状态" sortable width="170">
          <template slot-scope="scope">
            <h3 style="color:rgb(85,85,85)"><Icon color="#00AA00" type="md-radio-button-on" /> 运行中</h3>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" width="170">
          <template slot-scope="scope">
            <h3 v-if="scope.row.type==1">服务器</h3>
            <h3 v-else>客户机</h3>
          </template>
        </el-table-column>
        <el-table-column label="IP" prop="ip" sortable width="200">
          <template slot-scope="scope">
            <h3>{{ scope.row.ip }}</h3>
          </template>
        </el-table-column>
        <el-table-column label="报告间隔" prop="interval" sortable width="200">
          <template slot-scope="scope">
            <h3><Icon type="md-time" /> &emsp;{{ scope.row.interval }}</h3>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div @click="handleEdit(scope.row)" style="line-height:35px;text-align:center">
              <Icon style="cursor:pointer;font-size:30px;float:left" type="md-more" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <Page :total="total" :page-size="6" showPage-elevator @on-change="change" style="position:absolute;bottom:15px"/>
    </el-card>
  </div>
</template>

<script>    
import date from '../utils/date'
  export default {
    name: 'List',
    data () {
      return {
        formVisable: false,
        formData: {
          id: '',
          ip: '',
          interval: ''
        },
        formRule: {
          ip: [{ required: true, message: 'IP不能为空', trigger: 'blur' }],
          interval: [{ required: true, message: '请设置客户机报告间隔时间', trigger: 'blur' }]
        },
        select: '运行中', //下拉选项
        total: 10,
        curData: [],
        tableData: [],
        top_icon: require('../assets/top_icon.png'),
        list_icon: require('../assets/list_icon.png'),
        optionList: [{value:'运行中',label:'运行中'},{value:'已停止',label:'已停止'}],
        loading: false,
        curPage: 1,
        searchName: '',
      }
    },
    created () {
      this.tableData = this.$store.state.nodesList
      this.showPage(0)
    },
    methods: {
      async exportPdf(){
        let data = []
        for (let i=0; i < this.tableData.length; i++) {
            data.push({
                "id": this.tableData[i].id,
                "name": this.tableData[i].name,
                "date": this.tableData[i].date,
            })
        }          
        printJS({
            printable: data,
            properties: [
                {
                    field: 'id',
                    displayName: '机器ID',
                    columnSize: 1
                },
                {
                    field: 'name',
                    displayName: '名称',
                    columnSize: 1
                },
                {
                    field: 'date',
                    displayName: '更新时间',
                    columnSize: 1
                },
            ],
            type: 'json',
            header: '机器信息',
            // 样式设置
            gridStyle: 'border: 2px solid #3971A5;',
            gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;'
        })
      },
      exportExcel() {
        // this.$store.state.message=[]
        // this.$store.state.message.push({
        //   content: 'Machine 15 上线',
        //   timestamp: date.dateFormat("YYYY-mm-dd HH:MM:SS",new Date()),
        //   color: '#0bbd87'
        // })
        this.$store.state.message.push({
          content: 'Machine 14 下线',
          timestamp: date.dateFormat("YYYY-mm-dd HH:MM:SS",new Date()),
        })
        return
          const {export_json_to_excel} = require('../utils/Export2Excel')
          const tHeader = ['机器ID', '名称', '类型','IP','报告间隔', ]
          const filterVal = ['id', 'name', 'type','ip','interval', ]
          const list = this.tableData
          const data = list.map(v => filterVal.map(j => v[j]))
          export_json_to_excel(tHeader, data, '机器信息')
      },
      handle(node){
        if(node.type==1){
          let a = {'1':{name:'name1'},'2':{name:'name2'}}
          console.log(a['1'].name)
          return
        }
        this.$store.state.nodeId = node.id
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
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.postRequest('/api/configure',this.formData).then(res=>{
              console.log(res)
              if(!res.code){ 
                this.$Message.success('配置成功');
                this.formVisable = false
                this.getNodeInfo() 
              }
              else this.$Message.error(res.msg);
            }) 
          } else {
              this.$Message.error('请填写必要信息');
          }
        })
      },
      getNodeInfo(){ //机器信息列表（表格）
        let param = {'id': this.$store.state.nodesId}
        this.postRequest('/api/getNodeInfo',param).then(res=>{
          let tmp = []
          if(!res.code){
            for(let key in res.data){
              tmp.push(res.data[key])
            }
            this.$store.state.nodesList = tmp
            this.tableData = tmp
            this.showPage(0)
            console.log(this.$store.state.nodesList)
          }
          else this.$Message.error(res.msg);
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
        for(let i=page;i<this.tableData.length && i<page+6; i++){
          this.curData.push(this.tableData[i])
        }
        this.loading = false
      },
      change(page){
        this.curPage = page
        this.showPage(6*(page-1))
      },
      reset(name) {
          this.$refs[name].resetFields();
      },
      handleEdit(node){
        this.formData.id = node.id
        this.formData.ip = node.ip
        this.formData.interval = node.interval
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