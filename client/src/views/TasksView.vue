<template lang="pug">
  div.tasks-view
    ui-button.add-btn(@click="addTask") Add
    .tasks-grid
      task-base(v-for="(task, i) in tasks" :key="i" :task="task")
</template>

<script>
import TaskBase from '@/components/TaskBase.vue'
import { FETCH_TASKS } from '@/store/constants/actions'

export default {
  components: { TaskBase },
  computed: {
    tasks() {
      return this.$store.state.tasksModule.tasks
    },
  },
  methods: {
    addTask() {
      this.$router.push({ name: 'new' })
    }
  },
  async created() {
    if (this.tasks.length === 0) {
      await this.$store.dispatch(`tasksModule/${FETCH_TASKS}`)
    }
  },
}
</script>

<style lang="scss" scoped>
.tasks-view {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-btn {
  margin-bottom: 32px;
}

.tasks-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 30px;
  margin-top: 32px;
}

.add-btn {
  min-width: 100px;
}

@media screen and (max-width: 425px) {
  .tasks-view {
    padding: 12px;
  }
}
</style>
