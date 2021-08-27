<template>
	<el-card>
		<div style="display: flex; justify-content: space-between">
			<div style="font-size: 1.2em; line-height: 41px">KELOLA USER</div>
			<el-form inline class="text-right" @submit.native.prevent>
				<el-form-item style="margin-bottom: 0">
					<el-button
						size="small"
						@click="openForm({ admin: 0, password: '' })"
						type="primary"
						icon="el-icon-plus"
						>TAMBAH USER</el-button
					>
				</el-form-item>
				<el-form-item style="margin-bottom: 0">
					<el-input
						size="small"
						v-model="keyword"
						placeholder="Cari"
						prefix-icon="el-icon-search"
						:clearable="true"
						@change="searchData"
					>
					</el-input>
				</el-form-item>
			</el-form>
		</div>

		<br />

		<el-table
			stripe
			height="calc(100vh - 255px)"
			v-loading="loading"
			:data="tableData.data"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				:index="tableData.from"
				label="#"
			></el-table-column>

			<el-table-column
				prop="name"
				label="Nama"
				sortable="custom"
			></el-table-column>

			<el-table-column
				prop="email"
				label="Email"
				sortable="custom"
			></el-table-column>

			<el-table-column prop="admin" label="Level" sortable="custom">
				<template slot-scope="scope">
					{{ scope.row.admin ? 'Admin' : 'User' }}
				</template>
			</el-table-column>

			<el-table-column
				prop="status"
				label="Status"
				sortable="custom"
				align="center"
				header-align="center"
				width="100"
			>
				<template slot-scope="scope">
					<el-tag
						:type="scope.row.active ? 'success' : 'info'"
						size="mini"
						style="width: 100%"
						effect="dark"
					>
						{{ scope.row.active ? 'AKTIF' : 'NONAKTIF' }}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column width="40px" align="center" header-align="center">
				<template slot="header">
					<el-button type="text" @click="refreshData" icon="el-icon-refresh">
					</el-button>
				</template>
				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
							>
								Edit
							</el-dropdown-item>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
							>
								Hapus
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<br />

		<el-pagination
			class="text-right"
			background
			@current-change="currentChange"
			@size-change="sizeChange"
			layout="total, sizes, prev, pager, next"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		></el-pagination>

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT USER' : 'TAMBAH USER'"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="160px" label-position="left">
				<el-form-item label="Nama" :class="{ 'is-error': formErrors.name }">
					<el-input placeholder="Nama" v-model="formModel.name"></el-input>
					<div class="el-form-item__error" v-if="formErrors.name">
						{{ formErrors.name.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item label="Email" :class="{ 'is-error': formErrors.email }">
					<el-input placeholder="Email" v-model="formModel.email"></el-input>
					<div class="el-form-item__error" v-if="formErrors.email">
						{{ formErrors.email.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item label="Level" :class="{ 'is-error': formErrors.admin }">
					<el-select
						v-model="formModel.admin"
						placeholder="Level"
						style="width: 100%"
					>
						<el-option
							v-for="(t, i) in [
								{ value: 0, label: 'User' },
								{ value: 1, label: 'Admin' },
							]"
							:value="t.value"
							:label="t.label"
							:key="i"
						>
						</el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.admin">
						{{ formErrors.admin.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Password"
					:class="{ 'is-error': formErrors.password }"
				>
					<el-input
						type="password"
						placeholder="Password"
						v-model="formModel.password"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.password">
						{{ formErrors.password.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item label="Konfirmasi Password">
					<el-input
						type="password"
						placeholder="Konfirmasi Password"
						v-model="formModel.password_confirmation"
					></el-input>
				</el-form-item>

				<el-form-item label="Status" :class="{ 'is-error': formErrors.active }">
					<el-switch
						:active-value="1"
						:inactive-value="0"
						v-model="formModel.active"
						active-color="#13ce66"
					>
					</el-switch>
					<el-tag
						:type="formModel.active ? 'success' : 'info'"
						size="small"
						effect="dark"
						style="margin-left: 10px"
						>{{ !!formModel.active ? 'AKTIF' : 'NONAKTIF' }}</el-tag
					>

					<div class="el-form-item__error" v-if="formErrors.active">
						{{ formErrors.active.join(', ') }}
					</div>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button type="primary" icon="el-icon-success" @click="save">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/user',
		}
	},
}
</script>
