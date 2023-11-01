<template>
  <g>
    <PickleballPlayingArea />
    <PickleballKitchen />
    <PickleballNet />
    <PickleballBoundaries />
  </g>
</template>

<script lang="ts">
import PickleballPlayingArea from './PickleballPlayingArea.vue';
import PickleballKitchen from './PickleballKitchen.vue';
import PickleballNet from './PickleballNet.vue';
import PickleballBoundaries from './PickleballBoundaries.vue';

export default {
  name: 'PickleballCourt',
  components: {
    PickleballPlayingArea,
    PickleballKitchen,
    PickleballNet,
    PickleballBoundaries
  }
}
</script>
