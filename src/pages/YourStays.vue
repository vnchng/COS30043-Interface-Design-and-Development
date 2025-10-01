<template>
  <v-container class="mt-4">
    <h2>Your Bookings</h2>

    <!-- Loading -->
    <div v-if="loading">Loading your bookings...</div>

    <!-- Error -->
    <v-alert v-else-if="error" type="error" dismissible>
      {{ error }}
    </v-alert>

    <!-- No bookings -->
    <div v-else-if="bookings.length === 0">
      <p>You have no bookings yet.</p>
    </div>

    <!-- Bookings list -->
    <v-row v-else>
      <v-col cols="12" md="4" v-for="booking in bookings" :key="booking.id">
        <v-card class="mb-4">
          <v-img :src="booking.accommodation_image" height="200px" cover></v-img>

          <v-card-text>
            <h5>{{ booking.accommodation_title }}</h5>
            <p class="text-muted">{{ booking.accommodation_city }}</p>

            <p><strong>Name:</strong> {{ booking.name }}</p>
            <p><strong>Check-in:</strong> {{ booking.checkin_datetime }}</p>
            <p><strong>Check-out:</strong> {{ booking.checkout_datetime }}</p>
            <p><strong>Total Cost:</strong> ${{ booking.total_cost }}</p>
          </v-card-text>

          <!-- Cancel Button -->
          <v-card-actions>
            <v-btn color="error" @click="cancelBooking(booking.id)">
              Cancel Booking
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getBookings, cancelBooking } from "@/services/api.js";

export default {
  name: "YourStays",
  data() {
    return {
      bookings: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      this.loading = true;
      try {
        this.bookings = await getBookings(); // ✅ use imported function
      } catch (err) {
        console.error("Error fetching bookings:", err);
        this.error = "Could not load your bookings.";
      } finally {
        this.loading = false;
      }
    },

    async cancelBooking(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const data = await cancelBooking(id);
        if (data.success) {
          alert("✅ Booking cancelled!");
          this.bookings = this.bookings.filter(b => b.id !== id);
        } else {
          alert("❌ Failed to cancel booking: " + (data.error || ""));
        }
      } catch (err) {
        console.error("Cancel error:", err);
        alert("❌ Server error, please try again later.");
      }
    }
  }
};
</script>



