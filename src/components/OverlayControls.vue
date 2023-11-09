<template>
  <div>
    <label><input type="checkbox" v-model="showBasketballOverlay" /> Show Basketball Overlay</label>
    <label><input type="checkbox" v-model="showTennisOverlay" /> Show Tennis Overlay</label>
    <label><input type="checkbox" v-model="showPickleballOverlay" /> Show Pickleball Overlay</label>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'OverlayControls',
  setup() {
    const showBasketballOverlay = ref(false);
    const showTennisOverlay = ref(false);
    const showPickleballOverlay = ref(false);
    return { showBasketballOverlay, showTennisOverlay, showPickleballOverlay };
  }
}
</script>
