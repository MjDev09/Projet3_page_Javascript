import { createEditButton } from "./indexEdit.js";
import { modaleGenerateWorks, namePrefix, editGaleriePhoto, modal, openModal, closeModal, stopPropagation, deleteWorks, modalAdPictureGenerate, generateOptionSelect, createForm, returnGalleryEdit, imageFile, updateImageDisplay, filesAccept, validFileType, sendDataForm } from "./modal.js"
const recoverWorks = await fetch("http://localhost:5678/api/works");
const works = await recoverWorks.json();
const setWorks = new Set(works);
const worksOne = [...setWorks];

               

const recoverButtons = await fetch("http://localhost:5678/api/categories");
const buttons = await recoverButtons.json();
/*console.log(buttons);*/
function generateButtons(Buttons){
        const divSelector = document.querySelector("#portfolio");
        const divButtonBox = document.createElement("div");
        divButtonBox.classList.add("button-box");
        divSelector.appendChild(divButtonBox);
        
        const divButton = document.querySelector(".button-box");
        const buttonAll = document.createElement("button");
        buttonAll.innerText = "Tous";
        buttonAll.classList.add("btn-appearance");
        buttonAll.classList.add("btn-all");
        divButton.appendChild(buttonAll);

    for (let i in Buttons){
        const button = Buttons[i];
        const divButtons = document.querySelector(".button-box");
        const buttonElement = document.createElement("button");
        buttonElement.innerText = button.name;
        buttonElement.classList.add("btn-appearance");
        buttonElement.classList.add(button.name.substring(0, 6));
        divButtons.appendChild(buttonElement);
    }
}

let token = window.localStorage.getItem('token');
generateButtons(buttons);
if (token != null) {
    createEditButton();
    editGaleriePhoto(worksOne); 
    /*const essai = JSON.parse(token);
    console.log(essai);
    console.log(essai.toString());*/
}


function generateWorks(works){
    for (let i in works){
        
        const work = works[i];
        const divGallery = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        workElement.id = work.id;
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        const workTitle = document.createElement("figcaption");
        workTitle.innerText = work.title;

        divGallery.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(workTitle);
    }
} 

generateWorks(worksOne);







/**  boutons  */
const buttonAll = document.querySelector(".btn-all");
buttonAll.addEventListener("click", function () {
    generateWorks(worksOne)
});

const buttonItems = document.querySelector(".Objets");
buttonItems.addEventListener("click", function () {
    const itemsWorks = works.filter(function (work) {
        return work.categoryId == 1;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(itemsWorks);
});

const buttonApartment = document.querySelector(".Appart");
buttonApartment.addEventListener("click", function () {
    const apartmentWorks = works.filter(function (work) {
        return work.categoryId == 2;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(apartmentWorks);
});

const buttonHotel = document.querySelector(".Hotels");
buttonHotel.addEventListener("click", function () {
    const hotelWorks = works.filter(function (work) {
        return work.categoryId == 3;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(hotelWorks);
});
