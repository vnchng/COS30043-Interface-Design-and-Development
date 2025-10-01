<template>
  <div class="container mt-4">
    <!-- Filter bar stays at the top -->
    <FilterBar @filter-changed="onFilterChanged" />

    <!-- Loading -->
    <div v-if="loading">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- No results -->
    <div v-else-if="listings.length === 0">
      <p>No listings found.</p>
    </div>

    <!-- Results -->
    <div class="row" v-else>
      <div
        v-for="stay in paginatedListings"
        :key="stay.id"
        class="col-md-4 mb-3"
      >
        <div class="card shadow-sm">
          <!-- Image -->
          <img
            :src="stay.image_url || '/images/default.jpg'"
            class="card-img-top"
            :alt="stay.title"
            style="height: 200px; object-fit: cover;"
          />

          <!-- Card body -->
          <div class="card-body">
            <h5 class="card-title">{{ stay.title }}</h5>
            <p class="card-text text-muted">{{ stay.city }}</p>
            <p><strong>${{ stay.price_per_hour }}/hr</strong></p>

            <!-- Rooms & Bathrooms row -->
            <v-row class="mb-3">
              <v-col cols="6" class="d-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-bed</v-icon>
                {{ stay.rooms }} 
              </v-col>
              <v-col cols="6" class="d-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-shower</v-icon>
                {{ stay.bathrooms }} 
              </v-col>
            </v-row>

            <!-- View button -->
            <router-link
              :to="`/listing/${stay.id}`"
              class="btn btn-primary"
            >
              View
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <AppPagination
      v-if="listings.length > itemsPerPage"
      :total-items="listings.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-changed="onPageChanged"
    />
  </div>
</template>


<script>
import FilterBar from "../components/FilterBar.vue";
import AppPagination from "../components/AppPagination.vue"; 
import { getAccommodations } from "@/services/api.js";


export default {
  name: "HomePage",
  components: { FilterBar, AppPagination },
  data() {
    return {
      listings: [],
      filters: {},
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  computed: {
    paginatedListings() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.listings.slice(start, end);
    }
  },
  methods: {
    async onFilterChanged(newFilters) {
      this.filters = newFilters;
      this.loading = true;
      this.error = null;
      try {
        this.listings = await getAccommodations(newFilters); 
        this.currentPage = 1; // reset to first page when filters change
      } catch (err) {
        console.error("Error fetching listings:", err);
        this.error = "Failed to load listings. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    onPageChanged(page) {
      this.currentPage = page;
    }
  },
  async created() {
    try {
      this.listings = await getAccommodations();
    } catch (err) {
      console.error("Error loading listings:", err);
      this.error = "Failed to load listings. Please try again.";
    } finally {
      this.loading = false;
    }
  }
};
</script>



