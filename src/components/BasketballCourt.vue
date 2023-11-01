<template>
  <g>
    <BasketballPlayingArea />
    <ThreeSecondArea />
    <CenterCircleArea />
    <BasketballBoundaries />
    <BasketballHoops />
  </g>
</template>

<script lang="ts">
import BasketballPlayingArea from './BasketballPlayingArea.vue';
import ThreeSecondArea from './ThreeSecondArea.vue';
import CenterCircleArea from './CenterCircleArea.vue';
import BasketballBoundaries from './BasketballBoundaries.vue';
import BasketballHoops from './BasketballHoops.vue';

export default {
  name: 'BasketballCourt',
  components: {
    BasketballPlayingArea,
    ThreeSecondArea,
    CenterCircleArea,
    BasketballBoundaries,
    BasketballHoops
  }
}
</script>
