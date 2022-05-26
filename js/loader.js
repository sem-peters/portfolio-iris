// Default view initialiseren
$(document).ready(function() {
    // #wiebenik is de default view, vergelijkbaar met de homepage.
    $('#wiebenik').show();
    $('#contact').hide();
    $('#portfolio').hide();
});
// Navigatiebalk
$(document).ready(function() {
    // Onderstaande jQuery selectors zijn elementen in de navigatiebalk. Als er op één van hen geklikt wordt,
    // wordt de bijbehorende "view" meegegeven aan changeView(). Vervolgens wordt er met changeView() de huidige view
    // uitgefade en de nieuwe view ingefade.
    $('#nav-wiebenik').click({param: '#wiebenik'}, changeView);
    $('#nav-portfolio').click({param: '#portfolio'}, changeView);
    $('#nav-contact').click({param: '#contact'}, changeView);
});

// Het is nodig om views te gebruiken in plaats van aparte html bestanden. Dit omdat ik wil dat de gebruiker van kleur kan
// veranderen, zonder dat steeds op elke pagina opnieuw in te moeten stellen. Ik zou het met sessies en cookies kunnen doen,
// maar dat is erg veel werk. Dit is makkelijker.

// Van pagina / view wisselen:
function changeView(event) {

    // Met event.data.param wordt de view opgehaald waarnaar geswitcht moet worden. Deze moet dus "ingefade" worden.
    let targetView = $(event.data.param);

    // De huidige view wordt gemarkeert met de "active" class. Die selecteer ik hier. De elementen met de active class
    // worden uitgefade.
    let currentView = $('.active');

    // Als de targetView actief is, betekent dat dat de gebruiker probeert te switchen naar de view die nu actief is.
    // Het is niet de bedoeling dat de huidige view uitgefade wordt en vervolgens weer ingefade, dus daarom gebeurt er alleen
    // iets als de targetView NIET actief is.
    if (!targetView.hasClass('active')) {

        currentView.fadeOut();
        targetView.fadeIn();
        
        // Om van view te switchen is het belangrijk om de nieuwe view aan te merken als de nieuwe actieve view.
        // en de oude view te markeren als niet meer actief.
        targetView.addClass('active');
        currentView.removeClass('active');

    }
}

// Alle kleuren die mogelijk zijn, zijn in deze array gedefinieerd. Zo kan ik makkelijk alle swatchpicker-buttons hun
// kleur geven.
const themeColors = [
    '#C47556',
    '#3B6362',
    '#DAA989',
    '#B5C5BB',
    '#F2E8C4',
    '#C5BFA5',
    '#E3A655',
    '#87866A',
    '#B6CEF2'
];
const defaultColor = '#E3A655';

// Vul de swatches met een kleur
$(document).ready(function() {

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

// Deze function wordt aangeroepen als er op een kleurknop geklikt is.
function changeThemeColor(event) {
    // Haal de kleur op
    let color = event.currentTarget.style.backgroundColor;

    // Verander de kleur van het svg header ding
    // Illustrator heeft het .cls-3 genoemd, vraag me niet waarom
    $('.cls-3').css("fill", color);

    // Verander de boxshadow kleur van de whoami card
    $('#whoami-card').css("box-shadow", "1.3em 1.3em " + color);

    // Verander de kleur van de figcaptions in het portfolio ding
    $('.portfolio-item figcaption').css("background-color", color);
}

// In het contact formulier wordt gebruik gemaakt van JavaScript om ervoor te zorgen dat als
// een gebruiker op het e-mail adres of het telefoonnummer klikt, de tekstwaarde wordt gekopieërd naar
// diens klipbord.
$(document).ready(function() {
    $('#email').click(copyToClipboard);
    $('#telefoonnummer').click(copyToClipboard);
});

function copyToClipboard(event) {
    let copyText = event.currentTarget.innerHTML;
    navigator.clipboard.writeText(copyText);
}

// Als er over de portfolio items wordt gehoverd, moet de afbeelding te voorschijn komen en de tekst verdwijnen.
$(document).ready(function() {
    $('.portfolio-item').mouseenter(fadeItemEnter);
    $('.portfolio-item').mouseleave(fadeItemLeave);
});

// Deze function gaat ervoor zorgen dat de afbeelding tevoorschijn komt en de caption weggaat.
// Hij wordt aangeroepen als de muis over het element zit.
function fadeItemEnter(event) {
    let imgElement = $(this).find("img");
    let imgCaption = $(this).find("figcaption");

    imgElement.animate({opacity: 1}, 200);
    imgCaption.animate({opacity: 0}, 300);
}

// Deze function gaat ervoor zorgen dat de afbeelding weggaat komt en de caption terugkomt.
// Hij wordt aangeroepen als de muis van het element afgaat.
function fadeItemLeave(event) {
    let imgElement = $(this).find("img");
    let imgCaption = $(this).find("figcaption");

    imgElement.animate({opacity: 0}, 300);
    imgCaption.animate({opacity: 1}, 200);
}