import {createStore } from 'vuex'

// 创建一个store对象
const store = createStore({
	state(){
		return {
			count:0,
		}
	},
	mutations:{
		increment(state){
			state.count++
		}
	}
});
 
export default store;