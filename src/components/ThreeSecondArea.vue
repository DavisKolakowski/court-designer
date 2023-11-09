<template>
  <g>
    <rect x="1015.63" y="290.7" width="245.02" height="155.7" :fill="areaColor"/>
    <rect x="38.18" y="290.1" width="245.02" height="155.7" :fill="areaColor"/>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThreeSecondArea',
  props: {
    areaColor: {
      type: String,
      default: '#00558f'
    }
  }
});
</script>