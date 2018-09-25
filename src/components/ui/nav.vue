<template>
  <q-list no-border link inset-delimiter class="nav">
    <q-list-header>功能表</q-list-header>
    <q-item @click.native="$router.push('create')">
      <q-item-side icon="add" />
      <q-item-main label="新建" sublabel="新检测任务" />
    </q-item>
    <q-item @click.native="$router.push('search')">
      <q-item-side icon="search" />
      <q-item-main label="工单检索" sublabel="按订单号查询" />
    </q-item>
    <q-item @click.native="$router.push('scheduler')">
      <q-item-side icon="search" />
      <q-item-main label="调度中心" sublabel="检测机实时状态" />
    </q-item>
    </q-list>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style lang="stylus">
.nav
  .q-item-sublabel
    font-size 12px
</style>
