<template>
  <div class="header-search">
    <i class="talk iconfont icon-liaotian"></i>
    <div class="input-box">
      <i class="iconfont icon-sousuo"></i>
      <input @focus="showFocusSearch" type="text">
    </div>
    <i class="sopping-cart iconfont icon-gouwuche"></i>
  </div>
</template>

<script>
export default {
  methods: {
    showFocusSearch () {
      this.$emit('showFocus')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../styles/variable";
  @import "../../fonts/iconfont";

  .header-search {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 0.92rem;
    padding: 0.15rem 0.1rem;
    border-bottom: 1px solid @color-e5e5e5;
    background-color: @color-fff;
    .talk, .sopping-cart {
      margin: 0.05rem 0.2rem 0rem;
    }
    .input-box {
      flex: 1;
      width: auto;
      background-color: @color-eee;
      border-radius: 0.06rem;
      display: flex;
      i {
        margin: 0.05rem 0.05rem 0 0.1rem;
        // left: 0.1rem;
        // width: 0.4rem;
        // height: 0.4rem;
      }
      input {
        flex: 1;
        border: none;
        height: 0.6rem;
        background: none;
      }
    }
  }
</style>
