<template>
	<div>
		<div class="item" v-for="(p, i) in data" :key="i">
			<div style="display: flex; align-items: center">
				<div style="width: 60px; font-size: 1.5em; color: grey">
					#{{ i + 1 }}
				</div>
				<div>
					{{ p.name }} <br />
					<span style="color: grey">{{ p.department }}</span>
				</div>
			</div>
			<div class="flex" style="font-size: 20px; justify-content: space-between">
				<div style="margin-right: 20px">{{ p.work_duration }}</div>
				<div style="width: 75px; text-align: right">{{ p.prosentase }}%</div>
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
