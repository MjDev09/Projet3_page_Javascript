 /* générateur balises modales   */



/*    générateur travaux     */
export function modaleGenerateWorks(works){
    const boxModal = document.querySelector(".modal");
    const divModal1 = document.createElement("div");
    divModal1.classList.add("modal-wrapper");

    
    const buttonCross = document.createElement("button");
    buttonCross.classList.add("box-cross-icon");
    
    const buttonIconCross = document.createElement("i");
    buttonIconCross.classList.add("fa-solid");
    buttonIconCross.classList.add("fa-xmark");
    buttonIconCross.classList.add("cross-icon");
    buttonIconCross.classList.add("fa-lg");
    const titleModal1 = document.createElement("h2");
    titleModal1.id = "tittlemodal";
    titleModal1.classList.add("title-modal");
    titleModal1.innerText = "Galerie Photo";
    const divGalleryGrid = document.createElement("div");
    divGalleryGrid.classList.add("gallery-edit");
    const buttonAddpicture = document.createElement("button");
    buttonAddpicture.classList.add("button-add-picture");
    buttonAddpicture.innerText = "Ajouter une photo";
    const buttonDeleteGallery = document.createElement("button");
    buttonDeleteGallery.classList.add("delete-gallery");
    buttonDeleteGallery.innerText = "Supprimer la galerie";


    boxModal.appendChild(divModal1);
    const divSelectModal1 = document.querySelector(".modal-wrapper");
    divSelectModal1.appendChild(buttonCross);
    const SelectButtonCross = document.querySelector(".box-cross-icon");
    SelectButtonCross.appendChild(buttonIconCross);
    divSelectModal1.appendChild(titleModal1);
    divSelectModal1.appendChild(divGalleryGrid);
    divSelectModal1.appendChild(buttonAddpicture);
    divSelectModal1.appendChild(buttonDeleteGallery);

    for (let i in works){
        const work = works[i];

        const divGalleryEdit = document.querySelector(".gallery-edit");
        const workElement = document.createElement("figure");
        workElement.classList.add("modal-box-picture")
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        workImage.classList.add("grid-picture");
        const buttonIcon = document.createElement("div");
        buttonIcon.classList.add("button-delete-works");
        const iconCross = document.createElement("i");
        iconCross.classList.add("fa-solid");
        iconCross.classList.add("fa-trash-can");
        iconCross.classList.add("fa-xs");
        iconCross.classList.add("icon-cross");
        iconCross.dataset.id = work.id;  /*  ou id */
        const tittleEdit = document.createElement("figcaption");
        tittleEdit.innerText = "éditer";
        tittleEdit.classList.add("tittle-edit");
        

        divGalleryEdit.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(buttonIcon);
        buttonIcon.appendChild(iconCross);
        workElement.appendChild(tittleEdit);
    }

}

/*  ouverture modale */
export let modal = null;
export async function editGaleriePhoto(){        /* insérer fonction dans la page javascript indexEdit à la création du bouton ?*/
        const buttonModify = document.querySelector(".portfolio-edit-button");
        buttonModify.addEventListener("click", openModal)
    
}
 
export const openModal = async function (e) {
    e.preventDefault();
    const travaux = await fetch("http://localhost:5678/api/works");
    const modalWorks = await travaux.json();
    const setModalWorks = new Set(modalWorks);
    const worksForModal = [...setModalWorks];
    

    modaleGenerateWorks(worksForModal);
    console.log(worksForModal);
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    document.querySelectorAll('.button-delete-works').forEach(div => {
        div.addEventListener("click", deleteWorks) 
    })
    modal.addEventListener("click", closeModal);
    modal.querySelector(".box-cross-icon").addEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
    modal.querySelector(".button-add-picture").addEventListener("click", createForm);
}

export const closeModal = function (event){
    if (modal === null) return;
    event.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".box-cross-icon").removeEventListener("click", closeModal)
    document.querySelectorAll('.button-delete-works').forEach(div => {
        div.removeEventListener("click", deleteWorks) 
    })
    modal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation);
    modal.querySelector(".button-add-picture").removeEventListener('click', createForm);
    
    if (modal.querySelector(".modal-add-picture") != null) {
        modal.querySelector(".modal-add-picture").removeEventListener("click", stopPropagation);
        
    }
    
    document.querySelector(".modal").innerHTML = "";
    modal = null;
    
}

export const stopPropagation = function (e) {
    e.stopPropagation();
}


/*     suppression  travaux   */


export const deleteWorks = function (event) {
    event.preventDefault();
    const target = event.target;
    const idTargetModal = target.dataset.id
    const idTarget = document.getElementById(idTargetModal);
    console.log(target);
    console.log(target.parentNode.parentNode);  /*a changer en rajoutant une donnée sur la balise du gd parent figure pour l'identifier et la supprimer sans utiliser parentNode*/
    console.log(idTargetModal);
    console.log(idTarget);
    
    const getToken = window.localStorage.getItem("token")
    const arrayToken = JSON.parse(getToken);
    const stringToken = arrayToken.toString();
    const bearer = 'Bearer ' + stringToken;

    const options ={
        method: "DELETE",
        headers: {"content-Type": "application/json"},
        headers: {"Authorization": bearer}
    }
    fetch(`http://localhost:5678/api/works/${idTargetModal}`, options)
        .then(res => {
            if (res.ok){
                /*alert("travaux supprimés");*/
                target.parentNode.parentNode.remove();
                idTarget.remove();
            }})
        .catch(error =>{
            alert(error)
        })
    }
    
   

/* création formulaire ajout projet  */
export function generateOptionSelect(categories){
    const formParagraphCategorySelectoption0 = document.createElement("option");
    formParagraphCategorySelectoption0.value = "";
    const formParagraphCategorySelect = document.querySelector(".form-select");
    formParagraphCategorySelect.appendChild(formParagraphCategorySelectoption0);
    for (let i in categories){
        const category = categories[i];
        const formParagraphCategorySelectoption = document.createElement("option");
        formParagraphCategorySelectoption.value = category.id;
        formParagraphCategorySelectoption.innerText = category.name;
        formParagraphCategorySelect.appendChild(formParagraphCategorySelectoption);
    }
}

    


export async function modalAdPictureGenerate () {
    const boxModal = document.querySelector(".modal");
    const divModal2 = document.createElement("div");
    divModal2.classList.add("modal-add-picture");

    const buttonReturn = document.createElement("button");
    buttonReturn.classList.add("box-return-icon");
    const buttonIconReturn = document.createElement("i");
    buttonIconReturn.classList.add("fa-solid");
    buttonIconReturn.classList.add("fa-arrow-left-long");
    buttonIconReturn.classList.add("fa-lg");
    buttonIconReturn.classList.add("return-icon");
    const buttonCross = document.createElement("button");
    buttonCross.classList.add("box-cross-icon2", "box-cross-icon");
    const buttonIconCross = document.createElement("i");
    buttonIconCross.classList.add("fa-solid");
    buttonIconCross.classList.add("fa-xmark");
    buttonIconCross.classList.add("fa-lg");
    buttonIconCross.classList.add("cross-icon");
    const titleModal2 = document.createElement("h2");
    titleModal2.id = "tittlemodal";
    titleModal2.classList.add("title-modal");
    titleModal2.innerText = "Ajout photo";
    const divAddPicture = document.createElement("div");
    divAddPicture.classList.add("div-add-picture");
    const divIconImage = document.createElement("i");
    divIconImage.classList.add("fa-solid");
    divIconImage.classList.add("fa-image");
    divIconImage.classList.add("fa-4x");
    divIconImage.classList.add("icon-image");
    const divAddPictureLabelInput = document.createElement("div");
    divAddPictureLabelInput.classList.add("div-add-picture-label-input");
    const divLabel = document.createElement("label");
    divLabel.htmlFor = "addPicture";
    divLabel.innerText = "+ Ajouter photo";
    divLabel.classList.add("div-label");
    const divInputAdd = document.createElement("input");
    divInputAdd.type = "file";
    divInputAdd.classList.add("modal2-input-add-picture");
    divInputAdd.id = "addPicture";
    divInputAdd.name = "addPicture";
    divInputAdd.accept = "image/png, image/jpeg";
    divInputAdd.required = "required";
    const divParagraphAddPicture = document.createElement("p");
    divParagraphAddPicture.classList.add("paragraph-add-picture");
    divParagraphAddPicture.innerText = "jpg, png : 4mo max"
    const modal2Form = document.createElement("form");
    modal2Form.classList.add("form-modal-add-picture");
    const formParagraphTitle = document.createElement("p");
    formParagraphTitle.classList.add("form-paragraph-title");
    const formParagraphTitleLabel = document.createElement("label");
    formParagraphTitleLabel.for = "title";
    formParagraphTitleLabel.innerText = "Titre";
    formParagraphTitleLabel.classList.add("modal-form-label");
    const formParagraphTitleInput = document.createElement("input");
    formParagraphTitleInput.type = "text";
    formParagraphTitleInput.name = "title";
    formParagraphTitleInput.id = "title";
    formParagraphTitleInput.required = "required";
    formParagraphTitleInput.classList.add("modal-form-input", "elementForm");
    const formParagraphCategory = document.createElement("p");
    formParagraphCategory.classList.add("form-paragraph-category");
    const formParagraphCategoryLabel = document.createElement("label");
    formParagraphCategoryLabel.for = "category";
    formParagraphCategoryLabel.innerText ="Catégorie";
    formParagraphCategoryLabel.classList.add("modal-form-label");
    const formParagraphCategorySelect = document.createElement("select");
    formParagraphCategorySelect.name = "category";
    formParagraphCategorySelect.id = "category";
    formParagraphCategorySelect.required = "required";
    formParagraphCategorySelect.classList.add("form-select", "elementForm");

    boxModal.appendChild(divModal2);
    divModal2.appendChild(buttonReturn);
    buttonReturn.appendChild(buttonIconReturn);
    divModal2.appendChild(buttonCross);
    buttonCross.appendChild(buttonIconCross);
    divModal2.appendChild(titleModal2);
    modal2Form.appendChild(divAddPicture);
    divAddPicture.appendChild(divIconImage);
    divAddPicture.appendChild(divAddPictureLabelInput);
    divAddPictureLabelInput.appendChild(divLabel);
    divAddPictureLabelInput.appendChild(divInputAdd);
    divAddPictureLabelInput.appendChild(divParagraphAddPicture);
    divModal2.appendChild(modal2Form);
    modal2Form.appendChild(formParagraphTitle);
    formParagraphTitle.appendChild(formParagraphTitleLabel);
    formParagraphTitle.appendChild(formParagraphTitleInput);
    modal2Form.appendChild(formParagraphCategory);
    formParagraphCategory.appendChild(formParagraphCategoryLabel);
    formParagraphCategory.appendChild(formParagraphCategorySelect);
    const formButtonValid = document.createElement("button");
    formButtonValid.type = "button";
    formButtonValid.classList.add("modal2-form-button-valid");
    formButtonValid.innerText = "Valider";
    modal2Form.appendChild(formButtonValid);
    
    const recoverCategory = await fetch("http://localhost:5678/api/categories");
    const dataCategory = await recoverCategory.json();
    generateOptionSelect(dataCategory);
    
}

export const createForm = function (e) {
    e.preventDefault;
    document.querySelector(".modal-wrapper").style.display = "none"; 
    modalAdPictureGenerate();
    document.querySelector(".modal-add-picture").addEventListener("click", stopPropagation);
    document.querySelector(".box-cross-icon2").addEventListener("click", closeModal);
    document.querySelector(".box-return-icon").addEventListener("click", returnGalleryEdit);
    document.querySelector(".modal2-input-add-picture").addEventListener("change", updateImageDisplay);
    document.querySelector(".modal2-form-button-valid").addEventListener("click", sendDataForm);
    document.querySelectorAll('.elementForm').forEach( element => {
        element.addEventListener('change', () => {
            if (document.querySelector(".image-insight-add").value !== '' && document.querySelector(".modal-form-input").value !== '' && document.querySelector(".form-select").value !== ''){
                document.querySelector(".modal2-form-button-valid").style.background = "#1D6154"
            }
          });
    })
}

export const returnGalleryEdit = function (e){
    e.preventDefault; 
    document.querySelector(".modal-wrapper").style.display = "flex";
    document.querySelector(".box-cross-icon2").removeEventListener("click", closeModal);
    document.querySelector(".box-return-icon").removeEventListener("click", returnGalleryEdit);
    if (document.querySelector(".modal2-input-add-picture") != null){
    document.querySelector(".modal2-input-add-picture").removeEventListener("change", updateImageDisplay);
    }
    document.querySelector(".modal2-form-button-valid").removeEventListener("click", sendDataForm);
    document.querySelector(".modal-add-picture").innerHTML = "";
    document.querySelector(".modal-add-picture").remove();
   
    
}
export let imageFile = null
export const updateImageDisplay = function (){
    const divTarget = document.querySelector(".div-add-picture");
    const imageFileSelector = document.querySelector(".modal2-input-add-picture");
    let curFile = imageFileSelector.files[0] ;
    if (imageFileSelector.length !== 0){
        if (validFileType(curFile)){
            document.querySelector(".modal2-input-add-picture").removeEventListener("change", updateImageDisplay);
            divTarget.innerHTML = "";
            const paragraphImage = document.createElement("p");
            paragraphImage.classList.add("paragraph-image-insight", "elementForm");
            const imageInsight = document.createElement("img");
            imageInsight.src = window.URL.createObjectURL(curFile);
            imageInsight.classList.add("image-insight-add");
            console.log(curFile);
            console.log(curFile.type)
            divTarget.appendChild(paragraphImage);
            paragraphImage.appendChild(imageInsight);
            imageFile = curFile;
        }
        else {
            alert("le fichier n'est pas de type Jpg ou png")
            imageFile = null;
            console.log(curFile.type)
        }
    }
}   

export const filesAccept = [
    'image/jpg', 
    'image/jpeg',
    'image/png'
]
/*
const filePng = 'image/png';
const fileJpg = 'image/jpg';
const fileJpeg = 'image/jpeg';
const validFileType = function(file) {
    if(file.type === filePng || file.type === fileJpg || file.type === fileJpeg){
        return true;
    }
     return false;
}
*/
/*
const validFileType = function(file) {
    for (let i = 0; i < filesAccept.length; i++) {
        if (file.type === filesAccept[i]){
  
            return true;       
        }
    }

    return false;  
}
*/
export const validFileType = function(file) {
    for (let i in filesAccept) {
        if (file.type === filesAccept[i]){
            console.log(filesAccept[i]);
            return true;
        }
    }
    return false;   
} 

export const sendDataForm = async function (e) {
    /*  
        ajout au dom l'image si promise rempli
        */
    e.preventDefault();

    const imageData = imageFile;
    const titleData = document.querySelector(".modal-form-input").value;
    const categoryData = document.querySelector(".form-select").value;
    
    if ( categoryData === ""){
        alert("Merci de bien vouloir choisir une catégorie s'il vous plaît")
    }
        else if ( imageData === '' || titleData === ''){
            alert("Merci de bien vouloir remplir entièrement le formulaire")
        }
        else {
            const dataSend = new FormData();
            console.log(imageData);
            dataSend.append('title', titleData);
            dataSend.append('category', categoryData);
            dataSend.append('image', imageData);
            console.log(dataSend);
            console.log(dataSend.get('title'));
            console.log(dataSend.get('category'));
            console.log(dataSend.get('image'));
            const getToken = window.localStorage.getItem("token")
            const arrayToken = JSON.parse(getToken);
            const stringToken = arrayToken.toString();
            const bearer = 'Bearer '+ stringToken;
            console.log(bearer);
            const headers = new Headers({
                
                'Authorization': bearer
            })
            const option ={
                method: 'POST',
                headers: headers,
                body: dataSend
            }
            fetch ('http://localhost:5678/api/works', option)
                .then(function(){
                    
                    
                    /* ajout au dom  */
                    const selectorDivGallery = document.querySelector(".gallery");
                    const workElement = document.createElement("figure");
                    const workImage = document.createElement("img");
                    workImage.src = window.URL.createObjectURL(imageData);
                    workImage.alt = titleData;
                    const workTitle = document.createElement("figcaption");
                    workTitle.innerText = titleData;
                    selectorDivGallery.appendChild(workElement);
                    workElement.appendChild(workImage);
                    workElement.appendChild(workTitle);

                    const selectorDivGalleryModal = document.querySelector(".gallery-edit")
                    const workElementModal = document.createElement("figure");
                    workElementModal.classList.add("modal-box-picture")
                    const workImageModal = document.createElement("img");
                    workImageModal.src = window.URL.createObjectURL(imageData);
                    workImageModal.alt = titleData;
                    workImageModal.classList.add("grid-picture");
                    const buttonIcon = document.createElement("div");
                    buttonIcon.classList.add("button-delete-works");
                    const iconCross = document.createElement("i");
                    iconCross.classList.add("fa-solid");
                    iconCross.classList.add("fa-trash-can");
                    iconCross.classList.add("fa-xs");
                    iconCross.classList.add("icon-cross");
                    const tittleEdit = document.createElement("figcaption");
                    tittleEdit.innerText = "éditer";
                    tittleEdit.classList.add("tittle-edit");
                    selectorDivGalleryModal.appendChild(workElementModal);
                    workElementModal.appendChild(workImageModal);
                    workElementModal.appendChild(buttonIcon);
                    buttonIcon.appendChild(iconCross);
                    workElementModal.appendChild(tittleEdit);
                    returnGalleryEdit(e);
                })
                .catch(error => console.error(error));
            
        }         
};


/*  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('image', new Blob([file], { type: file.type }), file.name);
  formData.append('title', titleInput.value);
  formData.append('category', categoryInput.value);  */
/* https://developer.mozilla.org/en-US/docs/Web/API/Blob  */
