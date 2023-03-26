const recoverWorks = await fetch("http://localhost:5678/api/works");
const works = await recoverWorks.json();
const setWorks = new Set(works);
console.log(setWorks);                  /*  A suprimmer  */
console.log([...setWorks]);                /*  A suprimmer  */
const worksOne = [...setWorks];
console.log(worksOne);


function generateWorks(works){
    for (let i in works){
        
        const work = works[i];
        const divGallery = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
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

const buttonItems = document.querySelector(".btn-items");
buttonItems.addEventListener("click", function () {
    const itemsWorks = works.filter(function (work) {
        return work.categoryId == 1;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(itemsWorks);
});

const buttonApartment = document.querySelector(".btn-apartment");
buttonApartment.addEventListener("click", function () {
    const apartmentWorks = works.filter(function (work) {
        return work.categoryId == 2;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(apartmentWorks);
});

const buttonHotel = document.querySelector(".btn-hotel");
buttonHotel.addEventListener("click", function () {
    const hotelWorks = works.filter(function (work) {
        return work.categoryId == 3;
    });

    document.querySelector(".gallery").innerHTML = "";
    generateWorks(hotelWorks);
});


/** connexion */

function testUser() {  

const buttonConnect = document.querySelector(".form-button-validation");
buttonConnect.addEventListener("submit", function() {
    const identifier = {
        email: e.target.querySelector("[name=email]"), value,
        password: e.target.querySelector("[name=password]"), value,
    }
    const payload = JSON.stringify(identifier);
    const idresponse = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: payload
    })
        .then(Response => {
            if (Response.status != 200) {
                
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
            else {
                const token = Response.json();
                windows.localStorage.setItem("token", JSON.stringify(token) );
                location.replace('http://127.0.0.1:5500/FrontEnd/index.html');
                /**  changement de page */
                /** récupération et stockage token */
                    
            }
        })
        .catch(error => {} 
        )
    })

}

testUser();