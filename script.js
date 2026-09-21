// JavaScript - approximately 25% of the project functionality

const searchInput = document.getElementById("jobSearch");
const jobItems = document.querySelectorAll(".job-item");
const noJobs = document.getElementById("noJobs");

// Job search functionality
searchInput.addEventListener("input", function () {
  const searchText = this.value.toLowerCase().trim();
  let found = 0;

  jobItems.forEach(function (item) {
    const searchData = item.dataset.search.toLowerCase();
    const matched = searchData.includes(searchText);

    item.classList.toggle("d-none", !matched);

    if (matched) {
      found++;
    }
  });

  noJobs.classList.toggle("d-none", found !== 0);
});

// Bootstrap toast
const toast = bootstrap.Toast.getOrCreateInstance(
  document.getElementById("portalToast")
);

function showMessage(message) {
  document.getElementById("toastMessage").textContent = message;
  toast.show();
}

// Job application functionality
document.querySelectorAll(".apply-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const company = this.dataset.company;
    const role = this.dataset.role;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${company}</td>
      <td>${role}</td>
      <td><span class="badge text-bg-secondary">Applied</span></td>
    `;

    document.getElementById("applicationTable").appendChild(newRow);

    this.textContent = "Applied";
    this.disabled = true;
    this.classList.remove("btn-primary");
    this.classList.add("btn-success");

    const countElement = document.getElementById("applicationCount");
    countElement.textContent = String(
      Number(countElement.textContent) + 1
    ).padStart(2, "0");

    showMessage(`Application submitted for ${company} - ${role}`);
  });
});

// Placement event registration
document.querySelectorAll(".event-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    this.textContent = "Registered";
    this.disabled = true;
    this.classList.remove("btn-outline-primary");
    this.classList.add("btn-success");

    showMessage("You have successfully registered for the placement event.");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
