<template>
	<el-dialog :visible.sync="show" fullscreen>
		<div class="flex" slot="title">
			<img src="/images/logo.jpeg" style="height: 55px" alt />
			<div class="brand">UPT BALAI YASA TEGAL</div>
		</div>

		<div class="text-center" style="margin-top: 70px">
			<div style="font-size: 130px; color: red">
				<i class="el-icon-timer"></i>
				{{ counter }}
			</div>
			<div style="font-size: 65px">{{ info }}</div>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data: () => ({
		interval: null,
		slot: {},
		counter_rest: '',
		counter_out: '',
		show: false,
		is_going_to_rest: false,
		is_going_to_out: false,
		counter_duration: 300,
	}),

	computed: {
		counter() {
			return this.is_going_to_out
				? this.counter_out
				: this.is_going_to_rest
				? this.counter_rest
				: ''
		},
		info() {
			return this.is_going_to_out
				? 'MENUJU PULANG'
				: this.is_going_to_rest
				? 'MENUJU ISTIRAHAT'
				: ''
		},
	},

	methods: {
		async getSlot() {
			const slots = await this.$axios.$get('/api/timeSlot')
			this.slot = slots.find((s) => s.day == new Date().getDay())

			this.interval = setInterval(() => {
				const rest = this.$moment(this.slot.rest_start, 'HH:mm:ss')
				const out = this.$moment(this.slot.out, 'HH:mm:ss')
				const now = this.$moment()
				this.counter_rest = this.$moment(rest - now).format('mm:ss.SS')
				this.counter_out = this.$moment(out - now).format('mm:ss.SS')

				const diff_to_rest = rest.diff(now, 'seconds')
				const diff_to_out = out.diff(now, 'seconds')

				if (
					(diff_to_rest <= this.counter_duration && diff_to_rest > 0) ||
					(diff_to_out <= this.counter_duration && diff_to_out > 0)
				) {
					if (diff_to_rest <= this.counter_duration) {
						this.is_going_to_rest = true
					}

					if (diff_to_out <= this.counter_duration) {
						this.is_going_to_out = true
					}

					if (!this.show) {
						this.show = true
					}
				} else {
					if (this.show) {
						this.show = false
						this.is_going_to_rest = false
						this.is_going_to_out = false
					}
				}
			}, 100)
		},
	},

	mounted() {
		this.getSlot()
	},

	destroyed() {
		clearInterval(this.interval)
	},
}
</script>

<style lang="css" scoped>
.brand {
	font-size: 24px;
	line-height: 60px;
	margin-left: 10px;
}
</style>
