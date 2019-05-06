<template>
  <div class="index">
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="danger">Danger</a-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "ant-design-vue";
Vue.use(Button);
export default {
  data() {
    return {
      msg: "hello vue"
    };
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.index {
  color: red;
}
</style>