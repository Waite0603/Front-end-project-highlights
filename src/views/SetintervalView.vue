<template>
	<div class="bigDataBox">
		<h1>前端渲染大数据处理</h1>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="分堆渲染" name="first">
				<div v-if="activeName === 'first'">
					<el-button
						style="margin-bottom: 12px"
						size="small"
						type="primary"
						:loading="loading"
						@click="plan"
						>点击请求加载</el-button
					>
					<el-table
						height="300"
						:data="arr"
						border
						style="width: 80%"
						:header-cell-style="{
							height: '24px',
							lineHeight: '24px',
							color: '#606266',
							background: '#F5F5F5',
							fontWeight: 'bold'
						}"
					>
						<el-table-column type="index" label="序"></el-table-column>
						<el-table-column prop="id" label="ID"></el-table-column>
						<el-table-column prop="name" label="名字"></el-table-column>
						<el-table-column prop="value" label="对应值"></el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<el-tab-pane label="触底加载" name="second">
				<ButtomLoad v-if="activeName === 'second'" />
			</el-tab-pane>
			<el-tab-pane label="虚拟列表" name="third">
				<VirtualList v-if="activeName === 'third'" />
			</el-tab-pane>
			<el-tab-pane label="表格处理" name="fourth">
				<VirtualTable v-if="activeName === 'fourth'" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import axios from 'axios'
import ButtomLoad from '../components/bottomLoad/ButtomLoad'
import VirtualList from '../components/virtualList/VirtualList'
import VirtualTable from '../components/virtualTable/VirtualTable'
export default {
	name: 'bigDataName',
	components: {
		ButtomLoad,
		VirtualList,
		VirtualTable
	},
	data() {
		return {
			activeName: 'first',
			arr: [],
			loading: false
		}
	},
	methods: {
		handleClick(tab) {
			this.activeName = tab.name
		},

		// http://124.223.69.156:3300/bigData
		averageFn(arr) {
			let i = 0
			let res = []
			while (i < arr.length) {
				res.push(arr.slice(i, i + 10))
				i = i + 10
			}
			return res
		},
		async plan() {
			this.loading = true
			const res = await axios.get('http://124.223.69.156:3300/bigData')
			this.loading = false
			const resArr = this.averageFn(res.data.data)
			console.log(resArr)
			//
			const useArr = (page) => {
				if (page > resArr.length - 1) {
					return
				}
				requestAnimationFrame(() => {
					this.arr = [...this.arr, ...resArr[page]]
					page = page + 1
					useArr(page)
				})
			}

			useArr(0)
		}
	}
}
</script>

<style lang="less" scoped>
.bigDataBox {
	box-sizing: border-box;
	padding-right: 240px;
}
</style>
