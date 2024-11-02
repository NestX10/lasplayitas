// Carrusel existente
let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Mostrar la imagen en base al índice actual
function updateCarousel() {
    const offset = -currentIndex * 800;
    document.querySelector('.carousel').style.transform = `translateX(${offset}px)`;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Cookie Popup
document.addEventListener("DOMContentLoaded", function() {
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');

    if (!localStorage.getItem('cookiesAccepted')) {
        cookiePopup.style.display = 'block';
    }

    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', true);
        cookiePopup.style.display = 'none';
    });
});

// Funciones de suscripción y cancelación de suscripción
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
        const result = await response.json();
        if (result.status === "success") {
            alert("Te has suscrito exitosamente.");
        } else {
            alert("Hubo un problema con la suscripción.");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un problema al enviar la solicitud.");
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
        const result = await response.json();
        if (result.status === "success") {
            alert("Suscripción cancelada exitosamente.");
        } else {
            alert("Hubo un problema al cancelar la suscripción.");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un problema al enviar la solicitud.");
    }
}
