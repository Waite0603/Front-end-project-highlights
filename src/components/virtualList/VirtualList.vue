<template>
	<div>
		<div
			class="virtualListWrap"
			:style="{ height: itemHeight * count + 'px' }"
			@scroll="handleScroll"
			ref="virtualListWrap"
		>
			<!-- 所有数据的占位dom -->
			<div
				class="placeholderDom"
				:style="{ height: allListData.length * itemHeight + 'px' }"
			></div>
			<div class="loadingBox" v-show="loading">
				<i class="el-icon-loading"></i>
				&nbsp;&nbsp;<span>loading...</span>
			</div>
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
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const allListData = ref([]) // 所有的数据，比如这个数组存放了十万条数据
const itemHeight = 40 // 每一条（项）的高度，比如40像素
const count = 10 // 一屏展示几条数据
const start = ref(0)
const end = ref(10)
const topVal = ref(0)

const loading = ref(false)
// virtualListWrap 实例
const virtualListWrap = ref(null)

const showListData = computed(() => {
	// +1 是为了防止最后一条数据被截取
	return allListData.value.slice(start.value, end.value + 1)
})

const getData = async () => {
	loading.value = true
	const res = await axios.get('http://124.223.69.156:3300/bigData')

	allListData.value = res.data.data
	console.log(allListData.value)
	loading.value = false
}

const handleScroll = () => {
	const scrollTop = virtualListWrap.value.scrollTop
	console.log(scrollTop)
	start.value = Math.floor(scrollTop / itemHeight)
	end.value = start.value + count

	topVal.value = start.value * itemHeight + 'px'
}

onMounted(() => {
	getData()
})
</script>

<style scoped lang="less">
// 虚拟列表容器盒子
.virtualListWrap {
	box-sizing: border-box;
	width: 240px;
	margin-top: 20px;
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
