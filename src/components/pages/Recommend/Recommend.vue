<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <banner></banner>
      <h4>热门歌单推荐</h4>
      <ul class="reclist">
        <li v-for="(item,index) in list" :key="index">
          <div class="icon"><img v-lazy="item.imgurl"></div>
          <div class="text">
            <p class="name">{{item.creator.name}}</p>
            <p class="diss">{{item.dissname}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import banner from "../../common/banner/banner"
  import BScroll from 'better-scroll'
  export default {
    name: "recommend",
    components: {
      banner
    },
    data() {
      return {list: []}
    },
    created() {
      let url = "/hy/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.8651802979503709"
      this.$axios.get(url)
        .then((res) => {
          this.list = res.data.list
        }).catch((err) => {
        console.log(err)
      })
    },
    mounted() {
      let elobj = this.$refs.wrapper
      new BScroll(elobj)

    }
  }
</script>
<style lang="less" scoped>
  @import '~style/index.less';

  .wrapper {
    position: fixed;
    overflow:hidden;
    bottom: 0;
    .top(88);

    .content {
      color: #fff35d;
      overflow:hidden;
      h4 {
        font-size: @f-s-m;
        text-align: center;
        .h(65);
        .l-h(65);
        font-weight: normal;
      }

      .reclist {
        li {
          display: flex;
          .padding(0, 20, 20, 20);

          .icon {
            .w(60);
            .h(60);
            .padding(0, 15, 0, 0);

            img {
              width: 100%;
            }
          }

          .text {
            .name {
              color: #fff;
              font-size: @f-s-m;
              .padding(5, 0, 8, 0);
            }

            .diss {
              color: @font-color-tab;
              font-size: @f-s-ms;
            }

          }
        }
      }

    }

  }
</style>
