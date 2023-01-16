import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:'acd',
    nextId:5
  },
  getters: {
  },
  mutations: {
    initList(state,list) {
      state.list=list
    },
    setInputValue(state,val) {
      state.inputValue=val
    },
    addItem(state) {
      const obj = {
        "id": state.nextId,
        "info": state.inputValue,
        "done": false
      }
      state.list.push(obj)
      state.nextId++
    },
    delItem(state,id) {
   // state.list=state.list.filter(state.list.id!==tag)
    state.list = state.list.filter(list=>list.id !== id )
 }
  },
  actions: {
    getList(content) {
      axios.get('/list.json').then(({data})=>{
        content.commit('initList',data)
      })
    }
  },
  modules: {
  }
})
