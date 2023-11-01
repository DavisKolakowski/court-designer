<template>
  <circle cx="649.98" cy="367.58" r="77.14" :fill="areaColor"/>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'CenterCircleArea',
  setup() {
    const areaColor = ref('#00558f');
    return { areaColor };
  }
}
</script>
