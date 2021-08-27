<template>
	<el-card>
		<div style="font-size: 1.2em; line-height: 41px">KELOLA USER</div>
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
					<th class="text-right">
						<el-button type="primary" size="small" @click="requestData"
							>REFRESH</el-button
						>
					</th>
				</tr>
			</thead>
			<tbody v-loading="loading">
				<tr v-for="(t, i) in timeslots" :key="i">
					<td>{{ ++i }}</td>
					<td>{{ hari[t.day].toUpperCase() }}</td>
					<td><el-input v-model="t.in"></el-input></td>
					<td><el-input v-model="t.out"></el-input></td>
					<td><el-input v-model="t.rest_start"></el-input></td>
					<td><el-input v-model="t.rest_end"></el-input></td>
					<td><el-input v-model="t.jam_kerja_max"></el-input></td>
					<td class="text-right">
						<el-button type="primary" size="small" @click="save(t)"
							>SIMPAN</el-button
						>
					</td>
				</tr>
			</tbody>
		</table>
	</el-card>
</template>

<script>
import crud from '@/mixins/crud'
import { mapState } from 'vuex'
export default {
	mixins: [crud],
	data() {
		return {
			url: '/api/timeSlot',
		}
	},

	computed: {
		...mapState(['hari']),
	},

	methods: {
		save(data) {
			this.$axios.$put(`/api/timeSlot/${t.id}`, data).then((r) => {
				this.tableData = r.data
				this.$message({
					message: r.message,
					type: 'success',
				})
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
