<template>
	<el-container>
		<el-header style="display: flex; justify-content: space-between">
			<div class="flex">
				<img src="/images/logo.jpeg" style="height: 55px" alt />
				<div class="brand">UPT BALAI YASA TEGAL</div>
			</div>
			<div>
				<el-dropdown
					@command="handleCommand"
					style="height: 60px; line-height: 60px"
				>
					<span class="el-dropdown-link" style="cursor: pointer">
						Selamat Datang, {{ $auth.user.name }}!
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item icon="el-icon-user" command="profile">
							Profil Saya
						</el-dropdown-item>
						<el-dropdown-item icon="el-icon-arrow-right" command="logout">
							Keluar
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span style="color: #666; font-size: 0.9em; margin-left: 20px">
					<i class="el-icon-date"></i>
					{{ timer }}
				</span>
			</div>
		</el-header>
		<el-container>
			<el-aside width="auto">
				<el-menu
					router
					:collapse="collapse"
					:default-active="$route.path"
					active-text-color="#FF5E0A"
				>
					<el-menu-item v-for="(m, i) in menus" :index="m.path" :key="i">
						<i :class="m.icon"></i>
						<span slot="title">{{ m.label }}</span>
					</el-menu-item>
				</el-menu>

				<!-- <el-button
					type="text"
					@click.prevent="collapse = !collapse"
					:icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
				></el-button> -->
			</el-aside>
			<el-main>
				<router-view @back="goBack"></router-view>
				<Profile :show="showProfile" @close="showProfile = false" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	middleware: ['auth'],

	data() {
		return {
			collapse: true,
			showProfile: false,
			timer: this.$moment().format('DD/MMM/YYYY HH:mm:ss'),
			menus: [
				{
					label: 'BERANDA',
					icon: 'el-icon-data-analysis',
					path: '/',
				},
				{
					label: 'LOG ABSENSI',
					icon: 'el-icon-date',
					path: '/log',
				},
				{
					label: 'JAM KERJA',
					icon: 'el-icon-alarm-clock',
					path: '/time-slot',
				},
				{
					label: 'USER',
					icon: 'el-icon-user',
					path: '/user',
				},
			],
		}
	},

	methods: {
		goBack() {
			window.history.back()
		},

		handleCommand(command) {
			if (command === 'logout') {
				this.$confirm('Anda yakin ingin keluar?', 'Konfirmasi', {
					type: 'warning',
				}).then(() => this.$auth.logout().then(this.$router.push('/login')))
			}

			if (command === 'profile') {
				this.showProfile = true
			}
		},
	},

	created() {
		this.$store.dispatch('getGates')
		this.$store.dispatch('getPersons')
		this.$store.dispatch('getDepartments')

		setInterval(() => {
			this.timer = this.$moment().format('DD/MMM/YYYY HH:mm:ss')
		}, 1000)
	},
}
</script>

<style scoped>
/* .el-aside {
	border-right: 1px solid #ddd;
	background: #310064;
} */

/* .el-header {
	border-bottom: 1px solid #ddd;
} */

.el-menu {
	border-right: none;
}

.el-menu-item [class^='el-icon-'] {
	font-size: 22px;
}

.brand {
	font-size: 24px;
	line-height: 60px;
	margin-left: 10px;
}

.el-main {
	height: calc(100vh - 60px);
	overflow: auto;
	background: #efefef;
	padding: 10px;
}
</style>
