function listenForClicks() {

    document.getElementById("brown").addEventListener("click", (event) => {

        function dataSet(tabs) {

            let result = event.target.textContent;

            browser.tabs.sendMessage(tabs[0].id, {
                command: "data",
                data: result
            });
        }

        function reportError(error) {
            console.error(`Could not colorify: ${error}`);
        }

        if (event.target.classList.contains("beast")) {

            browser.tabs.query({ active: true, currentWindow: true })
                .then(dataSet)
                .catch(reportError);
        }

    });

    document.getElementById("blue").addEventListener("click", (event) => {

        function dataSet(tabs) {

            let result = event.target.textContent;

            browser.tabs.sendMessage(tabs[0].id, {
                command: "data",
                data: result
            });
        }

        function reportError(error) {
            console.error(`Could not colorify: ${error}`);
        }

        if (event.target.classList.contains("beast")) {

            browser.tabs.query({ active: true, currentWindow: true })
                .then(dataSet)
                .catch(reportError);
        }

    });

    document.getElementById("yellow").addEventListener("click", (event) => {

        function dataSet(tabs) {

            let result = event.target.textContent;

            browser.tabs.sendMessage(tabs[0].id, {
                command: "data",
                data: result
            });
        }

        function reportError(error) {
            console.error(`Could not colorify: ${error}`);
        }

        if (event.target.classList.contains("beast")) {

            browser.tabs.query({ active: true, currentWindow: true })
                .then(dataSet)
                .catch(reportError);
        }

    });

    document.getElementById("saveBtn").addEventListener("click", (event) => {

        function dataSet(tabs) {

            let result = [vSlider.value, pSlider.value, rSlider.value];

            console.log(result);

            browser.tabs.sendMessage(tabs[0].id, {
                command: "data",
                data: result
            });
        }

        function reportError(error) {
            console.error(`Could not colorify: ${error}`);
        }

        if (event.target.classList.contains("beast")) {

            browser.tabs.query({ active: true, currentWindow: true })
                .then(dataSet)
                .catch(reportError);
        }

    });
}

var vSlider = document.getElementById("volumeSlider");
var vOutput = document.getElementById("volumeText");
vOutput.innerHTML = vSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
vSlider.oninput = function() {
  vOutput.innerHTML = this.value;
}

var pSlider = document.getElementById("pitchSlider");
var pOutput = document.getElementById("pictchText");
pOutput.innerHTML = pSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
pSlider.oninput = function() {
  pOutput.innerHTML = this.value;
}

var rSlider = document.getElementById("rateSlider");
var rOutput = document.getElementById("rateText");
rOutput.innerHTML = rSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
rSlider.oninput = function() {
  rOutput.innerHTML = this.value;
}


function reportExecuteScriptError(error) {
    console.error(`Failed to execute data content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "../script.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);