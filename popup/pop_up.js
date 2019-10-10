function listenForClicks() {

    document.addEventListener("click", (event) => {

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
}

function reportExecuteScriptError(error) {
    console.error(`Failed to execute data content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "../script.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);