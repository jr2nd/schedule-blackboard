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
  //populate facility list and roster
  for (let i = 0; i < fakeEmployeeDatabase.length; i++) {
    memberList.innerHTML += `<div class="members col-4">${fakeEmployeeDatabase[i]}</div><input class='col-8'></input>`;
  } 
  for (let i = 0; i < fakeFacilityDatabase.length; i++) {
    facilityList.innerHTML += `<div class="facilities">${fakeFacilityDatabase[i]}</div>`;
  }

  //add event listeners
  let members = document.querySelectorAll(".members");
  for (let i = 0; i < members.length; i++) {
  members[i].addEventListener("click", selectItem);
  }
  let facilities = document.querySelectorAll(".facilities");
  for (let i = 0; i < facilities.length; i++) {
    facilities[i].addEventListener("click", selectItem);
  }
}
