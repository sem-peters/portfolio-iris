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
        currentView.fadeOut(250, function () {
            targetView.fadeIn(250)
            // Als we switchen naar home, moet de navigatie balk lager worden gegooid en absolute worden.
            if (targetView.is('#home')) {

                $('header nav').css('position', 'absolute');
                $('#Layer_2').css('position', 'absolute');
                $('#Layer_1').css('position', 'absolute').css('z-index', -1);
                $('#background').css('z-index', -1);


                let card = $('#blobpicture');
                let cardYPosition = card.position()['top'] + $('#blobpicture').height();
                $('#Layer_1').animate({
                    'top': cardYPosition + 'px'
                }, 200);
                $('#background').animate({
                    'height': cardYPosition + 'px'
                }, 200);

            }
            // Als we weg switchen vanuit home, moet de navigatiebalk omhoog en fixed worden.
            if (currentView.is("#home")) {
                $('#background').css('z-index', 1);
                $('header nav').css('position', 'fixed');
                $('#Layer_2').css('position', 'fixed');
                $('#Layer_1').css('position', 'fixed').css('z-index', 1);
                $('#Layer_1').animate({
                    'top': '2%'
                }, 200);
                $('#background').animate({
                    'height': '0%'
                }, 200);

            }


        });



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

    // Verander de footer van kleur
    $('footer').css("background-color", color);
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

// Deze function wordt aangeroepen als op "Verstuur" wordt geklikt
function formSubmit(event) {

    let problems = [];
    let OK = true;
    const formulier = $('form'); // <form>

    // Dit zorgt ervoor dat ik alle 'input' elementen in het formulier vind.
    // Vervolgens filter ik de knop met 'verstuur' eruit, want dat is niet
    // iets dat de gebruiker verkeerd in kan vullen.
    let formulierDelen = formulier.children('input,textarea').filter((index, element) => {
        return element.id !== 'Verstuur';
    });

    // Valideer of alle velden niet leeg zijn.
    formulierDelen.each((index, element) => {
        if (isEmpty(element.value)) {
            element.classList.add('not-ok')
            problems.push(element.id + " is leeg.")
            OK = false; // Als hij leeg is, is het niet OK.
        }
    })

    // De naam mag geen cijfers bevatten.
    if (hasNumbers($('#Naam').val())) {
        $('#Naam').addClass('not-ok')
        problems.push("Naam bevat cijfers.");
        OK = false;
    }

    // Het emailadres moet goed zijn. Als het email adres leeg is,
    // hoeven we niet ook nog te zeggen dat het onjuist is.
    if (!isValidEmail($('#Email').val())) {
        if (!isEmpty($('#Email').val())) {
            $('#Email').addClass('not-ok')
            problems.push("Email-adres is onjuist.")
        }
        OK = false;
    }

    // Het onderwerp mag niet meer dan 150 tekens bevatten
    if ($('#Onderwerp').val().length > 150) {
        $('#Onderwerp').addClass('not-ok')
        problems.push("Onderwerp bevat te veel tekens. (max. 150)");
        OK = false;
    }

    // Het bericht mag niet meer dan 2000 tekens bevatten
    if ($('#Inhoud').val().length > 2000) {
        $('#Inhoud').addClass('not-ok')
        problems.push("Inhoud bevat te veel tekens. (max. 2000)");
        OK = false;
    }

    $('.messages>p').remove();
    $('#problems').empty();
    if (OK) {
        $.post("localhost:3000", {
            "naam": $('#Naam').val(),
            "email": $("#Email").val(),
            "onderwerp": $('#Onderwerp').val(),
            "bericht": $('#Inhoud').val()
        })
        formulierDelen.each((index, element) => {
            element.value = ""
        })
        $('.messages').prepend("<p>Danku voor uw bericht.<p>")
    } else {

        $('.messages').prepend("<p>Sorry, er lijkt iets mis te zijn.</p>")
        problems.forEach((value, index) => {
            $('#problems').append("<li>" + value + "</li>")
        })
    }

    return OK;
}

const charList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function generateRandomString() {
    let returnString = "";
    // 32 tekens lang
    for (let i = 0; i < 32; i++) {
        let randomIndex = Math.floor(Math.random() * charList.length-1);
        
        returnString += charList[randomIndex];
    }
    return returnString;

}

// Valideer alle individuele delen van het contactformulier
const valideerNaam = () => {
    let bool = !isEmpty($('#Naam').val()) && !hasNumbers($('#Naam').val())
    if (bool) {
        $('#Naam').removeClass('not-ok')
    } else {
        $('#Naam').addClass('not-ok')
    }
    return bool;
}
const valideerEmail = () => {
    let bool = !isEmpty($('#Email').val()) && isValidEmail($("#Email").val())
    if (bool) {
        $('#Email').removeClass('not-ok')
    } else {
        $('#Email').addClass('not-ok')
    }
    return bool;
}
const valideerOnderwerp = () => {
    let bool = !isEmpty($('#Onderwerp').val()) && $('#Onderwerp').val().length <= 150
    if (bool) {
        $('#Onderwerp').removeClass('not-ok');
    } else {
        $('#Onderwerp').addClass('not-ok');
    }
    return bool;
}
const valideerInhoud = () => {
    let bool = !isEmpty($('#Inhoud').val()) && $('#Inhoud').val().length <= 2000;
    if (bool) {
        $('#Inhoud').removeClass('not-ok');
    } else {
        $('#Inhoud').addClass('not-ok');
    }
    return bool
}

// Als dit "true" is, is de input leeg
const isEmpty = (input) => {
    return input.trim() === "";
}

// Als dit "true" is, heeft de input getallen in zich
const hasNumbers = (input) => {
    let regExp = /\d/igm;
    return regExp.test(input)
}

// Als dit true is, is het een juist emailadres
const isValidEmail = (input) => {
    let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm
    return regExp.test(input)
}