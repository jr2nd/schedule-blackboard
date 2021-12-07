const fakeEmployeeDatabase = [
  "Adria",
  "Braylen",
  "Caridad",
  "Deshawn",
  "Emery",
  "Foster",
  "Gemma",
  "Heath",
  "Isla",
  "Jacobus",
  "Kenzie",
  "Lucio",
  "Makayla",
  "Nolan",
  "Orlanda",
  "Pax",
  "Ronin",
  "Sophie",
  "Tayshaun",
  "Viviana",
  "Will",
];
const fakeFacilityDatabase = [
  "Arkham",
  "Briar Ridge",
  "Eichen House",
  "Mayfield",
  "New Bedlam",
  "Santa Rosa",
  "Shady Acres",
  "Somafree",
  "Verruckt"
];
initializeFakeDatabase();
function initializeFakeDatabase() {
  memberList.innerHTML = "<h1>MEMBERS</h1>";
  for (let i = 0; i < fakeEmployeeDatabase.length; i++) {
    memberList.innerHTML += `<div class="members">${fakeEmployeeDatabase[i]}</div>`;
  }
  let members = document.querySelectorAll(".members");
  for (let i = 0; i < members.length; i++) {
    members[i].addEventListener("click", selectItem);
  }
  facilityList.innerHTML = "<h1>FACILITIES</h1>";
  for (let i = 0; i < fakeFacilityDatabase.length; i++) {
    facilityList.innerHTML += `<h4 class="facilities">${fakeFacilityDatabase[i]}</h4>`;
  }
  //add event listeners
  let facilities = document.querySelectorAll(".facilities");
  for (let i = 0; i < facilities.length; i++) {
    facilities[i].addEventListener("click", selectItem);
  }
  for (let i = 0; i < amFacilities.length; i++) {
    amFacilities[i].innerHTML = "<h3>AM FACILITY</h3>";
  }
  for (let i = 0; i < pmFacilities.length; i++) {
    pmFacilities[i].innerHTML = "<h3>PM FACILITY</h3>";
  }
}
