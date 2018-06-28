      // get the elements that will hold the caption and dynasty name
      const dynasties = document.getElementById("dynasties");
      const captions = document.getElementById("captions");
      
    // an array of image file names on the server
    var pics = [];
      
    // Use AJAX to load the file names for the pics array
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        
        // if data is loaded and ready to use
        if(xhr.status == 200 && xhr.readyState == 4) { 
           // do something (parse JSON and pass to pics array)
           pics =  JSON.parse(xhr.responseText);
           // call a function that uses the loaded data
           initSlideshow();
        }
        
    }
    
    // send for the data: open a server connection and send for the data
    var url = "http://www.codeimmersives.com/slideshow/";
      
    xhr.open("GET", "js/slideshow-pics.json", true);
    xhr.send();
     
	// the folder path as absolute url
	var absoluteURL = "http://www.codeimmersives.com/images/chinese-porcelain/";
	  
	// a boolean to keep track of autoplay on-off
	var isAutoplay = false; // cannot be const, as we need to be able to flip the value
	
	var autoplayInterval; 	// a var to keep track of autoplay interval
	  
	var picCounter = 0; // counter to keep track of which pic autoplays next 

    // import the one and only div on the page
    const slideshow = document.getElementById('slideshow');
    
    // make a big div to hold the big pic
    const bigPicDiv = document.createElement('div');
    bigPicDiv.id = "bigPicDiv";
    
    // output the div to the page (inside "slideshow")
    slideshow.appendChild(bigPicDiv);
      
    // make a starter image (bigPic) for the bigPicDiv
    const bigPic = new Image();
    // bigPic.src = absoluteURL + pics[0]; // move to function awaiting AJAX loaded data
	// bigPic when clicked stops autoplay
	bigPic.addEventListener('click', toggleAutoplay);  
    
    // output bigPic to page (inside "bigPicDiv")
    bigPicDiv.appendChild(bigPic);
	  
	// make a div for the thumbs
    const thumbDiv = document.createElement('div');
    thumbDiv.id = "thumbDiv";
    slideshow.appendChild(thumbDiv);
	  
	// make a footer to hold AUTOPLAY button (and potentially caption)
	const footer = document.createElement('footer');
	slideshow.appendChild(footer);
 
	// make a button for AUTOPLAY
	const btn = document.createElement('button');
	btn.addEventListener('click', toggleAutoplay);
	btn.innerHTML = "AUTOPLAY";
	footer.appendChild(btn);
      
    // called at the very end of the AJAX once loaded JSON data is parsed and ready
    function initSlideshow() {  
        
        // assign the source of the big pic
        bigPic.src = absoluteURL + pics[0].fileName;
        // output the dynasty and the caption
        dynasties.innerHTML = pics[0].dynasty;
        captions.innerHTML = pics[0].fileCaption;
        
        // loop through the pics array; each time loop runs, it make another image 
        for(let i = 0; i < pics.length; i++) {

            let thumbPic = new Image(); // make an image for thumb pic
            thumbPic.src = absoluteURL + pics[i].fileName; // set dynamic source
            thumbPic.id = i; // for setting picCounter on thumb click
            thumbPic.addEventListener('click', swapPic); // now clickable
            thumbDiv.appendChild(thumbPic); // output thumbPic to thumbDiv

        } // end for loop
        
    } // end function initSlideshow()
      
    function swapPic() { // runs when user clicks a thumb pic
        
        // event.target = "thing that got clicked"
        bigPic.src = event.target.src; // or: this.src
		picCounter = event.target.id; // set counter to current pic id

		if(isAutoplay) { // if autoplay is running, call toggle func
			toggleAutoplay(); // the function will stop the autoplay
		}
        
        // output the dynasty and the caption
        dynasties.innerHTML = pics[event.target.id].dynasty;
        captions.innerHTML = pics[event.target.id].fileCaption;
		
    } // function swapPic()
	  
	function toggleAutoplay() { // runs on button or bigPic click
				
		isAutoplay = !isAutoplay; // toggle boolean: if true, make false & vice-versa
		
		// toggle the button label to match the boolean
		if(isAutoplay) { // if boolean is true (autoplay in progress)
			
			btn.innerHTML = "STOP"; // btn label says STOP
			// start autoplay. calls autoNextPic function every 5 sec
			autoplayInterval = setInterval(autoNextPic, 5000);
		
		} else { // boolean now false (autoplay NOT in progress)
			
			btn.innerHTML = "AUTOPLAY"; // btn label says AUTOPLAY
			clearInterval(autoplayInterval);
		
		} // end if-else
		
	} // function toggleAutoplay()
	  
	function autoNextPic() {
		
		// at end of slideshow, picCounter reset to zero 
		if(picCounter < pics.length-1) {
			picCounter++;
		} else {
			picCounter = 0;
		}
		
		// picCounter is the index from the array of the next pic
		bigPic.src = absoluteURL + pics[picCounter].fileName;
        
        // output the dynasty and the caption
        dynasties.innerHTML = pics[picCounter].dynasty;
        captions.innerHTML = pics[picCounter].fileCaption;
		
	} // function autoNextPic()