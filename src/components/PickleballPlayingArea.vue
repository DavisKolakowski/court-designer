<template>
  <g>
    <rect x="345.75" y="228.19" width="202.7" height="275.7" :fill="playingAreaColor"/>
    <rect x="746.1" y="228.39" width="202.7" height="275.7" :fill="playingAreaColor"/>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PickleballPlayingArea',
  props: {
    playingAreaColor: {
      type: String,
      default: '#405c3c'
    }
  }
});
</script>

