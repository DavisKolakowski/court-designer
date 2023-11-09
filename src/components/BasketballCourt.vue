<template>
  <g>
    <BasketballPlayingArea />
    <ThreeSecondArea />
    <CenterCircleArea />
    <BasketballBoundaries :lineColor="showOverlay ? overlayColor : '#fff'"/>
    <BasketballHoops />
    <TennisBoundaries v-if="showTennisOverlay" :lineColor="overlayColor" />
    <PickleballBoundaries v-if="showPickleballOverlay" :lineColor="overlayColor" />    
  </g>
</template>

<script lang="ts">
import BasketballPlayingArea from './BasketballPlayingArea.vue';
import ThreeSecondArea from './ThreeSecondArea.vue';
import CenterCircleArea from './CenterCircleArea.vue';
import BasketballBoundaries from './BasketballBoundaries.vue';
import BasketballHoops from './BasketballHoops.vue';
import TennisBoundaries from './TennisBoundaries.vue';
import PickleballBoundaries from './PickleballBoundaries.vue';

export default {
  name: 'BasketballCourt',
  components: {
    BasketballPlayingArea,
    ThreeSecondArea,
    CenterCircleArea,
    BasketballBoundaries,
    BasketballHoops,
    TennisBoundaries,
    PickleballBoundaries
  },
  props: {
    showOverlay: Boolean,
    showTennisOverlay: Boolean,
    showPickleballOverlay: Boolean,
    overlayColor: String
  }
};
</script>

