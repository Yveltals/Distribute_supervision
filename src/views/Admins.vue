<template>
  <div id="index-vue">
    <!-- 侧边栏 -->
    <aside class="aside-big">
      <!-- logo -->
      <div class="logo-c">
        <img src="../assets/logo.png" alt="logo" class="logo">
        <span class="side-menu">分布式机群监管</span>
      </div>
      <!-- 菜单栏 -->
      <Menu class="side-menu" ref="asideMenu" theme="dark" width="100%" @on-select="selectMenuCallback"
      accordion :open-names="['1']" :active-name="currentPage">
        <Submenu name="1">
          <template #title>
            <Icon type="md-add-circle" />
            <span>机群管理</span>
          </template>
          <MenuItem name="1-1"><Icon type="ios-paper" />
            <span>概览</span>
          </MenuItem>
          <MenuItem name="1-2"><Icon type="md-briefcase" />
            <span>节点管理</span>
          </MenuItem>
          <MenuItem name="1-3"><Icon type="ios-book" git pu/>
            <span>工作负载</span>
          </MenuItem>
        </Submenu>
      </Menu>
    </aside>

    <!-- 右侧部分 -->
    <section class="sec-right">
      <!-- 头部 -->
      <div class="top-c">
        <header>
          <div class="h-left">
            <div class="pointer" title="收缩/展开">
              <Icon type="ios-apps" />
            </div>
          </div>
          <div class="h-right">
            <div class="user-img-c">
              <img src="../assets/avatar.png">
            </div>
            <div class="pointer">
              <span>{{userName}}</span>
              <Icon style="margin-left:10px" @click="logout" type="md-exit" title="退出系统"/>
            </div>
          </div>
        </header>
      </div>
      <!-- 页面主体 -->
      <div class="main-content">
        <div class="view-c">
          <router-view/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Admins',
  data() {
    return {
      currentPage: '', // 当前显示页面
      main: null, // 页面主要内容区域
      userName: '管理员',
      userImg: '',
    }
  },
  created(){
		if (sessionStorage.getItem("state") ) {
			this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
		}
		window.addEventListener("beforeunload",()=>{
			sessionStorage.setItem("state",JSON.stringify(this.$store.state))
		})
    this.query()
    this.$store.dispatch("connect");
  },
  mounted() {
    this.main = document.querySelector('.sec-right')
  },
  watch: {
    $route(to) {
      if(to.name == 'Info')
        this.currentPage = '1-1'
      else if(to.name =='List')
        this.currentPage = '1-2'
      else
        this.currentPage = '1-3'
    },
  },
  methods: {
    query(){ //定时刷新机器组织关系
      this.getRequest('/api/getTreeDiagram').then(res => {
          if(!res.code){
            this.$store.state.tree = res.data.tree
            let nodes = []
            let tmp = res.data.tree.children
            for(let i=0;i<tmp.length;++i){
              nodes.push(tmp[i].id)
              for(let j=0;j<tmp[i].children.length;++j){
                nodes.push(tmp[i].children[j].id)
              }
            }
            this.$store.state.time = this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
            this.$store.state.nodesId = nodes
            console.log(this.$store.state.nodesId)
            this.$Message.success('刷新成功');
            this.formVisable = false
            this.getNodeInfo()
          }
          else this.$Message.error(res.msg);
          setTimeout(() => {
              this.query();
          },20000)
      })
    },
    getNodeInfo(){ //机器信息列表（表格）
      let param = {'id': this.$store.state.nodesId}
      this.postRequest('/api/getNodeInfo',param).then(res=>{
        // console.log(res.data)
        let tmp = []
        if(!res.code){
          this.$store.state.nodesInfo = res.data  //更新kv
          for(let key in res.data){
            tmp.push(res.data[key])
          }
          this.$store.state.nodesList = tmp
          console.log(this.$store.state.nodesList)
          this.updateDiagram()
        }
        else this.$Message.error(res.msg);
      })
    },
    updateDiagram(){ //填充树状关系name字段
      Vue.set(this.$store.state.tree, 'name', 'Root');
      for(let i=0;i<this.$store.state.tree.children.length;++i){
        let id = this.$store.state.tree.children[i].id
        Vue.set(this.$store.state.tree.children[i], 'name', 
          this.$store.state.nodesInfo[id].name);
        for(let j=0;j<this.$store.state.tree.children[i].children.length;++j){
          let id_ = this.$store.state.tree.children[i].children[j].id
          Vue.set(this.$store.state.tree.children[i].children[j],'name',
            this.$store.state.nodesInfo[id_].name);
        }
      }
      // console.info(this.$store.state.tree)
    },
    // 选择菜单回调函数
    selectMenuCallback(name) {
      if(name=='1-1') 
        this.$router.push("/admins/info")
      else if(name=='1-2')
        this.$router.push("/admins/list")
      else
        this.$router.push("/admins/node") 
    },
    //退出登录并清除token
    logout(){
      this.$confirm('您是否退出登录?', '系统提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
        this.$message.success("退出登录");
        this.$router.push("/")
			})
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1],(ret[1].length==1)?(opt[k]):(opt[k].padStart(ret[1].length,"0")))
        };
      };
      return fmt;
    },
  },
}
</script>

<style scoped>
html{
  height: 100%;
}
#index-vue {
  height: 100%;
  color: #666;
}
.side-menu{
  font-size: 20px;
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  line-height: 1.5;
  color: inherit;
  user-select:none
}
.side-menu span{
  font-size: 17px;
}
/* 侧边栏 */
aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 90px;
    background: #20222A;
    height: 100%;
    transition: width .3s;
    overflow: auto;
}
.logo-c {
    display: flex;
    align-items: center;
    color: rgba(255,255,255,.8);
    font-size: 16px;
    margin: 20px 0;
    justify-content: center;
}
.logo {
    width: 40px;
    margin-right: 10px;
}
.aside-big {
    width: 220px;
}
/* 主体页面 */
.sec-right {
    height: 100%;
    margin-left: 220px;
    transition: margin-left .3s;
    overflow: hidden;;
    background: #f3f7fd;
}
/* 主体页面头部 */
header {
    height: 50px;
    border-bottom: none;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
    font-size: 14px;
}
header .ivu-icon {
    font-size: 24px;
}
.refresh-c {
    margin: 0 30px;
    cursor: pointer;
}
.h-right {
    display: flex;
    align-items: center;
}
.h-left {
    display: flex;
    align-items: center;
}
.user-img-c img {
    width: 100%;
}
.user-img-c {
    width: 34px;
    height: 34px;
    background: #ddd;
    border-radius: 50%;
    margin: 0 15px;
    overflow: hidden;
}
a {
    color: #666;
    transition: none;
}
/* 主要内容区域 */
.main-content {
    height: calc(100% - 65px);
    overflow: hidden;
}
.view-c {
    position: relative;
    height: 100%;
    overflow: hidden;
}
.pointer {
    cursor: pointer;
}
.pointer span{
    font-size:20px
}
</style>
<style>
#app{
  height: 100%
}
</style>