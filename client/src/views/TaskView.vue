<template lang="pug">
  div.task-view
    task-extended(v-if="task" :task="task")
</template>

<script>
import TaskExtended from '@/components/TaskExtended.vue'
import { FETCH_TASKS } from '@/store/constants/actions'

export default {
  components: { TaskExtended },
  computed: {
    tasks() {
      return this.$store.state.tasksModule.tasks
    },
    task() {
      return this.tasks.find(task => task.id === Number(this.$route.params.id))
    }
  },
  methods: {
    goToTasks() {
      this.$router.replace({ name: 'tasks' })
    },
  },
  async created() {
    if (this.tasks.length === 0) {
      await this.$store.dispatch(`tasksModule/${FETCH_TASKS}`)
    }

    if (!this.task) {
      this.$router.push({ name: 'notFound' })
    }
  },
}
</script>

<style lang="scss" scoped>
.task-view {
  display: flex;
  justify-content: center;
  padding: 24px;
}
</style>
