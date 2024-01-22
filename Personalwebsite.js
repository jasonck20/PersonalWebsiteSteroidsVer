document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('myVideo');
    var text = document.getElementById('overlayText');
    console.log("Script loaded and running"); // Debugging line

    video.addEventListener('timeupdate', function() {
        // Show text between 5 and 10 seconds
        console.log("Current time: " + video.currentTime);
        if (video.currentTime >= 9.5 && video.currentTime <= 20) {
            text.classList.add('fade-in');
        } else {
            text.classList.remove('fade-in');
        }
    });
});
function toggleMenu() {
    var menu = document.getElementById("curtainMenu");
    menu.classList.toggle("open");
}

function toggleMenu() {
    var menu = document.getElementById("curtainMenu");
    var icon = document.querySelector(".menu-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("change");
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


document.querySelector("h1").onmouseover = event => {
    let iterations = 0;
    
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index < iterations){
                    return event.target.dataset.value[index];
                }
                
                
                return letters[Math.floor(Math.random()*26)]
            })
            .join("");
        if(iterations >= event.target.dataset.value.length) clearInterval(interval);
        iterations += 1 / 6;

        }, 30);
    
}