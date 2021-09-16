<template>
	<div>
		<el-dialog v-if="person.id" :visible.sync="popup" fullscreen>
			<div class="flex" slot="title">
				<img src="/images/logo.jpeg" style="height: 55px" alt />
				<div class="brand">UPT BALAI YASA TEGAL</div>
			</div>
			<div style="display: flex">
				<el-card
					style="width: 400px; margin-right: 10px; flex-shrink: 0"
					class="text-center"
				>
					<img
						:src="access.vid_linkage_handle || person.photo_path"
						class="image"
						referrerpolicy="no-referrer"
					/>

					<div
						style="margin: 20px 0 10px 0; font-size: 30px; font-weight: bold"
					>
						{{ person.name }} {{ person.last_name }}
					</div>

					<div style="font-size: 25px; margin-bottom: 10px">
						{{ person.pin }}
					</div>
					<div style="font-size: 20px">
						Dep. : {{ person.department ? person.department.name : '' }}
					</div>
				</el-card>

				<el-card class="right-section">
					<div style="margin-bottom: 25px">
						<i class="el-icon-time orange"></i>
						{{ $moment(access.event_time).format('HH:mm:ss') }}
					</div>
					<div style="margin-bottom: 25px">
						<i class="el-icon-timer orange"></i>
						(+/-)x menit
					</div>
					<div>
						<i class="el-icon-user orange"></i>
						{{ access.temperature || '-' }} &deg;C
					</div>
				</el-card>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	layout: 'default',

	data() {
		return {
			popup: false,
			access: {},
			person: {},
		}
	},

	methods: {},

	mounted() {
		Echo.channel('log').listen('.log', (e) => {
			// display only when new data
			if (this.access.id != e.access.id) {
				this.access = e.access
				this.person =
					this.$store.state.persons.find((p) => p.pin == e.access.pin) || {}

				// TODO: kalau antara jam < jam 10 & dari gate masuk & first record asumsi absen berangkat
			}

			if (!this.popup) {
				this.popup = true
			}

			setTimeout(() => {
				if (this.popup) {
					this.popup = false
				}
			}, 3000)
		})
	},

	destroyed() {
		Echo.leave('log')
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
}

.brand {
	font-size: 24px;
	line-height: 60px;
	margin-left: 10px;
}

.orange {
	color: #ff5e0a;
}
</style>
