(function(w, undefined){
	var ver = "2014 Winter 10",

	_jinkey = window.jinkeyAPI,
	document = window.document,
	location = window.location,
	_prevent = true;

	//start by using a selector
	jinkeyAPI = function(selector){
		return new jinkeyAPI.pr.init(selector);

	};

	var debug = {
			active: true,
			calls: 0,
			calledBySelector: 0,
			loops: 0
	};

	



	jinkeyAPI.pr = jinkeyAPI.prototype  = {
		jinkey: ver,
		constructor: jinkeyAPI,
		selector: "",

		init: function(selector){
			if(!selector) return this;
			this.selector = selector;

			if(debug.active){ debug.calledBySelector++}

		},

		prevent: function(a){
			if(a){_prevent = true}else{_prevent = false};
		}


	}; // prototype end
	jinkeyAPI.pr.init.prototype = jinkeyAPI.pr;



	jinkeyAPI.input = jinkeyAPI.prototype;
	keysPressed = {},
	jinkeyAPI.input.isDown = function(e){
		if(keysPressed[this.selector]){
			return e();
		}
	}
	jinkeyAPI.input.isUp = function(e){
		if(!keysPressed[this.selector]){
			return e();
		}
	}

	jinkeyAPI.keys = {
		BACKSPACE: 8, TAB: 9, SPACE: 32, LEFT: 37, RIGHT: 39, 
		DOWN: 40, UP: 38, ENTER: 13, SHIFT: 16, CONTROL: 17, 
		ALT: 18, PAUSE: 19, ESCAPE: 27, PAGEUP: 33, PAGEDOWN: 34, 
		END: 35, HOME: 36, INSERT: 45, K_0: 48, K_1: 49, K_2: 50, 
		K_3: 51, K_4: 52, K_5: 53, K_6: 54, K_7: 55, K_8: 56, 
		K_9: 57,A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
		H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, 
		P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, 
		MOD_WIN: 91, MENU: 93, KP_0: 96, KP_1: 97, KP_2: 98, KP_3: 99,
		KP_4: 100, KP_5: 101, KP_6: 102, KP_7: 103, KP_8: 104, KP_9: 105,
		KP_MULTIPLY: 106, KP_PLUS: 107, KP_MINUS: 109, KP_DECIMAL: 110,
		SLASH: 111,  /* / */ DECIMAL: 188, /* , */ PERIOD: 190, /* . */ 
		F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118,
		F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, CAPS_LOCK: 20,
		NUM_LOCK: 144, SCROLL_LOCK: 145, LEFT_BRACKET: 219, BACKSLASH: 220, /* \ */ 
		RIGHT_BRACKET: 221 /* ] */
	},

	jinkeyAPI.input.mouse = {transform: {xcoord:0,ycoord:0}, _pressed:-1, _cache:0,onClick: function(e){if(this._cache){e(); this._cache =0;}}, isDown: function(e){ if(this._pressed != -1) {return e();} }, isUp: function(e){ if(!this._pressed) {return e();} } };

	jinkeyAPI.input.listen = function(){
		document.addEventListener("keydown", function(e){
			e.preventDefault();
			keysPressed[e.keyCode] = true;
		});
		
		document.addEventListener("keyup", function(e){
			e.preventDefault();
			keysPressed[e.keyCode] = false;
		});
		
		document.addEventListener("blur", function(e){
			keysPressed = {};
		});

		window.addEventListener('mousemove', function(e){
			
			jinkeyAPI.input.mouse.transform.xcoord = e.clientX - 336;
			jinkeyAPI.input.mouse.transform.ycoord = e.clientY - 160;
			//jinkeyAPI.input.mouse._pressed = e.buttons;


		});
		window.addEventListener('mousedown', function(e){
			e.preventDefault();
			jinkeyAPI.input.mouse._pressed =  e.button;
			console.log(e);
			jinkeyAPI.input.mouse._cache = {xcoord: jinkeyAPI.input.mouse.transform.xcoord, ycoord: jinkeyAPI.input.mouse.transform.ycoord };


		});
		window.addEventListener('mouseup', function(e){
			e.preventDefault();
			jinkeyAPI.input.mouse._pressed = -1;
			jinkeyAPI.input.mouse._cache = 0;



		});
		return "listening";
	};



	jinkeyAPI.CartesianCoord = function(x,y,z){
		this.xcoord = x;
		this.ycoord = y;
		this.zcoord = z;
	};
	jinkeyAPI.CartesianCoord.prototype = {
		constructor: jinkeyAPI.CartesianCoord,
		zero: function(){
			this.xcoord = 0;
			this.ycoord = 0;
			this.zcoord = 0;
		},
		set: function(x,y,z){
			this.xcoord = x;
			this.ycoord = y;
			this.zcoord = z;
		},
		setFromCartesian: function(cartesian){
			this.xcoord = cartesian.xcoord;
			this.ycoord = cartesian.ycoord;
			this.zcoord = cartesian.zcoord;
			return this;
		},
		add: function( cartesian ){
			this.xcoord += cartesian.xcoord;
			this.ycoord += cartesian.ycoord;
			this.zcoord += cartesian.zcoord;
			return this;
		},
		sub: function( cartesian ){
			this.xcoord -= cartesian.xcoord;
			this.ycoord -= cartesian.ycoord;
			this.zcoord -= cartesian.zcoord;
			return this;
		},
		divide: function( cartesian ){
			this.xcoord /= cartesian.xcoord;
			this.ycoord /= cartesian.ycoord;
			this.zcoord /= cartesian.zcoord;
			return this;
		},
		multiply: function( cartesian ){
			this.xcoord *= cartesian.xcoord;
			this.ycoord *= cartesian.ycoord;
			this.zcoord *= cartesian.zcoord;
			return this;
		},
		shiftByCartesian: function( cartesian ){
			this.xcoord &= cartesian.xcoord;
			this.ycoord &= cartesian.ycoord;
			this.zcoord &= cartesian.zcoord;
			return this;
		},
		subScalar: function(s){
			this.xcoord -= s;
			this.ycoord -= s;
			this.zcoord -= s;
			return this;
		},
		addScalar: function(s){
			this.xcoord += s;
			this.ycoord += s;
			this.zcoord += s;
			return this;
		},
		multiplyScalar: function(s){
			this.xcoord *= s;
			this.ycoord *= s;
			this.zcoord *= s;
			return this;
		},
		getSubScalar: function(s){
			var a = this.xcoord-s;
			var b = this.ycoord-s;
			var c = this.zcoord-s;
			
			return new jinkeyAPI.CartesianCoord(a,b,c);
		},


	};

	jinkeyAPI.QuadTree = function(){

	}

	jinkeyAPI.Stage = function(){
		this.entityList = [];
		this.lightingList = [];
		this.userObjectList = [];

	};
	jinkeyAPI.Stage.prototype = {
		insertEntity: function(d){
			this.entityList.push(d);
		},
		destroyEntity: function(d){
			var _i = this.entityList.indexOf(d);
			
			if(_i !== -1){
				this.entityList.splice(_i,1);
			}

			return this;
		},
		destroyAll: function(){
			var _i = this.entityList.length;
			
			if(_i !== -1){
				this.entityList.splice(0,_i);
			}

			return this;
			
		},
		insertLight: function(d){
			this.lightingList.push(d);
		},
		destroyLight: function(d){
			var i = this.lightingList.indexOf(d);
			if(i !== -1){
				this.lightingList.splice(i,1);
			}
			return this;
		},
		updateObjectTicks: function(dt){

		}

	};

	jinkeyAPI.Ortho2DCam = function(fov,aspect,near,far){
		this.fov = fov || 0.78;
		this.aspect = aspect || 1;
		this.near = near || 0.01;
		this.far || 1.0;

		this.transform = new jinkeyAPI.CartesianCoord();
		this.target  = new jinkeyAPI.CartesianCoord();

		//this.transformView = new jinkeyAPI.CartesianCoord();
		this.transformWorld = new jinkeyAPI.CartesianCoord();
	};

	jinkeyAPI.Ortho2DCam.prototype.lookAtTarget = function(x,y,z){
			this.transform.setFromCartesian(this.target); /////////////////////// TRANSFORM

	};


	jinkeyAPI.Display = function(){
		this.dpi = 1;
		this.fullscreen = false;
		
		Object.defineProperties(this,{
			resolution: {
				writable: false,
				value: new Resolution()
			}
		});
		
		function Resolution(width, height){
			this.__height = height || 600;
			this.__width = width || 800;
			return this;
		}
	
	};
	jinkeyAPI.Display.prototype = {
		prototype: jinkeyAPI.Display,
		setResolution: function(width, height, isFullScreen){
			var r = this.resolution;
			r.__height = this.height = height || 600;
			r.__width = this.width = width || 800;
			this.fullscreen = (isFullScreen === undefined) ? false : isFullScreen;
			return this;
		}
	};

	jinkeyAPI.Blitter = function(){

		var _canvas = document.createElement("canvas"),
			_context = _canvas.getContext("2d"),
			_canvasW = _canvas.width,
			_canvasH = _canvas.height,	
			_canvasHW = _canvasW/2,
			_canvasHH = _canvasH/2,	

			_blitCanvas = document.createElement("canvas"),
			_blitContext = _canvas.getContext("2d"),
			_blitCanvasW = _blitCanvas.width,
			_blitCanvasH = _blitCanvas.height,	

			_current,
			_device = new jinkeyAPI.Display(),



		 	_eol;

		 _canvas.id = "ahoy";
		document.body.appendChild(_canvas);
		window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || (function(f){window.setTimeout(f, 0);});
		//window.cancelAnimationFrame = window.cancelAnimationFrame;
		this.setBlitViewSize = function(width, height){
			_canvas.width = _canvasW = 	width;
			_canvas.height = _canvasH = height;
			_canvasHW = width / 2 | 0;
			_canvasHH = height/ 2 | 0;

		};
		this.getBlitViewSize = function(){
			return new jinkeyAPI.CartesianCoord(_canvasW,_canvasH,0);
		};
		this.getBlitViewSize.getWidth = _canvasW;
		this.getBlitViewSize.getHeight = _canvasH;

		this.blit = function(ortho,level){

			var _entities = level.entityList;

			_current = ortho;

			_current.lookAtTarget();

			for(var i=0,j=_entities.length;i<j;i++){
				var _entity = _entities[i];

				if(_entity.isVisible === false) continue;

				//if( !coordClipping(_entity.transform.xcoord,_entity.transform.ycoord) ) continue;

				if(_entity instanceof jinkeyAPI.game.Entity){

						//_entity.transformWorld.xcoord -=  _current.transform.xcoord - _canvasHW;
						//_entity.transformWorld.ycoord -=  _current.transform.ycoord - _canvasHH;

						blitEntity(_entity);


				}else if(_entity instanceof jinkeyAPI.game.textEntity){

						//_entity.transformWorld.xcoord -=  _current.transform.xcoord - _canvasHW;
						//_entity.transformWorld.ycoord -=  _current.transform.ycoord - _canvasHH;

						blitTextEntity(_entity);


				}


			}

		};

		this.refresh = function(){
			//TULEE AINA EKANA ENNE BLIT
			_context.clearRect(0,0,_canvasW, _canvasH);
		
		};
		function coordClipping(x,y){
			//check clipping issue with the viewport;
			if(x >=0 && y >=0 && x < _canvasW && y < _canvasH ) return true;
			return false;
		}
		

		function blitEntity(e){
			_blitContext.save();
			_blitContext.translate( e.transform.xcoord, e.transform.ycoord);
			e.sprite.render(_blitContext);
			_blitContext.restore();
			//_context.drawImage(_blitCanvas,0,0);
		}

		function blitTextEntity(e){
			_blitContext.save();
			_blitContext.translate( e.transform.xcoord, e.transform.ycoord);
			e.sprite.renderText(e.text, _blitContext);
			_blitContext.restore();
			//_context.drawImage(_blitCanvas,0,0);
		}


					
			
		
	} // Blitter end

	jinkeyAPI.Loader = function(){
		var cache = {};
		var loading = 0;
		var callbacks = [];
		var resLocation = '';

		function loadResource(uri){

			loading = uri.length;

			if(uri instanceof Array) {
				uri.forEach(function(_uri){
					_load_(_uri);
				});
			}else{ _load_(uri);}
		}

		function _load_(uri){
			if(cache[uri]){
				return cache[uri];
			}else{
				var img = new Image();
				img.onload = function(){
					cache[uri] = img;

					if(isFinished()) {
						callbacks.forEach(function(func){ func(); });

					}
					
				};
				cache[uri] = false;
				img.src = resLocation+uri;
				
				if(img == undefined) alert("Error loading image");

			}
		}

		function getResource(uri){
			return cache[uri];
		}

		function isFinished(){
			var ready = true;
			for(var k in cache) {
				if(cache.hasOwnProperty(k) && !cache[k] ) {
					ready = false;
				}
			}
			loading--;
			return ready;
		}

		function onComplete(func){
			callbacks.push(func);
		}

		function onBeginning(func){
			loading.push(func);
		}

		function setPath(loc){
			resLocation = loc;
		}

		function purgeCache(){
			cache = {};
			callbacks = [];
			loading = [];
		}

		jinkeyAPI.resources = {
			loadResource: loadResource,
			getResource: getResource,
			isFinished: isFinished,
			onComplete: onComplete,
			setPath: setPath,
			purgeCache: purgeCache
		}

	}
	jinkeyAPI.Loader();

	jinkeyAPI.game = { done: null, start: function(){debug.active = true}, stop: function(){debug.active = false;} };
	
	jinkeyAPI.game.loop = function(e){
		function loop(){

				e(); // temp;
				if(!debug.active){ cancelAnimationFrame(loop); debug.loops--; return;}
				requestAnimationFrame(loop);
			
				
				
			

		}
	
		
		//debug.active = true;

		debug.active = true;
		if(debug.loops == 1) return;
		debug.loops++;
		requestAnimationFrame(loop);


	}

	jinkeyAPI.game.Sprite = function(url,pos,size,speed,frames,dir,once){
		this.pos = pos || new jinkey.CartesianCoord(0,0,0);
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
		this.dir = dir || 'horizontal';
		this.animateOnce = once;
		this.life = 0;
		this.original= 0;


	}

	jinkeyAPI.game.Sprite.prototype = {
		update: function(dt){
			this._index += this.speed;//*dt;
			this.life+= 1;

		},
		render: function(ct){
			var frame;
			var frameWidths;

			if(this.speed > 0){
				var max = frameWidths = this.frames.length;
				var idx = Math.floor(this._index);
				
				frame = this.frames[idx % max];


				if(this.animateOnce && idx >= max){
					this.done = true;
					return;
				}
			}else {
				frame = 0;
				frameWidths = this.frames.length;
			}

			var x = this.pos.xcoord << 0;
			var y = this.pos.ycoord << 0;

			if(this.dir == 'vertical'){
				y += frame * this.size.ycoord;
			}else {
				x += frame * this.size.xcoord;
			}
			var resource = jinkeyAPI.resources.getResource(this.url);
			//if(resource == undefined){console.log(this.url);}
			if(resource == false){return;}

			ct.drawImage(resource,
				x,y,
				resource.width/frameWidths,resource.height,
				0,0,
				this.size.xcoord,this.size.ycoord);
			resource = null;
		},

		renderText: function(text, ct){
			
			var frame = 0,
				width,
				letters = 'abcdefghijklmnoprstuvwyxzABCDEFGHIJKLMNOPRSTUVWYXZ0123456789!?#+-()[].,/',

				x = this.pos.xcoord << 0,
				y = this.pos.ycoord << 0;	
				gap = this.pos.zcoord << 0;


			var resource = jinkeyAPI.resources.getResource(this.url);

			for(var l=0;l<text.length;l++){

				var _char = text[l];
				frame = letters.indexOf(_char);

				if(_char == '\n') {ct.translate(~(gap*l),resource.height/2); continue;}

				ct.translate(gap, 0);

				if(frame === -1) continue;

				x = frame * 23;
				
			
				ct.drawImage(resource,
					x,y,
					23, resource.height,
					0,0,
					this.size.xcoord, this.size.ycoord);

				
			}
			resource = null;
			

		}
	},
		

	jinkeyAPI.game.collision = function(a,b,c,d,e,f,g,h){
		return !(c <= e | a > g | d <= f | b > h);
	}
	jinkeyAPI.game.boxCollision =  function(posa,sizea,posb,sizeb){
		return jinkeyAPI.game.collision(posa.xcoord, posa.ycoord,
										posa.xcoord + sizea.xcoord, posa.ycoord+sizea.ycoord,
										posb.xcoord, posb.ycoord,
										posb.xcoord+sizeb.xcoord, posb.ycoord+sizeb.ycoord);
	}

	
	


	jinkeyAPI.game.Entity = function(position,sprite, physical,isNewtonian, visible){
		this.transform = position;
		this.sprite = sprite;
		this.physical = physical || new jinkeyAPI.game.Physical();
		this.isNewtonian = isNewtonian || true;
		this.isVisible = visible || true;

		this.transformWorld = position;
	}
	jinkeyAPI.game.Entity.prototype = {
		constructor: jinkeyAPI.game.Entity,


	}

	jinkeyAPI.game.textEntity = function(text,position,sprite, physical,isNewtonian, visible){
		this.text = text || '';
		this.transform = position;
		this.sprite = sprite;
		this.physical = physical || new jinkeyAPI.game.Physical();
		this.isNewtonian = isNewtonian || true;
		this.isVisible = visible || true;

		this.transformWorld = position;
	}
	jinkeyAPI.game.Entity.prototype = {
		constructor: jinkeyAPI.game.textEntity
	}

	jinkeyAPI.game.Physical = function(acceleration,maxVelocity,bounce,friction){
		this.velocity = new jinkeyAPI.CartesianCoord(0,0,0);
		this.acceleration = acceleration || 0.005;
		this.maxVelocity  = maxVelocity  || 10;
		this.e = bounce || 0.7;
		this.friction = friction || 0.8;
	}
	jinkeyAPI.game.Physical.prototype = {
		constructor: jinkeyAPI.game.Entity,

		update: function(){
			
			this.velocity.ycoord += (this.maxVelocity-this.velocity.ycoord)*this.acceleration;
			this.velocity.xcoord += (this.maxVelocity-this.velocity.xcoord)*this.acceleration;
			
		}
	}


	jinkeyAPI.game.AI = function(){
		console.log('NO AI HERE!')
	}

	jinkeyAPI.game.AI.prototype = {

	}



	jinkeyAPI.UI = function(){
		console.log('NO UI HERE');
	}

	jinkeyAPI.UI.Button = function(){

	}

	jinkeyAPI.UI.Scrollbox = function(){

	}

	jinkeyAPI.UI.Dialog = function(){

	}



})(this);