<template>
	<div class="home">
		<m-header></m-header>
		<tab></tab>	
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>
<script>
  import  recommend from "pages/Recommend/Recommend";
  import MHeader from "../../common/m-header/m-header";
  import tab from "../../common/tab/tab";
  import singer from "pages/singer/singer"
  import player from "common/player/player"
	export  default {
		name:"home",
		components:{
			MHeader,
			tab,
			recommend,
			player	
		}
	}
</script>

<style lang="less" scoped>
	@import "~style/index.less";

</style>