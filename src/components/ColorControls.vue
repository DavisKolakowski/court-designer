<template>
  <div>
    <label>Background Color:</label>
    <input type="color" v-model="backgroundColor" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ColorControls',
  setup() {
    const backgroundColor = ref('#6c6d6f');
    return { backgroundColor };
  }
}
</script>
