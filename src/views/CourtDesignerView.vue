<template>
  <div>
    <select v-model="selectedSport">
      <option value="basketball">Basketball</option>
      <option value="tennis">Tennis</option>
      <option value="pickleball">Pickleball</option>
    </select>
    
    <ColorControls />
    <OverlayControls />
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1296.28 741.28">
      <rect x="2.64" y="2.64" width="1290.99" height="735.99" :fill="backgroundColor" stroke="#241f20" stroke-width="5.29"/>
      <BasketballCourt v-if="selectedSport === 'basketball'" />
      <TennisCourt v-if="selectedSport === 'tennis'" />
      <PickleballCourt v-if="selectedSport === 'pickleball'" />
    </svg>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import BasketballCourt from '@/components/BasketballCourt.vue';
import TennisCourt from '@/components/TennisCourt.vue';
import PickleballCourt from '@/components/PickleballCourt.vue';
import ColorControls from '@/components/ColorControls.vue';
import OverlayControls from '@/components/OverlayControls.vue';

export default {
  name: 'CourtDesignerView',
  components: { BasketballCourt, TennisCourt, PickleballCourt, ColorControls, OverlayControls },
  setup() {
    const selectedSport = ref('basketball');
    const backgroundColor = ref('#6c6d6f');

    return { selectedSport, backgroundColor };
  }
}
</script>