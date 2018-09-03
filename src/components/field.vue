<template>
    <div class="field" :class="name">
      <q-field
        icon="settings"
        helper=""
        :label="label"
        :label-width="2"
      >
        <q-btn-toggle
          v-model='value'
          color="secondary"
          toggle-color='primary'
          :no-wrap="false"
          :options='options'
        />
      </q-field>
    </div>
</template>
<script>
export default {
  name: 'field',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    value: {
      type: String,
      default: ''
    },
    label: String,
    name: String,
    options: {
      type: Array,
      default () {
        return [
          {
            label: 'A',
            value: '1'
          },
          {
            label: 'B',
            value: '2'
          }
        ]
      }
    }
  }
}
</script>
