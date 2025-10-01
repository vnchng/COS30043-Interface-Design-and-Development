<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <video
          src="@/assets/logo.mp4"
          autoplay
          muted
          playsinline
          class="brand-video"
        ></video>
      </router-link>

      <!-- Title (desktop/tablet only) -->
      <h1 class="brand-title d-none d-md-block ms-2">YOUR STAY</h1>

      <!-- Mobile toggle on the right -->
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/listing/1">Listing</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/booking/1">Booking</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/yourstays/1">Your Stays</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Logo */
.brand-video {
  height: 200px;   
  display: block;
}

/* Base nav links */
.navbar-nav .nav-link {
  position: relative;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;
}

/* Default underline (hidden) */
.navbar-nav .nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;      
  width: 0;
  height: 2px;
  background-color: #0d6efd; 
  transition: width 0.3s ease;
}

/* Active or exact-active link */
.navbar-nav .nav-link.router-link-active,
.navbar-nav .nav-link.router-link-exact-active {
  color: #0d6efd;
  font-weight: 600;
}

/* Animate underline when active */
.navbar-nav .nav-link.router-link-active::after,
.navbar-nav .nav-link.router-link-exact-active::after {
  width: 100%; 
}
</style>
