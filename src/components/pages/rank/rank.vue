<template>
	<div class="rank warpper">
		<div class="rankList content">
			<ul v-for="group in  list" class="box" >
					<li v-for="item in group" class="item" @click="goDetil(item)">
						<!-- {{item.songList}} -->
						<img v-lazy="item.picUrl" width="100" height="100">
						<ol class="songList">
							<!-- {{sitem}} -->
							<li  v-for=" (sitem,index) in  item.songList"  :key="index">
								{{index+1}}、{{sitem.songname}}---{{sitem.singername}}
							</li>	
						</ol>
					
					</li>
			</ul>
		</div>
	</div>	
</template>
<script>
	import BScroll from "better-scroll"
	export default{
		name:"rank",
		data(){
			return {
				list:[]
			}
		}, 
		methods:{
			goDetil(data){
				this.$router.push({name:detList,params:data})
			}
		},
		created(){
			console.log(this.$store)
			this.$axios.get("/haha/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&uin=0&needNewCode=1&platform=h5")
				.then((res)=>{
					let index = res.indexOf("(");
					res = JSON.parse(res.substring(index+1,res.length-1)).data
					
					this.$nextTick(()=>{
						this.list = res
					})
				})
				.catch((err)=>{
					console.log(err)
				})
		},
		mounted(){
			new BScroll(".warpper",{click:true})
		}
	}
</script>
<style lang="less">
   @import '~style/index.less';

		.rank{
			position: fixed;
			.w(375);
			.top(88);
			.bottom(0);
			overflow:hidden;
			.content{
					overflow: hidden;

			.box{
				.w(335);
				margin: 0 auto;
				.item{
				margin: 0 auto;
				display: flex;
				font-size: @f-s-m;
				background: #333;
				.margin(0,0,20,0);
				.songList{
					.l-h(26);
					.padding(10,10,0,20);
					li{	
						.w(190);
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						font-size:@f-s-s;
						color:@font-color-tab;
						list-style: none;
					}
				}
			}
			}
			}
			
		}
</style>