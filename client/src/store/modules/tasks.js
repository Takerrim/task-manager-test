import * as actions from '@/store/constants/actions'
import * as mutations from '@/store/constants/mutations'
import http from '@/http'

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    [mutations.SET_TASKS](state, tasks) {
      state.tasks = tasks
    },
  },
  actions: {
    async [actions.FETCH_TASKS]({ commit }) {
      try {
        const { data } = await http.get('/tasks')
        commit(mutations.SET_TASKS, data)
      } catch (error) {
        console.error(error)
      }
    },
    async [actions.CREATE_TASK]({ commit, state }, payload) {
      try {
        const { data } = await http.post('/tasks', {
          title: payload.title,
          description: payload.description,
          status: 1,
          created_date: new Date().toISOString(),
        })
        commit(mutations.SET_TASKS, [...state.tasks, data])
      } catch (error) {
        console.error(error) 
      }
    },
    async [actions.REMOVE_TASK]({ dispatch }, id) {
      try {
        await http.delete(`/tasks/${id}`)

        await dispatch(actions.FETCH_TASKS)
      } catch (error) {
        console.error(error)
      }
    },
    async [actions.UPDATE_TASK]({ dispatch }, payload) {
      try {        
        await http.put(`/tasks/${payload.id}`, payload)
        await dispatch(actions.FETCH_TASKS)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
