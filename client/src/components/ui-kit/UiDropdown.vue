<template lang="pug">
  div.dropdown-container(:class="isDropdownVisible ? '-visible' : ''")
    div.value-wrapper(@click="toggle")
      span {{ currentValue }}
      img.arrow(src="@/assets/icons/arrow.svg")
    ul.item-list(v-if="isDropdownVisible")
      li.item(v-for="(item, i) in items" :key="i" @click="changeValue(item.value)") {{ item.label }}
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      isDropdownVisible: false,
    }
  },
  props: {
    /**
     * @property {{ label: string, value: string }[]} items
     */
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Object],
      required: true,
    },
  },
  computed: {
    currentValue() {
      return this.items.find(item => item.value === this.value).label
    }
  },
  methods: {
    changeValue(value) {
      if (this.value !== value) {
        this.$emit('change', value)
      }
      this.isDropdownVisible = false
    },
    toggle() {
      this.isDropdownVisible = !this.isDropdownVisible
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  width: max-content;

  &.-visible {
    .arrow {
      transform: rotate(-90deg) scale(-1);
    }
  }
}

.value-wrapper,
.item {
  cursor: pointer;
}

.item-list {
  list-style-type: none;
  border-radius: 6px;
  border: 1px solid #EBEDF0;
  width: max-content;
  padding: 0;
  margin: 0;
  padding: 6px 0;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #fff;
}

.item {
  padding: 12px;
  &:hover {
    background-color: #f0f0f0;
  }
}

.value-wrapper {
  display: flex;
  align-items: center;
}

.arrow {
  transform: rotate(-90deg);
  margin-left: 4px;
  transition: transform .2s;
}
</style>
