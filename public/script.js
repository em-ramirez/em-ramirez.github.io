// function pause(X) => pause for X milliseconds
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function cycleWords() => cycle words
function cycleWords() {
    const words = document.querySelector(".animate-word").children,
    textOutTimer = 2800;
    
    let idx = 0;
    function changeWord() {
        for (let i = 0; i < words.length; i++) {
            words[i].classList.remove("change-word", "change-word2");
        }
        words[idx].classList.add("change-word");
        
        setTimeout(function(){
            words[idx].classList.add("change-word2");
        }, textOutTimer);
        
        idx = idx == words.length - 1 ? 0 : idx + 1;
        
        setTimeout(changeWord, 2500);
    }  
    
    changeWord();
}

// function deleteWord(X) => delete words located at html reference X
async function deleteWord(ref) {
    const sentence = $(ref).text();
    const words = sentence.split(" ");

    // get last word since that corresponds to the name
    const nameLetters = words[words.length - 1].split("");
    words.pop();

    let i = 0;
    while (nameLetters.length > 0) {
        await pause(80);
        nameLetters.pop();
        words.push(nameLetters.join(""))
        $(ref).text(words.join(" "));
        words.pop();
    }
}

// function typeWord(A, B, C) => type word A into html reference B. Remove it based on flag C
async function typeWord(name, ref, remove) {
    await pause(500);
    const letters = name.split("");

    let i = 0;
    while (i < letters.length) {
        await pause(50);
        $(ref).append(letters[i]);
        i++;
    }

    if (remove == true) {
        await pause(500);
        deleteWord(ref);
    } else {
        await pause(200);
        
        $(document).ready(function () {
            $('.fade-in-wrapper').addClass('fade-in'); 
        });

        if ($('body').is('#index')) {
            cycleWords();
            // not-so-strict check to see if user is on computer vs. phone
            if (screen.orientation.type == 'landscape-primary') {
                document.querySelector("body#index").classList.add("svg");
            }
        }
        return;
    }

    await pause(1000);
    typeWord("Eman", ".home-name", false);
}

const fetchImages = async () => {
    try {
        // const response = await fetch('http://localhost:3000/api/images');
        const response = await fetch('/api/images');
        console.log("fetched images...");
        var data = await response.json();

        // Shuffle the array of images to get random order
        const shuffledImages = shuffleArray(data);
        // Get the first 10 images after shuffling
        const randomImages = shuffledImages.slice(0, 10);

        images = randomImages.sort((a, b) => {
            if (a.width > b.width) {
                return -1;
              }
        });

        renderImages(images);
    } catch(error) {
        console.error('Error retrieving images: ', error);
    }
}

// Fisher-Yates Shuffle Algorithm to randomize an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

const renderImages = (images) => {
    const filmWrapper = document.getElementById('film-wrapper')

    images.forEach((image, idx) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = "image-item"
        wrapperDiv.style.marginTop = '3rem';
        wrapperDiv.style.float = 'left';

        const imgElement = document.createElement('img');
        imgElement.className = "image";
        imgElement.style.objectFit = 'cover';
        imgElement.alt = image.context.custom.alt
        imgElement.src = image.secure_url;

        if (idx == images.length - 1) {
            imgElement.style.paddingBottom = "10%";
        }

        console.log("image width: ", image.width);

        if (image.width < 1545) {
            imgElement.classList.add("portrait");
        } else {
            imgElement.classList.add("landscape");
        }

        const imgDetails = document.createElement('div');
        imgDetails.className = "image-details";

        const imgLoc = document.createElement('p');
        imgLoc.textContent = image.context.custom.Location;

        const imgDate = document.createElement('p');
        imgDate.textContent = image.context.custom.Date;

        imgDetails.appendChild(imgLoc);
        imgDetails.appendChild(imgDate);

        wrapperDiv.appendChild(imgElement);
        wrapperDiv.appendChild(imgDetails);
        filmWrapper.appendChild(wrapperDiv);
    });
}

$(document).ready(function() {
    if ($('body').is('#index')) {
        typeWord("Hey, I'm Emmanuel", ".home-name", true);
    }
    else if ($('body').is('#resume')) {
        typeWord("Resume", ".home-name", false);
    }
    else if ($('body').is('#film')) {
        typeWord("Film", ".home-name", false);
        fetchImages();
    }
});
  