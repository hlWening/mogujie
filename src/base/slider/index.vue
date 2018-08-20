<template>
  <div class="slider-wrapper" ref="sliderWrapper">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div :class="{dots: adapter === 'banner','dots-jrbp': adapter === 'jrbp'}">
      <span v-for="(dot, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from '../../config/common'

export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0,
      timer: null
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    adapter: {
      type: String,
      default: 'banner' // 判断不同使用场景
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this._setSliderWidth()
    //   this._initDots()
    //   this._initSlider()
    //   if (this.autoPlay) {
    //     this._play()
    //   }
    // })

    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 500)

    window.addEventListener('resize', () => {
      // 如果this.slider还没有初始化
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    // 获取所有banner图的宽度之和赋值给this.$refs.sliderGroup
    _setSliderWidth (isResize) {
      let width = 0
      let sliderWidth = this.$refs.sliderWrapper.clientWidth
      this.children = this.$refs.sliderGroup.children
      for (let i = 0; i < this.children.length; i++) {
        if (this.adapter === 'banner') {
          addClass(this.children[i], 'slider-item')
        } else {
          addClass(this.children[i], `slider-item-${this.adapter}`)
        }
        this.children[i].style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // 如果循环设置为true并且窗口大小没有发生变化 总width就增加两个banner的宽度，
      // 否则，监听到窗口大小变化时，i已经是循环之后的个数了，所以不需要再增加两个banner款
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 设置dot点
    _initDots () {
      this.dots = new Array(this.children.length) // 返回length为this.children.length的空数组
    },
    // 初始化better-scroll
    _initSlider () {
      this.slider = new BScroll(this.$refs.sliderWrapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../styles/variable";

  .slider-wrapper {
    position: relative;
    min-height: 0.01rem;
    overflow: hidden;
    .slider-group {
      white-space: nowrap;
      .slider-item {
        float: left;
        overflow: hidden;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
          }
        }
      }
      .slider-item-jrbp {
        white-space: nowrap;
        display: flex;
        justify-content: space-around;
        float: left;
        overflow: hidden;
        padding-bottom: 0.05rem;
        .slider-goods-item {
          width: 2.4rem;
          box-shadow: 0px 0.03rem 0.04rem rgba(211, 211, 211, 0.6);
          .img {
            width: 100%;
            display: block;
          }
          .info {
            padding: 0.1rem;
            .title {
              font-size: 0.26rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: @color-000;
            }
            .price {
              display: flex;
              align-items: center;
              padding-bottom: 0.06rem;
              .now-price {
                color: @color-ff5777;
                font-weight: 700;
                font-size: 0.3rem;
                line-height: 0.3rem;
                margin-right: 0.08rem;
              }
              .old-price {
                color: @color-999;
                font-size: 0.2rem;
                text-decoration: line-through;
                font-weight: 400px;
              }
            }
            a {
              display: block;
              width: 100%;
              padding: 5px;
              color: @color-fff;
              background-color: @color-ff5777;
              text-align: center;
              font-weight: 400;
              font-size: 0.26rem;
              border-radius: 0.05rem;
            }
          }
        }
      }
    }
    .dots {
      position: absolute;
      left: 1%;
      bottom: 12px;
      font-size: 0;
      span {
        display: inline-block;
        margin: 0 0.1rem;
        width: 0.14rem;
        height: 0.14rem;
        border-radius: 50%;
        background: @color-fff;
        &.active {
          background: @color-ff5777;
        }
      }
    }
    .dots-jrbp {
      display: flex;
      width: 100%;
      height: 0.55rem;
      justify-content: center;
      align-items: center;
      span {
        display: inline-block;
        margin: 0 0.05rem;
        width: 0.14rem;
        height: 0.14rem;
        border-radius: 50%;
        background: @color-d9d9d9;
        &.active {
          background: @color-333;
        }
      }
    }
  }
</style>
