/*   recuperer travaux à l'ouverture de la modale  */
/*  une seule modale vérifier création variable à l'ouverture  */
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
        const divIcon = document.createElement("div");
        divIcon.classList.add("div-icon");
        const iconCross = document.createElement("i");
        iconCross.classList.add("fa-solid");
        iconCross.classList.add("fa-trash-can");
        iconCross.classList.add("fa-xs");
        iconCross.classList.add("icon-cross");
        const tittleEdit = document.createElement("figcaption");
        tittleEdit.innerText = "éditer";
        tittleEdit.classList.add("tittle-edit");
        

        divGalleryEdit.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(divIcon);
        divIcon.appendChild(iconCross);
        workElement.appendChild(tittleEdit);
    }

}

export function editGaleriePhoto(){        /* insérer fonction dans la page javascript indexEdit à la création du bouton ? condition non écessaire si intégré ds condition token */
    if (document.querySelector(".portfolio-edit-button") != null) {

        const buttonModify = document.querySelector(".portfolio-edit-button")
        buttonModify.addEventListener("click", async function() {
            /* chgmt display de la modale  */
            const travaux = await fetch("http://localhost:5678/api/works");
            const modalWorks = await travaux.json();
            const setModalWorks = new Set(modalWorks);
            const worksForModal = [...setModalWorks];
            document.querySelector(".modal").style.display = "flex";
            modaleGenerateWorks(worksForModal);
        })
    }
}