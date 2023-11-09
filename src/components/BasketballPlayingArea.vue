<template>
  <rect x="37.3" y="44.33" width="1223.36" height="644.33" :fill="areaColor"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasketballPlayingArea',
  props: {
    areaColor: {
      type: String,
      default: '#193f70'
    }
  }
});
</script>
