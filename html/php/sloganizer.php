<?php

$string = file_get_contents("../js/sloganizer/sloganizer_data.js");
$json_a = json_decode($string, true);
//var_dump($json_a);

$phrases = $json_a['phrases'];
//var_dump($phrases);
$sentences = $json_a['sentences'];
//var_dump($sentences);


function randomNumberUpTo($theVal){
    $randomval = rand(0, $theVal-1);
    //echo("random = ".$randomval."</br>");
    return $randomval;
}

function getRandomValueFromArray($theArray) {
    //var_dump($theArray);
    //echo("</br>");
    $arraySize = count($theArray);
    //echo("arraySize = ".$arraySize."</br>");
    return $theArray[randomNumberUpTo($arraySize)];
}

function getSentence() {
    global $sentences;
    return getRandomValueFromArray($sentences);
}


function expand_text($text_to_expand){

    global $phrases;

    $slen = strlen($text_to_expand);

    $processedSentence = "";
    $word = "";
    $isHash = false;

    for ($pos = 0; $pos < $slen; $pos++)
    {
        $c = substr($text_to_expand,$pos,1);


        if($c == "#"){
            $isHash = true;
            $c=""; // abandon hash we don't want it in the word
        }

        if($c!=" "){
            //echo($c);
            $word = $word.$c;
            //echo($word);
        }


        if($c==" " || ($pos+1)==$slen ){ // space or last char
            // process word
            //console.log(word);

            if($isHash){
                //console.log("EXPAND IT");
                //$expandThis = $phrases[$word];
                if(!array_key_exists($word, $phrases)){
                    echo("Cannot find key: ".$word);
                }else {
                    $word = expand_text(getRandomValueFromArray($phrases[$word]));
                }
            }

            //console.log(word);
            $processedSentence = $processedSentence.$word." ";

            $word = "";
            $isHash=false;
        }
    }

    //echo($processedSentence);
    return $processedSentence;
}



function removeExtraSpaces($text_to_process){

    $slen = strlen($text_to_process);

    $processedSentence = "";
    $c ="";
    $last_c ="";

    for ($pos = 0; $pos < $slen; $pos++)
    {
        $c = substr($text_to_process,$pos,1);

        if($c == " " && $last_c ==" "){
            $c=""; // abandon it
        }else{
            $last_c = $c;
        }

        $processedSentence = $processedSentence.$c;

    }

    return $processedSentence;
}





function removeSpacesAtStart($text_to_process){

    $slen = strlen($text_to_process);

    $processedSentence = "";
    $hitText=false;

    for ($pos = 0; $pos < $slen; $pos++)
    {
        $c = substr($text_to_process,$pos,1);

        if($c == " " && $hitText==false){
            $c=""; // abandon it
        }else{
            $hitText=true;
        }

        $processedSentence = $processedSentence.$c;

    }

    return $processedSentence;
}

//http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter($text_to_process) {
    return strtoupper(substr($text_to_process, 0, 1)).(substr($text_to_process,1));
}




function removeSpacesBeforePunctuation($text_to_process){

    $slen = strlen($text_to_process);

    $processedSentence = "";
    $spaceToAdd=false;

    $punctuation = "/[\.\,\!,\?]/";

    for ($pos = 0; $pos < $slen; $pos++)
    {
        $c = substr($text_to_process,$pos,1);

        if($c == " "){
            $spaceToAdd=true;
            $c=""; // abandon it
        }else{
            // is it punctuation?
            if(preg_match($punctuation, $c)){
                $spaceToAdd=false;
            }

            if($spaceToAdd){
                $processedSentence = $processedSentence." ";
                $spaceToAdd=false;
            }

            $processedSentence = $processedSentence.$c;
        }
    }
    return $processedSentence;
}




function process_sentence($sentence){
    $processedSentence = expand_text($sentence);
    $processedSentence = removeExtraSpaces($processedSentence);
    $processedSentence = removeSpacesAtStart($processedSentence);
    $processedSentence = removeSpacesBeforePunctuation($processedSentence);
    $processedSentence = capitalizeFirstLetter($processedSentence);
    return $processedSentence;
}




function random_sentence(){

    $sentence = getSentence();

    return process_sentence($sentence);
}

function random_sentence_as_json(){

    $sentence = random_sentence();
    $json_to_return = array('slogan' => $sentence);

    return json_encode($json_to_return);
}

echo(random_sentence_as_json());
?>