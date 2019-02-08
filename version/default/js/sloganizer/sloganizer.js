/**
 * Moved code from index into here to make it easier to re-use on different platforms
 */


// this code just cares isthere a sentences and phrases array somewhere


function getSentence() {
    return getRandomValueFromArray(sentences);
}


function random_sentence(){

    var sentence = getSentence();

    return process_sentence(sentence);
}



function randomNumberUpTo(theVal){
    return Math.floor(Math.random() * theVal)
}
function getRandomValueFromArray(theArray) {
    return theArray[randomNumberUpTo(theArray.length)];
}


function expand_text(text_to_expand){

    var slen = text_to_expand.length;

    var processedSentence = "";
    var word = "";
    var isHash = false;

    for (var pos = 0; pos < slen; pos++)
    {
        var c = text_to_expand.charAt(pos);

        if(c == "#"){
            isHash = true;
            c=""; // abandon hash we don't want it in the word
        }

        if(c!=" "){
            word = word + c;
        }

        if(c==" " || (pos+1)==slen ){ // space or last char
            // process word
            //console.log(word);

            if(isHash){
                //console.log("EXPAND IT");
                var expandThis = phrases[word];
                if(expandThis===undefined){
                    console.log("Cannot find key: " +  word);
                }
                word = expand_text(getRandomValueFromArray(expandThis));
            }

            //console.log(word);
            processedSentence = processedSentence + word + " ";

            word = "";
            isHash=false;
        }
    }

    return processedSentence;
}

function removeExtraSpaces(text_to_process){

    var slen = text_to_process.length;

    var processedSentence = "";
    var c ="";
    var last_c ="";

    for (var pos = 0; pos < slen; pos++)
    {
        c = text_to_process.charAt(pos);

        if(c == " " && last_c ==" "){
            c=""; // abandon it
        }else{
            last_c = c;
        }

        processedSentence = processedSentence + c;

    }

    return processedSentence;
}

function removeSpacesAtStart(text_to_process){

    var slen = text_to_process.length;

    var processedSentence = "";
    var hitText=false;

    for (var pos = 0; pos < slen; pos++)
    {
        c = text_to_process.charAt(pos);

        if(c == " " && hitText===false){
            c=""; // abandon it
        }else{
            hitText=true;
        }

        processedSentence = processedSentence + c;

    }

    return processedSentence;
}

//http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(text_to_process) {
    return text_to_process.charAt(0).toUpperCase() + text_to_process.slice(1);
}

function removeSpacesBeforePunctuation(text_to_process){

    var slen = text_to_process.length;

    var processedSentence = "";
    var spaceToAdd=false;

    var punctuation = /[\.\,\!,\?]/;

    for (var pos = 0; pos < slen; pos++)
    {
        c = text_to_process.charAt(pos);

        if(c == " "){
            spaceToAdd=true;
            c=""; // abandon it
        }else{
            // is it punctuation?
            if(punctuation.test(c)){
                spaceToAdd=false;
            }

            if(spaceToAdd){
                processedSentence = processedSentence + " ";
                spaceToAdd=false;
            }

            processedSentence = processedSentence + c;
        }
    }
    return processedSentence;
}




function process_sentence(sentence){
    var processedSentence = expand_text(sentence);
    processedSentence = removeExtraSpaces(processedSentence);
    processedSentence = removeSpacesAtStart(processedSentence);
    processedSentence = removeSpacesBeforePunctuation(processedSentence);
    processedSentence = capitalizeFirstLetter(processedSentence);
    return processedSentence;
}

// To create the date for other apps
//var stringify = {phrases, sentences};
//JSON.stringify(stringify);


