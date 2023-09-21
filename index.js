$(function() {

    $("#nav-icon").on("click", () => {
        $(".menu").slideToggle();
        $("#nav-icon").toggleClass("open");
    })


    $("#fetch-quote").on("submit", async (e) => {
        e.preventDefault();
        let category = $("#categories").val(), count = Number($("#count").val());
        let url = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=${count}`;
        // console.log(category, count);

        let response = await fetch(url, {
            method : 'GET',
            headers: {
                'X-Api-Key' : 'QLA862ug3/V6aoyP18D8vg==5wee8t4ErVF8hYYq'
            }
        });
        let data = await response.json();
        console.log(data);

        // $(".quote").text(data[0].quote);
        // $(".author").text(data[0].author);

        
        let items = "";
        for(let i = 0; i < count; i++){
            items += "<div class='carousel-item'>" + "<img src='images/free soul.png' class='d-block w-100' height='500px'>" +  "</div>";;
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
        
        $("#quote-carousel").append(carousel_indicators, carousel_inner, prev, next);


        $(".carousel-inner .carousel-item").eq(0).addClass("active");
        for(let i = 0; i < count; i++){
            $(".carousel-indicators button").eq(i).attr("data-bs-slide-to", `${i}`);
        }
        // $(".carousel-indicators button").eq(0).addClass("active").attr("aria-current", "true");
        $(".carousel-indicators button").eq(0).attr("class", "active");
            
    })

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

})