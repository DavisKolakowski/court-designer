<template>
  <rect x="37.3" y="44.33" width="1223.36" height="644.33" :fill="areaColor"/>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'BasketballPlayingArea',
  setup() {
    const areaColor = ref('#193f70');
    return { areaColor };
  }
}
</script>
