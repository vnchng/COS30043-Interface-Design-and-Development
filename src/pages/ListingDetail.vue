<template>
  <div class="container mt-4" v-if="listing">
    <div class="card shadow-sm">
      <img :src="listing.image_url" class="card-img-top" :alt="listing.title" />
      <div class="card-body">
        <!-- Title + Location -->
        <h3>{{ listing.title }}</h3>
        <p class="text-muted">{{ listing.city }}, {{ listing.address }}</p>

        <!-- Description -->
        <p>{{ listing.description }}</p>

        <!-- Price -->
        <p><strong>{{ formatCurrency(listing.price_per_hour) }}/hr</strong></p>
        <hr>
        <!-- Property Details Section -->
        <h5 class="mt-4">What We Offer</h5>
        <v-row class="mb-3">
          <v-col cols="6" class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-bed</v-icon>
            {{ listing.rooms }} Rooms
          </v-col>
          <v-col cols="6" class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-shower</v-icon>
            {{ listing.bathrooms }} Bathrooms
          </v-col>
        </v-row>

        <!-- Amenities -->
        <AmenitiesChips :amenities="listing.amenities" />

        <!-- Book Now button -->
        <div class="mt-4">
          <router-link :to="`/booking/${listing.id}`" class="btn btn-success">
            Book Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAccommodations } from "@/services/api.js";
import AmenitiesChips from "@/components/AmenitiesChips.vue";
import { formatCurrency } from "@/utils/filters.js";

export default {
  name: "ListingDetail",
  components: { AmenitiesChips },
  data() {
    return { listing: null };
  },
  methods: {
    formatCurrency, // now available in the template
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const allListings = await getAccommodations();
      this.listing = allListings.find((l) => l.id == id);
    } catch (err) {
      console.error("Failed to load listing:", err);
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden;
}
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>


