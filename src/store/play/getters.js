export default {
	currentSong(state){
		if(state.songList.length === 0 ){
			return {}
		}

		let interval = state.songList[state.nowIndex].interval
		// if(!isNaN(interval)){
		// 	let second = ":" + (interval%60 >= 10 ? interval%60 : "0" + interval%60)
		// 	interval =  parseInt(interval/60) + second;
		// }
		let albid = state.songList[state.nowIndex].albid
		let songmid  =state.songList[state.nowIndex].songmid
		let song = state.songList[state.nowIndex]
        let imgUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albid}.jpg?max_age=2592000`
        song.imgUrl = imgUrl
      	song.songUrl=`http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=4020019692&vkey=055C2BAC16C478465CEE343217736A3AFF51E13A3EA4CD12E7AE68D443D9648A9F07CC03F482116436C77BDE3C6E47A04D097EE05D36E55B&uin=0&fromtag=38`
		song.interval = interval;
		return song
		}
}