import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UiButton from '@/components/ui-kit/UiButton.vue'
import UiDropdown from '@/components/ui-kit/UiDropdown.vue'

Vue.component('ui-button', UiButton)
Vue.component('ui-dropdown', UiDropdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
