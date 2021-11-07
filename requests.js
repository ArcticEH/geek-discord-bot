/**
 * Responsible for handling api requests
 * Includes requests related to both Rick and Morty API and DnD API
 */

const axios = require('axios');

// Rick and Morty Endpoints
const ramRoot = "https://rickandmortyapi.com/api/";

/**
 * Finds character by name and status
 * @param {The name of the character} name 
 * @param {Alive, Dead, or Unknown} status 
 * @returns Formatted string response
 */
async function characterNameAndStatus(name, status) {
    try {
        // Facilitate request
        let data = []
        let response = await axios.get(ramRoot + `character/?name=${name}&status=${status}`);
        data = response.data.results;

        // Add all pages to data
        while (response.data.info.next) {
            response = await axios.get(response.data.info.next);
            data.concat(response.data.results);
        }


        // Formulate response
        let reply = `${data.length} characters were found: \n`
        for (let i = 0; i < data.length; i++) {
            if (i !== data.length - 1) {
                reply += data[i].name + ", ";
            } else {
                reply += data[i].name + "."
            }
        }

        return reply;

    } catch (err) {

        // Return response with zero results 
        return "0 characters were found. Be sure you formatted your request properly."
    }
}

/**
 * Finds location by name and type
 * @param {The name of the location} name 
 * @param {The type of the planet (ex. Planet)} type 
 * @returns Formatted string response
 */
async function locationNameAndType(name, type) {
    try {
        // Facilitate request
        let data = []
        let response = await axios.get(ramRoot + `location/?name=${name}&type=${type}`);
        data = response.data.results;

        // Add all pages to data
        while (response.data.info.next) {
            response = await axios.get(response.data.info.next);
            data.concat(response.data.results);
        }


        // Formulate response
        let reply = `${data.length} locations were found: \n`
        for (let i = 0; i < data.length; i++) {
            if (i !== data.length - 1) {
                reply += data[i].name + ", ";
            } else {
                reply += data[i].name + "."
            }
        }

        return reply;

    } catch (err) {
        // Return response with zero results 
        return "0 locations were found. Be sure you formatted your request properly."
    }
}

/**
 * Finds episode details by episode number
 * @param {The number of the episode} number 
 * @returns Formatted string response
 */
async function episodeNumber(number) {
    try {
        // Facilitate request        
        let response = await axios.get(ramRoot + `episode/${number}`);
        let data = response.data;

        // Formulate response
        let reply = "Episode found:\n"
        reply += `Name: ${data.name} \nAir Date: ${data.air_date} \nSeason: ${data.episode}`

        return reply;

    } catch (err) {

        // Return response with zero results 
        return `Episode ${number} does not exist. Be sure you formatted your request properly.`
    }
}

// DnD Endpoints
const dndRoot = "https://www.dnd5eapi.co/api/";

/**
 * Finds class level up details by class and number
 * @param {The class name} charClass 
 * @param {The level-up level} level 
 * @returns Formatted string response
 */
async function classAndLevel(charClass, level) {
    try {
        // Facilitate request        
        let response = await axios.get(dndRoot + `classes/${charClass}/levels/${level}`);
        let data = response.data;

        // Formulate response
        console.log(data)
        let reply = `Ability score bonus: ${data.ability_score_bonuses}\nProficiency bonus: ${data.prof_bonus}\nFeatures: `
        for (let i = 0; i < data.features.length; i++) {
            if (i !== data.features.length - 1) {
                reply += data.features[i].name + ", ";
            } else {
                reply += data.features[i].name + "."
            }
        }
        return reply;

    } catch (err) {
        // Return response with zero results 
        return "No results for class and level combination. Be sure you formatted your request properly."
    }
}

/**
 * Finds all monsters with challenge rating
 * @param {The challenge rating} rating 
 * @returns Formatted string response
 */
async function monsterRating(rating) {
    try {
        // Facilitate request        
        let response = await axios.get(dndRoot + `monsters?challenge_rating=${rating}`);
        let data = response.data;

        // Formulate response
        let reply = `Found ${data.results.length} monsters:\n`
        for (let i = 0; i < data.results.length; i++) {
            if (i !== data.results.length - 1) {
                reply += data.results[i].name + ", ";
            } else {
                reply += data.results[i].name + "."
            }
        }

        return reply;

    } catch (err) {
        // Return response with zero results 
        return "Could not find any monsters with that rating. Be sure you formatted your request properly."
    }
}

module.exports = {
    characterNameAndStatus,
    locationNameAndType,
    episodeNumber,
    classAndLevel,
    monsterRating
}