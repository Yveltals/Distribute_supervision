import Vue from 'vue'
import Vuex from 'vuex'
import SockJS from '../utils/sockjs'
import '../utils/stomp'
import { Notification } from 'element-ui';
import { postRequest} from "../utils/api";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    nodeId: null,
    sessions: [],//聊天记录
    stomp: null,
  },
  mutations: {
    getSession(state) {
      let msg = new Object()
      postRequest('/api/message/getMessages',msg).then(res=>{
        if(!res.code){
          console.log(res.data)
        }else{
          console.info(res.msg)
        }
      })
    },
  },
  actions: {
    connect(context) {
      var headers = {'token': this.state.token_}
      context.state.stomp = Stomp.over(new SockJS('https://b2884t1064.oicp.vip/ems_course_session?token=' + this.state.token_));
      context.state.stomp.connect({}, success => {
        // 订阅课程实例
        context.state.stomp.subscribe("/api/session/" + this.state.classId, msg => {
          console.log(msg)
          context.commit('getSession') //获取聊天记录
        },headers)
        // context.state.stomp.subscribe("/user/" + this.state.id_ + "/receive", msg => {
          // console.log(msg)
        // },headers)
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
