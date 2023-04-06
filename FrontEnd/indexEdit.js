
export function createEditButton (){
    /*const divBody = document.querySelector("body");*/     /* création div au dessus header contenant édition*/
    /*const divEdit = document.createElement("div");
    divEdit.classList.add("header-edit-box");
    divBody.appendChild(divEdit);
    
    const divHeaderEditBox = document.querySelector(".header-edit-box");*/ /* création paragraphe 1 de la div aussus du header*/
    const divEditMod = document.querySelector(".header-edit-mod")
    const divParagraph = document.createElement("p");
    divParagraph.classList.add("header-paragraph");
    /*divHeaderEditBox*/divEditMod.appendChild(divParagraph);
    
    const paragraph = document.querySelector(".header-paragraph")
    const editImage = document.createElement("i");
    editImage.classList.add("fa-regular");
    editImage.classList.add("fa-pen-to-square");
    paragraph.appendChild(editImage);

    const editButton = document.createElement("button");
    editButton.innerText = "Mode édition";
    editButton.classList.add("button-edit-mod");
    paragraph.appendChild(editButton);

    const editButtonPublish = document.createElement("button");
    editButtonPublish.innerText = "publier les changements"
    editButtonPublish.classList.add("button-edit-publish");
    /*divHeaderEditBox*/divEditMod.appendChild(editButtonPublish);

    const figureEdit = document.querySelector("figure");    /*  création bouton modifier sous photo  */
    const figureParagraph = document.createElement("p");
    figureParagraph.classList.add("figure-paragraph");
    figureEdit.appendChild(figureParagraph);

    const figureParagraphEdit = document.querySelector(".figure-paragraph")
    const figureImage = document.createElement("i");
    figureImage.classList.add("fa-regular");
    figureImage.classList.add("fa-pen-to-square");
    figureParagraphEdit.appendChild(figureImage);

    const figureEditButton = document.createElement("button");
    figureEditButton.innerText = "modifier";
    figureEditButton.classList.add("figure-edit-button");
    figureParagraphEdit.appendChild(figureEditButton);
    

    /**/
    const articleEdit = document.querySelector("article");    /*  création bouton modifier à côté photo  */
    const articleParagraph = document.createElement("p");
    articleParagraph.classList.add("article-paragraph");
    articleEdit.prepend(articleParagraph);
    

    const articleParagraphEdit = document.querySelector(".article-paragraph")
    const articleImage = document.createElement("i");
    articleImage.classList.add("fa-regular");
    articleImage.classList.add("fa-pen-to-square");
    articleParagraphEdit.appendChild(articleImage);

    const articleEditButton = document.createElement("button");
    articleEditButton.innerText = "modifier";
    articleEditButton.classList.add("article-edit-button");
    articleParagraphEdit.appendChild(articleEditButton);

    const sectionPortfolio = document.querySelector("#portfolio");  /*   création bouton modifier à coté titre Mes Projets */
    const portfolioParagraph = document.createElement("a");
    
    portfolioParagraph.classList.add("portfolio-paragraph");
    sectionPortfolio.prepend(portfolioParagraph);

    const portfolioParagraphEdit = document.querySelector(".portfolio-paragraph")
    const portfolioImage = document.createElement("i");
    portfolioImage.classList.add("fa-regular");
    portfolioImage.classList.add("fa-pen-to-square");
    portfolioParagraphEdit.appendChild(portfolioImage);

    const portfolioEditButton = document.createElement("a");
    portfolioEditButton.innerText = "modifier";
    portfolioEditButton.href = "#fenetre-modal"
    portfolioEditButton.classList.add("portfolio-edit-button");
    portfolioParagraphEdit.appendChild(portfolioEditButton);

    document.querySelector(".button-box").style.display = "none";
    document.querySelector(".login").style.display = "none";
    document.querySelector(".logout").style.display = "list-item";
} 