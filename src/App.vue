<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputValue' @change="changeValue"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list" >
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => {cbStatusChanged(e,item.id)}">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span >{{unDoneCount}}条剩余</span>
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['list','inputValue','unDoneCount'])
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    changeValue(e) {
      this.$store.commit('setInputValue',e.target.value)
    },
    addItemToList() {
      if(this.inputValue.trim().length <= 0) return this.$message.warning('事项不可为空！')
      this.$store.commit('addItem')
    },
    delItemById(id) {
      this.$store.commit('delItem',id)
    },
    cbStatusChanged(e,id){
      const param = {
        id:id,
        done:e.target.checked
      }
      this.$store.commit('cbCheckedChanged',param)
    },
    clear() {
      this.$store.commit('clearDone')
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
