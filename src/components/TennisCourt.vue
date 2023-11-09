<template>
  <g>
    <TennisPlayingArea />
    <TennisNet />
    <TennisBoundaries :lineColor="showOverlay ? overlayColor : '#fff'" />
    <BasketballBoundaries v-if="showBasketballOverlay" :lineColor="overlayColor" />
    <PickleballBoundaries v-if="showPickleballOverlay" :lineColor="overlayColor" />    
  </g>
</template>

<script lang="ts">
import TennisPlayingArea from './TennisPlayingArea.vue';
import TennisNet from './TennisNet.vue';
import TennisBoundaries from './TennisBoundaries.vue';
import BasketballBoundaries from './BasketballBoundaries.vue';
import PickleballBoundaries from './PickleballBoundaries.vue';

export default {
  name: 'TennisCourt',
  components: {
    TennisPlayingArea,
    TennisNet,
    TennisBoundaries,
    BasketballBoundaries,
    PickleballBoundaries,
  },
  props: {
    showOverlay: Boolean,
    overlayColor: String,
    showBasketballOverlay: Boolean,
    showPickleballOverlay: Boolean,
  }
};
</script>
