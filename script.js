var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION'];
var isSpeaking = false;
var speakRate = 1.0
// ON DOCUMENT READY
// FULLSCREEN ALERT
var key = 0;
var synth = window.speechSynthesis;

$(document).ready(function () {

    //TO SPEAK
    function speaker(msg) {
        synth.speak(msg);
    }

    // TO PAUSE
    function pauseSpeaker() {
        synth.pause();
    }
    // TO RESUME
    function resumeSpeaker() {
        synth.resume();
    }
    //TO STOP
    function stopSpeaker() {
        synth.cancel();
    }

    document.onmouseup = function () {

        var target = getSelectionText();
        var inputmsg = new SpeechSynthesisUtterance(target);

        // inputmsg.pitch = 2.0;
        // inputmsg.rate = 2.0;
        inputmsg.volume = 0.3;

        console.log("Input msg: " + inputmsg);

        if (inputmsg != "") {
            speaker(inputmsg);
            isSpeaking = true;

            console.log("target: " + target);
        } else {
            console.log("input missing");
        }

        console.log(isSpeaking);

    };

    $(document).keydown(function (e) {
        if (e.key === 'F11') {
            if (key === 1) {       // (remember that key is 0 initially)
                // alert('FULLSCREEN OFF');
                var fullscreentext = "Full screen off";
                var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                synth.speak(fullscreenmsg);
                key = 0;
            }
            else {
                var fullscreentext = "Full screen on";
                var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                synth.speak(fullscreenmsg);
                key = 1;
            }
        } else if (e.key === 'Control') {

            pauseSpeaker();
            isSpeaking = false;
            console.log(isSpeaking);
        } else if (e.key === 'Shift') {

            resumeSpeaker();
            isSpeaking = true;
            console.log(isSpeaking);
        } else if (e.key === 'Alt') {

            stopSpeaker();
            isSpeaking = false;
            console.log(isSpeaking);
        }
    }); // END OF FULLSCREEN ALERT 

});

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function testdata(data){

    console.log("Data Inside: " + data.data);
}

browser.runtime.onMessage.addListener(testdata);


