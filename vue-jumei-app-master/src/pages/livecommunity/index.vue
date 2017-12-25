<template lang="html">
  <div class="set-wrapper">
    <div class="header">
       <navbar :navs="navs" class="nav" marginPx="1"></navbar>
       <span class='icon'></span>
    </div>
    <div class="content">
      <ul class="contact">
        <li><span class="myfriend"></span>我的好友</li>
        <li><span class="notfriend"></span>非好友信息</li>
      </ul>
    </div>
    <ul
  v-infinite-scroll="loadMore"
 
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <li style="height: 30px;" v-for="item in list">{{ item }}</li>
</ul>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      navs: ['聊天','社区','直播'],
      list:[1,2,3,4,5,6,7,8,9,0,11,12,23,45]
    }
  },
  methods:{
  	loadMore() {
 
   console.log(this.loading)
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    //this.loading = false;
    
  }, 2500);
}
  	
  },
  components: {
    navbar
  }
}
</script>


<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position fixed
  left 0
  top .12rem
  right 0
  height 1.24rem
  width 100%
  overflow hidden
  border-1px()
  display flex
  justify-content center
  .nav
    flex 1
    margin-left 2.4rem
  .icon
    flex 0 0 .8rem
    margin-right .5rem
    margin-top .2rem
    display inline-block
    background url('../../assets/icon/search_icon.png') no-repeat
    background-size 100% 
.content
  margin-top .1rem
  width 100%
  overflow hidden
  .contact
    li
      height 1.7rem
      font-size .48rem
      line-height 1.7rem
      border-1px(100%,18%)
      span 
        display inline-block
        background-size 100%
        height 1.3rem
        width 1.3rem
        margin .3rem .3rem
        vertical-align top
        &.myfriend
          background url('../../../static/mine/colorIcon/icon11.png') no-repeat
        &.notfriend
          background url('../../../static/mine/colorIcon/icon8.png') no-repeat
</style>
