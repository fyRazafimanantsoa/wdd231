// code-lab.js

// Code Lab: Run HTML code and preview
document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById('runButton');
  if (runButton) {
    runButton.addEventListener('click', function () {
      const code = document.getElementById('codeEditor').value;
      const preview = document.getElementById('preview');
      preview.innerHTML = code;
    });

    // Automatically run HTML code on page load
    window.addEventListener('load', function () {
      runButton.click();
    });
  }

  // Code Lab: Run JavaScript code and display output
  const runJSButton = document.getElementById('runJSButton');
  if (runJSButton) {
    runJSButton.addEventListener('click', function () {
      const jsCode = document.getElementById('jsEditor').value;
      try {
        let result = eval(jsCode);
        document.getElementById('jsOutput').textContent = (result !== undefined ? result : 'Code executed.');
      } catch (error) {
        document.getElementById('jsOutput').textContent = 'Error: ' + error;
      }
    });
  }
});
