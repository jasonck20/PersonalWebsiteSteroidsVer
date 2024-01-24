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
        iterations += 1 / 5;
    }, 30);
}


(function () {

	const link = document.querySelectorAll('nav > .hover-this');
	const cursor = document.querySelector('.cursor');

	const animateit = function (e) {
		  const span = this.querySelector('span');
		  const { offsetX: x, offsetY: y } = e,
		  { offsetWidth: width, offsetHeight: height } = this,

		  move = 25,
		  xMove = x / width * (move * 2) - move,
		  yMove = y / height * (move * 2) - move;

		  span.style.transform = `translate(${xMove}px, ${yMove}px)`;

		  if (e.type === 'mouseleave') span.style.transform = '';
	};

	const editCursor = e => {
		  const { clientX: x, clientY: y } = e;
		  cursor.style.left = x + 'px';
		  cursor.style.top = y + 'px';
	};

	link.forEach(b => b.addEventListener('mousemove', animateit));
	link.forEach(b => b.addEventListener('mouseleave', animateit));
	window.addEventListener('mousemove', editCursor);

})();

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock(); 

function updateDateTime() {
    const now = new Date();
    // Update Date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    document.getElementById('date').textContent = `${year}-${month}-${day}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();