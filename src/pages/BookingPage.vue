<template>
  <v-container class="mt-4" v-if="listing">
    <h2>Book {{ listing.title }}</h2>
    <p class="text-muted">{{ listing.city }}</p>
    <p><strong>${{ listing.price_per_hour }}/hr</strong></p>

    <v-form ref="bookingForm" v-model="valid" lazy-validation>
      <!-- Personal Info -->
      <h5>Personal Information</h5>
      <v-text-field v-model="booking.name" label="Full Name" :rules="nameRules" required />
      <v-text-field v-model="booking.email" label="Email" :rules="emailRules" required />
      <v-text-field v-model="booking.phone" label="Phone" :rules="phoneRules" required />

      <!-- Billing Info -->
      <h5 class="mt-4">Billing Information</h5>
      <v-textarea v-model="booking.billingAddress" label="Billing Address" :rules="addressRules" rows="2" required />
      <v-text-field v-model="booking.postcode" label="Post Code" :rules="postcodeRules" required />
      <v-select v-model="booking.paymentMethod" :items="['Credit Card','PayPal']" label="Payment Method"
                :rules="[v => !!v || 'Select a payment method']" required />

      <!-- Credit Card Fields -->
      <v-text-field v-if="booking.paymentMethod === 'Credit Card'" v-model="booking.cardNumber" label="Card Number"
                    :rules="cardRules" maxlength="16" required />
      <v-row v-if="booking.paymentMethod === 'Credit Card'">
        <v-col cols="6">
          <v-text-field v-model="booking.cardExpiry" label="Expiry (MM/YY)" :rules="expiryRules" placeholder="MM/YY" required />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="booking.cardCVV" label="CVV" type="password" :rules="cvvRules" maxlength="4" required />
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Booking Details -->
      <h5>Booking Details</h5>
      <v-text-field v-model="booking.checkinDate" label="Check-in Date" type="date" :rules="[v => !!v || 'Required']" required />
      <v-text-field v-model="booking.checkinTime" label="Check-in Time" type="time" :rules="[v => !!v || 'Required']" required />
      <v-text-field v-model="booking.checkoutDate" label="Check-out Date" type="date" :rules="[v => !!v || 'Required']" required />
      <v-text-field v-model="booking.checkoutTime" label="Check-out Time" type="time" :rules="[v => !!v || 'Required']" required />
      <v-text-field v-model="booking.guests" label="Guests" type="number" min="1"
                    :rules="[v => v > 0 || 'At least 1 guest required']" required />

      <!-- Booking Summary -->
      <v-card v-if="booking.checkinDate && booking.checkinTime && booking.checkoutDate && booking.checkoutTime"
              class="pa-4 my-4 bg-light">
        <h5>Booking Summary</h5>
        <p><strong>Name:</strong> {{ booking.name }}</p>
        <p><strong>Email:</strong> {{ booking.email }}</p>
        <p><strong>Phone:</strong> {{ booking.phone }}</p>
        <p><strong>Billing Address:</strong> {{ booking.billingAddress }}</p>
        <p><strong>Postcode:</strong> {{ booking.postcode }}</p>
        <p><strong>Payment Method:</strong> {{ booking.paymentMethod }}</p>
        <p v-if="booking.paymentMethod === 'Credit Card'">
          <strong>Card:</strong> **** **** **** {{ booking.cardNumber.slice(-4) }}
        </p>
        <hr />
        <p><strong>Check-in:</strong> {{ booking.checkinDate }} {{ booking.checkinTime }}</p>
        <p><strong>Check-out:</strong> {{ booking.checkoutDate }} {{ booking.checkoutTime }}</p>
        <p><strong>Guests:</strong> {{ booking.guests }}</p>
        <p><strong>Total Hours:</strong> {{ totalHours }}</p>
        <p><strong>Total Cost:</strong> ${{ totalCost.toFixed(2) }}</p>
      </v-card>

      <!-- Submit -->
      <v-btn color="primary" :disabled="!valid" @click="submitBooking">Confirm Booking</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import {
  nameRules, emailRules, phoneRules, addressRules, postcodeRules,
  cardRules, expiryRules, cvvRules
} from "@/utils/formRules.js";
import { getAccommodations } from "@/services/api.js";

export default {
  name: "BookingPage",
  data() {
    return {
      valid: false,
      listing: null,
      booking: {
        name: "", email: "", phone: "", billingAddress: "", postcode: "",
        paymentMethod: "", cardNumber: "", cardExpiry: "", cardCVV: "",
        checkinDate: "", checkinTime: "", checkoutDate: "", checkoutTime: "",
        guests: 1,
      },
      nameRules, emailRules, phoneRules, addressRules, postcodeRules,
      cardRules, expiryRules, cvvRules
    };
  },
  async created() {
    const id = this.$route.params.id;
    const allListings = await getAccommodations();
    this.listing = allListings.find(l => l.id == id);
  },
  computed: {
    totalHours() {
      if (!this.booking.checkinDate || !this.booking.checkinTime || !this.booking.checkoutDate || !this.booking.checkoutTime) {
        return 0;
      }
      const checkin = new Date(`${this.booking.checkinDate}T${this.booking.checkinTime}`);
      const checkout = new Date(`${this.booking.checkoutDate}T${this.booking.checkoutTime}`);
      return Math.max(0, (checkout - checkin) / (1000 * 60 * 60));
    },
    totalCost() {
      return this.totalHours * (this.listing ? this.listing.price_per_hour : 0);
    },
  },
  methods: {
  async submitBooking() {
    if (!this.$refs.bookingForm.validate()) return;

    // Build payload
    const payload = {
        accommodation_id: this.listing.id,
        name: this.booking.name,
        email: this.booking.email,
        phone: this.booking.phone,
        billingAddress: this.booking.billingAddress,
        postcode: this.booking.postcode,
        payment_method: this.booking.paymentMethod,
        card_last4: this.booking.cardNumber ? this.booking.cardNumber.slice(-4) : "",
        checkin_datetime: `${this.booking.checkinDate} ${this.booking.checkinTime}`,
        checkout_datetime: `${this.booking.checkoutDate} ${this.booking.checkoutTime}`,
        guests: this.booking.guests,
        total_hours: this.totalHours,
        total_cost: this.totalCost,
        };

    try {
      const res = await fetch("http://localhost/yourstay_api/bookings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(`✅ Booking confirmed!`);
        this.$router.push("/yourstays/1"); // Redirect to "Your Stays" page
        
      } else {
        alert("❌ Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Server error, please try again later.");
    }
  },
}
};
</script>







