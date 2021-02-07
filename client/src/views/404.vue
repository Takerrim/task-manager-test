<template lang="pug">
  div.not-found-view
    img(src="@/assets/img/404.svg")
    router-link.link(:to="{ name: 'tasks' }") Home
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.not-found-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.link {
  margin-top: 24px;
}
</style>