<template>
  <div class="tab">
    <router-link tag="div" v-for="(item,index) in list" :key="index" :to="item.path" active-class="active">
      <span class="text">{{item.name}}</span>
    </router-link>
  </div>
</template>
<script>

  export default {
    name: "tab",
    data() {
      return {
        list: [
          {path: "/mc/recommend", name: "推荐"},
          {path: "/mc/singer", name: "歌手"},
          {path: "/mc/rank", name: "排行"},
          {path: "/mc/search", name: "搜索"}
        ]
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~style/index.less';

  .tab {
    .w(375);
    .h(44);
    color: @font-color-tab;
    display: flex;
    align-items: center;

    div {
      flex: 1;
      .l-h(44);
      text-align: center;
      font-size: @f-s-ms;

      .text {
        padding-bottom: 5px;
      }
    }
    .active{
      color:@font-color-header;
      .text{
        border-bottom:2px solid @font-color-header;
      }
    }


  }
</style>
