/* =========================================
   PROJECT AASHRAY - CORE APPLICATION
========================================= */

// Clean SVG Icon Templates
const ICONS = {
  medical: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  hygiene: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  nutrition: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  utility: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
};

// 8 Verified Real-time Requirements Data
const DEFAULT_NEEDS = [
  {
    id: "need-1",
    title: "Digital BP Monitors",
    category: "medical",
    categoryLabel: "CRITICAL",
    priority: "urgent",
    priorityLabel: "URGENT",
    iconKey: "medical",
    home: "Shantideep Senior Care Home",
    desc: "Reliable blood-pressure monitors are needed for daily vital tracking and routine health monitoring of residents.",
    target: 8,
    fulfilled: 3
  },
  {
    id: "need-2",
    title: "Adult Care Diapers",
    category: "hygiene",
    categoryLabel: "DAILY HYGIENE",
    priority: "high",
    priorityLabel: "HIGH PRIORITY",
    iconKey: "hygiene",
    home: "Shantideep Senior Care Home",
    desc: "Essential monthly hygiene supplies for residents with severe mobility challenges, helping maintain comfort, health, and dignity.",
    target: 100,
    fulfilled: 42
  },
  {
    id: "need-3",
    title: "Diabetic Nutrition",
    category: "nutrition",
    categoryLabel: "SPECIALIZED NUTRITION",
    priority: "medium",
    priorityLabel: "MEDIUM",
    iconKey: "nutrition",
    home: "Aashirwad Elder Care",
    desc: "Low-glycemic nutritional products and approved dietary supplements for residents managing diabetes.",
    target: 30,
    fulfilled: 18
  },
  {
    id: "need-4",
    title: "Emergency Lights",
    category: "utility",
    categoryLabel: "INFRASTRUCTURE",
    priority: "medium",
    priorityLabel: "MEDIUM",
    iconKey: "utility",
    home: "Aashirwad Elder Care",
    desc: "Rechargeable backup lights for safer movement through common hallways and bathrooms during power interruptions.",
    target: 10,
    fulfilled: 7
  },
  {
    id: "need-5",
    title: "Pulse Oximeters",
    category: "medical",
    categoryLabel: "MEDICAL MONITORING",
    priority: "urgent",
    priorityLabel: "URGENT",
    iconKey: "medical",
    home: "Matrushree Senior Residence",
    desc: "Fingertip pulse oximeters to track blood-oxygen saturation levels for residents with respiratory conditions.",
    target: 12,
    fulfilled: 5
  },
  {
    id: "need-6",
    title: "Bed Bath Wipes & Sanitizers",
    category: "hygiene",
    categoryLabel: "HYGIENE CARE",
    priority: "high",
    priorityLabel: "HIGH PRIORITY",
    iconKey: "hygiene",
    home: "Matrushree Senior Residence",
    desc: "Antiseptic bed-bath wipes and hand sanitizers for bedridden residents to support daily gentle cleaning.",
    target: 60,
    fulfilled: 25
  },
  {
    id: "need-7",
    title: "High-Protein Nutritional Drink",
    category: "nutrition",
    categoryLabel: "SPECIALIZED NUTRITION",
    priority: "medium",
    priorityLabel: "MEDIUM",
    iconKey: "nutrition",
    home: "Seva Niketan Elder Sanctuary",
    desc: "Fortified protein nutritional mix to support muscle retention and post-illness recovery in elderly residents.",
    target: 40,
    fulfilled: 22
  },
  {
    id: "need-8",
    title: "Anti-Skid Bathroom Safety Mats",
    category: "utility",
    categoryLabel: "INFRASTRUCTURE",
    priority: "high",
    priorityLabel: "HIGH PRIORITY",
    iconKey: "utility",
    home: "Seva Niketan Elder Sanctuary",
    desc: "Textured rubber safety floor mats to prevent slips and falls across common washrooms and wash areas.",
    target: 20,
    fulfilled: 9
  }
];

// App State
let needsData = JSON.parse(localStorage.getItem("aashray_needs_v6")) || DEFAULT_NEEDS;
let currentFilter = "all";
let searchQuery = "";
let selectedNeedId = null;

function saveNeeds() {
  localStorage.setItem("aashray_needs_v6", JSON.stringify(needsData));
}

// DOM Elements
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const needsGrid = document.getElementById("needsGrid");
const filterButtons = document.querySelectorAll(".filter");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

const pledgeModal = document.getElementById("pledgeModal");
const closeModal = document.getElementById("closeModal");
const pledgeForm = document.getElementById("pledgeForm");
const selectedNeedElem = document.getElementById("selectedNeed");
const pledgeQuantityInput = document.getElementById("pledgeQuantity");

const volunteerModal = document.getElementById("volunteerModal");
const volunteerBtn = document.getElementById("volunteerBtn");
const closeVolunteer = document.getElementById("closeVolunteer");
const volunteerForm = document.getElementById("volunteerForm");

// Mobile Navigation Toggle
menuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  menuBtn.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "auto";
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "auto";
  });
});

// Toast Feedback Notification
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `<span>&#10003;</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Render Needs Grid
function renderNeeds() {
  needsGrid.innerHTML = "";

  const filtered = needsData.filter(item => {
    const matchesFilter = currentFilter === "all" || item.category === currentFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(query) ||
                          item.home.toLowerCase().includes(query) ||
                          item.desc.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  filtered.forEach(item => {
    const remaining = Math.max(0, item.target - item.fulfilled);
    const percent = Math.min(100, Math.round((item.fulfilled / item.target) * 100));
    const isCompleted = remaining === 0;

    const card = document.createElement("article");
    card.className = "need-card fade-in-up";
    card.innerHTML = `
      <div class="need-top">
        <span class="category ${item.category}">${item.categoryLabel}</span>
        <span class="priority ${item.priority}">${item.priorityLabel}</span>
      </div>
      <div class="need-icon ${item.category}-icon">${ICONS[item.iconKey]}</div>
      <h3>${item.title}</h3>
      <div class="need-home">${item.home}</div>
      <p class="need-desc">${item.desc}</p>
      
      <div class="progress-info">
        <span><strong>${item.fulfilled}</strong> of ${item.target} fulfilled</span>
        <span>${isCompleted ? "Goal Reached" : `${remaining} remaining`}</span>
      </div>
      <div class="progress">
        <span style="width: ${percent}%"></span>
      </div>

      <button class="pledge-btn" data-id="${item.id}" ${isCompleted ? "disabled" : ""}>
        ${isCompleted ? "Goal Fulfilled &#10003;" : "Pledge an Item &rarr;"}
      </button>
    `;

    needsGrid.appendChild(card);
  });

  document.querySelectorAll(".pledge-btn:not(:disabled)").forEach(btn => {
    btn.addEventListener("click", () => openPledgeModal(btn.dataset.id));
  });

  updateImpactStats();
}

// Search and Filter Listeners
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderNeeds();
  });
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderNeeds();
});

// Modal Operations
function openPledgeModal(id) {
  const item = needsData.find(n => n.id === id);
  if (!item) return;

  selectedNeedId = id;
  const remaining = item.target - item.fulfilled;

  selectedNeedElem.innerHTML = `You are pledging for <strong>${item.title}</strong> at <strong>${item.home}</strong>.`;
  pledgeQuantityInput.max = remaining;
  pledgeQuantityInput.value = 1;

  pledgeModal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.getElementById("donorName").focus();
}

function closeModals() {
  pledgeModal.classList.remove("active");
  volunteerModal.classList.remove("active");
  document.body.style.overflow = "auto";
  pledgeForm.reset();
  volunteerForm.reset();
  selectedNeedId = null;
}

closeModal.addEventListener("click", closeModals);
closeVolunteer.addEventListener("click", closeModals);

window.addEventListener("click", (e) => {
  if (e.target === pledgeModal || e.target === volunteerModal) {
    closeModals();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

// Form Submissions
pledgeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const quantity = parseInt(pledgeQuantityInput.value, 10);
  const donorName = document.getElementById("donorName").value.trim();

  const itemIndex = needsData.findIndex(n => n.id === selectedNeedId);
  if (itemIndex > -1) {
    needsData[itemIndex].fulfilled += quantity;
    saveNeeds();
    renderNeeds();
  }

  closeModals();
  showToast(`Thank you, ${donorName}! Your pledge for ${quantity} item(s) has been recorded.`);
});

volunteerBtn.addEventListener("click", () => {
  volunteerModal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.getElementById("volName").focus();
});

volunteerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("volName").value.trim();
  closeModals();
  showToast(`Thank you, ${name}! Your volunteer application has been submitted.`);
});

// Live Progress Computations
function updateImpactStats() {
  let totalTarget = 0;
  let totalFulfilled = 0;

  needsData.forEach(n => {
    totalTarget += n.target;
    totalFulfilled += n.fulfilled;
  });

  const percentage = Math.min(100, Math.round((totalFulfilled / totalTarget) * 100));

  const heroPct = document.getElementById("heroPercentage");
  const impactPct = document.getElementById("impactPercent");
  const impactBar = document.getElementById("impactBarInner");

  if (heroPct) heroPct.textContent = `${percentage}%`;
  if (impactPct) impactPct.textContent = `${percentage}%`;
  if (impactBar) impactBar.style.width = `${percentage}%`;
}

// 0-to-Target Counter Animation
const counters = document.querySelectorAll(".stat-counter");

function animateCounter(counter) {
  const target = parseInt(counter.dataset.count, 10);
  const duration = 1800;
  const startTime = performance.now();

  counter.textContent = "0";

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * target);

    counter.textContent = currentVal.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

// Scroll Reveal & Counter Observers
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" };

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      const statCounters = entry.target.querySelectorAll(".stat-counter");
      statCounters.forEach(c => animateCounter(c));

      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => scrollObserver.observe(el));

// Initialize
renderNeeds();