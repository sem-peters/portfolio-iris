// Het is nodig om views te gebruiken in plaats van aparte html bestanden. Dit omdat ik wil dat de gebruiker van kleur kan
// veranderen, zonder dat steeds op elke pagina opnieuw in te moeten stellen. Ik zou het met sessies en cookies kunnen doen,
// maar dat is erg veel werk. Dit is makkelijker.

// Van pagina / view wisselen:
function changeView(event) {
    // Met event.data.param wordt de view opgehaald waarnaar geswitcht moet worden. Deze moet dus "ingefade" worden.
    let targetView = $(event.data.param);
    if (targetView.length === 0) {
        targetView = $("#" + event.currentTarget.dataset.course);
    }
    // De huidige view wordt gemarkeert met de "active" class. Die selecteer ik hier. De elementen met de active class
    // worden uitgefade.
    let currentView = $('.active');

    // Als de targetView actief is, betekent dat dat de gebruiker probeert te switchen naar de view die nu actief is.
    // Het is niet de bedoeling dat de huidige view uitgefade wordt en vervolgens weer ingefade, dus daarom gebeurt er alleen
    // iets als de targetView NIET actief is.
    if (!targetView.hasClass('active')) {
        
        // Fade de oude uit, fade de nieuwe in.
        currentView.fadeOut(250);
        targetView.fadeIn(250);
        // Als we switchen naar wiebenik, moet de navigatie balk lager worden gegooid en absolute worden.
        if (targetView.is('#wiebenik')) {

            $('header nav').css('position', 'absolute');
            $('#Layer_2').css('position', 'absolute');
            $('#Layer_1').css('position', 'absolute').css('z-index', -1);
            
            let card = $('#whoami-card');
            let cardYPosition = card.position()['top'] + $('#whoami-card').height();
            $('#Layer_1').animate({
                'top': cardYPosition + 'px'
            }, 250);
            $('#background').animate({
                'height': cardYPosition + 'px'
            }, 250);
            
        }
        // Als we weg switchen vanuit wiebenik, moet de navigatiebalk omhoog en fixed worden.
        if (currentView.is("#wiebenik")) {
            $('header nav').css('position', 'fixed');
            $('#Layer_2').css('position', 'fixed');
            $('#Layer_1').css('position', 'fixed').css('z-index', 1);
            $('#Layer_1').animate({
                'top': '2%'
            }, 250);
            $('#background').animate({
                'height': '0%'
            }, 250);
            
        }
        

        // Om van view te switchen is het belangrijk om de nieuwe view aan te merken als de nieuwe actieve view.
        // en de oude view te markeren als niet meer actief.
        targetView.addClass('active');
        currentView.removeClass('active');

    }
}

// Deze function wordt aangeroepen als er op een kleurknop geklikt is.
function changeThemeColor(event) {
    // Haal de kleur op
    let color = event.currentTarget.style.backgroundColor;

    // Verander de kleur van het svg header ding
    // Illustrator heeft het .cls-3 genoemd, vraag me niet waarom
    $('#background').css({
        "background-color": color,
        transition: "background-color 0.2s"
    });
    $('.cls-3').css({
        "fill": color,
        transition: "fill 0.2s"
    });

    // Verander de kleur van de figcaptions in het portfolio ding
    $('.portfolio-item figcaption').css("background-color", color);
}

function copyToClipboard(event) {
    let copyText = event.currentTarget.innerHTML;
    navigator.clipboard.writeText(copyText);
}

// Deze function gaat ervoor zorgen dat de afbeelding tevoorschijn komt en de caption weggaat.
// Hij wordt aangeroepen als de muis over het element zit.
function fadeItemEnter(event) {
    let imgElement = $(this).find("img");
    let imgCaption = $(this).find("figcaption");

    imgCaption.animate({
        opacity: 1
    }, 200);
    imgElement.animate({
        opacity: 0
    }, 200);
}

// Deze function gaat ervoor zorgen dat de afbeelding weggaat komt en de caption terugkomt.
// Hij wordt aangeroepen als de muis van het element afgaat.
function fadeItemLeave(event) {
    let imgElement = $(this).find("img");
    let imgCaption = $(this).find("figcaption");

    imgElement.animate({
        opacity: 1
    }, 200);
    imgCaption.animate({
        opacity: 0
    }, 200);
}