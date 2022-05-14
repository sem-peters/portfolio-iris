// De huidige view
var currentView = 'wiebenik';

// Default view initialiseren
$(document).ready(function() {
    document.querySelector('#wiebenik').style.display = 'flex';
    document.querySelector('#contact').style.display = 'none';
    document.querySelector('#portfolio').style.display = 'none';
});
// Navigatiebalk
$(document).ready(function() {
    document.querySelector('#nav-wiebenik').addEventListener("click", changeView);
    document.querySelector('#nav-portfolio').addEventListener("click", changeView);
    document.querySelector('#nav-contact').addEventListener("click", changeView);
});

// Van pagina / view wisselen:
function changeView(event) {
    let targetView = event.currentTarget.id;
    if (targetView === 'nav-wiebenik' && currentView !== 'wiebenik') {
        document.querySelector('#portfolio').style.display = 'none';
        document.querySelector('#contact').style.display = 'none';
        document.querySelector('#wiebenik').style.display = 'flex';
        currentView = 'wiebenik';
    }
    if (targetView === 'nav-portfolio' && currentView !== 'portfolio') {
        document.querySelector('#wiebenik').style.display = 'none';
        document.querySelector('#contact').style.display = 'none';
        document.querySelector('#portfolio').style.display = 'flex';
        currentView = 'portfolio';
    }
    if (targetView === 'nav-contact' && currentView !== 'contact') {
        document.querySelector('#wiebenik').style.display = 'none';
        document.querySelector('#portfolio').style.display = 'none';
        document.querySelector('#contact').style.display = 'flex';
        currentView = 'contact';
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