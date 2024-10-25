<template>
	<div
		class="virtualListWrap"
		ref="virtualListWrap"
		:style="{ height: itemHeight * count + 'px' }"
		@scroll="handleScroll"
	>
		<div
			class="placeholderDom"
			:style="{ height: allListData.length * itemHeight + 'px' }"
		></div>
		<div class="contentList" :style="{ top: topVal }">
			<!-- 每一条（项）数据 -->
			<div
				v-for="(item, index) in showListData"
				:key="index"
				class="itemClass"
				:style="{ height: itemHeight + 'px' }"
			>
				{{ item.name }}
			</div>
		</div>
		<div class="loadingBox" v-show="loading">
			<i class="el-icon-loading"></i>
			&nbsp;&nbsp;<span>loading...</span>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {
			allListData: [], // 所有的数据，比如这个数组存放了十万条数据
			itemHeight: 40, // 每一条（项）的高度，比如40像素
			count: 10, // 一屏展示几条数据
			start: 0,
			end: 10,
			topVal: 0,
			loading: false
		}
	},
	computed: {
		// 从所有的数据allListData中截取需要展示的数据showListData
		showListData: function () {
			// console.log(this.allListData.slice(this.start, this.end))
			return this.allListData.slice(this.start, this.end)
		}
	},
	async mounted() {
		this.loading = true
		const res = await axios.get('http://124.223.69.156:3300/bigData')
		this.allListData = res.data.data
		this.loading = false
	},

	methods: {
		handleScroll() {
			const scrollTop = this.$refs.virtualListWrap.scrollTop
			this.start = Math.floor(scrollTop / this.itemHeight)
			this.end = this.start + this.count
			this.topVal = this.$refs.virtualListWrap.scrollTop + 'px'
		}
	}
}
</script>
<style scoped lang="less">
// 虚拟列表容器盒子
.virtualListWrap {
	box-sizing: border-box;
	width: 240px;
	border: solid 1px #000000;
	// 开启滚动条
	overflow-y: auto;
	// 开启相对定位
	position: relative;
	.contentList {
		width: 100%;
		height: auto;
		// 搭配使用绝对定位
		position: absolute;
		top: 0;
		left: 0;
		.itemClass {
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
		// 奇偶行改一个颜色
		.itemClass:nth-child(even) {
			background: #c7edcc;
		}
		.itemClass:nth-child(odd) {
			background: pink;
		}
	}
	.loadingBox {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.64);
		color: green;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
