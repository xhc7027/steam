<template>
<q-list no-border link inset-delimiter>
    <q-list-header>功能表</q-list-header>
    <q-item @click.native="$router.push('create')">
      <q-item-side icon="add" />
      <q-item-main label="新建" sublabel="新检测任务" />
    </q-item>
    </q-list>
</template>

<script>
export default {
  name: 'Nav'
}
</script>
