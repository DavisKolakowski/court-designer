<template>
  <circle cx="649.98" cy="367.58" r="77.14" :fill="areaColor"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CenterCircleArea',
  props: {
    areaColor: {
      type: String,
      default: '#00558f'
    }
  }
});
</script>
