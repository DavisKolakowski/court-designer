<template>
  <g>
    <line x1="648.8" y1="213.09" x2="649.4" y2="520.09" fill="none" :stroke="netColor" stroke-dasharray="17 21" stroke-width="3.28"/>
    <ellipse cx="648.8" cy="211.79" rx="9.5" ry="8.9" :fill="postFillColor" :stroke="netColor" stroke-width="3.28"/>
    <ellipse cx="649.4" cy="523.49" rx="9.5" ry="8.9" :fill="postFillColor" :stroke="netColor" stroke-width="3.28"/>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PickleballNet',
  props: {
    netColor: {
      type: String,
      default: '#FFFFFF'
    },
    postFillColor: {
      type: String,
      default: '#fafbfc'
    }
  }
});
</script>

