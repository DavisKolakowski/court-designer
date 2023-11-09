<template>
  <div>
    <label for="color-select">Court Color:</label>
    <select id="color-select" v-model="selectedColor" @change="updateColor">
      <optgroup label="Player’s Choice Colors">
        <option v-for="(value, name) in playersChoiceColors" :value="value">{{ name }}</option>
      </optgroup>
      <optgroup label="Specialty Colors">
        <option v-for="(value, name) in specialtyColors" :value="value">{{ name }}</option>
      </optgroup>
    </select>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'ColorControls',
  setup(props, { emit }) {
    const playersChoiceColors = {
      'Competition Green': '#445f43',
      'Pro Green': '#475b3f',
      'Medium Green': '#3d4933',
      'Forest Green': '#444b3e',
      'Slate': '#525456',
      'Gray': '#6c6d6f',
      'Competition Blue': '#1a3054',
      'Standard Blue': '#233e6d',
      'Pro Blue': '#1b3d5c',
      'Light Blue': '#23548c',
      'Sandstone': '#8c7f6e',
      'Beige': '#8e7053',
      'Terra Cotta': '#966b53',
      'Standard Orange': '#a8593f',
      'Classic Red': '#7b3522',
    };

    const specialtyColors = {
      'Sky Blue': '#82a3d5',
      'Caribbean Blue': '#3474a4',
      'Sea Green': '#347481',
      'Nautical Navy': '#111f2c',
      'Pro Purple': '#3f3c5e',
      'Ultra Violet': '#542f7e',
      'Viva Violet': '#874d97',
      'Crimson': '#702c32',
      'Bright Red': '#9e2b32',
      'Passion Pink': '#e15d96',
      'Coral': '#ec6661',
      'Bright Orange': '#df7e3b',
      'Bright Yellow': '#f3bb47',
      'Kiwi': '#79a448',
      'Lime': '#5fac45',
    };

    const selectedColor = ref('#6c6d6f');

    function updateColor() {
      emit('update-color', selectedColor.value);
    }

    return { playersChoiceColors, specialtyColors, selectedColor, updateColor };
  }
});
</script>

<style scoped>

</style>
