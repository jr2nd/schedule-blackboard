//initialize date
const staged = [];
const weeklySchedule = document.querySelector("#weeklySchedule");

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
//btnShowMembers visible on small screen
const btnShowMembers = document.querySelector("#btnShowMembers");
//
//select the item. If it is already on the schedule then filter it
function selectItem() {
  //remove filter from previously filtered items
  const filteredMembers = document.querySelectorAll(".filterMember");
  for (let i = 0; i < filteredMembers.length; i++) {
    filteredMembers[i].classList.remove("filterMember");
  }
  const filteredFacilities = document.querySelectorAll(".filterFacility");
  for (let i = 0; i < filteredFacilities.length; i++) {
    filteredFacilities[i].classList.remove("filterFacility");
  }
  //deselect previously selected items
  const selected = document.querySelector("#selected");
  if (selected != null) selected.removeAttribute("id");
  //then mark the currently selected item
  this.setAttribute("id", "selected");
  //if item is a member then highlight them on the schedule
  if (this.classList.contains("members")) {
    const filteredItems = document.querySelectorAll(".assignedMember");
    for (let i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i].innerText === this.innerText) {
        filteredItems[i].classList.add("filterMember");
        this.classList.add("filteredItem");
      }
    } //for
  }
  //if item is a facility then highlight it on the schedule
  if (this.classList.contains("addedFacility")) {
    const filteredItems = document.querySelectorAll(".assignedFacility");
    for (let i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i].innerText === this.innerText) {
        // filteredItems[i].parentElement.classList.add("filterFacility");
        if (filteredItems[i].classList.contains("amFacility")) {
          amFacilities[0].classList.add("filteredItem");
        }
        if (filteredItems[i].classList.contains("pmFacility")) {
          pmFacilities[0].classList.add("filteredItem");
        }
      }
      this.classList.add("filteredItem");
    } //for
  }
} //selectItem()
function addFacilityToTeam() {
  const selected = document.querySelector("#selected");
  if (!selected) return;
  if (!selected.classList.contains("facilities")) return;
  selected.removeAttribute("id");
  selected.classList.remove("addedFacility");
  //Either remove filtered facility...
  if (selected.classList.contains("filteredItem")) {
    selected.classList.remove("filteredItem");
    if (this.classList.contains("amFacilities")) {
      for (let i = 0; i < amFacilityList[0].children.length; i++) {
        if (amFacilityList[0].children[i].innerText === selected.innerText) {
          amFacilityList[0].children[i].remove();
          selected.classList.remove("addedFacility");
          amFacilities[0].classList.remove("filteredItem");
          pmFacilities[0].classList.remove("filteredItem");
          return;
        }
      }
    }
    if (this.classList.contains("pmFacilities")) {
      for (let i = 0; i < pmFacilityList[0].children.length; i++) {
        if (pmFacilityList[0].children[i].innerText === selected.innerText)
          pmFacilityList[0].children[i].remove();
        return;
      }
    }
  }
  //...or add selected facility
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
  amFacilities[0].classList.remove("filteredItem");
  pmFacilities[0].classList.remove("filteredItem");
} //addFacilityToTeam()
function addMemberToTeam() {
  const selected = document.querySelector("#selected");
  if (!selected) return;
  if (!selected.classList.contains("members")) return;
  if (
    selected.classList.contains("amAssigned") &&
    this.classList.contains("amFacility")
  )
    return;
  if (
    selected.classList.contains("pmAssigned") &&
    this.classList.contains("pmFacility")
  )
    return;
  selected.removeAttribute("id");
  const addedMember = selected.cloneNode(true);
  addedMember.classList.remove("amAssigned");
  addedMember.classList.remove("pmAssigned");
  addedMember.classList.add("assignedMember");
  this.appendChild(addedMember);
  if (this.classList.contains("amFacility"))
    selected.classList.add("amAssigned");
  if (this.classList.contains("pmFacility"))
    selected.classList.add("pmAssigned");
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
  populateTeams();
}
function goToNextDay() {
  let nextDay = today.getDate() + 1;
  today.setDate(nextDay);
  displayDate[0].innerText = today.toDateString();
  populateTeams();
}
function goToPrevWeek() {
  let lastMonday = today.getDate() - today.getDay() - 6;
  today.setDate(lastMonday);
  displayDate[0].innerText = today.toDateString();
  populateTeams();
}
function goToNextWeek() {
  let nextMonday = today.getDate() - today.getDay() + 8;
  today.setDate(nextMonday);
  displayDate[0].innerText = today.toDateString();
  populateTeams();
}
function stage() {
  const cloneTeams = teams.cloneNode(true);
  const cloneDate = displayDate[0].cloneNode(true);
  cloneTeams.appendChild(cloneDate);
  cloneTeams.classList.add("col");
  cloneTeams.classList.add("weeklySchedule");
  cloneTeams.classList.add("staged");
  cloneTeams.removeAttribute("id");
  const assignedMembers = cloneTeams.querySelectorAll(".assignedMember");
  for (let i = 0; i < assignedMembers.length; i++) {
    assignedMembers[i].classList.remove("filterMember");
  }
  const assignedFacilities = cloneTeams.querySelectorAll(".assignedFacility");
  for (let i = 0; i < assignedFacilities.length; i++) {
    assignedFacilities[i].classList.remove("filterFacility");
  }
  //
  //if no staged schedules...
  if (displayDate.length === 1) {
    weeklySchedule.appendChild(cloneTeams);
    staged.push(cloneTeams);
  } else {
    // ...else insert schedule chronologically
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
      //append schedule to end of weeklySchedule
      weeklySchedule.appendChild(cloneTeams);
    } //for()
  } //else
  //add one to date in working schedule
  let nextDay = today.getDate() + 1;
  today.setDate(nextDay);
  displayDate[0].innerText = today.toDateString();
}
//
// initializeFakeDatabase();//debug
function toggleLists() {
  facilityList.classList.toggle("hidden");
  memberList.classList.toggle("hidden");
  if (facilityList.classList.contains("hidden"))
    btnShowMembers.innerText = "Show Facilities";
  if (memberList.classList.contains("hidden"))
    btnShowMembers.innerText = "Show Members";
}
const btnPostSchedule = document.querySelector("#btnPostSchedule");
const finalSchedule = document.querySelector("#finalSchedule");
btnPostSchedule.addEventListener("submit", postSchedule);
function postSchedule(e) {
  e.preventDefault();
  finalSchedule.innerHTML = "<div>hello</div>";
}
function populateTeams() {
  // for(let i = 0; i < teams.length; i++) {
  // }
}
