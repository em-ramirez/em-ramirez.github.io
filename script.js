function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function deleteName(ref) {
    const sentence = $(ref).text();
    const words = sentence.split(" ");
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

async function typeName(name, remove, ref) {
    await pause(500);
    const letters = name.split("");

    let i = 0;
    while (i < letters.length) {
        await pause(80);
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

$(document).ready(function() {
    typeName("Hey, I'm Emmanuel", true,".home-name");
});
  