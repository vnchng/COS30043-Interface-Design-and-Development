<template>
  <div>
    <h6 class="fw-bold mb-2">Amenities</h6>
    <v-chip-group column>
      <v-chip 
        v-for="(amenity, index) in amenities" 
        :key="index" 
        class="ma-1"
        variant="outlined"
        color="primary"
        size="small"
      >
        {{ amenity }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  name: "AmenitiesChips",
  props: {
    amenities: {
      type: Array,
      default: () => []
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
};
</script>
