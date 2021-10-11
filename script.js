/*
class employee {
  constructor(name){
this.name = name;
this.age=prompt("age");
//this.status = "active";
//this.time = prompt("part time or full time");
//this.position = prompt('clerk, swabber or lead')
  } 
}
e1234 = new employee();
*/
let fakeDatabase = [
  'Adria',
  'Braylen',
  'Caridad',
  'Deshawn',
  'Emery',
  'Foster',
  'Gemma',
  'Heath',
  'Isla',
  'Jacobus',
  'Kenzie',
  'Lucio',
  'Makayla',
  'Nolan',
  'Orlanda',
  'Pax',
  'Ronin',
  'Sophie',
  'Tayshaun',
  'Viviana',
  'Will'
];
let memberList = document.querySelector('#member-list');
let teams = document.querySelectorAll('.teams')
for (let i = 0; i < fakeDatabase.length; i++) {
  memberList.innerHTML += `<div id="member${i}" class="members">${fakeDatabase[i]}</div>`;
}
let members = document.querySelectorAll('.members')
for(let i = 0;i < members.length; i++) {
  members[i].addEventListener('click', selectMember)
}
for(let i = 0; i < teams.length; i++) {
teams[i].addEventListener('click', addMemberToTeam)
}


function selectMember() {
  for(let i = 0; i < members.length; i++){
members[i].removeAttribute('id')
  }
  this.setAttribute('id', 'selected')
}
function addMemberToTeam() {
  let selected= document.querySelector('#selected')
  if(selected === null)return; 
this.append(selected)
selected.removeAttribute("id")
}