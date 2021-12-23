const fakeEmployeeDatabase = [
  {
    empID: 1,
    name: "Adria",
    position: "clerk",
  },
  {
    empID: 2,
    name: "Braylen",
    position: "lead",
  },
  {
    empID: 3,
    name: "Caridad",
    position: "tech",
  },
  {
    empID: 4,
    name: "Deshawn",
    position: "clerk",
  },
  {
    empID: 5,
    name: "Emery",
    position: "tech",
  },
  {
    empID: 6,
    name: "Foster",
    position: "lead",
  },
  {
    empID: 7,
    name: "Gemma",
    position: "tech",
  },
  {
    empID: 8,
    name: "Heath",
    position: "lead",
  },
  {
    empID: 9,
    name: "Isla",
    position: "tech",
  },
  {
    empID: 10,
    name: "Jacobus",
    position: "clerk",
  },
  {
    empID: 11,
    name: "Kenzie",
    position: "lead",
  },
  {
    empID: 12,
    name: "Lucio",
    position: "tech",
  },
  {
    empID: 13,
    name: "Makayla",
    position: "tech",
  },
  {
    empID: 14,
    name: "Nolan",
    position: "tech",
  },
  {
    empID: 15,
    name: "Orlanda",
    position: "tech",
  },
  {
    empID: 16,
    name: "Pax",
    position: "tech",
  },
  {
    empID: 17,
    name: "Robbie",
    position: "tech",
  },
  {
    empID: 18,
    name: "Sophie",
    position: 'tech'
  },
  {
    empID: 19,
    name: "Tayshaun",
    position: 'lead'
  },
  {
    empID: 20,
    name: "Viviana",
    position: 'tech'
  },
  {
    empID: 21,
    name: "Will",
    position: 'tech'
  },
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
  "Verruckt",
];
initializeFakeDatabase();
function initializeFakeDatabase() {
  //populate member list 
  for (let i = 0; i < fakeEmployeeDatabase.length; i++) {
    memberList.innerHTML += `
<div class='row'>
    <div class="members col-8">
    ${fakeEmployeeDatabase[i].name}</div> <div class='position col'>${fakeEmployeeDatabase[i].position}</div>
    </div>
    <div class='row'>
    <input class='row hidden d-sm-block' placeholder="These notes are private"></input>
    </div>
    </div>`
  }
  //populate facility list
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
