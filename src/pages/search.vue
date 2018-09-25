<template>
  <q-page class="search-page page flex">
    <div class="container full-width">
      <h1>工单检索</h1>
      <q-input v-model="orderSerial"
      name="serial1"
      ref="searchInput"
      clearable autofocus
      :before="[{icon: 'fas fa-barcode', handler () {}}]"
      float-label="订单号" placeholder="输入或扫码"
      auto-complete="off"
      v-validate="'required'"
      :error="$validator.errors.has('serial1')">
      <validate-error
        message="请输入机身条码"
        ></validate-error>
      </q-input>
      <p>&nbsp;</p>
      <hsb-task-table></hsb-task-table>
    </div>
  </q-page>
</template>
<script>
import HsbTaskTable from 'components/task-table'

export default {
  name: 'search-page',
  data () {
    return {
      orderSerial: ''
    }
  },
  mounted () {
    this.$refs.searchInput.focus()
  },
  methods: {
    save () {
    }
  },
  components: {
    HsbTaskTable
  }
}
</script>
<style lang="stylus">
</style>
