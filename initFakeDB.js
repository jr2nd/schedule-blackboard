/*
class employee {
  constructor(name,age){
this.name = name;
this.age = age;
this.status = "active";
this.time = prompt("part time or full time");
this.position = prompt('tech, lead')
 } 
}
e1234 = new employee();
*/
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
  "Briar Ridge",
  "Eichen House",
  "Mayfield",
  "New Bedlam",
  "Santa Rosa",
  "Shady Acres",
  "Somafree Institute",
  "Verruckt",
  "Arkham",
];
let memberList = document.querySelector("#member-list");
let facilityList = document.querySelector("#facility-list");


function initializeFakeDatabase() {
for (let i = 0; i < fakeEmployeeDatabase.length; i++) {
  memberList.innerHTML += `<div class="members">${fakeEmployeeDatabase[i]}</div>`;
}
for (let i = 0; i < fakeFacilityDatabase.length; i++) {
  facilityList.innerHTML += `<h4 class="facilities">${fakeFacilityDatabase[i]}</h4>`;
}
}