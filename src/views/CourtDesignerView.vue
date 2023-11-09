<template>
  <div>
    <select v-model="selectedSport">
      <option disabled value="">Select a court...</option>
      <option value="basketball">Basketball</option>
      <option value="tennis">Tennis</option>
      <option value="pickleball">Pickleball</option>
    </select>

    <ColorControls @update-color="selectedColor = $event" />

    <div v-if="selectedSport">
      <label><input type="checkbox" v-model="basketballOverlay" :disabled="selectedSport === 'basketball'"/> Basketball Overlay</label>
      <label><input type="checkbox" v-model="tennisOverlay" :disabled="selectedSport === 'tennis'"/> Tennis Overlay</label>
      <label><input type="checkbox" v-model="pickleballOverlay" :disabled="selectedSport === 'pickleball'"/> Pickleball Overlay</label>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1296.28 741.28">
      <rect x="2.64" y="2.64" width="1290.99" height="735.99" :fill="selectedColor" stroke="#241f20" stroke-width="5.29"/>
      <BasketballCourt
        :showTennisOverlay="tennisOverlay"
        :showPickleballOverlay="pickleballOverlay"
        :overlayColor="selectedColor"
        v-if="selectedSport === 'basketball'"
      />
      <TennisCourt
        :showBasketballOverlay="basketballOverlay"
        :showPickleballOverlay="pickleballOverlay"
        :overlayColor="selectedColor"
        v-if="selectedSport === 'tennis'"
      />
      <PickleballCourt
        :showBasketballOverlay="basketballOverlay"
        :showPickleballOverlay="tennisOverlay"
        :overlayColor="selectedColor"
        v-if="selectedSport === 'pickleball'"
      />            
    </svg>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import BasketballCourt from '@/components/BasketballCourt.vue';
import TennisCourt from '@/components/TennisCourt.vue';
import PickleballCourt from '@/components/PickleballCourt.vue';
import ColorControls from '@/components/ColorControls.vue';

export default {
  components: {
    BasketballCourt,
    TennisCourt,
    PickleballCourt,
    ColorControls
  },
  setup() {
    const selectedSport = ref('');
    const selectedColor = ref('#6c6d6f');
    const basketballOverlay = ref(false);
    const tennisOverlay = ref(false);
    const pickleballOverlay = ref(false);

    watch(selectedSport, (newSport, oldSport) => {
      if (newSport !== oldSport) {
        basketballOverlay.value = false;
        tennisOverlay.value = false;
        pickleballOverlay.value = false;
      }
    });

    return {
      selectedSport,
      selectedColor,
      basketballOverlay,
      tennisOverlay,
      pickleballOverlay
    };
  }
};
</script>
