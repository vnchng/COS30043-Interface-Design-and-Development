import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ListingDetail from "@/pages/ListingDetail.vue";
import BookingPage from "@/pages/BookingPage.vue";
import YourStays from '@/pages/YourStays.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: "/listing/:id", name: "ListingDetail", component: ListingDetail },
  { path: '/booking/:id', name: 'Booking', component: BookingPage, props: true },
  { path: '/yourstays/:id', name: 'YourStays', component: YourStays }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

