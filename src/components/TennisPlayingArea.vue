<template>
  <rect x="134.67" y="125.48" width="1019" height="483" :fill="areaColor"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TennisPlayingArea',
  props: {
    areaColor: {
      type: String,
      default: '#7a3422'
    }
  }
});
</script>
