<template>
	<el-dialog v-if="person.id" :visible.sync="popup" fullscreen>
		<div class="flex" slot="title">
			<img src="/images/logo.jpeg" style="height: 55px" alt />
			<div class="brand">UPT BALAI YASA TEGAL</div>
		</div>
		<div style="display: flex">
			<el-card
				style="width: 400px; margin-right: 10px; flex-shrink: 0"
				class="text-center"
				:body-style="{ padding: '0 0 20px 0' }"
			>
				<img
					:src="access.photo_path || person.photo_path"
					class="image"
					referrerpolicy="no-referrer"
				/>

				<div style="margin: 20px 0 10px 0; font-size: 30px; font-weight: bold">
					{{ person.name }} {{ person.last_name }}
				</div>

				<div style="font-size: 25px; margin-bottom: 10px">
					{{ person.pin }}
				</div>
				<div style="font-size: 20px">
					{{ person.department ? person.department.name : '' }}
				</div>
			</el-card>

			<el-card class="right-section">
				<div style="margin-bottom: 25px">
					<i class="el-icon-time grey"></i>
					{{ $moment(access.event_time).format('HH:mm:ss') }}
					<span style="color: red" v-if="late && first_in">
						(+{{ late }} mnt)
					</span>
				</div>

				<div style="margin-bottom: 25px">
					<i class="el-icon-user grey"></i>
					<span
						:class="
							access.temperature && access.temperature > 37 ? 'red' : 'green'
						"
					>
						{{ access.temperature || '-' }} &deg;C
					</span>
				</div>

				<div
					style="display: flex; align-items: center"
					v-if="gate == 'OUT' && !first_in"
				>
					<i class="el-icon-setting grey"></i>
					<div style="flex-grow: 1; margin-left: 25px; margin-right: 15px">
						<el-progress
							:text-inside="true"
							:stroke-width="50"
							:percentage="productivity"
							:color="productivity < 100 ? 'red' : 'green'"
							:show-text="false"
						></el-progress>
					</div>
					<div
						:class="productivity < 100 ? 'red' : 'green'"
						style="font-size: 50px"
					>
						{{ productivity }}%
					</div>
				</div>

				<div style="font-size: 50px; margin-top: 50px" v-if="gate == 'IN'">
					SELAMAT DATANG
				</div>
			</el-card>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			popup: false,
			access: {},
			productivity: 0,
			late: 0,
			gate: null,
			message: null,
			first_in: false,
			person: {},
			echo: null,
		}
	},

	computed: {
		...mapState(['persons']),
	},

	mounted() {
		this.echo = this.$echo({
			key: 'pusher_key_123',
			// host: '127.0.0.1',
			host: '10.4.21.112',
			port: 6001,
		})

		this.echo.channel('log').listen('.log', (e) => {
			this.$emit('new-data')
			this.access = e.access
			this.gate = e.gate
			this.message = e.message
			this.productivity = e.productivity
			this.late = e.late
			this.first_in = e.first_in
			this.person = this.persons.find((p) => p.pin == e.access.pin) || {}

			if (!this.popup) {
				this.popup = true
			}

			setTimeout(() => {
				if (this.popup) {
					this.popup = false
				}
			}, 5000)
		})
	},

	destroyed() {
		this.echo.leave('log')
	},
}
</script>


<style lang="css" scoped>
.image {
	width: 100%;
}

.right-section {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	font-size: 80px;
	padding-left: 40px;
	/* hijau */
	/* background-color: rgb(159, 255, 122); */
	/* merah */
	/* background-color: rgb(255, 108, 108); */
	/* background-color: gold; */
}

.brand {
	font-size: 24px;
	line-height: 60px;
	margin-left: 10px;
}

.grey {
	/* color: #ff5e0a; */
	color: grey;
}

.red {
	color: red;
}

.green {
	color: rgb(18, 139, 18);
}
</style>
