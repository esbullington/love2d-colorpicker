
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log("Async: Copying to clipboard was successful!");
    },
    function(err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return { 
		r: (parseInt(result[1], 16)*1/255).toFixed(2),
		g: (parseInt(result[2], 16)*1/255).toFixed(2),
		b: (parseInt(result[3], 16)*1/255).toFixed(2)
	};
}

const resultElem = document.getElementById("result");
const colorPicker = document.getElementById("colorPicker");
const resultButton = document.getElementById("resultButton");
const fullResultButton = document.getElementById("fullResultButton");

var resultHolder;
var fullResultHolder;

resultButton.onclick = function(e) {
  copyTextToClipboard(resultHolder);
}

fullResultButton.onclick = function(e) {
  copyTextToClipboard(fullResultHolder);
}

colorPicker.oninput = function(e) {
  const rgb = hexToRgb(e.target.value);
  resultHolder = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  resultElem.textContent = `r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}`;
}

colorPicker.onchange = function(e) {
  const rgb = hexToRgb(e.target.value);
  console.log("Color submitted: ", rgb);
  resultHolder = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  fullResultHolder = `love.graphics.setColor(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
