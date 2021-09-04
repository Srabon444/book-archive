

/* -----------------------------------------------------
             Book Archive JavaScript code start
-------------------------------------------------------*/


// for styling toggle the loading indicator
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// for styling toggle the book result area
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

// set the search action message
let searchFeedbackMessage = document.getElementById('searchResultMessage');

// book search function
const searchBook = () => {

    // remove previous message
    searchFeedbackMessage.textContent = '';

    // get input text
    const inputValueText = document.getElementById("input-value");
    const inputValue = inputValueText.value;
    console.log(inputValue);


    // input field Error handle Message();
    if (inputValue == "") {
        searchFeedbackMessage.innerHTML = `<h1 class="text-danger">please input first!</h1>`
    }

    // fetching the data from the server
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data))

        // toggle spinner and search result data
        toggleSpinner('block');
        toggleSearchResult('none');

        // clear previous search input value
        inputValueText.value = '';
    }

}


// display books data
const displaySearchResult = data => {

    const searchResult = document.getElementById("search-result");

    // clear all previous search results
    searchResult.textContent = '';

    const { numFound, docs } = data;
    const total = docs.length || 0;

    // search result response 
    document.getElementById("searchResultMessage").innerHTML = `
        <h1> ${numFound} results founds! you got ${total} </h1>
        ` ;

    if (total === 0) {

        document.getElementById("searchResultMessage").innerHTML = `
            <h1 class="text-danger">no result found!</h1>
            
            <img src="/images/no-book-found.png" class="img-fluid" alt="no-book-found" />

        ` ;        


    }

    // for each loop with validation
    docs.forEach(doc => {
        console.log("my search result console", doc);
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
            
        <div class="card trans-card">
            <img src="https://covers.openlibrary.org/b/id/${doc.hasOwnProperty('cover_i') && doc.cover_i}-M.jpg" class="card-img-top w-50 mx-auto p-3" alt="${doc.hasOwnProperty('title') && doc.title.length && doc.title} cover">
            <div class="card-body fw-bold">
                <h5 class="card-title fw-bold">Book Name: ${doc.hasOwnProperty('title') && doc.title.length && doc.title}</h5>
                <p class="card-text"> Author Name: ${doc.hasOwnProperty('author_name') && doc.author_name.length && doc.author_name[0]}</p>
                <p>First publish date: ${doc.hasOwnProperty('publish_date') && doc.publish_date.length && doc.publish_date[0]}</p>
            </div>
        </div>
    `;
        searchResult.appendChild(div);
    });

    toggleSpinner('none');
    toggleSearchResult('');

}


// reloadPage function
const reloadPage = () => {
    window.location.reload();
}

/* -----------------------------------------------------
             Book Archive JavaScript code end
-------------------------------------------------------*/