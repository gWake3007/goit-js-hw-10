import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";


// Dom
    const breedSelect = document.querySelector(".breed-select");
    const catInfo = document.querySelector(".cat-info");
    const loader = document.querySelector(".loader");
 
// Event listener 

breedSelect.addEventListener("change", fetchCatInfo);


// Fetch the list of breed

fetchBreeds()
.then((data) => renderMarkup(data))
.catch(() => {

    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
});


//Render the list 

function renderMarkup(data) {
  
    // const breeds = data;
    breedSelect.classList.remove("hidden");
    loader.classList.add("hidden");
    
    breedSelect.innerHTML = data.reduce((html,el) => {
        return html+`<option value="${el.id}">${el.name}</option>`
      },"");
    
}

//Fetch elements on the list 

function fetchCatInfo() {

    catInfo.classList.add("hidden");
     loader.classList.remove("hidden");

    const selectedValue = breedSelect.value;

    fetchCatByBreed(selectedValue)
    .then((data) => renderCatInfo(data))
    .catch(() => {

        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    });
}

//Rendering elements on the lists

function renderCatInfo(data) {
    
    catInfo.classList.remove("hidden");
    loader.classList.add("hidden");
    

    const name = data[0].breeds[0].name;
    const description = data[0].breeds[0].description;
    const temperament = data[0].breeds[0].temperament;
   
    const markup = `<img src="${data[0].url}" alt="${name}" width="350">
    <div>
    <h3>${name}</h3>
        <p>${description}</p>
        <p><span class="temper">Temperament: </span>${temperament}</p>
        </div>`
    catInfo.innerHTML = markup;
}