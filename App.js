//this is a global array that will have quotes from the api inside it after calling the getQuote() function
let quotes = [];

//selecting the elements from html
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote em');
const newQuoteBtn = document.querySelector('button');
const twitterBtn = document.querySelector('img');
const authorText = document.querySelector('.author em');
const popUp = document.querySelector('.pop-up');
const okBtn = document.querySelector('.pop-up button');
const popUpMessage = document.querySelector('#pop-up-message');
const overlay = document.querySelector('#overlay');
const loader = document.querySelector('#loader');
const quoteSection = document.querySelector('.quote-section');

//show loader
const showLoader = () => {
    loader.hidden = false;
    quoteContainer.classList.add('invisible');
}

//removing loader from document
const removeLoader = () => { 
    loader.hidden = true;
    quoteContainer.classList.remove('invisible');
}

//function to show a pop up
function showPopUp(content) {
    popUpMessage.textContent = content;
    popUp.classList.remove('vanish');
    overlay.classList.add('active');
}

//generating new quotes
const getNewQuote = (quotesArr) => {
    showLoader();
    //random index for getting random quotes form the quotes array
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotesArr[index];

    //if author quote is blank then replacing with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'unknown'
    } else {
        authorText.textContent = quote.author;
    }
    

    if (quote.text.length > 50) {
        quoteText.classList.add('long-text')
    } else {
        quoteText.classList.remove('long-text')
    }

    //setting and showing the quotes
    quoteText.textContent = quote.text;
    removeLoader();
}

// getting data from API
const fetchQuotes = async () => {
    //loading before the axios fetches the api
    showLoader();
    try {
        const url = 'https://type.fit/api/quotes';
        const response = await axios.get(url);
        quotes = response.data;
        getNewQuote(quotes);
    }
    catch (error) {
        const errMessage = error.message;
        showPopUp(errMessage + " pls check your connection again")
    }
}


//function to delete the pop up
function deletePopUp() {
    popUp.classList.add('vanish');
    overlay.classList.remove('active');
}

function showOverlay() {
    overlay.classList.add('active');
    overlay.addEventListener('click', deletePopUp)
}

//Tweeting quotes function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    if (!quoteText.innerText.length && !authorText.innerText.length) {
        showPopUp('There must be some quotes and the corresponding author');
        showOverlay();
    } else {
        window.open(twitterUrl, '_blank')
    }
}

//author's description
function getAuthorDescription() {
    const googleSearchUrl = `https://www.google.com/search?q=${authorText.innerText}`
    if (authorText.innerText === 'unknown') {
        showPopUp('You cannot search for unknow author');
        showOverlay();
    } else {
        window.open(googleSearchUrl, '_blank')
    }
}

//on load
fetchQuotes();  


//event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', fetchQuotes);
authorText.addEventListener('click', getAuthorDescription)
okBtn.addEventListener('click', deletePopUp)