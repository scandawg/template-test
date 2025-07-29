const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author is blank; if so, replace with "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }   
    
    // Check quote lengthto determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }    
    // Set quote, Hide loader
        quoteText.textContent = quote.text;
    complete();
    // console.log(quote);
}

// Get Quotes from API
async function getQuotes() {
    loading();
    // const apiURL = 'https://zenquotes.io/'
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        // Catch error here
    
        }
    }

// Tweet Tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
// alt-API URL: https://jacintodesign.github.io/quotes-api/data/quotes.json
// alt-API URL: https://zenquotes.io/

