<template>
  <div class="home">
    <search-box></search-box>
    <slider>
      <div v-for="item in sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.image_800" alt="">
        </a>
      </div>
    </slider>
    <div class="res-wrapper">
      <div class="res" v-for="items in res" :key="items.id">
        <div class="res-item" v-for="item in items" :key="item.id">
          <div class="res-img">
            <img :src="item.image" alt="">
          </div>
          <p class="res-title" v-html="item.title"></p>
        </div>
      </div>
    </div>
    <div class="slider-goods-wrapper">
      <div class="slider-goods-title">
        <img src="https://s10.mogucdn.com/mlcdn/c45406/180316_725b351h42166d01dj74ke9l7adi7_188x54.png">
        <div class="timer">
          <span class="time">{{hours}}</span>
          <span>:</span>
          <span class="time">{{minutes}}</span>
          <span>:</span>
          <span class="time">{{seconds}}.{{clSeconds}}</span>
        </div>
      </div>
      <slider adapter="jrbp" :loop="jrbpSlider.loop" :auto-play="jrbpSlider.autoPlay">
        <div v-for="items in jrbpData" :key="items.id">
          <div class="slider-goods-item" v-for="item in items" :key="item.id">
            <img class="img" :src="item.image" alt="">
            <div class="info">
              <p class="title">{{item.title}}</p>
              <div class="price">
                <p class="now-price">{{item.salePrice}}</p>
                <p class="old-price">{{item.price}}</p>
              </div>
              <a href="javascript:void(0)">去拼团</a>
            </div>
          </div>
        </div>
      </slider>
    </div>
    <div class="promotion-wrapper">
      <h2 class="promotion-title">最潮流-促销直达</h2>
      <div class="promotion-box">
        <div class="promotion-box-top">
          <div class="promotion-box-left">
            <div class="promotion-content" v-for="item in promotionData[0]" :key="item.id">
              <p class="title">{{item.title}}</p>
              <p class="vice-title">{{item.viceTitle}}</p>
              <img :src="item.image" alt="">
            </div>
          </div>
          <div class="promotion-box-right">
            <div class="promotion-content" v-for="item in promotionData[1]" :key="item.id">
              <div>
                <p class="title">{{item.title}}</p>
                <p class="vice-title">{{item.viceTitle}}</p>
              </div>
              <img :src="item.image" alt="">
            </div>
          </div>
        </div>
        <div class="promotion-box-bottom">
          <div class="promotion-content" v-for="item in promotionData[2]" :key="item.id">
            <p class="title">{{item.title}}</p>
            <p class="vice-title">{{item.viceTitle}}</p>
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="goods">
      <div class="goods-title">
        <p>精选商品</p>
      </div>
      <div class="nav">
        <div class="parent-nav">
          <span
            v-for="(item, index) in goodsParentNav"
            :key="index"
            @click="clickParentNav(index)"
            :class="{active: currentParentNavIndex === index}"
          >
            {{item.title}}
          </span>
        </div>
        <div class="children-nav">
          <div
            v-for="(items, indexs) in goodsChildNav"
            :key="items.id"
            v-show="indexs === currentParentNavIndex"
          >
            <div class="children-nav-item"
              v-for="(item, index) in items"
              :key="index"
              @click="clickChildNav(index)"
              :class="{active: currentChildNavIndex === index}"
            >
              <!-- <div class="nav-img">
                <img src="https://s11.mogucdn.com/mlcdn/c45406/180306_3ge7h6dcd99c09h2j8e85dl0f5jd8_120x120.png" alt="">
              </div> -->
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="good-list">
        <div class="good-box" v-for="item in goodList" :key="item.id">
          <div class="good-img">
            <img :src="item.img">
          </div>
          <div class="good-info">
            <p><span v-if="item.leftbottom_taglist.length">{{item.leftbottom_taglist[0].content}}</span>{{item.title}}</p>
            <div class="good-info-price">
              <span class="price-wrap">￥{{item.price}}</span>
              <div class="shoucang">
                <span>{{item.cfav}}</span>
                <i class="iconfont icon-shoucang"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '../../base/search-box'
import Slider from '../../base/slider'
import {getData, getDataJrbpAndGoodsNav, getGoodList} from '../../api/home'
import {twoIntegers, arrayChunk} from '../../config/common'

export default {
  data () {
    return {
      sliders: [], // banner
      res: [], // res
      timer: null, // 定时器
      hours: 24,
      minutes: 59,
      seconds: 59,
      clSeconds: 9,
      jrbpSlider: {
        loop: false,
        autoPlay: false
      },
      jrbpData: [],
      promotionData: [], // 促销数据
      goodsParentNav: [],
      currentParentNavIndex: 0,
      goodsChildNav: [],
      currentChildNavIndex: 0,
      goodList: []
    }
  },
  created () {
    this._getData()
    this._getDataJrbpAndGoodsNav()
    this.jrbpTimer()
    this.jrbpTimerPlay()
    this._getGoodList()
  },
  methods: {
    showFocus () {
      this.isShowFocus = true
    },
    hideFocus () {
      this.isShowFocus = false
    },
    jrbpTimer () {
      let nowTime = new Date()
      let nowHours = nowTime.getHours() + 1
      let nowMinutes = nowTime.getMinutes() + 1
      let nowSeconds = nowTime.getSeconds() + 1
      this.hours = twoIntegers(24 - nowHours)
      this.minutes = twoIntegers(60 - nowMinutes)
      this.seconds = twoIntegers(60 - nowSeconds)
    },
    jrbpTimerPlay () {
      this.timer = setInterval(() => {
        this.clSeconds = parseInt(this.clSeconds) - 1
      }, 100)
    },
    clickParentNav (index) {
      this.currentParentNavIndex = index
      this.currentChildNavIndex = 0
    },
    clickChildNav (index) {
      this.currentChildNavIndex = index
    },
    _getData () {
      getData().then((res) => {
        if (res.success && res.returnCode === 'SUCCESS') {
          // 轮播图数据
          this.sliders = res.data[122224].list
          // res数据
          // let res1 = resData.filter((item, index, arr) => {
          //   return index < 5
          // })
          this.res = arrayChunk(res.data[106930].list, 2)
          // 促销数据
          this.promotionData.push(res.data[47224].list.slice(0, 1))
          this.promotionData.push(res.data[47224].list.slice(1, 3))
          this.promotionData.push(res.data[47224].list.slice(3, 6))
          // 商品父级标签
          // this.goodsParentNav = res.data[117706].list
        }
      })
    },
    _getDataJrbpAndGoodsNav () {
      getDataJrbpAndGoodsNav().then((res) => {
        if (res.success && res.returnCode === 'SUCCESS') {
          // 今日必拼数据
          this.jrbpData = arrayChunk(res.data[98662].list, 10)
          // 精选商品nav数据
          for (let key in res.data) {
            if (key !== '98662') {
              let dataList = res.data[key].list
              this.goodsParentNav.push(dataList[0])
              this.goodsChildNav.push(dataList.slice(1, dataList.lentgh))
            }
          }
        }
      })
    },
    _getGoodList () {
      getGoodList().then((res) => {
        if (res.data.ret === 'SUCCESS') {
          let data = res.data.data
          this.goodList = data.wall.docs
        }
      })
    }
  },
  watch: {
    // 以下为监听定时器的时分秒
    clSeconds (newClSeconds) {
      if (newClSeconds < 0) {
        this.clSeconds = 9
        this.seconds = twoIntegers(parseInt(this.seconds) - 1)
      }
    },
    seconds (newSeconds) {
      if (newSeconds === '00') {
        this.seconds = 59
        this.minutes = twoIntegers(parseInt(this.minutes) - 1)
      }
    },
    minutes (newMinutes) {
      if (newMinutes === '00') {
        this.minutes = 59
        this.hours = twoIntegers(parseInt(this.hours) - 1)
      }
    },
    hours (newHours) {
      if (newHours === '00') {
        clearTimeout(this.timer)
      }
    }
  },
  components: {
    SearchBox,
    Slider
  }
}
</script>

<style scoped lang="less">
  @import "../../styles/variable";
  @import "../../fonts/iconfont";

  .promotion-content (@width, @title-margin-top) {
    text-align: center;
    .title {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: @color-333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      margin-top: @title-margin-top;
    }
    .vice-title {
      color: @color-ff5777;
      font-size: 0.24rem;
      line-height: 0.33rem;
    }
    img {
      display: block;
      width: @width;
      margin: 0 auto;
    }
  }

  .home {
    padding-bottom: 0.98rem;
    .res-wrapper {
      background-color: @color-fff;
      .res {
        width: 100%;
        padding-top: 0.3rem;
        display: flex;
        justify-content: space-around;
        .res-item {
          flex: 1;
          text-align: center;
          .res-img {
            width: 1rem;
            height: 1rem;
            margin: 0 auto;
            img {
              width: 100%;
              display: block;
            }
          }
          .res-title {
            font-size: 0.25rem;
            color: @color-606060;
          }
        }
      }
    }
    .slider-goods-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      background-color: @color-fff;
      .slider-goods-title {
        display: flex;
        width: 100%;
        height: 1.1rem;
        align-items: center;
        img {
          width: auto;
          height: 0.6rem;
        }
        .timer {
          border-left: 0.03rem solid @color-eee;
          height: 0.6rem;
          display: flex;
          align-items: center;
          margin-left: 0.1rem;
          padding-left: 0.2rem;
          span {
            font-size: 0.15rem;
            margin-left: 2px;
            &.time {
              color: @color-fff;
              font-size: 0.2rem;
              padding: 0.06rem;
              background-color: @color-000;
              margin-left: 8px;
              border-radius: 0.08rem;
            }
          }
        }
      }
    }
    .promotion-wrapper {
      background-color: @color-fff;
      margin: 0.2rem 0;
      .promotion-title {
        height: 0.8rem;
        line-height: 0.8rem;
        color: @color-333;
        text-indent: 0.2rem;
        font-size: 0.28rem;
        font-weight: normal;
      }
      .promotion-box-top {
        display: flex;
        width: 100%;
        height: 3.2rem;
        .promotion-box-left {
          width: 50%;
          border-top: 1px solid @color-e5e5e5;
          border-right: 1px solid @color-e5e5e5;
          .promotion-content(2rem, 0.43rem);
        }
        .promotion-box-right {
          width: 50%;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          .promotion-content {
            flex: 1;
            display: flex;
            border-top: 1px solid @color-e5e5e5;
            justify-content: center;
            div {
              display: flex;
              flex-flow: column;
              justify-content: center;
              .title {
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: @color-333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: bold;
              }
              .vice-title {
                color: @color-ff5777;
                font-size: 0.24rem;
                line-height: 0.33rem;
              }
            }
            img {
              display: block;
              width: 1.5rem;
              margin: auto 0;
            }
          }
        }
      }
      .promotion-box-bottom {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid @color-e5e5e5;
        .promotion-content(1.7rem, 0.1rem);
        .promotion-content {
          flex: 1;
          &:nth-child(2) {
            border-left: 1px solid @color-e5e5e5;
            border-right: 1px solid @color-e5e5e5;
          }
        }
      }
    }
    .goods {
      width: 100%;
      background-color: @color-fff;
      .goods-title {
        padding: 0.3rem 0;
        background: url(../../images/title-bg.png) center center no-repeat;
        background-size: 3.13rem;
        background-color: @color-f6f6f6;
        text-align: center;
        p {
          font-size: 0.3rem;
          color: @color-333;
        }
      }
      .nav {
        position: sticky;
        top: 0;
        background-color: @color-fff;
        .parent-nav {
          width: 100%;
          // border-bottom: 0.01rem solid @color-eee;
          height: 1rem;
          overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            margin-left: 0.12rem;
            line-height: 0.65rem;
            height: 0.65rem;
            padding: 0 0.32rem;
            color: @color-666;
            background: @color-f8f8f8;
            font-size: 0.28rem;
            border-radius: 0.4rem;
            &.active {
              color: @color-ff5777;
              background: @color-fce7eb;
            }
          }
        }
        .children-nav {
          width: 100%;
          height: 1.6rem;
          overflow-x: scroll;
          overflow-y: hidden;
          div {
            white-space: nowrap;
            display: flex;
            align-items: center;
            .children-nav-item {
              width: 1.35rem;
              height: 1.39rem;
              margin-right: 0.24rem;
              // 父级设置display为flex后子级设置width无效，因为1-父级宽度不够子级就会自动缩小，2-子级的flex-shrink值默认为1（即如果空间不足，该item将缩小），
              // 所以需要设置其值为1，其width才生效
              // flex-shrink: 0;
              .nav-img {
                height: 0.9rem;
                width: 100%;
                text-align: center;
                img {
                  display: block;
                  height: 100%;
                  width: auto;
                  margin: 0 auto;
                }
              }
              p {
                font-size: 0.24rem;
                color: @color-666;
                margin: 0 auto;
              }
              &.active {
                border: 0.02rem solid @color-ff899f;
                border-radius: 0.09rem;
                p {
                  color: @color-ff5777;
                }
              }
            }
          }
        }
      }
      .good-list {
        display: flex;
        flex-flow: row wrap;
        align-content: space-between;
        background-color: @color-f6f6f6;
        .good-box {
          width: 3.48rem;
          background-color: @color-fff;
          margin: 0.18rem 0 0 0.18rem;
          .good-img {
            img {
              display: block;
              width: 100%;
            }
          }
          .good-info {
            padding: 0.18rem;
            p {
              font-size: 0.24rem;
              color: @color-555;
              height: 0.7rem;
              overflow: hidden;
              text-overflow: ellipsis;
              line-clamp: 2;
              span {
                color: @color-333;
                background-color: @color-f9e4a8;
                padding: 0.03rem 0.05rem 0;
                margin-right: 0.05rem;
                border-radius: 0.03rem;
              }
            }
            .good-info-price {
              display: flex;
              justify-content: space-between;
              margin-top: 0.12rem;
              .price-wrap {
                font-size: 0.28rem;
                color: @color-333;
                font-weight: 700;
              }
              .shoucang {
                display: flex;
                align-items: center;
                span {
                  font-size: 0.24rem;
                  color: @color-666;
                }
                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
