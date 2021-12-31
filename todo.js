let todoList = [];
let addList = document.querySelector(".add-list");
let close = document.querySelector(".close");
let itemObject;
let list;
let count = 0;

function newCard() {
    let blur = document.querySelector("#blur");
    blur.classList.toggle('active');
    let popup = document.querySelector(".pop-list");
    popup.classList.toggle('active');
    
}

function newItem() {
    let blur = document.querySelector("#blur");
    blur.classList.toggle('active');
    let popup = document.querySelector(".pop-item");
    popup.classList.toggle('active');
}

function addCard() {
    let inputItem = document.querySelector("#input-card");
    let cardSection = document.querySelector(".card-section");
    if (inputItem.value===""){
        window.alert("Entre un Title");
        return;
    }else{
     itemObject = {
        id: Date.now(),
        title: inputItem.value
    };
    todoList.push(itemObject);
    newCard();
    
    const cardContent = `<div class="card" id="${itemObject.id}">
    <div class="card-title" onclick="enlargeCard(event)">
        <p class="card-title-p" id="cardtitle">${itemObject.title}</p>
        <hr class = "hori">
    </div>
    <div class="list-container ">
        <ul class="list">
        </ul>
    </div>
    <div class="cardbutton">
    <div class="add-item icon" onclick="newItem(); cardSelection(event)"><i class="fas fa-plus-circle"></i></div>
    <div class="delete-card icon" onclick="removeCard(event)"><i class="fa fa-trash"
            aria-hidden="true"></i></div>
</div>
</div>`
    cardSection.innerHTML += cardContent; 
}
}

function enlargeCard(event){
    let cards = document.querySelectorAll(".card");
    let backbtn = document.querySelector(".backBtn");
    let cardhead = document.querySelector(".card-heading");
    let headtitle = document.querySelector(".head");
    let addlist = document.querySelector(".add-list");
    headtitle.classList.add("inactive");
    backbtn.classList.add("active");
    cardhead.classList.add("active");
    addlist.classList.add("inactive");
    cards.forEach(card=>{
        if(!(event.path[1].getAttribute("id")===card.getAttribute("id") ||event.path[2].getAttribute("id")===card.getAttribute("id"))){
            card.style.display="none";    
        }else{
            let cardtitle=card.childNodes[1].textContent;
            cardhead.innerHTML=`<p class="card-title">${cardtitle}</p>`;
        }
    })
}

function back(){
    let cards = document.querySelectorAll(".card");
    let backbtn = document.querySelector(".backBtn");
    let cardhead = document.querySelector(".card-heading");
    let headtitle = document.querySelector(".head");
    let addlist = document.querySelector(".add-list");
    headtitle.classList.remove("inactive");
    backbtn.classList.remove("active");
    cardhead.classList.remove("active");
    addlist.classList.remove("inactive");
    cards.forEach(card=>{
            card.style.display="initial";
    })
    cardhead.classList.remove("active");
    cardhead.innerHTML="";
}

function cardSelection(event) {
    let cardId = event.path[3].getAttribute("id");
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (card.getAttribute("id") === cardId) {
            list = card.getElementsByClassName("list")[0];
        }
    })
}

function addItem(listItem) {
    let inputListItem = document.querySelector("#input-item");
    let listItemObject;
    if (inputListItem.value===""){
        window.alert("Entre un list");
        return;
    }else{
    listItemObject = {
        id: count++,
        list: inputListItem.value
    }
    newItem();
    const listContent = `<li class="list-style" id="${listItemObject.id}">
                            <p class="list-items">${listItemObject.list}</p>
                            <div class="mark-done">
                                <p onclick="markDone(event)">Mark Done</p>
                            </div>
                        </li>`;
    listItem.innerHTML += listContent;
    }
}

function markDone(event){
    let listItem = event.path[2].getAttribute("id");
    let listItems = document.querySelectorAll(".list-style");
    listItems.forEach(list=>{
        if(list.getAttribute('id')===listItem){
            list.childNodes[3].style.display="none";
            list.style.color="red";
            list.style.textDecoration="line-through";
        }
    })
   
}

function removeCard(event) {
    let removeId = event.path[3].getAttribute("id");
    document.getElementById(removeId).remove();
}