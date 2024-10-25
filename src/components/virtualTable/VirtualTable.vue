<template>
	<div class="box">
			<vxe-table
					border
					show-overflow
					ref="xTable1"
					height="300"
					:row-config="{ isHover: true }"
					:loading="loading"
			>
					<vxe-column type="seq"></vxe-column>
					<vxe-column field="id" title="ID"></vxe-column>
					<vxe-column field="name" title="名字"></vxe-column>
					<vxe-column field="value" title="对应值"></vxe-column>
			</vxe-table>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(false)
const xTable1 = ref(null)

const render = (data) => {
	if (xTable1.value) {
			xTable1.value.loadData(data)
	}
}

onMounted(async () => {
	loading.value = true
	const res = await axios.get('http://124.223.69.156:3300/bigData')
	loading.value = false
	render(res.data.data)
})
</script>

<style scoped>
.box {
	padding: 20px;
}
</style>