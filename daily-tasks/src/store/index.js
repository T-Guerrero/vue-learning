import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    tasksCount(state){
      return state.tasks.length;
    }
  },
  mutations: {
    addTask(state, newTask){
      state.tasks.push(newTask);
    },
    removeTask(state, taskId){
      state.tasks.splice(taskId, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
