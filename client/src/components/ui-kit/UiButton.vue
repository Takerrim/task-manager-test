<template lang="pug" functional>
  button.ui-button(:class="[`-${props.appearance}`, data.staticClass, data.class]" v-on="listeners" :type="props.type")
    slot
</template>

<script>
export default {
  props: {
    appearance: {
      validator: (value) => ['success', 'error', 'primary'].includes(value),
      type: String,
      default: 'primary',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style lang="scss">
.ui-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  color: #FFFFFF;
  border-radius: 6px;
  border: none;
  padding: 0 12px;
  cursor: pointer;

  &.-success {
    background-color: #5BC66C;
  }
  &.-primary {
    background-color: #00A0FF;
  }
  &.-error {
    background-color: #F33636;
  }
}
</style>
