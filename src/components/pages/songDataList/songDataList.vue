<template>
	<div class="songData">

			<div class="header">
				
				<p class="name"><span @click="goBack" class="goBack iconfont icon-fanhui"></span>{{params.name}}</p>
			</div>
			<div class="pic">
				<img :src="params.avator">
			</div> 

		<div class="wrapper">
			<div class="content">
				<div>
					<div class="mask"></div>
				<ul>
					<li v-for="(item,index) in list" :key="index" class="item"
						@click="playMusic(index)">
						<h2>{{item.songname}}</h2>
						<p>{{params.name}}&bull;{{item.albumname}}</p>
					</li>
				</ul>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import jsonp from "@/common/js/jsonp"
	import BScroll from "better-scroll"
	export default {
		name: "songDataList",
		data() {
			return {
				list: [],
				params: []
			}
		},
		methods: {
			goBack() {
				this.$router.back();
			},
			playMusic(index){
				console.log("点击")
				this.$store.commit('changIndex',index),
				this.$store.commit('addSongList',this.list)
			},
			normalData(data) {
				let arr = [];

				data.forEach(item => {
					arr.push({
						albumname: item.musicData.albumname,
						name: item.musicData.singer[0].name,
						songname: item.musicData.songname,
						mid: item.musicData.singer[0].mid,
						songmid: item.musicData.songmid,
						albid: item.musicData.albummid,
						interval: item.musicData.interval
					})
				})
				this.list = arr;
			},
			getSongData() {
				let url =
					`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${this.$route.params.id}`
				jsonp(url)
					.then((data) => {
						this.normalData(data.data.list)
					})
			}
		},
		created() {
			if (!this.$route.params.name) {
				this.$router.back()
			}
			setTimeout(()=>{
				this.params = this.$route.params;
			},500)
			
			this.getSongData();
		},
		mounted(){
			let scroll =  new BScroll(".wrapper")
		}
	}
</script>
<style lang="less" scoped>
	@import "~style/index.less";

	.songData {
		font-family:@youyuan;
		position: fixed;
		.w(375);
		.top(0);
		.bottom(0);
		background: @bg-color;


			.header {
				.w(375);
				.h(40);
				.l-h(40);
				position: relative;
				.top(0);
				z-index: 5;
				display: flex;
				background:#222;
				.goBack {
					color: orange;
					display: inline-block;
					.ml(10);
					float:left;
					font-size: @f-s-l;
				}

				.name {
					flex: 1;
					color: #fff;
					font-size: @f-s-m;
					text-align: center;
				}
			
			
		}
			.pic {
				.w(375);
				position:absolute;
				z-index: -1;
				img {
					width: 100%;
					height: 100%;
				}
			}
		.wrapper {

			position: fixed;
			.w(375);
			.top(40);
			.bottom(0);
			.content {
				position: absolute;
				.top(262);
				z-index: 3;
			
				.mask{
					.h(262);
				}
				ul{
					background: #222;
				}
				.item{
					
					.w(375);
					.padding(0,0,0,20);
					h2{
						font-size:@f-s-m;
						color: #fff;
						font-weight: normal;
					}
					p{
						font-size: @f-s-ms;
						color: @font-color-tab;
					}
				}
			}

			
		}

	}
</style>
