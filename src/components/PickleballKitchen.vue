<template>
  <rect x="548" y="228" width="200" height="278" :fill="areaColor"/>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'PickleballKitchen',
  setup() {
    const areaColor = ref('#7a3422');
    return { areaColor };
  }
}
</script>
