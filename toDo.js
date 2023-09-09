let submitDOM=document.querySelector("#liveToastBtn"); //butona eriştik
submitDOM.addEventListener("button",newElement);//event listener ekleyerek hangi fonksiyonun çağrılacağını belirledik.

function newElement(){  
    const TXT=document.querySelector("#task"); //inputa eriştik
    const text= TXT.value.trim();
    if(text==""){
        alert("Lütfen Bir Şeyler Yazınız!");
        return;
    }

    addItem(TXT.value);//input içindeki değeri fonksiyonda çağırdık
    TXT.value=""; // Ekleme yaptıktan sonra value yu temizledik
    
    addToLocalStorage(text);
}


let li=document.querySelector("#list");  // listemize eriştik ki ekleme yapabilelim

function addItem(text) {
    let liDOM = document.createElement("li"); // Yeni bir <li> öğesi 

    // Çarpı işareti (kapatma düğmesi) için <span> 
    let deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.textContent = "x"; 

    // Metni ve çarpı işaretini <li> öğesine ekle
    liDOM.appendChild(deleteIcon);
    liDOM.appendChild(document.createTextNode(text)); // Metni ekle

    li.appendChild(liDOM); // <li> öğesini ana liste olan <ul> içine ekle
}



function loadItemsFromLocalStorage(){
    const storedItems=JSON.parse(localStorage.getItem("items")) || [];
    for(let i=0; i<storedItems.length;i++){
        addItem(storedItems[i]);
    }
}

function addToLocalStorage(text){
    const storedItems=JSON.parse(localStorage.getItem("items")) || [];
    storedItems.push(text);
    localStorage.setItem("items", JSON.stringify(storedItems));
}

document.addEventListener("DOMContentLoaded", function(){
    loadItemsFromLocalStorage();
})

var input=document.querySelector("#task");
input.addEventListener("keypress", function (e) { //enter a basıldığında fonksiyonu çağırıyoruz
    if (e.key == "Enter") {
        newElement();
    }
}
)


//remove

function removeFromLocalStorage(text) {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const index = storedItems.indexOf(text);
    if (index !== -1) {
        storedItems.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(storedItems));
    }
}

document.querySelector("#list").addEventListener("click", function(event){
    if(event.target.classList.contains("delete-icon")){
        const listItem = event.target.parentElement;
        const text = listItem.textContent.trim();
        removeFromLocalStorage(text); // Local Storage'dan da sil
        listItem.remove(); // Ul'den sil
    }
})

document.querySelector("#list").addEventListener("click", function(event){
    if(event.target.tagName=="LI"){
        const listItem=event.target;
        listItem.classList.toggle("completed");
    }
});