 /* générateur balises modales   */



/*    générateur travaux     */
export function modaleGenerateWorks(works){

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

/*  ouverture moale */
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
    modal.querySelectorAll("figure").forEach(figure => {
        figure.remove();    });
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
    const idTarget = target.dataset.id
    console.log(target);
    console.log(target.parentNode.parentNode);
    console.log(idTarget);
    target.parentNode.parentNode.remove();
    /*
    const options ={
        method: "DELETE",
        headers: {"content-Type": "application/json"}
    }
    fetch(`http://localhost:5678/api/works/${idTarget}`, options)
        .then(res => {
            if (res.ok){
                alert("travaux supprimés")
            }
        .catch(error =>{
            alert(error)
        })
    })
    */
}    