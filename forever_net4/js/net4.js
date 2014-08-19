/* nav easing slide */
$(function() {
    $('div#header a').bind('click',function(event){
          var $anchor = $(this);
        
          $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
          }, 1500,'easeInOutExpo');
          event.preventDefault();
      });
});

/* fenghuang zhapo slideshow */
$(function(){
	$('.slider')._TMS({
		show:0,
		pauseOnHover:false,
		prevBu:'.prev',
		nextBu:'.next',
		playBu:false,
		duration:400,
		preset:'zoomer', 
		pagination:true,
		pagNums:false,
		slideshow:1500,
		numStatus:false,
		banners:false,
		waitBannerAnimation:false,
		progressBar:false
	});		 
});

/* The fuzzy cover photos become clear */
$(function(){
	var img = new Image();
	img.src = "http://byndu.img41.wal8.com/img41/430710_20140810005759/140772851693.jpg";
	img.onload = function() {
	document.getElementById('cover1').src=this.src;
}
});

/* Let the slide auto show */
$(function(){
	setInterval(slideshow,1600);

	function slideshow(){
		$('.slider .next').click();
	};
})

