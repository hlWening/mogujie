<template>
  <div class="tabbar">
    <router-link to="/home" class="nav-item">
      <div class="img-wrap">
        <i class="iconfont icon-shouye"></i>
      </div>
      <div class="title">首页</div>
    </router-link>
    <router-link to="/category" class="nav-item">
      <div class="img-wrap">
        <i class="iconfont icon-fenlei"></i>
      </div>
      <div class="title">分类</div>
    </router-link>
    <router-link to="/sopping-cart" class="nav-item">
      <div class="img-wrap">
        <i class="iconfont icon-gouwuche"></i>
      </div>
      <div class="title">购物车</div>
    </router-link>
    <router-link to="/user" class="nav-item">
      <div class="img-wrap">
        <i class="iconfont icon-user"></i>
      </div>
      <div class="title">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
}

</script>

<style scoped lang="less">
  @import "../../styles/variable";
  @import "../../fonts/iconfont";

  .tabbar {
    position: fixed;
    bottom: -0.01rem;
    background-color: @color-fff;
    width: 100%;
    height: 0.98rem;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid @color-e5e5e5;
    .nav-item {
      display: block;
      flex: 1;
      text-align: center;
      .img-wrap {
        width: 0.49rem;
        height: 0.46rem;
        margin: 0.1rem auto 0;
        i {
          vertical-align: 140%;
          color: @color-333;
        }
      }
      .title {
        font-size: 0.24rem;
        color: @color-666;
      }
      &.router-link-active {
        .title, .img-wrap i {
          color: @color-ff5777;
        }
      }
    }
  }
</style>
