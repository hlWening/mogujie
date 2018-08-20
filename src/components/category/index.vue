<template>
  <div class="category">
    <div class="search-wrap-box">
      <search-box></search-box>
    </div>
    <div class="category-box" ref="categoryBox">
      <div class="category-left">
        <div class="category-left-wrap">
          <div class="category-left-wrap-box"
            v-for="(item, index) in categoryNav"
            :key="item.index"
            @click="selectNav(item.maitKey, index)"
            :class="{active: currentIndex === index}"
          >
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="category-right">
        <div class="category-right-box"
          v-for="item in categoryMenu"
          :key="item.id"
        >
          <div class="img-box">
            <img :src="item.image" alt="">
          </div>
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '../../base/search-box'
import {getData, categoryMenu} from '../../api/category'

export default {
  data () {
    return {
      categoryNav: [],
      currentIndex: 0,
      categoryMenu: []
    }
  },
  created () {
    this._getData()
  },
  mounted () {
    this.setCategoryHeight()
  },
  methods: {
    setCategoryHeight () {
      let screenHeight = document.body.clientHeight
      const tabHeight = 46
      this.$refs.categoryBox.style.height = (screenHeight - 2 * tabHeight) + 'px'
    },
    selectNav (key, index) {
      this._categoryMenu(key)
      this.currentIndex = index
    },
    _getData () {
      getData().then((res) => {
        if (res.success && res.returnCode === 'SUCCESS') {
          // 左侧菜单数据
          this.categoryNav = res.data[117330].list
          this._categoryMenu(res.data[117330].list[0].maitKey)
        }
      })
    },
    _categoryMenu (pid) {
      categoryMenu(pid).then((res) => {
        if (res.success && res.returnCode === 'SUCCESS') {
          // 右侧菜单数据
          this.categoryMenu = res.data.list
        }
      })
    }
  },
  components: {
    SearchBox
  }
}
</script>

<style scoped lang="less">
  @import "../../styles/variable";

  .category {
    .search-wrap-box {
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
    }
    .category-box {
      position: absolute;
      left: 0;
      top: 0.9rem;
      overflow: hidden;
      display: flex;
      .category-left {
        width: 2rem;
        height: 100%;
        flex: 0 0 auto;
        overflow-y: scroll;
        .category-left-wrap {
          background-color: @color-f6f6f6;
          .category-left-wrap-box {
            width: 100%;
            height: 0.9rem;
            display: flex;
            align-items: center;
            p {
              width: 100%;
              font-size: 0.28rem;
              text-align: center;
              color: @color-666;
            }
            &.active {
              background-color: @color-fff;
              p {
                height: 0.3rem;
                border-left: 4px solid @color-ff5777;
                color: @color-ff5777;
              }
            }
          }
        }
      }
      .category-right {
        height: 100%;
        overflow-y: scroll;
        display: flex;
        flex: 1 1 auto;
        flex-flow: row wrap;
        background-color: @color-fff;
        .category-right-box {
          width: 1.76rem;
          height: 1.9rem;
          margin: 0.2rem 0;
          overflow: hidden;
          .img-box {
            width: 1.3rem;
            height: 1.3rem;
            margin: 0 auto;
            img {
              display: block;
              width: 100%;
            }
          }
          p {
            font-size: 0.24rem;
            color: @color-666;
            text-align: center;
            line-height: 0.38rem;
          }
        }
      }
    }
  }
</style>
