<template>
  <div class="focus-search">
    <div class="search-wrap">
      <i class="iconfont icon-back" @click="back"></i>
      <input type="text" placeholder="睡衣">
      <span>搜索</span>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$emit('hideFocus')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../styles/variable";
  @import "../../fonts/iconfont";

  .focus-search {
    background-color: @color-fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .search-wrap {
      width: 100%;
      height: 0.9rem;
      border-bottom: 1px solid @color-eee;
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      justify-content: space-between;
      input {
        width: 5.9rem;
        height: 0.5rem;
        padding: 0.1rem 0.2rem;
        border: 1px solid @color-aaa;
        border-radius: 0.09rem;
        font-size: 0.28rem;
        &:focus {
          border: 1px solid @color-ff5777;
        }
      }
      span {
        font-size: 0.28rem;
      }
    }
  }
</style>
