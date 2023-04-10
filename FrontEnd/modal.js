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
    console.log(worksForModal)
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".box-cross-icon").addEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
    removeElementSelector();
}

export const closeModal = function (e){
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".box-cross-icon").removeEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation);
    document.querySelector(".modal").innerHTML = "";
    /*modal.querySelector(".modal-wrapper").remove();*/
    /*modal.querySelectorAll("figure").forEach(figure => {
        figure.remove();    });*/
    modal = null;
    
}

export const stopPropagation = function (e) {
    e.stopPropagation();
}


/*     suppression  travaux   */

export const removeElementSelector = function() {
    document.querySelectorAll('.button-delete-works').forEach(button => {
    button.addEventListener("click", deleteWorks) 
})}

export const deleteWorks = function (e) {
    e.preventDefault();
    const target = e.target;
    const idTargetModal = target.dataset.id
    const idTarget = document.getElementById(idTargetModal);
    console.log(target);
    console.log(target.parentNode.parentNode);  /*a changer en rajoutant une donnée sur la balise du gd parent figure pour l'identifier et la supprimer sans utiliser parentNode*/
    console.log(idTargetModal);
    console.log(idTarget);
    target.parentNode.parentNode.remove();
    idTarget.remove();
    /*
    const options ={
        method: "DELETE",
        headers: {"content-Type": "application/json"}
    }
    fetch(`http://localhost:5678/api/works/${idTargetModal}`, options)
        .then(res => {
            if (res.ok){
                alert("travaux supprimés")
                alert(res.statut)
                target.parentNode.parentNode.remove();
                idTarget.remove();
            }
        .catch(error =>{
            alert(error)
        })
    })
    */
}    

/* création formulaire ajout projet  */

const addForm = function () {
    document.querySelector('.button-add-picture').addEventListener('click', createForm)
}

function modalAdPictureGenerate () {
    const boxModal = document.querySelector(".modal");
    const divModal2 = document.createElement("div");
    divModal2.classList.add("modal-addPicture");

    const buttonReturn = document.createElement("button");
    buttonReturn.classList.add("box-return-icon");
    const buttonCross = document.createElement("button");
    buttonCross.classList.add("box-cross-icon");
    const buttonIconCross = document.createElement("i");
    buttonIconCross.classList.add("fa-solid");
    buttonIconCross.classList.add("fa-xmark");
    buttonIconCross.classList.add("cross-icon");
    const titleModal2 = document.createElement("h2");
    titleModal2.id = "tittlemodal";
    titleModal2.classList.add("title-modal");
    titleModal2.innerText = "Ajout photo";
    const divAddPicture = document.createElement("div");
    divAddPicture.classList.add("div-add-picture");
    const divIconImage = document.createElement("i");
    divIconImage.classList.add("fa-light");
    divIconImage.classList.add("fa-image");
    divIconImage.classList.add("icon-image");
    const divButtonAdd = document.createElement("button");  /* A changer par input file */
    divButtonAdd.classList.add("modal2-button-add-picture");
    divButtonAdd.innerText = "+ Ajouter photo"
    const divParagraphAddPicture = document.createElement("p");
    divParagraphAddPicture.classList.add("paragraph-add-picture");
    divParagraphAddPicture.innerText = "jpg, png : 4mo max"
    const modal2Form = document.createElement("form");
    modal2Form.classList.add("form-modal-add-picture");
    const formParagraphTitle = document.createElement("p");
    formParagraphTitle.classList.add("form-paragraph-title");
    const formParagraphTitleLabel = document.createElement("label");
    formParagraphTitleLabel.for = "title"
    formParagraphTitleLabel.classList.add("modal-form-label");
    const formParagraphTitleInput = document.createElement("input");
    formParagraphTitleInput.type = "text";
    formParagraphTitleInput.name = "title";
    formParagraphTitleInput.id = "title";
    formParagraphTitleInput.required = "required";
    formParagraphTitleInput.classList.add("modal-form-input");
    const formParagraphCategory = document.createElement("p");
    formParagraphCategory.classList.add("form-paragraph-category");
    const formParagraphCategoryLabel = document.createElement("label");
    formParagraphCategoryLabel.for = "category";
    formParagraphCategoryLabel.classList.add("modal-form-label");
    const formParagraphCategorySelect = document.createElement("select");
    formParagraphCategorySelect.name = "category";
    formParagraphCategorySelect.id = "category";
    formParagraphCategorySelect.required = "required"
    formParagraphCategorySelect.classList.add("form-select")
    const formParagraphCategorySelectoption1 = document.createElement("option");
    formParagraphCategorySelectoption1.value = "Objets";
    formParagraphCategorySelectoption1.innerText = "Objets";
    const formParagraphCategorySelectoption2 = document.createElement("option");
    formParagraphCategorySelectoption2.value = "Appartements";
    formParagraphCategorySelectoption2.innerText = "Appartements";
    const formParagraphCategorySelectoption3 = document.createElement("option");
    formParagraphCategorySelectoption3.value = "Hotels & restaurants";
    formParagraphCategorySelectoption3.innerText = "Hotels & restaurants";
    const formButtonValid = document.createElement("button");
    formButtonValid.classList.add("modal2-form-button-valid");
    formButtonValid.innerText = "Valider";




    boxModal.appendChild(divModal2);
    divModal2.appendChild(buttonCross);
    divModal2.appendChild(buttonReturn);
    buttonCross.appendChild(buttonIconCross);
    divModal2.appendChild(titleModal2);
    divModal2.appendChild(divAddPicture);
    divAddPicture.appendChild(divIconImage);
    divAddPicture.appendChild(divButtonAdd);
    divAddPicture.appendChild(divParagraphAddPicture);
    divModal2.appendChild(modal2Form);
    modal2Form.appendChild(formParagraphTitle);
    formParagraphTitle.appendChild(formParagraphTitleLabel);
    formParagraphTitle.appendChild(formParagraphTitleInput);
    modal2Form.appendChild(formParagraphCategory);
    formParagraphCategory.appendChild(formParagraphCategoryLabel);
    formParagraphCategory.appendChild(formParagraphCategorySelect);
    formParagraphCategorySelect.appendChild(formParagraphCategorySelectoption1)
    formParagraphCategorySelect.appendChild(formParagraphCategorySelectoption2);
    formParagraphCategorySelect.appendChild(formParagraphCategorySelectoption3);
    modal2Form.appendChild(formButtonValid);
}

const createForm = function (e) {
    e.preventDefault;
    document.querySelector(".modal").innerHTML = ""; /* creer un autre aside ou changer la classe */
    modalAdPictureGenerate();

    /* hidden alise modal1 et null pour modal2 
    ajouter hidden à moddal wrapper et null lors de l'ouverture de la modale
    creer modale 2 */
}

