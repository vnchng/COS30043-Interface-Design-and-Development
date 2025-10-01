// src/services/api.js
export async function getAccommodations(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const url = `http://localhost/yourstay_api/accommodations.php${params ? "?" + params : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch accommodations");
  return res.json();
}

export async function getBookings() {
  const res = await fetch("http://localhost/yourstay_api/bookings.php");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function cancelBooking(id) {
  const res = await fetch("http://localhost/yourstay_api/bookings.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }, // ✅ JSON
    body: JSON.stringify({ id }),
  });

  if (!res.ok) throw new Error("Failed to cancel booking");
  return res.json();
}

