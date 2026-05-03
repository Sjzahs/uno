class special_map {
    constructor(name, callback){
        this.map = new Map();
        this.name = name;
        this.callback = callback;
    }
    set(card_name, value){
        this.map.set(card_name, value);
        this.callback(this.name); // run function whenever cards are changed
    }
    get(card_name) {
        return this.map.get(card_name);
    }
    use(card_name) {
        this.map.set(card_name, this.map.get(card_name) - 1);
        console.log(this.map.get(card_name));
        console.log("has used "+card_name);
        this.callback(this.name);
    }
}



const cards = new special_map("cards", on_map_update);
const p1cards = new special_map("p1cards", on_map_update);
const p2cards = new special_map("p2cards", on_map_update);
let current_discard_card = "";
let turn = "";

document.addEventListener("DOMContentLoaded", () => {

    set_cards();
    deal_cards();
    let discard_card = "";
    do {
        discard_card = gen_card()
    } while (cards.get(discard_card) === 0);
    add_discard_card(discard_card);
    turn = "p1";
    play_card_detection();
});





function play_card_detection(){
    const unocardbuttons = document.querySelectorAll(".uno-card-button");
    for (const unocardbutton of unocardbuttons){
        console.log(unocardbutton.classList);
        unocardbutton.addEventListener("click", function(playcard) {
                let cardname = ""
                for (const className of unocardbutton.classList){
                    if (className.length === 4){ // to find the class that contains the cardname, as the only 4 character class name is that. could use regex
                        cardname = className;
                    }
                }
                console.log(cardname);
                if (cardname[3] === turn[1]){
                    console.log("adding discard card");
                    if (valid_card(cardname[0] + cardname[1])){
                        console.log("valid card!");
                        add_discard_card(cardname[0]+cardname[1]);
                        if (cardname[3] === "1"){
                            console.log(cardname[0] + cardname[1]);
                            p1cards.use(cardname[0] + cardname[1]);
                            turn = "p2";
                            play_card_detection();
                        }
                        else if (cardname[3] === "2"){
                            p2cards.use(cardname[0] + cardname[1]);
                            turn = "p1";
                            play_card_detection();
                        }
                    }
                    else{
                        console.log("invalid card");
                    }
                }
            }
        );
    }
}

function on_map_update(map){ // update graphics to match cards
    if (map === "p1cards" || map === "p2cards"){
        const list1= document.querySelector('.ul1');
        const list2= document.querySelector('.ul2');
        list2.replaceChildren(); // so duplicate cards aren't added
        list1.replaceChildren();
        for (const [key, value] of p1cards.map) {
            for (let i = 0; i < value; i++) {
                const li = document.createElement("li");
                li.classList.add(key + "p1");
                const div1 = document.createElement("div");
                div1.classList.add("card");
                div1.style.width = "18rem";
                const div2 = document.createElement("div");
                div2.classList.add("card-body");
                const h5 = document.createElement("h5");
                h5.classList.add("card-title");
                if (key[0] === "r"){
                    h5.textContent = "Red ";
                    div1.classList.add("bg-danger");
                } else if (key[0] === "b"){
                    h5.textContent = "Blue ";
                    div1.classList.add("bg-primary");
                } else if (key[0] === "g"){
                    h5.textContent = "Green ";
                    div1.classList.add("bg-success");
                } else if (key[0] === "y"){
                    h5.textContent = "Yellow ";
                    div1.classList.add("bg-warning");
                }
                h5.textContent += key[1];

                const but = document.createElement("button");
                but.classList.add("btn");
                but.classList.add("btn-dark");
                but.classList.add("uno-card-button");
                but.classList.add(key + "p1");
                but.type = "button";
                but.textContent = "play";
                div2.appendChild(h5);
                div2.appendChild(but);
                div1.appendChild(div2);
                li.appendChild(div1);
                list1.appendChild(li);
            }
        }
        console.log("has finished loop");
        for (const [key,value] of p2cards.map){
            for (let j = 0; j < value; j++) {
                const li = document.createElement("li");
                li.classList.add(key + "p2");
                const div1 = document.createElement("div");
                div1.classList.add("card");
                div1.style.width = "18rem";
                const div2 = document.createElement("div");
                div2.classList.add("card-body");
                const h5 = document.createElement("h5");
                h5.classList.add("card-title");
                if (key[0] === "r"){
                    h5.textContent = "Red ";
                    div1.classList.add("bg-danger");
                } else if (key[0] === "b"){
                    h5.textContent = "Blue ";
                    div1.classList.add("bg-primary");
                } else if (key[0] === "g"){
                    h5.textContent = "Green ";
                    div1.classList.add("bg-success")
                } else if (key[0] === "y"){
                    h5.textContent = "Yellow ";
                    div1.classList.add("bg-warning");
                }
                h5.textContent += key[1];

                const but = document.createElement("button");
                but.classList.add("btn");
                but.classList.add("btn-dark");
                but.classList.add("uno-card-button");
                but.classList.add(key + "p2");
                but.type = "button";
                but.textContent = "play";
                div2.appendChild(h5);
                div2.appendChild(but);
                div1.appendChild(div2);
                li.appendChild(div1);
                list2.appendChild(li);
            }
        }
        console.log("has finished loop p2");
    }
}


function deal_cards() {
    let card3 = "";

    for (let i = 0; i < 7; i++) {
        do {
            card3 = gen_card();
        } while (cards.get(card3) === 0);
        give_card(card3, p1cards);
    }
    for (let j = 0; j < 7; j++) {
        do {
            card3 = gen_card();
        } while (cards.get(card3) === 0);
        give_card(card3, p2cards);
    }

    for (const [key, value] of p1cards.map) {
        if (value !== 0) {
            console.log(key, value);
        }
    }
  //  on_map_update(p1cards);
    console.log("deal_cards() has ran")


}

function valid_card(card_name){
    if (card_name[0] === current_discard_card[0]){
        return true;
    }
    else if (card_name[1] === current_discard_card[1]){
        return true;
    }
    else {
        return false;
    }

}


function gen_card(){
    let x = Math.floor(Math.random() * 4);
    let letter = "";
    if (x===0){
        letter = "r"
    } else if (x===1){
        letter = "g"
    } else if (x===2){
        letter = "b"
    } else if (x===3){
        letter = "y"
    }
    x = Math.floor(Math.random() * 10);
    return letter + x;
}
function give_card(given_card, player) {
    cards.set(given_card, cards.get(given_card) - 1);
    player.set(given_card, player.get(given_card) + 1);
}

function set_cards(){

    cards.set("r0",  2);
    cards.set("r1",  2);
    cards.set("r2",  2);
    cards.set("r3",  2);
    cards.set("r4",  2);
    cards.set("r5",  2);
    cards.set("r6",  2);
    cards.set("r7",  2);
    cards.set("r8",  2);
    cards.set("r9",  2);

    cards.set("g0",  2);
    cards.set("g1",  2);
    cards.set("g2",  2);
    cards.set("g3",  2);
    cards.set("g4",  2);
    cards.set("g5",  2);
    cards.set("g6",  2);
    cards.set("g7",  2);
    cards.set("g8",  2);
    cards.set("g9",  2);

    cards.set("b0",  2);
    cards.set("b1",  2);
    cards.set("b2",  2);
    cards.set("b3",  2);
    cards.set("b4",  2);
    cards.set("b5",  2);
    cards.set("b6",  2);
    cards.set("b7",  2);
    cards.set("b8",  2);
    cards.set("b9",  2);

    cards.set("y0",  2);
    cards.set("y1",  2);
    cards.set("y2",  2);
    cards.set("y3",  2);
    cards.set("y4",  2);
    cards.set("y5",  2);
    cards.set("y6",  2);
    cards.set("y7",  2);
    cards.set("y8",  2);
    cards.set("y9",  2);

    p1cards.set("r0",  0);
    p1cards.set("r1",  0);
    p1cards.set("r2",  0);
    p1cards.set("r3",  0);
    p1cards.set("r4",  0);
    p1cards.set("r5",  0);
    p1cards.set("r6",  0);
    p1cards.set("r7",  0);
    p1cards.set("r8",  0);
    p1cards.set("r9",  0);

    p1cards.set("g0",  0);
    p1cards.set("g1",  0);
    p1cards.set("g2",  0);
    p1cards.set("g3",  0);
    p1cards.set("g4",  0);
    p1cards.set("g5",  0);
    p1cards.set("g6",  0);
    p1cards.set("g7",  0);
    p1cards.set("g8",  0);
    p1cards.set("g9",  0);

    p1cards.set("b0",  0);
    p1cards.set("b1",  0);
    p1cards.set("b2",  0);
    p1cards.set("b3",  0);
    p1cards.set("b4",  0);
    p1cards.set("b5",  0);
    p1cards.set("b6",  0);
    p1cards.set("b7",  0);
    p1cards.set("b8",  0);
    p1cards.set("b9",  0);

    p1cards.set("y0",  0);
    p1cards.set("y1",  0);
    p1cards.set("y2",  0);
    p1cards.set("y3",  0);
    p1cards.set("y4",  0);
    p1cards.set("y5",  0);
    p1cards.set("y6",  0);
    p1cards.set("y7",  0);
    p1cards.set("y8",  0);
    p1cards.set("y9",  0);



    p2cards.set("r0",  0);
    p2cards.set("r1",  0);
    p2cards.set("r2",  0);
    p2cards.set("r3",  0);
    p2cards.set("r4",  0);
    p2cards.set("r5",  0);
    p2cards.set("r6",  0);
    p2cards.set("r7",  0);
    p2cards.set("r8",  0);
    p2cards.set("r9",  0);

    p2cards.set("g0",  0);
    p2cards.set("g1",  0);
    p2cards.set("g2",  0);
    p2cards.set("g3",  0);
    p2cards.set("g4",  0);
    p2cards.set("g5",  0);
    p2cards.set("g6",  0);
    p2cards.set("g7",  0);
    p2cards.set("g8",  0);
    p2cards.set("g9",  0);

    p2cards.set("b0",  0);
    p2cards.set("b1",  0);
    p2cards.set("b2",  0);
    p2cards.set("b3",  0);
    p2cards.set("b4",  0);
    p2cards.set("b5",  0);
    p2cards.set("b6",  0);
    p2cards.set("b7",  0);
    p2cards.set("b8",  0);
    p2cards.set("b9",  0);

    p2cards.set("y0",  0);
    p2cards.set("y1",  0);
    p2cards.set("y2",  0);
    p2cards.set("y3",  0);
    p2cards.set("y4",  0);
    p2cards.set("y5",  0);
    p2cards.set("y6",  0);
    p2cards.set("y7",  0);
    p2cards.set("y8",  0);
    p2cards.set("y9",  0);

}

function add_discard_card(discardcard){
    const discardpile = document.querySelector('.discard-pile');
    current_discard_card = discardcard;
    discardpile.replaceChildren();
    const div1 = document.createElement("div");
    div1.classList.add("card");
    div1.style.width = "18rem";
    const div2 = document.createElement("div");
    div2.classList.add("card-body");
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    if (discardcard[0] === "r"){
        h5.textContent = "Red ";
        div1.classList.add("bg-danger");
    } else if (discardcard[0] === "b"){
        h5.textContent = "Blue ";
        div1.classList.add("bg-primary");
    } else if (discardcard[0] === "g"){
        h5.textContent = "Green ";
        div1.classList.add("bg-success");
    } else if (discardcard[0] === "y"){
        h5.textContent = "Yellow ";
        div1.classList.add("bg-warning");
    }
    h5.textContent += discardcard[1];


    div2.appendChild(h5);
    div1.appendChild(div2);
    discardpile.appendChild(div1);
}