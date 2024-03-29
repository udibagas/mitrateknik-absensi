import exportFromJSON from 'export-from-json'

export default {
  data() {
    return {
      showForm: false,
      formErrors: {},
      formModel: {},
      paginated: true,
      page: 1,
      pageSize: 10,
      tableData: {},
      sort_prop: null,
      sort_order: null,
      filters: {},
      loading: false,
    }
  },

  methods: {
    sortChange({ prop, order }) {
      if (prop != this.sort_prop || order != this.sort_order) {
        if (order == 'ascending') {
          this.sort_order = 'asc'
        } else if (order == 'descending') {
          this.sort_order = 'desc'
        } else {
          this.sort_order = 'asc'
        }

        this.sort_prop = prop
        this.requestData()
      }
    },

    currentChange(page) {
      this.page = page
      this.requestData()
    },

    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.requestData()
    },

    filterChange(filter) {
      this.filters = { ...this.filters, ...filter }
      this.page = 1
      this.requestData()
    },

    openForm(data) {
      this.formErrors = {}
      this.formModel = { ...data }
      this.showForm = true
    },

    save() {
      this.loading = true

      this.$axios({
        url: this.formModel.id ? `${this.url}/${this.formModel.id}` : this.url,
        method: this.formModel.id ? 'PUT' : 'POST',
        data: this.formModel,
      })
        .then((r) => {
          this.showForm = false
          this.$message({
            message: 'Data berhasil disimpan.',
            type: 'success',
            showClose: true,
          })
          this.requestData()
          this.afterSave()
        })
        .catch((e) => {
          if (e.response.status == 422) {
            this.formErrors = e.response.data.errors
          } else {
            this.formErrors = {}
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    afterSave() {
      // please override
    },

    afterDelete() {
      // please override
    },

    afterGet() {
      // please override
    },

    deleteData(id) {
      this.$confirm('Anda yakin akan menghapus data ini?', 'Warning', {
        type: 'warning',
      })
        .then(() => {
          this.$axios.$delete(`${this.url}/${id}`).then((r) => {
            this.requestData()
            this.afterDelete()
            this.$message({
              message: r.message,
              type: 'success',
              showClose: true,
            })
          })
        })
        .catch(() => console.log(e))
    },

    searchData(v) {
      this.page = 1
      this.requestData()
    },

    refreshData() {
      this.page = 1
      this.filters = {}
      this.requestData()
    },

    closeForm() {
      this.showForm = false
      this.formModel = {}
      this.formErrors = {}
    },

    requestData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort_prop: this.sort_prop,
        sort_order: this.sort_order,
        paginated: this.paginated,
        ...this.filters,
      }

      this.loading = true

      this.$axios
        .$get(this.url, { params })
        .then((response) => {
          this.loading = false

          if (response.meta) {
            const { from, to, total } = response.meta
            this.tableData = { data: response.data, from, to, total }
          } else {
            this.tableData = response
          }

          this.afterGet()
        })
        .finally(() => (this.loading = false))
    },

    exportData(fileName) {
      let params = {
        sort_prop: this.sort_prop,
        sort_order: this.sort_order,
        action: 'export',
        ...this.filters,
      }

      this.loading = true

      this.$axios
        .$get(this.url, { params })
        .then((data) => exportFromJSON({ data, fileName, exportType: 'xls' }))
        .finally(() => (this.loading = false))
    },
  },

  mounted() {
    this.requestData()
  },
}
