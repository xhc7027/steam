<template>
  <q-layout view="HHH Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'">
        <hsb-title></hsb-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :width="240"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <hsb-nav />
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HsbNav from 'components/ui/nav'
import HsbTitle from 'components/ui/title'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
  },
  mounted () {
    this.$bus.on('menuToggleClicked', () => {
      this.leftDrawerOpen = !this.leftDrawerOpen
    })
  },
  components: {
    HsbNav,
    HsbTitle
  }
}
</script>

<style>
</style>
