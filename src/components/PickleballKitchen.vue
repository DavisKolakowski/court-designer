<template>
  <rect x="548" y="228" width="200" height="278" :fill="areaColor"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PickleballKitchen',
  props: {
    areaColor: {
      type: String,
      default: '#7a3422'
    }
  }
});
</script>