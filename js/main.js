//wrapped in an immediately invoked function expression to avoid global variables
(function() {

    //^1000 signifies a one second delay
    var responses = ["You find yourself in the land of the fabled 'American dream' but the dream is turning sour. ^1000 <br/><br/> Do you want to remain here? ^1000 <div class='the-options'> <div class='1 option'>Of course!</div> <div class='2 option'> No </div> </div>", 
        "You go for countless job interviews but without a visa the search is futile. ^1000<br/> There may be a solution... ^1000 <br/> A friend has proposed a marriage arrangement. ^1000 <br/> For $10,000 you could be married to a US citizen. ^1000 <br/> What do you say?  <div class='the-options'> <div class='3 option'> I do. </div> <div class='4 option'> Fuck that shit. </div> </div>",
        "<div class='game-over'>For real?!...^1000<br/>You really don't want to live in a country where 2 year olds shoot their mothers at the supermarket?!...^1000<br/> You are admitted to a mental hospital...^1000 </div>",
        "<div class='game-over'>You borrow $10,000, have a 'wedding' and study dilligently in advance of the immigration interview. ^1000 <br/> But you fail the interview when you can't remember the colour of your 'husband's' toothbrush. ^1000 <br/> You are forced to leave the country. ^1000 </div>",
        "Well there are still other options...^1000 <br/> Do you have $1,000,000 to invest? ^1000 <br/> <div class='the-options'> <div class='5 option'> No, but I'm willing to take some risks to acquire it. </div> <div class='6 option'> As if! </div> </div>", 
        "<div class='game-over'>You begin to accumulate the required capital through committing identity theft. ^1000 <br/> The obscene wealth you are amassing may not buy you happiness but it will buy you a visa...^1000 <br/> So close, but yet so far... ^1000 <br/> You have been caught by the FBI. ^1000 <br/> You are set to join the world's largest prison population for 6 years. ^1000 </div>",
        "<div class='game-over'>Last chance! ^1000 <br/> You enter the green card lottery and wait patiently... ^1000 <br/> Of course you don't win. Only 50,000 are given out each year... ^1000 </div>",
        "GAME OVER. ^1000<br/><br/> Want to play again? ^1000 <br/>There's no point. ^1000 <br/>The outcome will never change. ^1000 <br/><br/><br/><br/>You can check out the code for this game <a href='https://github.com/amymc/cyoa'>here</a> if you're into that sort of thing."];

    var optionSelected,
        typingComplete = true;

    $(window, ".option").keydown(function (event) {
        var option = $('.option');

        //text will only be typed when typingcomplete === true
        //this prevents animation from starting when previous animation is still in progress
        if (event.which === 13 && typingComplete === true) {//enter key

            if(optionSelected){
                //get the index of the next response to be displayed from the class name of the current option
                var next_response = $(optionSelected).attr('class').split(" ")[0];
                nextText(responses[next_response]);
            } 
            //if no optionSelected it means the player is on the intro page 
            //so the next reponse will be the first element in the array
            else {
                nextText(responses[0]);
            }
        }
        else{
            if(event.which === 40){//down arrow
                optionSelected.removeClass('selected');
                var next = optionSelected.next();
                if(next.length > 0){
                    optionSelected = next.addClass('selected');
                }
                //if next.length === 0 it means we are at the end
                //so go back to the begining and select the first option
                else{
                    optionSelected = option.eq(0).addClass('selected');
                }      
            }
            else if(event.which === 38){//up arrow
                optionSelected.removeClass('selected');
                var prev = optionSelected.prev();
                if(prev.length > 0){
                    optionSelected = prev.addClass('selected');
                }
                //if prev.length === 0 it means we are at the beginning
                //so go back to the bottom and select the last option
                else{
                    optionSelected = option.eq(1).addClass('selected');
                }
            } 
        }
        
    });

    function nextText(response){
        //set typingComplete to false to prevent any further animation until the current animation is finished
        typingComplete = false;
        $(function(){
            $(".element").typed({
                strings: [response],
                showCursor: false,
                typeSpeed: 20,
                callback: onAnimationEnd
            });
            //response = [];
        });
    }

    function onAnimationEnd() {
        
        //set typingComplete back to true to allow for further animation to occur
        typingComplete = true;
        //set first option as selected by default
        optionSelected = $('.option').eq(0).addClass('selected');

        //if screen contains a 'game-over' div then take the player to the final screen
        if ($(".game-over").length === 1){
            nextText(responses[responses.length-1]);
        }
    }

})();