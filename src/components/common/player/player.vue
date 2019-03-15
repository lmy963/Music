<template> 
	<div class="player" v-if="songList.length">
			<div v-show="show" class="big">
				<div class="bg">
					<img :src="currentSong.imgUrl">
				</div>  
				
				<div class="header">
					<span @click="mask" class="goBack iconfont icon-xiangxiazhanhang"></span>
					<span>{{currentSong.songname}}</span>
				</div>
				<p>{{currentSong.name}}</p>
				<div class="cd-play">
					<img :src="currentSong.imgUrl" class="cd">
				</div>
				<div class="control">
					<audio :src="currentSong.songUrl"  autoplay
					@timeupdate="update" ref="audio" @ended="nextSong"></audio>
					<hr>                  
					<p class="lyric"  v-html="list[nowLine].txt">
						加载中....{{nowLine}}
					</p>
					<div class="progress">
						<mt-progress :value="value">
						<span slot="start">{{currentTime}}</span>
						<span slot="end">{{interval}}</span>
						</mt-progress>	
					</div>
				</div>
				<div class="btn">
					<span class="iconfont icon-suijibofang"></span>
					<span class="iconfont icon-shangyishou" @click="prevSong"></span>
					<span class="iconfont icon-zanting"  @click="play('stop')" v-show="player" ></span>
					<span class="iconfont icon-bofang" @click="play('play')" v-show="!player"></span>
					<span class="iconfont icon-kuaijin" @click="nextSong"></span>
					<span class="iconfont icon-liebiao"></span>
				</div>
			 </div>
			 <div v-show="!show" class="small" @click="hidden">
			 	这里是小播放器
			 </div>
	</div>	
</template>


<script>
	import {mapGetters,mapMutations,mapActions,mapState} from "vuex"
	import { Base64 } from 'js-base64';
	import Lyric from "lyric-parser"

	export default{
		name:"player",
		data(){
			return {
				show:true,
				list:[{lry:'loading....'}],
				player:true,
				currentTime:null,
				nowLine:0,
				m:0,
			}
		},
		computed:{
				...mapGetters(['currentSong']),
				...mapState({
					songList: state=>state.play.songList,
					nowIndex: state =>state.play.nowIndex
				}),
				value(){
				   return 	parseInt((this.m/this.currentSong.interval)*100)
				},
				interval(){
					let second = ":" + (this.currentSong.interval%60 >= 10 ? this.currentSong.interval%60 : "0" + interval%60)
					return parseInt(this.currentSong.interval/60) + second;
				}

		},
		watch:{
			currentSong(newSong,oldSong){
				let url = `/hy/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${newSong.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552276627902`
				this.$axios.get(url)
					.then((res)=>{
						// console.log(res)
						// console.log(Base64.decode(res.lyric)) 
							this.lyricobj = new Lyric(Base64.decode(res.lyric),(res)=>{
								console.log(res)
							// console.log(lyricobj)
							this.nowLine = res.lineNum
							})
							this.lyricobj.play()
							
							this.list =  this.lyricobj.lines;
					})
					.catch((err)=>{
						console.log(err)
					})
				}

		},
		methods:{
			update(e){
				let minute = parseInt(e.target.currentTime/60);
				let scond = parseInt(e.target.currentTime)%60;
				this.m  = e.target.currentTime;
				scond = scond >= 10 ?  scond : "" +  0  + scond
				this.currentTime = minute + ":" +  scond

			},
			mask(){
				this.show = !this.show;
			},
			timeupdate(e){
				 return  e.currentTime 
			},
			twoNum(num){
			 return 	num/10 > 0 ? num :  0 + num;
			},
			
			hidden(){
				this.mask();
				let player = document.querySelector(".player")
				player.style.top = "";
				palyer.height="";
				player.style.bottom = "0";
			},
			play(state){
			
				let play  = document.querySelector('audio')
				
				if(state ===  "stop"){
					play.pause();
					document.querySelector(".cd").style.animationPlayState = "paused"
				}else{
					play.play();
					
					document.querySelector(".cd").style.animationPlayState = "running"

				}
				this.lyricobj.togglePlay()
				this.player = !this.player

			},
			nextSong(){
				this.$store.commit('changIndex','next');
			},
			prevSong(){
				this.$store.commit('changIndex',"prev");
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "~style/index.less";
	@import '../../../common/iconfont/iconfont.css';
	.player{
		position: fixed;
		.w(375);
		.top(0);
		.bottom(0);
		background: #eee;
		.big{
			position:fixed;
				.top(0);
				.w(375);
				.bottom(0);
			.bg{
				position:fixed;
				.top(0);
				.w(375);
				.bottom(0);
				z-index: -1;
				img{
					width:100%;
					height: 100%;
					filter: blur(30px);
				}
			}
			.header{
				.tac();
				.h(40);
				.l-h(40);
				font-size:@f-s-m;
				.goBack{
					position:absolute;
					.left(20);
					color:#6ecf5a;
				}
				
			}
			p{
				font-size:@f-s-m;
				.tac();
			}
			.cd-play{
				.w(375);
				.h(320);
				display: flex;
				justify-content: center;
				align-items: center;
				.mt(20);
				.cd{
					border-radius:50%;
					border: 10px solid rgba(225,225,225,.3);
					-webkit-animation:zhuan 15s linear infinite;
				}
			}
			.control{
				.lyric{
					.h(46);
					.l-h(46);
					display: block;
					.mt(20);
					overflow: hidden;
					color:@font-color-header;
					font-size:@f-s-m;
				}
				hr{
					.mt(20);
				}
				.tac();
				.progress{
					.mt(30);
					font-size:@f-s-ms;
					color:#eee;
					.padding(0,20,0,20);
				}
			}
				.btn{
					.w(375);
					.h(40);
					position:absolute;
					.bottom(35);
					display:flex;
					justify-content: space-around;
					align-items:center;
					.iconfont{
						.f(30);
						color:#6ecf5a;
					}
				}
		}
		.small{
			.h(60);
			.w(375);
			background: #222;	
			position: fixed;
			.bottom(0);
			color: skyblue;
		}
	}
	@-webkit-keyframes zhuan{
 
		0%{-webkit-transform:rotate(0deg);}
 
		25%{-webkit-transform:rotate(90deg);}
 
		50%{-webkit-transform:rotate(180deg);}
 
		75%{-webkit-transform:rotate(270deg);}
 
		100%{-webkit-transform:rotate(360deg);}
 
	}
</style>