<template>
	<el-main>
		<div class="form-container">
			<img src="/images/logo.png" style="width: 200px" />
			<h2 class="text-white mt-0">UPT BALAI YASA TEGAL</h2>
			<el-form
				@submit.native.prevent="login"
				style="width: 320px; margin: 20px auto 0; text-align: center"
			>
				<el-form-item>
					<el-input
						prefix-icon="el-icon-user"
						v-model="email"
						placeholder="Email/Username"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						prefix-icon="el-icon-lock"
						type="password"
						v-model="password"
						placeholder="Password"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit" style="width: 100%"
						>LOGIN</el-button
					>
				</el-form-item>

				<div class="text-white">
					&copy; {{ $moment().format('YYYY') }} - UPT Balai Yasa Tegal
				</div>
			</el-form>
		</div>
	</el-main>
</template>

<script>
export default {
	layout: 'login',
	data() {
		return {
			email: '',
			password: '',
		}
	},

	methods: {
		login() {
			this.$auth
				.loginWith('cookie', {
					data: {
						email: this.email,
						password: this.password,
					},
				})
				.then((r) => this.$router.push('/'))
		},
	},
}
</script>

<style scoped>
.el-main {
	height: 100vh;
	background-image: url('/images/bg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}

.form-container {
	margin: 120px auto 0;
	background-color: rgba(0, 0, 0, 0.7);
	padding: 20px;
	width: 350px;
	border-radius: 4px;
	text-align: center;
}
</style>
