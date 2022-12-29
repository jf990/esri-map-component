/**
 * Function to call on page load to set my secret on the page before loading the modules. This is done
 * so that I don't put the keys in the html file itself and then commit it to github. Change `YOUR_API_KEY`
 * with your own API key, then rename this file to secret.js. Make sure it is listed in .gitignore.
 */
(function() {
  const API_KEY = "YOUR_API_KEY";
  document.getElementById("mapview").setAttribute("apikey", API_KEY);
  document.getElementById("sceneview").setAttribute("apikey", API_KEY);
})();
