let fakeEmployeeDatabase = [
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
let fakeFacilityDatabase = [
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
let btnPrevWeek = document.querySelector("#btnLastWeek");
let btnNextWeek = document.querySelector("#btnNextWeek");
let btnPrevDay = document.querySelector("#btnPrevDay");
let btnNextDay = document.querySelector("#btnNextDay");
btnPrevDay.addEventListener("click", goToPrevDay);
btnNextDay.addEventListener("click", goToNextDay);
btnPrevWeek.addEventListener("click", goToPrevWeek);
btnNextWeek.addEventListener("click", goToNextWeek);
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", submitDaily);
const teams = document.querySelector("#teams");
const weekly = document.querySelector("#weekly");

//initialize date
const displayDate = document.querySelector("#displayDate");
let today = new Date();
let monday = today.getDate() - today.getDay() + 1;
today.setDate(monday);
//display the date in the current working schedule
displayDate.innerText = today.toDateString();

let memberList = document.querySelector("#member-list");
let facilitylist = document.querySelector("#facility-list");
let amFacilities = document.querySelectorAll(".amFacility");
for (let i = 0; i < amFacilities.length; i++) {
  amFacilities[i].addEventListener("click", addToTeam);
}
let pmFacilities = document.querySelectorAll(".pmFacility");
for (let i = 0; i < pmFacilities.length; i++) {
  pmFacilities[i].addEventListener("click", addToTeam);
}
initializeFakeDatabase();
function initializeFakeDatabase() {
  memberList.innerHTML = "<h1>MEMBERS</h1>";
  for (let i = 0; i < fakeEmployeeDatabase.length; i++) {
    memberList.innerHTML += `<div class="members">${
      fakeEmployeeDatabase[i]
    }</div>`;
  }
  let members = document.querySelectorAll(".members");
  for (let i = 0; i < members.length; i++) {
    members[i].addEventListener("click", selectItem);
  }
  facilitylist.innerHTML = "<h1>FACILITIES</h1>";
  for (let i = 0; i < fakeFacilityDatabase.length; i++) {
    facilitylist.innerHTML += `<h4 class="facilities">${fakeFacilityDatabase[i]}</h4>`;
  }
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
} //initializeFakeDatabase()

function selectItem() {
  console.log('selectItem', this)
  let selected = document.querySelector("#selected");
if(selected != null)selected.removeAttribute('id');
this.setAttribute('id', 'selected')
}
function addToTeam() {
  console.log('addToTeam', this)
  //find the selected member or facility
  let selected = document.querySelector("#selected");
  if (selected === undefined) return;
  this.removeAttribute("id");
  if (selected.classList.contains("addedFacility")) return;
  if (selected.classList.contains("members")) addMemberToTeam(this);
  if (selected.classList.contains("facilities")) addFacilityToTeam(this);
}
function addMemberToTeam(t) {
  console.log('addMemberToTeam', t)
  let selected = document.querySelector("#selected");
  let addedMember = selected.cloneNode(true);
  if (t.classList.contains("amFacility")) {
    if (selected.classList.contains("amMemberAssigned")) return;
    selected.classList.add("amMemberAssigned");
  }
  if (t.classList.contains("pmFacility")) {
    if (selected.classList.contains("pmMemberAssigned")) return;
    selected.classList.add("pmMemberAssigned");
  }
  addedMember.removeAttribute("id");
  t.appendChild(addedMember);
}
function addFacilityToTeam(t) {
  let selectedFacility = document.querySelector("#selected");
  selectedFacility.removeAttribute("id");
  if (t.childNodes.length > 1) {
    if (t.childNodes[1].nodeName === "H4") {
      return;
    } //if
  }
  let addedFacility = selectedFacility.cloneNode(true);
  selectedFacility.setAttribute("class", "addedFacility");
  t.insertBefore(addedFacility, t.childNodes[1]);
} //addFacilityToTeam()

function nextMonday() {
  let nextMonday = today.getDate() - today.getDay() + 8;
  today.setDate(nextMonday);
  displayDate.innerText = today.toDateString();
  initializeFakeDatabase();
}
function goToPrevDay() {
  let prevDay = today.getDate() - 1;
  today.setDate(prevDay);
  displayDate.innerText = today.toDateString();
}
function goToNextDay() {
  let nextDay = today.getDate() + 1;
  today.setDate(nextDay);
  displayDate.innerText = today.toDateString();
}
function goToPrevWeek() {
  let lastMonday = today.getDate() - today.getDay() - 6;
  today.setDate(lastMonday);
  displayDate.innerText = today.toDateString();
}
function goToNextWeek() {
  let nextMonday = today.getDate() - today.getDay() + 8;
  today.setDate(nextMonday);
  displayDate.innerText = today.toDateString();
}

function submitDaily() {
  let cloneTeams = teams.cloneNode(true);
  cloneTeams.classList.add("col");
  cloneTeams.classList.add("weeklySchedule");
  weeklySchedule.appendChild(cloneTeams);
  //
  let nextDay = today.getDate() + 1;
  today.setDate(nextDay);
  displayDate.innerText = today.toDateString();
  //
  initializeFakeDatabase();
} //submitDaily()

function unselect() {
  //remove a member or facility from a team
  /*
Each member and facility object will have an id number.
The id number will be represented by a data-* attribute.
That attribute will be included in the appended node.
Then that attribute will be used to unselect an item. 
To unselect an item delete that node then change the classes on that item in the member list or facility list to revert it to an unselected item.
*/
}
