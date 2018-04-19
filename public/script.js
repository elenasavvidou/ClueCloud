var sentenceselect

function showModal() {

    var html = `
        <div id="intro">
            <div id="introoverlay">
    <button class="button"> Start Game </button>
    <h1 class="typewriter"> Hello and Welcome! </h1>
        </div>
    </div>`

    $('#try').append(html);

    $(function openIntro() {
        $('#intro').slideDown('slow');
        $('#introoverlay').slideDown("fast");
    });

    //close intro
    $('body').on('click', function closeIntro() {
        $('#intro').slideUp('fast');
        $('#introoverlay').slideUp('fast');
    });
    var text = $('.typewriter').text();

    var length = text.length;
    var timeOut;
    var character = 0;

    //typeWriter
    (function typeWriter() {
        timeOut = setTimeout(function() {
            character++;
            var type = text.substring(0, character);
            $('.typewriter').text(type);
            typeWriter();

            if (character == length) {
                clearTimeout(timeOut);
            }

        }, 200);
    }());

}
showModal()

function startGame() {

    $.ajax({
        url: '/getJson',
        method: 'GET',

        success: function(data) {

            var sentences = data.jsonFileData
            sentenceselect = sentences[(Math.random() * sentences.length) | 0];

            //yellow
            $('#acloud').on('click', (e) => {
                console.log("yellow cloud", sentenceselect.article);

                var article = sentenceselect.article
                var html = '<div class="article">' + article + '</div>'
                $('.y').append(html);

            })
            //green
            $('#ncloud').on('click', (e) => {
                console.log("green cloud", sentenceselect.noun);

                var noun = sentenceselect.noun
                var html = '<div class="noun">' + noun + '</div>'
                $('.g').append(html);
            })
            //red
            $('#vcloud').on('click', (e) => {
                console.log("red cloud", sentenceselect.verb);

                var verb = sentenceselect.verb
                var html = '<div class="verb">' + verb + '</div>'
                $('.r').append(html);
            })
            //blue
            $('#pcloud').on('click', (e) => {
                console.log("blue cloud", sentenceselect.pronoun);

                var pronoun = sentenceselect.pronoun
                var html = '<div class="pronoun">' + pronoun + '</div>'
                $('.b').append(html)

            })
            //orange
            $('#prcloud').on('click', (e) => {
                console.log("orange cloud", sentenceselect.preposition);

                var preposition = sentenceselect.preposition
                var html = '<div class="preposition">' + preposition + '</div>'
                $('.o').append(html);
            })
            //violete
            $('#adjcloud').on('click', (e) => {
                console.log("violete cloud", sentenceselect.adjective);

                var adjective = sentenceselect.adjective
                var html = '<div class="adjective">' + adjective + '</div>'
                $('.v').append(html);
            })
            //indigo
            $('#puncloud').on('click', (e) => {
                console.log("indigo cloud", sentenceselect.punctuation);

                var punctuation = sentenceselect.punctuation
                var html = '<div class="punctuation">' + punctuation + '</div>'
                $('.i').append(html);
            })

        }

    });

    var html = `<div>
        <button class="rainbow" type="submit"> Ready? Go! </button>
        <input id="user-input" type="text" placeholder="      Give it a go! Type the sentence here!">

    </div>
    <div id="end">
        <div id="endoverlay">
            <button class="button1"> Play Again! </button>
            <h1 class="madeit"> YOU MADE IT!</h1>
        </div>

    </div>`

    $('body').append(html);

    $("#user-input").on('input', function(e) {
        console.log("E TARGET VALUE", e.target.value);
        if (e.target.value.includes('test')) {}
        $("#user-input").css({"background-color": "rgba(246, 159, 235, 0.7)"});

    })

    $(".rainbow").on('click', function() {
        var inputValue = $('#user-input').val()

        if (sentenceselect.sentence == inputValue) {

            $('#try').append(html);

            $(function endGame() {

                $('#end').slideDown('slow');
                $('#endoverlay').slideDown("fast");
                synthVoice(sentenceselect.sentence)
            });

            //close end
            $('body').on('click', function closeEndGame() {
                $('#end').slideUp('fast');
                $('#endoverlay').slideUp('fast');
                var html = '<br/>' + '<div class="sent">' + sentenceselect.sentence + '</div>'

                $('#endoverlay').append(html).slice()
                // .css( "background-color", "red" );
                // $( "#introoverlay" ).text(html).show();
            });

            $('.button1').click(function() {
                location.reload();
            });

        } else {
            console.log('something went wrong!');
            var text = 'Oops! Try again!'
            var html = '<div class="error">' + text + '</div>'
            $("body").append(html);
            // .show().fadeOut( 1000 );
        }
    });

}
startGame()
console.log('starting file');

//COLLABORATION WITH IVANA:
function synthVoice(text) {
    // CREATE CONTEXT FOR SPEECH SYNTHESIS
    const synth = window.speechSynthesis;
    const msg = new SpeechSynthesisUtterance();
    // DEFINE WHAT TEXT ZEIZA WILL BE SPEAKING
    msg.text = text;
    // CUSTOMIZE ZEIZA'S VOICE
    msg.voiceURI = 'Native';
    msg.volume = 1;
    msg.rate = 1;
    msg.lang = 'en-US';
    synth.speak(msg);
}



//***************************************************************************************************

// COMMENTS //


// for (var i = 0; i < sentences.length; i++) {
//         if (sentence[i].verb == e.target.value) {
//             // the user has typed a verb
//             break;
//         }
//         if (sentence[i].noun.indexOf(e.target.value) > -1) {
//             // the user has typed one of our nouns
//             break;
//
//         }
//     }
