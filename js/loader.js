// De card Y position variabele wordt gebruikt om bij te houden waar de foto in de blob staat op het scherm.
// Het is de bedoeling dat de golvende headerbalk gepositioneerd wordt aan de hand van de positie van
// de fotoblob. Hij is hier nul omdat de site nog niet geladen is, ik geef hem later een waarde.
let cardYPosition = 0;

// Als de grootte van het browserscherm verandert, verandert de balk mee!
window.onresize = function () {
    let card = $('#whoami-card');
    if ($('#wiebenik').hasClass('active')) {
        let cardYPosition = card.position()['top'] + $('#whoami-card').height();
        $('#Layer_1').css({
            'top': cardYPosition + 'px'
        });
        $('#background').css({
            'height': cardYPosition + 'px'
        });
    }
    console.log("onresize happened!")
}


// Navigatiebalk
$(document).ready(function () {
    // Onderstaande jQuery selectors zijn elementen in de navigatiebalk. Als er op één van hen geklikt wordt,
    // wordt de bijbehorende "view" meegegeven aan changeView(). Vervolgens wordt er met changeView() de huidige view
    // uitgefade en de nieuwe view ingefade.
    $('#nav-wiebenik').click({
        param: '#wiebenik'
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

    // #wiebenik is de default view, vergelijkbaar met de homepage.
    $('.container').hide();
    $('#wiebenik').show();

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

$(window).on("load", function () {
    setTimeout(function (){
  
        let card = $('#whoami-card');
        let cardYPosition = card.position()['top'] + $('#whoami-card').height();
        $('#Layer_1').animate({
            'top': cardYPosition + 'px'
        }, 250);
        $('#background').animate({
            'height': cardYPosition + 'px'
        }, 250);
                  
      }, 500); // How long you want the delay to be, measured in milliseconds.
});

