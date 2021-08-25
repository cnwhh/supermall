<template>
  <div class="vertical-tab">
    <div
      class="vertical-tab-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span class="vertical">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalTab",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 子传父
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.vertical {
  display: inline-block;
  padding: 14px 0;
  width: 100px;

  background-color: #f6f6f6;
  font-size: 16px;
  text-align: center;
}
</style>