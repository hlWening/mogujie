/*
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
function setRem (window) {
  /* 设计图文档宽度 */
  const docWidth = 750
  let doc = window.document
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = (function refreshRem () {
    let clientWidth = docEl.clientWidth
    // 屏幕宽度大于640，不再放大，小于320不再缩小
    clientWidth = clientWidth < 750 ? (clientWidth > 320 ? clientWidth : 320) : 750
    docEl.style.fontSize = 100 * clientWidth / docWidth + 'px'
    return refreshRem
  })()
  /* 添加倍屏标识，安卓为1 ----------添加倍屏标识，可要可无 */
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1)
  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    doc.documentElement.classList.add('ios')
    /* IOS8以上给html添加hairline样式，以便特殊处理 */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8) {
      doc.documentElement.classList.add('hairline')
    }
  }
  if (!doc.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

setRem(window)
