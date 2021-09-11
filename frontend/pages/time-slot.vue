<template>
	<el-card>
		<div style="font-size: 1.2em" class="mb-3">KELOLA TIMESLOT</div>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>Hari</th>
					<th>Jam Masuk</th>
					<th>Jam Pulang</th>
					<th>Jam Istirahat Keluar</th>
					<th>Jam Istirahat Masuk</th>
					<th>Jam Kerja Maksimal</th>
					<th class="text-center">
						<el-button
							type="primary"
							size="small"
							icon="el-icon-refresh"
							@click="requestData"
						></el-button>
					</th>
				</tr>
			</thead>
			<tbody v-loading="loading">
				<tr v-for="(t, i) in tableData" :key="i">
					<td>{{ ++i }}</td>
					<td>{{ t.hari }}</td>
					<td><el-input size="small" v-model="t.in"></el-input></td>
					<td><el-input size="small" v-model="t.out"></el-input></td>
					<td><el-input size="small" v-model="t.rest_start"></el-input></td>
					<td><el-input size="small" v-model="t.rest_end"></el-input></td>
					<td><el-input size="small" v-model="t.jam_kerja_max"></el-input></td>
					<td class="text-center">
						<el-button
							type="primary"
							size="small"
							icon="el-icon-check"
							plain
							@click="save(t)"
						></el-button>
					</td>
				</tr>
			</tbody>
		</table>
	</el-card>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],
	data() {
		return {
			url: '/api/timeSlot',
		}
	},

	methods: {
		save(data) {
			this.$axios.$put(`/api/timeSlot/${data.id}`, data).then((r) => {
				this.$message({
					message: r.message,
					type: 'success',
				})

				this.tableData = r.data
			})
		},
	},
}
</script>

<style scoped>
th,
td {
	vertical-align: middle;
}
</style>
