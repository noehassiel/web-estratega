function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgb(r, g, b) {
    return new THREE.Vector3(r, g, b);
}
document.addEventListener("DOMContentLoaded", function(e) {

    const renderer = new THREE.WebGLRenderer();
    document.getElementById("wave").appendChild(renderer.domElement);
    renderer.setSize( window.innerWidth, window.innerHeight );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    let vCheck = false;

    camera.position.z = 5;

    var randomisePosition = new THREE.Vector2(1, 2);

    var R = function(x, y, t) {
        return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
    }

    var G = function(x, y, t) {
        return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
    }

    var B = function(x, y, t) {
        return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
    }
    let sNoise = document.querySelector('#snoise-function').textContent
    let geometry = new THREE.PlaneGeometry(window.innerWidth / 2, 400, 100, 100);
    let material = new THREE.ShaderMaterial({
        uniforms: {
            u_bg: {type: 'v3', value: rgb(14, 145, 227)},
            u_bgMain: {type: 'v3', value: rgb(186, 215, 96)},
            u_color1: {type: 'v3', value: rgb(255, 0, 76)},
            u_color2: {type: 'v3', value: rgb(186, 215, 76)},
            u_time: {type: 'f', value: 0},
            u_randomisePosition: { type: 'v2', value: randomisePosition }
        },
        fragmentShader: sNoise + document.querySelector('#fragment-shader').textContent,
        vertexShader: sNoise + document.querySelector('#vertex-shader').textContent,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 140, -280);
    mesh.scale.multiplyScalar(5);
    mesh.rotationX = -1.0;
    mesh.rotationY = 0.0;
    mesh.rotationZ = 0.1;
    scene.add(mesh);

    renderer.render( scene, camera );
    let t = 0;
    let j = 0;
    let x = randomInteger(0, 32);
    let y = randomInteger(0, 32);
    const animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j);

        mesh.material.uniforms.u_color1.value = new THREE.Vector3(R(x,y,t/2), G(x,y,t/2), B(x,y,t/2));

        mesh.material.uniforms.u_time.value = t;
        if(t % 0.1 == 0) {
            if(vCheck == false) {
                x -= 1;
                if(x <= 0) {
                    vCheck = true;
                }
            } else {
                x += 1;
                if(x >= 32) {
                    vCheck = false;
                }

            }
        }

        // Increase t by a certain value every frame
        j = j + 0.01;
        t = t + 0.05;
    };
    animate();

});


function Ticker( elem ) {
	elem.lettering();
	this.done = false;
	this.cycleCount = 5;
	this.cycleCurrent = 0;
	this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
	this.charsCount = this.chars.length;
	this.letters = elem.find( 'span' );
	this.letterCount = this.letters.length;
	this.letterCurrent = 0;

	this.letters.each( function() {
		var $this = $( this );
		$this.attr( 'data-orig', $this.text() );
		$this.text( '-' );
	});
}

Ticker.prototype.getChar = function() {
	return this.chars[ Math.floor( Math.random() * this.charsCount ) ];
};

Ticker.prototype.reset = function() {
	this.done = false;
	this.cycleCurrent = 0;
	this.letterCurrent = 0;
	this.letters.each( function() {
		var $this = $( this );
		$this.text( $this.attr( 'data-orig' ) );
		$this.removeClass( 'done' );
	});
	this.loop();
};

Ticker.prototype.loop = function() {
	var self = this;

	this.letters.each( function( index, elem ) {
		var $elem = $( elem );
		if( index >= self.letterCurrent ) {
			if( $elem.text() !== ' ' ) {
				$elem.text( self.getChar() );
				$elem.css( 'opacity', Math.random() );
			}
		}
	});

	if( this.cycleCurrent < this.cycleCount ) {
		this.cycleCurrent++;
	} else if( this.letterCurrent < this.letterCount ) {
		var currLetter = this.letters.eq( this.letterCurrent );
		this.cycleCurrent = 0;
		currLetter.text( currLetter.attr( 'data-orig' ) ).css( 'opacity', 1 ).addClass( 'done' );
		this.letterCurrent++;
	} else {
		this.done = true;
	}

	if( !this.done ) {
		requestAnimationFrame( function() {
			self.loop();
		});
	} else {
		setTimeout( function() {
			self.reset();
		}, 750 );
	}
};

$words = $( '.word' );

$words.each( function() {
	var $this = $( this ),
		ticker = new Ticker( $this ).reset();
	$this.data( 'ticker', ticker  );
});

$(window).bind("load", function() {
 // code here
 $('.word').delay(1500).fadeOut();
 $('.overlay-l').delay(1500).fadeOut();
});
