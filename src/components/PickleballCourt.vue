<template>
  <g>
    <PickleballPlayingArea />
    <PickleballKitchen />
    <PickleballNet />
    <PickleballBoundaries :lineColor="showOverlay ? overlayColor : '#fff'" />
    <BasketballBoundaries v-if="showBasketballOverlay" :lineColor="overlayColor" />
    <TennisBoundaries v-if="showTennisOverlay" :lineColor="overlayColor" />
  </g>
</template>

<script lang="ts">
import PickleballPlayingArea from './PickleballPlayingArea.vue';
import PickleballKitchen from './PickleballKitchen.vue';
import PickleballNet from './PickleballNet.vue';
import PickleballBoundaries from './PickleballBoundaries.vue';
import BasketballBoundaries from './BasketballBoundaries.vue'; 
import TennisBoundaries from './TennisBoundaries.vue'; 

export default {
  name: 'PickleballCourt',
  components: {
    PickleballPlayingArea,
    PickleballKitchen,
    PickleballNet,
    PickleballBoundaries,
    BasketballBoundaries, 
    TennisBoundaries, 
  },
  props: {
    showOverlay: Boolean,
    overlayColor: String,
    showBasketballOverlay: Boolean, 
    showTennisOverlay: Boolean, 
  }
};
</script>

