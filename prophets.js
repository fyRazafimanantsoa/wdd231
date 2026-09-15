//the url to fetch the data from.
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data.prophets);
        displayProphetes(data.prophets);
    } catch (error) {
        console.log("failed: ", error);
    }
    
}

getProphetData();

const displayProphetes = (prophets) =>{
    prophets.forEach(prophet => {
        const section = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        

    });

};