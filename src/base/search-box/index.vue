<template>
  <div class="search-box">
    <header-search @showFocus="showFocus"></header-search>
    <focus-search v-show="isShowFocus" @hideFocus="hideFocus"></focus-search>
  </div>
</template>

<script>
import HeaderSearch from '../header-search'
import FocusSearch from '../focus-search'

export default {
  data () {
    return {
      isShowFocus: false
    }
  },
  methods: {
    showFocus () {
      this.isShowFocus = true
    },
    hideFocus () {
      this.isShowFocus = false
    }
  },
  components: {
    HeaderSearch,
    FocusSearch
  }
}
</script>

<style scoped lang="less">
  .search-box {
    width: 100%;
  }
</style>
