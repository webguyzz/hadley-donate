// JavaScript Document
$(window).scroll(function() {
// 100 = The point you would like to fade the nav in.
  
	if ($(window).scrollTop() > 100 ){
    
 		$('.bg').addClass('show');
    
  } else {
    
    $('.bg').removeClass('show');
    
 	};   	
});

$('.scroll').on('click', function(e){		
		e.preventDefault()
    
  $('html, body').animate({
      scrollTop : $(this.hash).offset().top
    }, 1500);
});



$(window).scroll(function() {
	if ($(window).scrollTop() > 100 ){
    

		
		$('.navbar-btn.custom').css('display', 'block');  //button
		//button on landing page     $('.donate_landing_btn').css('display', 'none');  

    
 } else {
    


		 $('.navbar-btn.custom').css('display', 'none'); //button
 		 //button on landing page	 $('.donate_landing_btn').css('display', 'block');

 	};   	

});


$( document ).ready()
$('input').on('blur', function(){
	if( !$(this).val() == "" ){
		$(this).next().addClass('stay');
	} else {
		$(this).next().removeClass('stay');
		
	}
	

});




/*-------------Turn off the fade once in mobile screen-------------------------*/
$(document).ready(function(){
        if ($(window).width() < 778) {
           $('.banner').stop(true, true).fadeTo();
		   $('.navbar-nav').stop(true, true).fadeIn();
		  	$(".title").stop(true, true).animate({},{});
        }
		
		$('simple-modal').on('click',function(){
	$('simple-modal').addClass('simple-modal-overlay');
});

});







/*------------------------Toggle donation button------------------------------*/

$('.toggle').on('click', function(){
	$('.toggle').removeClass('selected');
	$('.toggle').attr('aria-pressed',false);
	$(this).addClass('selected');
	$(this).attr('aria-pressed', $(this).attr('aria-pressed') == 'false' ? 'true' : 'false');
});








/*-------------------when a class is selected---------------
$(document).ready(function(){
	$('.js-tooltip').click(function(e){
		e.preventDefault();
		$('.js-modal-overlay').css('display', 'block');  //button
});

	$('.tooltip__close, .js-modal-overlay').click(function(e){
		e.preventDefault();
		$('.js-modal-overlay').css('position', 'inherit'); 
	});
});
--------*/




