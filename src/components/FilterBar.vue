<template>
  <div class="card p-3 mb-4 shadow-sm">
    <div class="row g-2 align-items-end">
      <!-- City -->
      <div class="col-md-3">
        <label class="form-label">City</label>
        <input v-model="filters.city" type="text" placeholder="Enter city" class="form-control" />
      </div>

      <!-- Check-in Date -->
      <div class="col-md-2">
        <label class="form-label">Check-in</label>
        <input v-model="filters.checkin" type="date" class="form-control" />
      </div>

      <!-- Check-out Date -->
      <div class="col-md-2">
        <label class="form-label">Check-out</label>
        <input v-model="filters.checkout" type="date" class="form-control" />
      </div>

      <!-- Guests -->
      <div class="col-md-2">
        <label class="form-label">Guests</label>
        <input v-model="filters.guests" type="number" min="1" class="form-control" />
      </div>

      <!-- Apply button -->
      <div class="col-md-2">
        <button class="btn btn-primary w-100" @click="applyFilters">
          Filter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  data() {
    return {
      filters: {
        city: "",
        checkin: "",
        checkout: "",
        guests: ""
      }
    };
  },
  methods: {
    applyFilters() {
      this.$emit("filter-changed", this.filters);
    }
  }
};
</script>


