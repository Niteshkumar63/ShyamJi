const faqButtons = document.querySelectorAll(".faq-btn");

faqButtons.forEach(button => {
    button.addEventListener("click", () => {

        const content =
        button.nextElementSibling;

        if(content.style.display === "block"){
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});







const track = document.querySelector(".slider-track");
const dotsContainer = document.querySelector(".slider-dots");

const originalCards =
[...document.querySelectorAll(".card")];

originalCards.forEach(card=>{
    track.appendChild(card.cloneNode(true));
});

let currentIndex = 0;
let autoSlide;

function getVisibleCards(){

    if(window.innerWidth <= 768){
        return 1;
    }

    if(window.innerWidth <= 992){
        return 2;
    }

    return 3;
}

function createDots(){

    dotsContainer.innerHTML = "";

    const totalDots =
    originalCards.length - getVisibleCards() + 1;

    for(let i=0;i<totalDots;i++){

        const dot =
        document.createElement("span");

        dot.classList.add("dot");

        if(i===0){
            dot.classList.add("active");
        }

        dot.addEventListener("click",()=>{

            currentIndex = i;

            moveSlider();

            resetAutoSlide();

        });

        dotsContainer.appendChild(dot);
    }

}

function updateDots(){

    const dots =
    document.querySelectorAll(".dot");

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    const totalDots =
    originalCards.length - getVisibleCards() + 1;

    dots[currentIndex % totalDots]
    ?.classList.add("active");

}

function moveSlider(){

    const cards =
    document.querySelectorAll(".card");

    const gap = 20;

    const cardWidth =
    cards[0].offsetWidth + gap;

    track.style.transition =
    "transform .6s ease";

    track.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;

    updateDots();

}

function slideNext(){

    currentIndex++;

    moveSlider();

    if(currentIndex >= originalCards.length){

        setTimeout(()=>{

            track.style.transition = "none";

            currentIndex = 0;

            track.style.transform =
            "translateX(0px)";

            updateDots();

        },600);

    }

}

function startAutoSlide(){

    autoSlide =
    setInterval(slideNext,2500);

}

function resetAutoSlide(){

    clearInterval(autoSlide);

    startAutoSlide();

}

createDots();
startAutoSlide();

window.addEventListener("resize",()=>{

    createDots();

    currentIndex = 0;

    track.style.transition="none";

    track.style.transform="translateX(0)";

});