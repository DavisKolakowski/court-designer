<template>
  <g>
    <line x1="647.73" y1="105.89" x2="647.73" y2="639.69" fill="none" :stroke="netColor" stroke-dasharray="13 21" stroke-width="5.36"/>
    <circle cx="647.73" cy="93.09" r="12.79" :fill="netPostColor"/>
    <circle cx="647.73" cy="639.69" r="12.79" :fill="netPostColor"/>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TennisNet',
  props: {
    netColor: {
      type: String,
      default: '#fbfcfc'
    },
    netPostColor: {
      type: String,
      default: '#fbfcfc'
    }
  }
});
</script>

