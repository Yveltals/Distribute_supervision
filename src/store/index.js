import Vue from 'vue'
import Vuex from 'vuex'
import SockJS from '../utils/sockjs'
import '../utils/stomp'
import { Notification } from 'element-ui';
import { postRequest} from "../utils/api";
import date from '../utils/date'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    nodeId: null,
    nodesId: [],
    nodesInfo: null,
    nodesList: [],
    message: [],
    stomp: null,
    time: null,
  },
  mutations: {

  },
  actions: {
    connect(context) {
      context.state.stomp = Stomp.over(new SockJS('https://b2884t1064.oicp.vip/dmos_app'));
      context.state.stomp.connect({}, success => {
        context.state.stomp.subscribe("/api/dmos", msg => {
          console.log(msg)
          let tmp = msg.body.data
          let on = msg.body.data.online
          let off = msg.body.data.offline
          let time = date.dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
          for(let i=0;i<off.length;++i){
            context.state.message.push({
              content: context.state.nodesList[off[i]].name+' 下线',
              timestamp: time,
            })
          }
          if(on.length>0){
            let param = {'id': on}
            this.postRequest('/api/getNodeInfo',param).then(res=>{
              // console.log(res.data)
              let tmp = []
              if(!res.code){
                this.$store.state.nodesInfo = res.data  //更新kv
                for(let key in res.data){
                  tmp.push(res.data[key])
                }
                for(let i=0;i<on.length;++i){
                  context.state.message.push({
                    content: tmp[on[i]].name+' 上线',
                    timestamp: time,
                    color: '#0bbd87'
                  })
                }
              }
              else this.$Message.error(res.msg);
            })
          }
        })
      }, error => {
        Notification.info({
          title: '系统消息',
          message: "无法与服务端建立连接，请尝试重新登陆系统~",
          position: "top-right"
        });
      })
    },
    //与Websocket服务端断开连接
    disconnect(context) {
      if (context.state.stomp != null) {
        context.state.stomp.disconnect()
        //  console.log("关闭连接~");
      }
    },
  }
})


export default store;
