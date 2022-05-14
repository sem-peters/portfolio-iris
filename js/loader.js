// Default view initialiseren
$(document).ready(function() {
    $('#wiebenik').show();
    $('#contact').hide();
    $('#portfolio').hide();
});
// Navigatiebalk
$(document).ready(function() {
    $('#nav-wiebenik').click({param: '#wiebenik'}, changeView);
    $('#nav-portfolio').click({param: '#portfolio'}, changeView);
    $('#nav-contact').click({param: '#contact'}, changeView);
});

// Van pagina / view wisselen:
function changeView(event) {
    let targetView = $(event.data.param);
    let currentView = $('.active');

    if (!targetView.hasClass('active')) {
        currentView.fadeOut();
        targetView.addClass('active');
        currentView.removeClass('active');
        targetView.fadeIn();
    }
}

// Alle kleuren die mogelijk zijn
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
    const swatches = document.querySelectorAll("#swatchPicker .swatch")
    for (let i = 0; i < swatches.length; i++) {
        swatches.item(i).style.backgroundColor = themeColors[i];
        swatches.item(i).addEventListener("click", changeThemeColor);
    }
});

function changeThemeColor(event) {
    // Haal de kleur op
    let color = event.currentTarget.style.backgroundColor;

    // Verander de kleur van het svg header ding
    document.querySelectorAll('.cls-3').forEach(function (el) {
        el.style.fill = color;
    });
    // Verander de boxshadow kleur van de whoami card
    document.querySelector('#whoami-card').style.boxShadow = '2em 2em ' + color;
}