<template>
  <g>
    <TennisPlayingArea />
    <TennisNet />
    <TennisBoundaries />
  </g>
</template>

<script lang="ts">
import TennisPlayingArea from './TennisPlayingArea.vue';
import TennisNet from './TennisNet.vue';
import TennisBoundaries from './TennisBoundaries.vue';

export default {
  name: 'TennisCourt',
  components: {
    TennisPlayingArea,
    TennisNet,
    TennisBoundaries
  }
}
</script>
