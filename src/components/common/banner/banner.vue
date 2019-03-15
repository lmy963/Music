<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for='(item,index) in list' :key="index">
				<img :src="item.picUrl">
			</div>
		</div>

	</div>
</template>

<script>
	import Swiper from "swiper"

	export default {
		name: "banner",
		data() {
			return {
				list: [

				]
			}
		},
		methods: {
			initBanner() {
				var swiper = new Swiper('.swiper-container', {
					autoplay: true,
					loop: true // 循环模式选项
				})
			}
		},
		created() {
			this.$axios.get(
					'/haha/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1551491173971&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
				)
				.then((res) => {
					console.log("获取信息成功")
					console.log(res)
					this.list = res.data.slider
					this.$nextTick(() => {
						this.initBanner()
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}

	}
</script>

<style scoped lang="less">
	@import '~style/index.less';
	@import '../../../../node_modules/swiper/dist/css/swiper.css';

	.swiper-container {
		.h(150);
		.w(375);

	}

	.swiper-slide img {
		width: 100%;

	}
</style>
