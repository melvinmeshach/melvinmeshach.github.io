

// ISOTOPE FILTER

jQuery(document).ready(function($){

	if ( $('.iso-box-wrapper').length > 0 ) { 

	    var $container 	= $('.iso-box-wrapper'), 
	    	$imgs 		= $('.iso-box img');



	    $container.imagesLoaded(function () {

	    	$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: '.iso-box'
	    	});

	    	$imgs.load(function(){
	    		$container.isotope('reLayout');
	    	})

	    });

	    //filter items on button click

	    $('.filter-wrapper li a').click(function(){

	        var $this = $(this), filterValue = $this.attr('data-filter');

			$container.isotope({ 
				filter: filterValue,
				animationOptions: { 
				    duration: 750, 
				    easing: 'linear', 
				    queue: false, 
				}              	 
			});	            

			// don't proceed if already selected 

			if ( $this.hasClass('selected') ) { 
				return false; 
			}

			var filter_wrapper = $this.closest('.filter-wrapper');
			filter_wrapper.find('.selected').removeClass('selected');
			$this.addClass('selected');

	      return false;
	    }); 

	}

});


async function formSubmit (event) {
	event.preventDefault();

	event.target.elements[1].classList.remove("error");
	event.target.elements[3].classList.remove("error");
	$(".success").css("visibility", "hidden");

	let name, email, subject, message;
	if(event.target.elements[3].value)
	{
		message = event.target.elements[3].value
	}
	else
	{
		event.target.elements[3].classList.add("error");
		$(".success").html("Please enter message!").css({"visibility": "visible", "color":"red"});
		return;
	}
	if(event.target.elements[0].value)
	{
		name = event.target.elements[0].value
	}
	if(event.target.elements[1].value)
	{
		email = event.target.elements[1].value
	}
	else
	{
		event.target.elements[1].classList.add("error");
		$(".success").html("Please enter email!").css({"visibility": "visible", "color":"red"});
		return;
	}
	if(event.target.elements[2].value)
	{
		subject = event.target.elements[2].value
	}
	
	let data = {
		name,
		email,
		subject,
		message
	}
	event.target.reset();
	try {
		const response = await axios.post("https://melvinmeshach.herokuapp.com//message", data);
		console.log("Response:"+response);
		$(".success").html("Message sent!").css({"visibility": "visible", "color":"green"});
		setTimeout(()=>{
			$(".success").css("visibility", "hidden");
		}, 3000);
	} catch (error) {
		console.log("error happened!");
		if (error.response) {
			console.log(error.response);
		} else {
		console.log(error);
	  }
	}
  }

// MAIN NAVIGATION

 $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 75, //Height of Navigation Bar
        filter: ':not(.external)',
        changeHash: true
    }); 

    /* NAVIGATION VISIBLE ON SCROLL */
    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.sticky-navigation').stop().animate({
            "opacity": '0',
            "top": '-75'
        });
    }


// HIDE MOBILE MENU AFTER CLIKING ON A LINK

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
