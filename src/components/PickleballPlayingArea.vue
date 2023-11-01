<template>
  <g>
    <rect x="345.75" y="228.19" width="202.7" height="275.7" :fill="playingAreaColor"/>
    <rect x="746.1" y="228.39" width="202.7" height="275.7" :fill="playingAreaColor"/>
  </g>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'PickleballPlayingArea',
  setup() {
    const playingAreaColor = ref('#405c3c');
    return { playingAreaColor };
  }
}
</script>
