import state from "./state"

export default {
	addSongList(state,param){
		state.songList = param
	},
	changIndex(state,param){
		if(param ==="next"){
			state.nowIndex++
		}else if(param === "prev"){
			state.nowIndex--
		}else{
			state.nowIndex = param
		}
		if(state.nowIndex > state.songList.length-1){
			state.nowIndex = 0
		}else if(state.nowIndex < 0 ){
			state.nowIndex = state.songList.length-1;
		}
	}
}