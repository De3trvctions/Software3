var isSpeaking = false;
// ON DOCUMENT READY
// FULLSCREEN ALERT
var key = 0;
var synth = window.speechSynthesis;

var volume = 0.5;
var pitch = 1.0;
var rate = 1.0;

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

$(document).ready(function () {

    //TO SPEAK
    function speaker(msg) {
        synth.speak(msg);
    }

    document.onmouseup = function () {

        var target = getSelectionText();
        var inputmsg = new SpeechSynthesisUtterance(target);

        inputmsg.pitch = pitch;
        inputmsg.rate = rate;
        inputmsg.volume = volume;

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

function testdata(data) {

    switch (String(data.data)) {

        case "Pause": {
            synth.pause();
            break;
        }

        case "Stop": {
            synth.cancel();
            break;
        }

        case "Play": {
            synth.resume();
            break;
        }

    }

    if (data.data[0] != null) {
        if (!String(data.data).localeCompare("Stop") || !String(data.data).localeCompare("Play") || !String(data.data).localeCompare("Pause")) {

        } else {
            volume = (data.data[0] / 100).toFixed(1);

            pitch = parseFloat(data.data[1]).toFixed(1);

            rate = parseFloat(data.data[2]).toFixed(1);
        }

    }

    // console.log(data);
    // console.log(volume + " " + pitch + " " + rate);

}

browser.runtime.onMessage.addListener(testdata);
