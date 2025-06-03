$(function() {
    
    // Navbar shrinking effect on scrolling the page below 

    let $prevScroll = $("html").scrollTop();    // Previous scroll position of the page
    $(window).scroll(function() {
        let $top = $("body").scrollTop(), $currScroll = $("html").scrollTop();
        if($top > 20 || ($currScroll - $prevScroll) > 12){
            $("header").css("padding", "16px 32px");
        }
        else if(($prevScroll - $currScroll) > 12){
            $("header").css("padding", "32px 64px");
        }
        $prevScroll = $currScroll;
    })

    // Toggling the hamburger to close icon and vice versa on clicking the header menu
    $("#nav-icon").on("click", () => {
        $("#nav-icon").toggleClass("open");
    })

    // Setting the copyright year dynamically
    const date = new Date(), currentYear = date.getFullYear().toString();
    
    $("footer #year").text(currentYear);

    // Error handler function to display custom error message when any error is encountered while fetching quotes
    function handleFetchError() {
        let errorDisplay = "<div class='error-display'>" + 
                                "<h2>" +
                                    "<i id='frown-face' class='fa-solid fa-face-frown'></i>" + 
                                    "<span id='error-prompt'>OOPS! Something went wrong...</span>" + 
                                "</h2>" + 
                                "<p id='error-note'>Try fetching the quotes again</p>" +   
                            "</div>";
        $("#quotes-encloser").html("");
        $("#quotes-encloser").append(errorDisplay);
    }

    // Fetching the quotes through API on submit request of the form and displaying quotes on the carousel
    $("#fetch-quote").on("submit", async (e) => {
        e.preventDefault();
        let category = $("#categories").val(), count = Number($("#count").val());
        // let url = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=${count}`, key = secret.API_KEY;
        let url;
        if(category === "random")
            url = `https://api.quotable.io/quotes/random?limit=${count}`;
        else    
            url = `https://api.quotable.io/quotes/random?limit=${count}&tags=${category}`;
        // console.log(category, count);

        let data = null;

        // Error handling logic to check whether the response is correctly received 
        try {
            let response = await fetch(url, {
                method : 'GET',
                mode: 'cors',
            });   
            
            if(!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            
            data = await response.json();    

        }
        catch(error) {
            // calling the error handler when there's some error fetching quotes from the API
            handleFetchError();                
            // Logging error to the console to know what the error is about
            console.error("Failed fetching quotes with :", error);
        }

        // console.log(data);
        
        let items = "";
        for(let i = 0; i < count; i++){
            items += "<div class='carousel-item'>" + 
                "<figure class='text-center'>" + 
                    "<blockquote class='blockquote'>" + 
                        "<i class='fa-solid fa-quote-left'></i> " + 
                        "<span class='quote'>" + data[i].content + "</span>" + 
                        " <i class='fa-solid fa-quote-right'></i>" + 
                    "</blockquote>" + 
                    "<p class='blockquote-footer'>" + 
                        "<cite title='author Source Title'>" + data[i].author +"</cite>" +
                    "</p>" + 
                "</figure>" +
                "</div>";
        }
        

        let indicators = "";
        for(let i = 0; i < count; i++){
                indicators += '<button type="button" data-bs-target="#quote-carousel"></button>'
        }
        // $(".carousel-indicators button").first().attr({
        //     class : "active",
        //     ariaCurrent : "true"
        // })

        let carousel_indicators = "<div class='carousel-indicators'>" + indicators + "</div>", carousel_inner = "<div class='carousel-inner'>" + items + "</div>";
        let prev = "<button class='carousel-control-prev' type='button' data-bs-target='#quote-carousel' data-bs-slide='prev'>"
                    + "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"
                      + "</button>"
        let next = "<button class='carousel-control-next' type='button' data-bs-target='#quote-carousel' data-bs-slide='next'>"
                     + "<span class='carousel-control-next-icon' aria-hidden='true'></span>"
                      + "</button>"
        
        let quotes;
        if(count === 1){
            quotes = "<div id='quote-carousel' class='carousel carousel-dark slide w-75 mx-auto bg-body-secondary' data-bs-ride='carousel'>" + 
                        carousel_inner + 
                    "</div>"
        } else if(count > 1){
            quotes = "<div id='quote-carousel' class='carousel carousel-dark slide w-75 mx-auto bg-body-secondary' data-bs-ride='carousel'>" + 
                                        carousel_indicators + carousel_inner + prev + next +
                                "</div>"
        }
        
        $("#quotes-encloser").html("");
        $("#quotes-encloser").append(quotes);


        $(".carousel-inner .carousel-item").eq(0).addClass("active");

        if(count > 1){
            for(let i = 0; i < count; i++){
                $(".carousel-indicators button").eq(i).attr("data-bs-slide-to", `${i}`);
            }
            // $(".carousel-indicators button").eq(0).addClass("active").attr("aria-current", "true");
            $(".carousel-indicators button").eq(0).attr("class", "active");
        }
            
    })

    // Making carousel indicators work correctly on carousel slide
    $('#quote-carousel').on('slid.bs.carousel', function () {
        $holder = $('.carousel-indicators button.active');
        $holder.removeAttr('class');
        let idx = $('.carousel-inner .carousel-item.active').index('.carousel-inner .carousel-item');
        $('.carousel-indicators button[data-bs-slide-to="'+ idx+'"]').attr('class', 'active');
    });

    $('.carousel-indicators button').on("click", function(){ 
        $('.carousel-indicators button.active').removeAttr('class');
        $(this).attr('class', 'active');
    });


    // Behavior for smaller viewport sizes

    if($(window).width() <= 768){
        $(document).click(function() {
            if($("#nav-icon").attr("aria-expanded") === "false")
                $("#nav-icon").removeClass("open");
        })
    }

    $(window).resize(function() {
        if($(window).width() <= 768){
            $(document).click(function() {
                if($("#nav-icon").attr("aria-expanded") === "false")
                    $("#nav-icon").removeClass("open");
            })
        }
       
    })   
    
})


