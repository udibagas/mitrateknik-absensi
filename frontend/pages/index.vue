<template>
	<div>test aja dari pages</div>
</template>

<script>
export default {
	layout: 'default',

	data() {
		return {
			popup: false,
			attendance: {},
		}
	},

	methods: {},

	mounted() {
		Echo.channel('attendance').listen('.log', (e) => {
			// TODO: display popup
			this.attendance = e.attTransaction
			this.popup = true

			setTimeout(() => {
				this.popup = false
			}, 5000)
		})
	},

	destroyed() {
		Echo.leave('attendance')
	},
}
</script>
