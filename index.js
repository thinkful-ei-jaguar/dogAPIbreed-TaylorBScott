'use strict';

function getDogImage(type) {
  fetch(`https://dog.ceo/api/breed/${type}/images/random`)
    .then(response => { 
        if (response.ok === false) {
            return response.json().then(err => Promise.reject(err));
        } 
        return response.json();
    })
    .then(responseJson => {
        displayAllThePuppies(responseJson)
    })
    .catch(error => {
        console.log(error);
        breedDoesNotExist(error)
    });
}

function displayAllThePuppies (responseJson) {
    $('.results').append('<img class="results-img" alt="placeholder">');

    $('.results-img').attr('src', responseJson.message);

    $('.results').removeClass('hidden');
    
    console.log(responseJson);
}

function breedDoesNotExist (error) {
    $('.results').append(`<h2>${error.message}</h2>`);
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let desiredType = $('.breedBar').val();
        console.log(desiredType);
        getDogImage(desiredType);
        });
}
      
$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});