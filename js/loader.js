const footer = $('footer');
const card = $('#blobpicture');

// De source van het PDF en videobestand moet veranderd worden met een random nummer.
// Anders blijft de pagina laden. Ik weet niet zo goed waarom.
$(document).ready(() => {
    let magazineSource = $('#magazine').attr('src')
    let bmcVideoSource = $('#bmc_video').attr('src')
    let randomString = generateRandomString();
    magazineSource += "?random=" + randomString;
    bmcVideoSource += "?random=" + randomString;

    $('#magazine').attr('src', magazineSource)
    $('#bmc_video').attr('src', bmcVideoSource)
})

// Als de grootte van het browserscherm verandert, verandert de balk mee!
window.onresize = () => {
    if ($('#home').hasClass('active')) {
        let cardYPosition = card.position()['top'] + $('#blobpicture').height();
        $('#Layer_1').css({
            'top': cardYPosition + 'px'
        });
        $('#background').css({
            'height': cardYPosition + 'px'
        });
    }
}

// Navigatiebalk
$(document).ready(function () {
    // Onderstaande jQuery selectors zijn elementen in de navigatiebalk. Als er op één van hen geklikt wordt,
    // wordt de bijbehorende "view" meegegeven aan changeView(). Vervolgens wordt er met changeView() de huidige view
    // uitgefade en de nieuwe view ingefade.
    $('#nav-home').click({
        param: '#home'
    }, changeView);
    $('#nav-portfolio').click({
        param: '#portfolio'
    }, changeView);
    $('#nav-contact').click({
        param: '#contact'
    }, changeView);
});

// Default view initialiseren
$(document).ready(function () {

    // #home is de default view, vergelijkbaar met de homepage.
    $('.container').hide();
    $('#home').show();

    $('header nav').css('position', 'absolute');
    $('#Layer_2').css('position', 'absolute');
    $('#Layer_1').css('position', 'absolute').css('z-index', -1);

});

// Alle kleuren die mogelijk zijn, zijn in deze array gedefinieerd. Zo kan ik makkelijk alle swatchpicker-buttons hun
// kleur geven.
const themeColors = [
    '#3B6362',
    '#DAA989',
    '#B5C5BB',
    '#F2E8C4',
    '#C5BFA5',
    '#87866A',
    '#B6CEF2'
];
const defaultColor = '#3B6362';

// Vul de swatches met een kleur
$(document).ready(function () {

    // Hiermee worden alle swatchpicker buttons geselecteerd. Dit zijn de knoppen waar op gedrukt kan worden om
    // de kleur van de website te veranderen.
    const swatches = document.querySelectorAll("#swatchPicker .swatch")

    // Ga door de lijst met kleurknoppen heen
    for (let i = 0; i < swatches.length; i++) {

        // Er zijn net zoveel knoppen als mogelijke kleuren. Ik geef dus knop nummer "i" kleur nummer "i".
        swatches.item(i).style.backgroundColor = themeColors[i];

        // Zorg ervoor dat als er op de knop geklikt wordt, de kleur van de website verandert.
        swatches.item(i).addEventListener("click", changeThemeColor);
    }
});

// In het contact formulier wordt gebruik gemaakt van JavaScript om ervoor te zorgen dat als
// een gebruiker op het e-mail adres of het telefoonnummer klikt, de tekstwaarde wordt gekopieërd naar
// diens klipbord.
$(document).ready(function () {
    $('#email').click(copyToClipboard);
    $('#telefoonnummer').click(copyToClipboard);
});

// Als er over de portfolio items wordt gehoverd, moet de afbeelding te voorschijn komen en de tekst verdwijnen.
$(document).ready(function () {
    $('.portfolio-item').mouseenter(fadeItemEnter);
    $('.portfolio-item').mouseleave(fadeItemLeave);
});

// Portfolio-items kunnen net als de navigatiebalk gebruikt worden om van view te wisselen.
// Ze gebruiken het data-course attribuut in hun HTML als sein van welke view ze moeten laden.
// Ze hebben ook een "backbutton", die de gebruiker terugbrengt naar het portfolio.
$(document).ready(function () {
    $('.portfolio-item').click({
        param: $(this).data.course
    }, changeView);
    $('.backbutton').click({
        param: "#portfolio"
    }, changeView);
});

// De "terug naar portfolio" linkjes
$(document).ready(function() {
    $('.back-to-portfolio').click()
})

$(window).on("load", function () {
    setTimeout(() => {
  
        let card = $('#blobpicture');
        let cardYPosition = card.position()['top'] + $('#blobpicture').height();
        $('#Layer_1').animate({
            'top': cardYPosition + 'px'
        }, 250);
        $('#background').animate({
            'height': cardYPosition + 'px'
        }, 250);
                  
      }, 500); // How long you want the delay to be, measured in milliseconds.
});

// Contactformulier
$(document).ready(() => {
    $('#Verstuur').click(formSubmit);
    $('#Naam').on('keyup', valideerNaam)
    $('#Email').on('keyup', valideerEmail)
    $('#Onderwerp').on('keyup', valideerOnderwerp)
    $('#Inhoud').on('keyup', valideerInhoud)
});