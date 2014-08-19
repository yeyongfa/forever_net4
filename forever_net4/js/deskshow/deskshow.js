	$(function() {
		deskshow('fh_container','fh_photo','fh_loading','fh_hold');
		deskshow('zhapo_container','zhapo_photo','zhapo_loading','zhapo_hold');
				
});


function deskshow(container,thephoto,loading,hold){
				var idx,idxLarge	= -1;
				var mouseup 		= false;
				var photoW			= 184;  //184
				var photoH			= 205;
				var $container 		= $('#'+container);

				
				var photosSize 		= $container.find('.'+thephoto).length;
				var navPage			= 0;
				var ie 				= false;
				if ($.browser.msie) {
					ie = true;
				}
				
				start();
				
		function start(){
					$('#'+loading).show();
					
					var tableW 			= $container.width();
					var tableH 			= $container.height();
					
					var horizontalMax	= tableW - photoW;
					var verticalMax		= tableH - photoH;
					
					$('<img />');
					var cntPhotos = 0;
					$container.find('.'+thephoto).each(function(i){
						var $photo 	= $(this);
						$('<img />').load(function(){
							++cntPhotos;
							var $image 	= $(this);
							
						var r		= Math.floor(Math.random()*201)-100;//*41
						var maxzidx = parseInt(findHighestZIndex()) + 1;
						var param	= {
							'top' 		: Math.floor(Math.random()*verticalMax) +'px',       
							'left'		: Math.floor(Math.random()*horizontalMax) +'px',
								'z-index'	: maxzidx
						};
							
							$photo.css(param);
							if(!ie)
								$photo.transform({'rotate'	: r + 'deg'});
							$photo.show();	
							if(cntPhotos == photosSize){
								bindEvents();
								$('#'+loading).hide();
							}
						}).attr('src',$photo.find('img').attr('src'));	
					});	
				}   /* End of function start */


		function mouseDown($photo){
					mouseup 	= true;
					idx			= $photo.index() + 1;
					var maxzidx = parseInt(findHighestZIndex()) + 1;
					$photo.css('z-index',maxzidx);
					if(ie)
					var param = {
						'width'		: '+=50px',
						'height'	: '+=50px'
					};
					else
					var param = {
						'width'		: '+=50px',
						'height'	: '+=50px',
						'rotate'	: '0deg',
						
					};
					$photo.stop(true,true).animate(param,100).find('img').stop(true,true).animate({
						'width'		: '+=50px',
						'height'	: '+=50px'
					},100);
				}    /* End of function mouseDown */


		$(document).bind('mouseup',function(e){
					if(mouseup){
						mouseup 	= false;
						var $photo 	= $container.find('.'+thephoto+':nth-child('+idx+')');
						var r		= Math.floor(Math.random()*101)-40;
						var $photoT	= parseFloat($photo.css('top'),10);
						var $photoL	= parseFloat($photo.css('left'),10);
						var newTop	= $photoT + r;
						var newLeft	= $photoL + r;
						if(ie)
						var param = {
							'width'		: '-=50px',
							'height'	: '-=50px',
							'top'		: newTop + 'px', 
							'left'		: newLeft + 'px'
						};
						else
						var param = {
							'width'		: '-=50px',
							'height'	: '-=50px',
							'top'		: newTop + 'px',
							'left'		: newLeft + 'px',
							'rotate'	: r+'deg',
							'shadow'	: '0 0 5px #000'
						};
						$photo.stop(true,true).animate(param,200).find('img').stop(true,true).animate({
							'width'	: '-=50px',
							'height': '-=50px'
						},200);
					}
					e.preventDefault();
				});   /* End of funtion mouseup */

				
		function bindEvents(){
					
					$container.find('.'+thephoto).each(function(i){
						var $photo = $(this);
						$photo.draggable({
							containment	: '#'+container});
					}).find('.'+hold).unbind('mousedown').bind('mousedown',function(e){
						var $photo 	= $(this).parent();
						mouseDown($photo);
						e.preventDefault();
					});
				}    /* End of function bindEvents */

		function findHighestZIndex(){
					var photos = $container.find('.'+thephoto);
					var highest = 0;
					photos.each(function(){
						var $photo = $(this);
						var zindex = $photo.css('z-index');
						if (parseInt(zindex) > highest) {
							highest = zindex;
						}
					});
					return highest;
				}		/*End of function bindEvents */
		};