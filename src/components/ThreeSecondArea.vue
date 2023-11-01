<template>
  <g>
    <rect x="1015.63" y="290.7" width="245.02" height="155.7" :fill="areaColor"/>
    <rect x="38.18" y="290.1" width="245.02" height="155.7" :fill="areaColor"/>
  </g>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ThreeSecondArea',
  setup() {
    const areaColor = ref('#00558f');
    return { areaColor };
  }
}
</script>
