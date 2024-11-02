document.getElementById("subscriptionForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const scriptURL = "https://script.google.com/macros/s/AKfycbyawDS1myfcYWrdxIAbg0r-qLTfFkY790ZNpDaE2u0BNeXprUdvkrLtc1p7E0kKDY7d/exec";

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, action: "subscribe" })
        });

        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        if (result.status === "success") {
            alert("Te has suscrito exitosamente.");
        } else {
            alert("Hubo un problema con la suscripción.");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un problema al enviar la solicitud: " + error.message);
    }
});

async function cancelarSubscripcion() {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Por favor, ingresa tu correo para cancelar la suscripción.");
        return;
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycbyawDS1myfcYWrdxIAbg0r-qLTfFkY790ZNpDaE2u0BNeXprUdvkrLtc1p7E0kKDY7d/exec";

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, action: "unsubscribe" })
        });

        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        if (result.status === "success") {
            alert("Suscripción cancelada exitosamente.");
        } else {
            alert("Hubo un problema al cancelar la suscripción.");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un problema al enviar la solicitud: " + error.message);
    }
}
