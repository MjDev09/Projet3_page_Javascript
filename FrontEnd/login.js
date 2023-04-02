function testUser() {  

    const buttonConnect = document.querySelector(".form-login");
    buttonConnect.addEventListener("submit", async function(event) {
        event.preventDefault();
        const identifier = {
            email: event.target.querySelector("[name=email]").value, 
            password: event.target.querySelector("[name=password]").value,
        }
        
        const payload = JSON.stringify(identifier);
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: payload
        })
        
            if (response.status == 200) {
                const objectResponse = await response.json();
                console.log(objectResponse);
                let arrayResponse = [];    
                arrayResponse.push(objectResponse);
                const token = arrayResponse.map (obj => obj.token);
                window.localStorage.setItem("token", JSON.stringify(token));
                location.replace('http://127.0.0.1:5500/FrontEnd/index.html');}

            else {
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
    })
}
 
testUser();