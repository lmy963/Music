<template>
  <div class="singer warpper">
    <div class="scrollList content" >
        <ul @touchmove="itemScroll">
            <li v-for="(group,index) in list" :key="index" > 
              <h4 class="title" :ref="group.title">{{group.title}}</h4>
              <ul v-for="item in group.items" >
                  <li class="items" @click="gosongDataList(item)">
                    <img v-lazy="item.avator" alt="">
                    <span class="name">{{item.name}}</span>
                </li>
              </ul>
            </li>
        </ul>
    </div>
    <ul class="slider" @touchstart="touchBegin" @touchmove="touchMove" >
              <li v-for="(item,index) in sliderData" :key="index" :style="show === index ?'color:#fff36d': ''">{{item}}
            </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  import singer from "../../../data/singer.js"
  import BScroll from "better-scroll"
  export default{
    name:"singer",
    data(){ 
      return {
        list:[],
        show:0
      }
    },
    computed:{
      sliderData(){
        return this.list.map((item)=>{
          return item.title
        })
      }
    },
    methods:{
      gosongDataList(data){
        this.$router.push({name:'detList',params:data});
      },
        normalData(data){
            let lists = {
              "hot":{
                title:"热门",
                items:[]
              },
              "A":{
                title:"A",
                items:[]
              }
            }
            for(let i = 0 ; i < data.length; i++){
              let img=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[i].Fsinger_mid}.jpg?max_age=2592000`;
              if(i<=10){
                //前十热门
                lists.hot.items.push({
                  name:data[i].Fsinger_name,
                  id:data[i].Fsinger_mid,
                  avator:img
                })
                
              }
           
              //创建新的数组
              if(!lists[data[i].Findex]){
                lists[data[i].Findex] = {
                  title:data[i].Findex,
                  items:[{
                            name:data[i].Fsinger_name,
                            id:data[i].Fsinger_mid,
                            avator:img
                        }]
                }
              }else{
                //存在添加数据
                lists[data[i].Findex].items.push ({
                  name:data[i].Fsinger_name,
                  id:data[i].Fsinger_mid,
                  avator:img
                })
              }
            }
            let hot = [];
            let arr = [];
            for(const key in lists){
              if(key === "hot"){
                hot.push(lists[key])
              }else{
                if(key.match(/[a-zA-z]/)){
                  arr.push(lists[key])
                }
              }
            }
            arr.sort((a,b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            this.list = hot.concat(arr);
            // console.log(this.list)
        },
        touchBegin(e){
          //获取点击元素的下标
          this.touchStartY = e.touches[0].clientY;
          this.touchIndex = this.sliderData.indexOf(e.target.innerText);
          let target = e.target.innerText;
          let element = this.$refs[target][0];
          this.scroll.scrollToElement(element);
          // console.log(this.touchIndex)
          this.show = this.touchIndex;
        },
        touchMove(e){
          if(e.touches[0].clientY < 580 && e.touches[0].clientY > 170){
            let moveY = e.touches[0].clientY - this.touchStartY;
            let index = parseInt(moveY/18) + this.touchIndex;
            this.show = index;
            let target = this.sliderData[index];
            let element = this.$refs[target][0];
            this.scroll.scrollToElement(element);
          }
        },
        itemScroll(e){
          let tag = e.target.tagName.toLowerCase();
          let  element =  e.target.innerText;
          if(tag === "li"){
               element = e.target.parentNode.parentNode.firstChild.innerText
           }else if(tag === "span"){
               element = e.target.parentNode.parentNode.parentNode.firstChild.innerText;
           }if(tag === "div"){
              element = e.target.firstChild.firstChild.firstChild.innerText;
           }
           let index = this.sliderData.indexOf(element);
              this.show = index;
        }
    },
    created() {
      this.touchStartY = 0 
      setTimeout(()=>{
        this.normalData(singer.list)
         setTimeout(()=>{
          this.scroll = new BScroll(".warpper",{probeType:3,click:true})
         },20)//与$nextTick效果一致
      },200)
    }
  }
</script>
<style lang="less" scoped>
   @import '~style/index.less';
   .singer{
      position:fixed;
      .w(375);
      .top(88);
      .bottom(0);
      overflow:hidden;
      .scrollList{
        .title{
         background:#333;
          font-size:@f-s-ms;
          font-weight:normal;
          color:@font-color-tab;
          .h(30);
          .l-h(30);
          .padding(0,0,0,12);
          overflow:hidden;
        }
        .items{
     
          .padding(20,0,12,20);
          .h(50);
          display:flex;
          .l-h(50);
          img{
            .w(50);
            .h(50);
            border-radius:50%;
          }
          .name{
              font-size:@f-s-ms;
              color:@font-color-tab;
              .margin(0,0,0,15);
          }
        }
      }
      .slider{
        position: absolute;
        overflow:hidden;
        top:50%;
        .right(0); 
        .w(20);
        transform:translateY(-50%);
        background: rgba(0,0,0,.3);
        border-radius:12px;
        .padding(20,0,20,0);
        li{
          .w(20);
          .h(18);
          .l-h(18);
          overflow:hidden;
          color:@font-color-tab;
          font-size:@f-s-s;
          text-align: center;
          list-style:none;
        }
      }
   }
  .active{
    color:@font-color-header;
  }
</style>
