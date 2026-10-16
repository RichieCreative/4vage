// Change this to your deployed backend URL once it's live on Render
const API_BASE = "http://localhost:3000/api";

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(signupForm));
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        window.location.href = "profile.html";
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (err) {
      alert("Could not reach server. Is the backend running?");
    }
  });
}

const signinForm = document.getElementById("signin-form");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(signinForm));
    try {
      const res = await fetch(`${API_BASE}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        window.location.href = "profile.html";
      } else {
        alert(result.error || "Sign in failed");
      }
    } catch (err) {
      alert("Could not reach server. Is the backend running?");
    }
  });
}

const availabilityToggle = document.getElementById("availability-toggle");
if (availabilityToggle) {
  availabilityToggle.addEventListener("change", () => {
    console.log("Availability set to:", availabilityToggle.checked);
    // TODO: send this to the backend once accounts are wired up
  });
}

const jobsList = document.getElementById("jobs-list");
if (jobsList) {
  fetch(`${API_BASE}/jobs`)
    .then((res) => res.json())
    .then((jobs) => {
      if (!jobs.length) return;
      jobsList.innerHTML = jobs
        .map((j) => `<div class="card"><h3>${j.title}</h3><p>${j.description || ""}</p></div>`)
        .join("");
    })
    .catch(() => {
      // backend not running yet - leave placeholder card
    });
}
