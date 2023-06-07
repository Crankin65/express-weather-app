function search(){
  let img = document.querySelector('img');
  let searchTerm = document.querySelectorAll('#term');


  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=xkI99MwkjxO50PFDebxwvBPoYaWWvoAP&s=${searchTerm[0].value}`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response){
      img.src = response.data.images.original.url;
    })
    .catch(function(response){
      console.log("No image found")
    })
};

let searchButton = document.getElementById('Search');
searchButton.addEventListener("click", search);