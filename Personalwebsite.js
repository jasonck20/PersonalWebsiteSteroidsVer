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

var SCREEN_WIDTH =window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;

	var RADIUS = 50;

	var RADIUS_SCALE = 1;
	var RADIUS_SCALE_MIN = 1;
	var RADIUS_SCALE_MAX = 1.5;

	// The number of particles that are used to generate the trail
	var QUANTITY = 1;

	var canvas;
	var context;
	var particles;

	var mouseX = (window.innerWidth - SCREEN_WIDTH) +  Math.floor(Math.random() * 500) + 100  ; //
	var mouseY = (window.innerHeight) + Math.floor(Math.random() * 500) + 100  ; // - SCREEN_HEIGHT
	var mouseIsDown = false;

	$(document).ready(function(){
    initTrail()
	})

	function initTrail() {

		canvas = document.getElementById( 'world' );

		if (canvas && canvas.getContext) {
			context = canvas.getContext('2d');

			// Register event listeners
			window.addEventListener('load', documentMouseMoveHandler, false);
			document.addEventListener('mousemove', documentMouseMoveHandler, false);
			document.addEventListener('mousedown', documentMouseDownHandler, false);
			document.addEventListener('mouseup', documentMouseUpHandler, false);
			canvas.addEventListener('touchstart', canvasTouchStartHandler, false);
			canvas.addEventListener('touchmove', canvasTouchMoveHandler, false);
			window.addEventListener('resize', windowResizeHandler, false);



			createParticles();

			windowResizeHandler();

			setInterval( loop, 1000 / 60 );


		}
	}

	function createParticles() {

		console.log(mouseX)
		console.log(mouseY)
		particles = [];

		for (var i = 0; i < QUANTITY; i++) {
			var particle = {
				position: { x: mouseX, y: mouseY },
				shift: { x: mouseX, y: mouseY },
				size: 15,
				angle: 0,
				speed: 0.09,
				// speed: 0.01+Math.random()*0.04,
				targetSize: 1,
				fillColor: '#c5c5c5',
				// fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
				orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
			};

			particles.push( particle );
		}
	}

	function documentMouseMoveHandler(event) {
		mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
		//console.log( (window.innerWidth - SCREEN_WIDTH) * .5)
		mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		//console.log( (window.innerHeight - SCREEN_HEIGHT) * .5)

		console.log('documentMouseMoveHandler');
	}

	function documentMouseDownHandler(event) {
		mouseIsDown = true;

		console.log('documentMouseDownHandler');
	}

	function documentMouseUpHandler(event) {
		mouseIsDown = false;

		console.log('documentMouseUpHandler');
	}

	function canvasTouchStartHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
			mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		}

		console.log('canvasTouchStartHandler');
	}

	function canvasTouchMoveHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
			mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		}

		console.log('canvasTouchMoveHandler');
	}

	function windowResizeHandler() {
		//SCREEN_WIDTH = window.innerWidth;
		//SCREEN_HEIGHT = window.innerHeight;

		canvas.width = SCREEN_WIDTH;
		canvas.height = SCREEN_HEIGHT;

		canvas.style.position = 'absolute';
		canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
		canvas.style.top =  (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';

		console.log("canvas style", canvas.style.left, canvas.style.top);
	}

	function loop() {

		if( mouseIsDown ) {
			// Scale upward to the max scale
			RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.03);
		}
		else {
			// Scale downward to the min scale
			RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.03);
		}

		RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );

		// Fade out the lines slowly by drawing a rectangle over the entire canvas
		// context.fillStyle = 'rgba(0,0,0,0.05)';
		context.fillStyle = 'rgba(255,255,255,0)';
   		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    
		for (i = 0, len = particles.length; i < len; i++) {
			var particle = particles[i];

			var lp = { x: particle.position.x, y: particle.position.y };

			// Offset the angle to keep the spin going
			particle.angle += particle.speed;

			// Follow mouse with some lag
			particle.shift.x += ( mouseX - particle.shift.x) * (particle.speed);
			particle.shift.y += ( mouseY - particle.shift.y) * (particle.speed);

			// Apply position
			particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
			particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit*RADIUS_SCALE);

			// Limit to screen bounds
			particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
			particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );

			particle.size += ( particle.targetSize - particle.size ) * 0.05;

			// If we're at the target size, set a new one. Think of it like a regular day at work.
			if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
				// particle.targetSize = 1 + Math.random() * 7;
				particle.targetSize = 2;
			}

			context.beginPath();
			context.fillStyle = particle.fillColor;
			context.strokeStyle = particle.fillColor;
			context.lineWidth = particle.size;
			context.moveTo(lp.x, lp.y);
			context.lineTo(particle.position.x, particle.position.y);
			context.stroke();
			context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
			context.fill();
		}
	}