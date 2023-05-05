
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


// ###################################################################
// shims
//
// ###################################################################
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
  if (!window.performance.now) {
    window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } : 
      function() { return Date.now(); }
  }
})();

var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 650;
var CANVAS_HEIGHT = 800;
var SPRITE_SHEET_SRC = 'data:image/png;base64,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';
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 88;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 };
var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
var ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
var ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;



// ###################################################################
// Utility functions & classes
//
// ###################################################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}
 
function checkRectCollision(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
  valueInRange(B.x, A.x, A.x + A.w);
 
  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
  valueInRange(B.y, A.y, A.y + A.h); 
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function(x, y) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
  },
  
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

var Rect = Class.extend({
  init: function(x, y, w, h) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
    this.w = (typeof w === 'undefined') ? 0 : w;
    this.h = (typeof h === 'undefined') ? 0 : h;
  },
  
  set: function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
});



// ###################################################################
// Globals
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var particleManager = null;
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 1;
var hasGameStarted = false;



// ###################################################################
// Entities
//
// ###################################################################
var BaseSprite = Class.extend({
  init: function(img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },
                           
  update: function(dt) { },
  
  _updateBounds: function() {
     this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  },
  
  _drawImage: function() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },
  
  draw: function(resized) {
    this._updateBounds();
    
    this._drawImage();
  }
});

var SheetSprite = BaseSprite.extend({
  init: function(sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },
  
  update: function(dt) {},
  
  _updateBounds: function() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
  },
  
  _drawImage: function() {
    ctx.save();
    ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
    ctx.restore();

  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Player = SheetSprite.extend({
  init: function() {
    this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  },
  
  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
  },
  
  shoot: function() {
    var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
    this.bullets.push(bullet);
  },
  
  handleInput: function() {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;
    
    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot(); 
        this.bulletDelayAccumulator = 0;
      }
    }
  },
  
  updateBullets: function(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },
  
  update: function(dt) {
    // update time passed between shots
    this.bulletDelayAccumulator += dt;
    
    // apply x vel
    this.position.x += this.xVel * dt;
    
    // cap player position in screen bounds
    this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
    this.updateBullets(dt);
  },
  
  draw: function(resized) {
    this._super(resized);

    // draw bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
});

var Bullet = BaseSprite.extend({
  init: function(x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },
  
  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;
    
    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Enemy = SheetSprite.extend({
  init: function(clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },
  
  toggleFrame: function() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
  },
  
  shoot: function() {
    this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
  },
  
  update: function(dt) {
    this.stepAccumulator += dt;
    
    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
      updateAlienLogic = true;
    } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
      updateAlienLogic = true;
    }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }
      
      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;
    
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);  
    } else {
      this.bullet = null;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
});

var ParticleExplosion = Class.extend({
  init: function() {
    this.particlePool = [];
    this.particles = [];
  },
  
  draw: function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
	    particle.x += particle.xunits;
		  particle.y += particle.yunits + (particle.gravity * particle.moves);
			particle.life--;
			
			if (particle.life <= 0 ) {
				if (this.particlePool.length < 100) {
					this.particlePool.push(this.particles.splice(i,1));
				} else {
					this.particles.splice(i,1);
				}
			} else {
				ctx.globalAlpha = (particle.life)/(particle.maxLife);
				ctx.fillStyle = particle.color;
				ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
				ctx.globalAlpha = 1;
			}
    }
  },
  
  createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
  for (var i =0;i < number;i++) {
			var angle = Math.floor(Math.random()*360);
			var speed = Math.floor(Math.random()*spd/2) + spd;	
			var life = Math.floor(Math.random()*lif)+lif/2;
			var radians = angle * Math.PI/ 180;
			var xunits = Math.cos(radians) * speed;
			var yunits = Math.sin(radians) * speed;
				
			if (this.particlePool.length > 0) {
				var tempParticle = this.particlePool.pop();
				tempParticle.x = x;
				tempParticle.y = y;
				tempParticle.xunits = xunits;
				tempParticle.yunits = yunits;
				tempParticle.life = life;
				tempParticle.color = color;
				tempParticle.width = width;
				tempParticle.height = height;
				tempParticle.gravity = grav;
				tempParticle.moves = 0;
				tempParticle.alpha = 1;
				tempParticle.maxLife = life;
				this.particles.push(tempParticle);
			} else {
				this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
			}	
	
		}
  }
});



// ###################################################################
// Initialization functions
//
// ###################################################################
function initCanvas() {
  // create our canvas and context
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  // turn off image smoothing
  setImageSmoothing(false);
  
  // create our main sprite sheet img
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;  
  preDrawImages();

  // add event listeners and initially resize

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

function preDrawImages() {
  var canvas = drawIntoCanvas(2, 8, function(ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = canvas.toDataURL();
}

function setImageSmoothing(value) {
  this.ctx['imageSmoothingEnabled'] = value;
  this.ctx['mozImageSmoothingEnabled'] = value;
  this.ctx['oImageSmoothingEnabled'] = value;
  this.ctx['webkitImageSmoothingEnabled'] = value;
  this.ctx['msImageSmoothingEnabled'] = value;
}

function initGame() {
  dirtyRects = [];
  aliens = [];
  player = new Player();
  particleManager = new ParticleExplosion();
  setupAlienFormation();  
  drawBottomHud();
}

function setupAlienFormation() {
  alienCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = (i % 11);
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0: 
      case 1: clipRects = ALIEN_BOTTOM_ROW; break;
      case 2: 
      case 3: clipRects = ALIEN_MIDDLE_ROW; break;
      case 4: clipRects = ALIEN_TOP_ROW; break;
    }
    aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
    alienCount++;
  }
}

function reset() {
  aliens = [];
  setupAlienFormation();
  player.reset();
}

function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}



// ###################################################################
// Helpful input functions
// ###################################################################


function isKeyDown(key) {
  return keyStates[key];
}

function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}

// ###################################################################
// Drawing & Update functions
// ###################################################################


function updateAliens(dt) {
  if (updateAlienLogic) {
    updateAlienLogic = false;
    alienDirection = -alienDirection;
    alienYDown = 25;
  }
  
  for (var i = aliens.length - 1; i >= 0; i--) {
    var alien = aliens[i];
    if (!alien.alive) {
      aliens.splice(i, 1);
      alien = null;
      alienCount--;
      if (alienCount < 1) {
        wave++;
        setupAlienFormation();
      }
      return;
    }
    
    alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
    if (alien.stepDelay <= 0.05) {
      alien.stepDelay = 0.05;
    }
    alien.update(dt);
    
    if (alien.doShoot) {
      alien.doShoot = false;
      alien.shoot();
    }
  }
  alienYDown = 0;
}

function resolveBulletEnemyCollisions() {
  var bullets = player.bullets;
  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = aliens.length; j < alen; j++) {
      var alien = aliens[j];
      if (checkRectCollision(bullet.bounds, alien.bounds)) {
        alien.alive = bullet.alive = false;
        particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5,5,3,.15,50);
        player.score += 25;
      }
    }
  }
}

function resolveBulletPlayerCollisions() {
  for (var i = 0, len = aliens.length; i < len; i++) {
    var alien = aliens[i];
    if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
      if (player.lives === 0) {
        hasGameStarted = false;
      } else {
       alien.bullet.alive = false;
       particleManager.createExplosion(player.position.x, player.position.y, 'white', 100, 8,8,6,0.001,40);
       player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
       player.lives--;
        break;
      }

    }
  }
}

function resolveCollisions() {
  resolveBulletEnemyCollisions();
  resolveBulletPlayerCollisions();
}

function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateAliens(dt);
  resolveCollisions();
}

function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  drawFunc(ctx);
  return canvas;
}

function fillText(text, x, y, color, fontSize) {
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
  ctx.fillText(text, x, y);
}

function fillCenteredText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width/2, y, color, fontSize);
}

function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(text, x, y, color, fontSize);
  }
}

function drawBottomHud() {
  ctx.fillStyle = '#F69B9A';
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
  ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w, 
                 player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
                 player.clipRect.h * 0.5);
  fillText('CREDIT: ', CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH/2, 20);
  fillBlinkingText('00', CANVAS_WIDTH - 25, CANVAS_HEIGHT - 7.5, TEXT_BLINK_FREQ);
}

function drawAliens(resized) {
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.draw(resized);
  }
}

function drawGame(resized) {
  player.draw(resized);  
  drawAliens(resized);
  particleManager.draw();
  drawBottomHud();
}

function drawStartScreen() {
  fillCenteredText("Press TAB to play!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, '#FFFFFF', 25);
}

function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(9) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }

  if (hasGameStarted) {
     updateGame(dt / 1000);  
  }

  ctx.fillStyle = '#62CCC6';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}



// ###################################################################
// Event Listener functions
// ###################################################################


function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

	// calculate the scale factor to keep a correct aspect ratio
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
  
  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
  } else {
    // resize the canvas css properties
    canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
  }
}

function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}


// ###################################################################
// Start game
// ###################################################################
window.onload = function() {
  init();
  animate();
  document.getElementById("textInput").disabled = false;
};