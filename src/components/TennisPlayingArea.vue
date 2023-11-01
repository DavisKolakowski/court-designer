<template>
  <rect x="134.67" y="125.48" width="1019" height="483" :fill="areaColor"/>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'TennisPlayingArea',
  setup() {
    const areaColor = ref('#7a3422');
    return { areaColor };
  }
}
</script>
