async function deleteName(ref) {
    const sentence = $(ref).text();
    const letters = sentence.split("");

    let i = 0;
    while (letters.length > 0) {
        await pause(100);
        letters.pop();
        $(ref).html(letters.join(""));
    }
}

async function typeName(name, remove, ref) {
    await pause(500);
    const letters = name.split("");

    let i = 0;
    while (i < letters.length) {
        await pause(100);
        $(ref).append(letters[i]);
        i++;
    }

    if (remove == true) {
        await pause(2000);
        deleteName(ref);
    } else {
        await pause(700);
        document.querySelector(".main-wrapper").classList.add("fade-in");
        executeWordChange();
        return;
    }

    await pause(1000);
    typeName("E-man", false, ".home-name");
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {
    typeName("Emmanuel", true,".home-name");
});

function executeWordChange() {
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
        
        if(idx == words.length - 1) {
            idx = 0;
        } else {
            idx++;
        }
        
        setTimeout(changeWord, 3000);
    }  
    
    changeWord();
}
  
  