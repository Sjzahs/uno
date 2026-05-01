class special_map {
    constructor(name, callback){
        this.map = new Map();
        this.name = name;
        this.callback = callback;
    }
    set(card_name, value){
        this.map.set(card_name, value);
      //  this.callback(this.name);
    }
    get(card_name) {
        return this.map.get(card_name);
    }
}



const cards = new special_map("cards", on_map_update);
const p1cards = new special_map("p1cards", on_map_update);
const p2cards = new special_map("p2cards", on_map_update);

document.addEventListener("DOMContentLoaded", () => {

    set_cards();
    deal_cards();
});

function on_map_update(map){
    const list1= document.querySelector('.ul1');
    const list2= document.querySelector('.ul2');
    for (const [key, value] of p1cards.map) {
        for (let i = 0; i < value; i++) {
            console.log(i);
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            div1.classList.add("card");
            div1.style.width = "18rem";
            const div2 = document.createElement("div");
            div2.classList.add("card-body");
            const h5 = document.createElement("h5");
            h5.classList.add("card-title");
            if (key[0] === "r"){
                h5.textContent = "Red ";
            } else if (key[0] === "b"){
                h5.textContent = "Blue ";
            } else if (key[0] === "g"){
                h5.textContent = "Green ";
            } else if (key[0] === "y"){
                h5.textContent = "Yellow ";
            }
            console.log(key[1] +" is key of 1");
            if (key[1] === "0"){
                h5.textContent += "0";

            } else if (key[1] === "1"){
                h5.textContent += "1";

            } else if (key[1] === "2"){
                h5.textContent += "2";

            } else if (key[1] === "3"){
                h5.textContent += "3";

            } else if (key[1] === "4"){
                h5.textContent += "4";

            } else if (key[1] === "5"){
                h5.textContent += "5";

            } else if (key[1] === "6"){
                h5.textContent += "6";

            } else if (key[1] === "7"){
                h5.textContent += "7";

            } else if (key[1] === "8"){

                h5.textContent += "8";
            } else if (key[1] === "9"){
                h5.textContent += "9";

            }

            const but = document.createElement("button");
            but.classList.add("btn");
            but.classList.add("btn-primary");
            but.type = "button";
            but.textContent = "play";
            div2.appendChild(h5);
            div2.appendChild(but);
            div1.appendChild(div2);
            li.appendChild(div1);
            list1.appendChild(li);
        }
    }
    for (const [key,value] of p2cards.map){
        for (let j = 0; j < value; j++) {
            console.log(j);
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            div1.classList.add("card");
            div1.style.width = "18rem";
            const div2 = document.createElement("div");
            div2.classList.add("card-body");
            const h5 = document.createElement("h5");
            h5.classList.add("card-title");
            if (key[0] === "r"){
                h5.textContent = "Red ";
            } else if (key[0] === "b"){
                h5.textContent = "Blue ";
            } else if (key[0] === "g"){
                h5.textContent = "Green ";
            } else if (key[0] === "y"){
                h5.textContent = "Yellow ";
            }
            console.log(key[1] +" is key of 2");
            if (key[1] === "0"){
                h5.textContent += "0";

            } else if (key[1] === "1"){
                h5.textContent += "1";

            } else if (key[1] === "2"){
                h5.textContent += "2";

            } else if (key[1] === "3"){
                h5.textContent += "3";

            } else if (key[1] === "4"){
                h5.textContent += "4";

            } else if (key[1] === "5"){
                h5.textContent += "5";

            } else if (key[1] === "6"){
                h5.textContent += "6";

            } else if (key[1] === "7"){
                h5.textContent += "7";

            } else if (key[1] === "8"){

                h5.textContent += "8";
            } else if (key[1] === "9"){
                h5.textContent += "9";

            }

            const but = document.createElement("button");
            but.classList.add("btn");
            but.classList.add("btn-primary");
            but.type = "button";
            but.textContent = "play";
            div2.appendChild(h5);
            div2.appendChild(but);
            div1.appendChild(div2);
            li.appendChild(div1);
            list2.appendChild(li);
        }


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
    on_map_update(p1cards);
    console.log("deal_cards() has ran")


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

