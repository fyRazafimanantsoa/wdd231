// HTML Code Lab functionality
document.getElementById('runButton').addEventListener('click', function() {
    const code = document.getElementById('codeEditor').value;
    const preview = document.getElementById('preview');
    preview.innerHTML = code;
  });
  
  // Run the HTML code automatically on page load
  window.addEventListener('load', function() {
    document.getElementById('runButton').click();
  });
  
  // JavaScript Basics functionality
  document.getElementById('runJSButton').addEventListener('click', function() {
    const jsCode = document.getElementById('jsEditor').value;
    try {
      let result = eval(jsCode);
      document.getElementById('jsOutput').textContent = (result !== undefined ? result : "Code executed.");
    } catch (error) {
      document.getElementById('jsOutput').textContent = "Error: " + error;
    }
  });
  