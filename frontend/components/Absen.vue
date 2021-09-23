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
					:src="access.vid_linkage_handle || person.photo_path"
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
				</div>
				<!-- <div style="margin-bottom: 25px">
					<i class="el-icon-timer grey"></i>
					(+/-)x menit
				</div> -->
				<div>
					<i class="el-icon-user grey"></i>
					{{ access.temperature || '-' }} &deg;C
				</div>

				<div style="font-size: 50px; margin-top: 50px">
					PRODUKTIVITAS ANDA : xx%
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
			this.access = e.access
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
	font-size: 100px;
	padding-left: 60px;
	/* hijau */
	background-color: rgb(159, 255, 122);
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
</style>
