function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}

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

document.onmouseup = document.onkeyup = document.onselectionchange = function() {
  document.getElementById("inputarea").value = getSelectionText();
  console.log(getSelectionText());
};

document.getElementById("myBtn").addEventListener("click", displayDate);