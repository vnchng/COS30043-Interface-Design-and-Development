<template>
  <v-footer height="auto" class="bg-light">
    <v-container>
      <v-row>
        <!-- Support -->
        <v-col cols="12" sm="3">
          <h6 class="mb-2">Support</h6>
          <ul class="list-unstyled">
            <li><router-link to="/help">Help Centre</router-link></li>
            <li><router-link to="/cancellation">Cancellation Options</router-link></li>
            <li><router-link to="/safety">Safety Information</router-link></li>
          </ul>
        </v-col>

        <!-- About -->
        <v-col cols="12" sm="3">
          <h6 class="mb-2">About Us</h6>
          <ul class="list-unstyled">
            <li><router-link to="/about">Company Info</router-link></li>
            <li><router-link to="/careers">Careers</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </v-col>

        <!-- Other -->
        <v-col cols="12" sm="3">
          <h6 class="mb-2">Other</h6>
          <ul class="list-unstyled">
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
            <li><router-link to="/faq">FAQs</router-link></li>
          </ul>
        </v-col>

      <v-col cols="12" sm="3">
          <h6 class="mb-2">Host Your Home</h6>
          <ul class="list-unstyled">
            <li><router-link to="/host">Get Started</router-link></li>
            <li><router-link to="/resources">Hosting Resources</router-link></li>
            <li><router-link to="/communityforum">Community Forum</router-link></li>
          </ul>
        </v-col>
      </v-row>

      <!-- Bottom Row -->
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-space-between align-center">
        <span>© 2025 YourStay, Inc.</span>
        <div>
            <a href="https://facebook.com" target="_blank" rel="noopener">
            <v-icon class="mx-2">mdi-facebook</v-icon>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener">
            <v-icon class="mx-2">mdi-twitter</v-icon>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener">
            <v-icon class="mx-2">mdi-instagram</v-icon>
            </a>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
h6 {
  font-weight: bold;
}
ul li {
  margin: 4px 0;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: underline;
}
</style>