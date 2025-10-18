const hackathons = [
  {
    name: "Hack the Future",
    location: "Online",
    tags: ["ai", "beginner"],
    date: "2025-11-10",
    description: "An AI-focused hackathon for all skill levels.",
  },
  {
    name: "CodeJam NYC",
    location: "In-Person",
    tags: ["web", "hardware"],
    date: "2025-12-02",
    description: "A high-energy weekend of web and hardware innovation.",
  },
  {
    name: "BlockHack 2025",
    location: "Online",
    tags: ["blockchain"],
    date: "2025-10-30",
    description: "Build blockchain apps and compete for crypto prizes.",
  },
];

const form = document.querySelector("form");
const resultContainer = document.querySelector(".result");
const locationSelect = document.getElementById("location");
const dateInput = document.getElementById("date");

function displayHackathons(list) {
  resultContainer.innerHTML = "";

  if (list.length === 0) {
    resultContainer.innerHTML =
      "<p class='text-gray-500'></p>No hackathons found matching your criteria.</p>";
    return;
  }
  list.forEach((h) => {
    const card = document.createElement("div");
    card.className = "p-4 mb-3 border rounded-lg shadow-sm bg-gray-100";
    card.innerHTML = `
      <h3 class="text-lg font-semibold text-blue-700">${h.name}</h3>
      <p class="text-sm text-gray-600 mb-1"><strong>Location:</strong> ${
        h.location
      }</p>
      <p class="text-sm text-gray-600 mb-1"><strong>Date:</strong> ${h.date}</p>
      <p class="text-sm text-gray-600 mb-1"><strong>Tags:</strong> ${h.tags.join(
        ", "
      )}</p>
      <p class="text-gray-700 mt-2">${h.description}</p>
    `;
    resultContainer.appendChild(card);
  });
}

displayHackathons(hackathons);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationFilter = locationSelect.value;
    const dateFilter = dateInput.value;
    const selectedTags = Array.from(
        document.querySelectorAll('input[name="tags"]:checked')
    ).map((cb) => cb.value);

    const filtered = hackathons.filter((h) => {
    const locationMatch = !locationFilter || h.location.toLowerCase() === locationFilter.toLowerCase();

    const dateMatch = !dateFilter || h.date >= dateFilter;

    const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => h.tags.includes(tag));
    
    return locationMatch && dateMatch && tagsMatch;
    });
    displayHackathons(filtered);
})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  form.reset();
  displayHackathons(hackathons);
});

function fetchHackathons() {
  fetch("https://hackathons.hackclub.com/api/events/upcoming")
  .then(res => res.json())
  .then(data => {
    console.log("Hackathons:", data);
    // store data in a variable for filtering
  })
  .catch(err => console.error("API fetch error:", err));

  const userLocation = "New York";

  const filtered = data.filter(h =>
  h.city?.toLowerCase().includes(userLocation.toLowerCase()) ||
  h.state?.toLowerCase().includes(userLocation.toLowerCase()) ||
  h.country?.toLowerCase().includes(userLocation.toLowerCase())
);

}