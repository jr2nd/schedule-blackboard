//initialize date
const defaultAMtime = "09:00";
const defaultPMtime = "13:15";
let today = new Date();
let monday = today.getDate() - today.getDay() + 1;
today.setDate(monday);
const displayDate = document.getElementsByClassName("displayDate");
displayDate[0].innerText = today.toDateString();
//initialize lists
const facilityList = document.querySelector("#facility-list");
const memberList = document.querySelector("#member-list");
const weekly = document.querySelector("#weekly");

const amFacilities = document.querySelectorAll(".amFacilities");
amFacilities[0].addEventListener("click", addFacilityToTeam);
const pmFacilities = document.querySelectorAll(".pmFacilities");
pmFacilities[0].addEventListener("click", addFacilityToTeam);
const amFacilityList = document.querySelectorAll(".amFacilityList");
const pmFacilityList = document.querySelectorAll(".pmFacilityList");
//btnShowMembers, btnShowFacilities visible on small screen
const btnShowMembers = document.querySelector("#btnShowMembers");
const btnShowFacilities = document.querySelector("#btnShowFacilities");
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
function addFacilityToTeam() {
  const selected = document.querySelector("#selected");
  if (!selected) return;
  if (!selected.classList.contains("facilities")) return;
  selected.removeAttribute("id");
  selected.classList.add("addedFacility");
  const addedFacility = selected.cloneNode(true);
  addedFacility.setAttribute("class", "assignedFacility");
  addedFacility.addEventListener("click", addMemberToTeam);
  const time = document.createElement("INPUT");
  time.type = "time";
  addedFacility.appendChild(time);
  if (this.classList.contains("amFacilities")) {
    addedFacility.classList.add("amFacility");
    amFacilityList[0].appendChild(addedFacility);
    time.value = defaultAMtime;
  }
  if (this.classList.contains("pmFacilities")) {
    addedFacility.classList.add("pmFacility");
    pmFacilityList[0].appendChild(addedFacility);
    time.value = defaultPMtime;
  }
} //addFacilityToTeam()
function addMemberToTeam() {
  const selected = document.querySelector("#selected");
  const addedMember = selected.cloneNode(true);
  if (this.classList.contains("amFacility"))
    selected.classList.add("amAssigned");
  if (this.classList.contains("pmFacility"))
    selected.classList.add("pmAssigned");
  selected.removeAttribute("id");
  this.appendChild(addedMember);
  //prevent bubbling
  // target.event.preventDefault();
} //addMemberToTeam()

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
const btnStage = document.querySelector("#btnStage");
btnStage.addEventListener("click", stage);
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
function stage() {
  const cloneTeams = teams.cloneNode(true);
  cloneTeams.classList.add("col");
  cloneTeams.classList.add("weeklySchedule");
  const assignedMembers = cloneTeams.querySelectorAll(".assignedMember");
  for (let i = 0; i < assignedMembers.length; i++) {
    assignedMembers[i].classList.remove("filterMember");
  }
  const assignedFacilities = cloneTeams.querySelectorAll(".assignedFacility");
  for (let i = 0; i < assignedFacilities.length; i++) {
    assignedFacilities[i].classList.remove("filterFacility");
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
} //stage()
function showHideList() {
  if (this.event.target.id === "btnShowMembers") {
    memberList.classList.toggle("hidden");
  }
  if (this.event.target.id === "btnShowFacilities") {
    facilityList.classList.toggle("hidden");
  }
}
const btnPostSchedule = document.querySelector("#btnPostSchedule");
const finalSchedule = document.querySelector("#finalSchedule");
btnPostSchedule.addEventListener("submit", postSchedule);
function postSchedule(e) {
  e.preventDefault();
  finalSchedule.innerHTML = "<div>hello</div>";
}
