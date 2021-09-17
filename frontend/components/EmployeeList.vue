<template>
	<div>
		<div class="item" v-for="(p, i) in data" :key="i">
			<div>
				{{ p.fullname }} <br />
				<span style="color: grey">{{ p.dept_name }}</span>
			</div>
			<div class="flex" style="font-size: 20px; justify-content: space-between">
				<div style="margin-right: 20px">{{ p.work_duration }}</div>
				<div>{{ p.percentage.toFixed(2) }}%</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data'],
}
</script>

<style lang="css" scoped>
.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #efefef;
	padding: 10px;
	border-radius: 4px;
	margin: 5px;
}
</style>
