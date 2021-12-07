//initialize date
let today = new Date();
let monday = today.getDate() - today.getDay() + 1;
today.setDate(monday);
const displayDate = document.getElementsByClassName("displayDate");

displayDate[0].innerText = today.toDateString();
//initialize lists
let memberList = document.querySelector("#member-list");
const teams = document.querySelector("#teams");
let facilityList = document.querySelector("#facility-list");
const weekly = document.querySelector("#weekly");
let amFacilities = document.querySelectorAll(".amFacility");
for (let i = 0; i < amFacilities.length; i++) {
  amFacilities[i].addEventListener("click", addToTeam);
}
let pmFacilities = document.querySelectorAll(".pmFacility");
for (let i = 0; i < pmFacilities.length; i++) {
  pmFacilities[i].addEventListener("click", addToTeam);
}
const btnShowMembers = document.querySelector("#btnShowMembers");
const btnShowFacilities = document.querySelector("#btnShowFacilities");
// initializeFakeDatabase();
//
//find the currently selected item
function selectItem() {
  const filteredMembers = document.querySelectorAll(".filterMember");
  for (let i = 0; i < filteredMembers.length; i++) {
    filteredMembers[i].classList.remove("filterMember");
  }
  const filteredFacilities = document.querySelectorAll(".filterFacility");
  for (let i = 0; i < filteredFacilities.length; i++) {
    filteredFacilities[i].classList.remove("filterFacility");
  }
  //determine if there is an element that has previously been selected
  let selected = document.querySelector("#selected");
  //if so then deselect that item
  if (selected != null) selected.removeAttribute("id");
  //mark the currently selected item
  this.setAttribute("id", "selected");
  
  //if item is a member then highlight them on the schedule
  if (this.classList.contains("members")) {
    let filteredItems = document.querySelectorAll(".assignedMember");
    for (let i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i].innerText === this.innerText)
      filteredItems[i].classList.add("filterMember");
      else filteredItems[i].classList.remove("filterMember");
    } //for
  }
  
  //if item is a facility then highlight it on the schedule
  if (this.classList.contains("addedFacility")) {
    let filteredItems = document.querySelectorAll(".assignedFacility");
    for (let i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i].innerText === this.innerText)
      filteredItems[i].classList.add("filterFacility");
      else filteredItems[i].classList.remove("filterFacility");
    } //for
  }
} //selectItem()
function addToTeam() {
  // find the selected member or facility
  let selected = document.querySelector("#selected");
  if (selected === null) return;
  //deselect the item now that it has been found
  this.removeAttribute("id");
  //if the item is a facility that is already on the schedule then exit
  //pass the selected item to the appropriate function
  if (selected.classList.contains("members")) addMemberToTeam(this);
  if (selected.classList.contains("facilities")) addFacilityToTeam(this);
}
/*********add the item to the schedule */
function addMemberToTeam(team) {
  let selected = document.querySelector("#selected");
  for (let i = 0; i < team.childNodes.length; i++) {
    if (team.childNodes[i].classList.contains("filterMember")) {
      team.childNodes[i].remove();
      if (team.classList.contains("amFacility"))
      selected.classList.remove("amMemberAssigned");
      if (team.classList.contains("pmFacility"))
      selected.classList.remove("pmMemberAssigned");
      return;
    } //if
  } //for
  let addedMember = selected.cloneNode(true);
  addedMember.classList.add("assignedMember");
  if (team.classList.contains("amFacility")) {
    if (selected.classList.contains("amMemberAssigned")) return;
    selected.classList.add("amMemberAssigned");
  }
  if (team.classList.contains("pmFacility")) {
    if (selected.classList.contains("pmMemberAssigned")) return;
    selected.classList.add("pmMemberAssigned");
  }
  addedMember.removeAttribute("id");
  addedMember.classList.remove("amMemberAssigned");
  addedMember.classList.remove("pmMemberAssigned");
  team.appendChild(addedMember);
  selected.removeAttribute("id");
  return;
} //addMemberToTeam()
function addFacilityToTeam(team) {
  let selected = document.querySelector("#selected");
  for (let i = 0; i < team.childNodes.length; i++) {
    if (team.childNodes[i].classList.contains("filterFacility")) {
      team.childNodes[i].remove();
      selected.classList.remove("addedFacility");
      return;
    } //if
  } //for
  if (team.childNodes.length > 1) {
    if (team.childNodes[1].nodeName === "H4") {
      return;
    } //if(inner)
  } //if(outer)
  selected.removeAttribute("id");
  let addedFacility = selected.cloneNode(true);
  addedFacility.setAttribute("class", "assignedFacility");
  selected.classList.add("addedFacility");
  team.insertBefore(addedFacility, team.childNodes[1]);
} //addFacilityToTeam()
//
/****************buttons***************/
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
function nextMonday() {
  let nextMonday = today.getDate() - today.getDay() + 8;
  today.setDate(nextMonday);
  displayDate[0].innerText = today.toDateString();
  initializeFakeDatabase();
}
function goToPrevDay() {
  let prevDay = today.getDate() - 1;
  today.setDate(prevDay);
  displayDate[0].innerText = today.toDateString();
}
function goToNextDay() {
  let nextDay = today.getDate() + 1;
  today.setDate(nextDay);
  displayDate[0].innerText = today.toDateString();
}
function goToPrevWeek() {
  let lastMonday = today.getDate() - today.getDay() - 6;
  today.setDate(lastMonday);
  displayDate[0].innerText = today.toDateString();
}
function goToNextWeek() {
  let nextMonday = today.getDate() - today.getDay() + 8;
  today.setDate(nextMonday);
  displayDate[0].innerText = today.toDateString();
}
function submitDaily() {
  const cloneTeams = teams.cloneNode(true);
  cloneTeams.classList.add("col");
  cloneTeams.classList.add("weeklySchedule");
  const assignedMembers = cloneTeams.querySelectorAll(".assignedMember");
  for (let i = 0; i < assignedMembers.length; i++) {
    assignedMembers[i].classList.remove("filterMember");
  }
  const assignedFacilities = cloneTeams.querySelectorAll('.assignedFacility');
  for(let i = 0; i < assignedFacilities.length; i++) {
    assignedFacilities[i].classList.remove('filterFacility')
  }
  const weeklySchedule = document.querySelector("#weeklySchedule");
  if (displayDate.length === 1) weeklySchedule.appendChild(cloneTeams);
  else {
    const submitDate = new Date(displayDate[0].innerText);
    for (let i = 0; i < displayDate.length; i++) {
      const scheduleDate = new Date(displayDate[i].innerText);
      if (submitDate < scheduleDate) {
        weeklySchedule.insertBefore(
          cloneTeams,
          weeklySchedule.childNodes[i - 1]
          );
          return;
        } //if
        weeklySchedule.appendChild(cloneTeams);
      } //for
    }
    //add one to date in working schedule
    let nextDay = today.getDate() + 1;
    today.setDate(nextDay);
    displayDate[0].innerText = today.toDateString();
    //
    initializeFakeDatabase();
  } //submitDaily()
  function showHideList() {
    if (this.event.target.id === "btnShowMembers") {
      memberList.classList.toggle("hidden");
    }
    if (this.event.target.id === "btnShowFacilities") {
      facilityList.classList.toggle("hidden");
    }
  }
  