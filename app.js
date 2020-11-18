
let arrayLab;

function randomOrNot() {
    let random = true;
    let content = document.getElementById('grid-container');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (random) {
        let randomCase = Math.floor(Math.random() * Object.keys(labyrinthes).length + 3);
        let randomEx = Math.floor(Math.random() * 3);
        new_labyrinthe(randomCase, labyrinthes[randomCase]["ex-" + randomEx]);
    }else {
        new_labyrinthe(6, labyrinthes["6"]["ex-0"]);
    }
}

/*===============CODE GENERANT LE LABYRINTHE=========================*/

function new_labyrinthe(taille, ex) {
    arrayLab = new Array(ex.length);

    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(" + taille + ", 50px)";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(" + taille + ", 50px)";

    //haut droit bas gauche
    for (let i = 0; i < ex.length; i++) {
        let borderstyle = "";
        arrayLab[i] = {};
        for (let j = 0; j < ex[i]["walls"].length; j++) {

            if (ex[i]["walls"][j]) {
                borderstyle = borderstyle + "solid ";
            } else {
                borderstyle = borderstyle + "none ";
            }
        }
        arrayLab[i]["x"] = ex[i]["posX"];
        arrayLab[i]["y"] = ex[i]["posY"];
        arrayLab[i]["walls"] = ex[i]["walls"];
        arrayLab[i]["isVisited"] = false;

        let element = document.createElement("DIV");
        element.id = "cellule"+ ex[i]["posX"] +"_"+ ex[i]["posY"];
        if (i === ex.length-1) {
            element.style.backgroundColor = "tomato" }
        element.style.borderStyle = borderstyle;
        element.style.borderColor = "rgb(210,10,122)";
        document.getElementById("grid-container").appendChild(element);
    }
    console.log(arrayLab)
}
function play() {
    move()
}
/*==============CODE SE DEPLACANT DANS LE LABYRINTHE=================*/
function move() {
    let s = arrayLab[0];
    let Sstack = [];// ici que l'on est passé
    console.log("avant", Sstack);
    Sstack.push(s);//là par nous sommes passé va dans le stack
    s["isVisited"] = true;//prouve que l'on est passé par là
    visited(s);
    console.log("après", Sstack);
    lookAroundYou(s);


}
function findMyPosition(X, Y) {
    let element = document.createElement("DIV");
    element.style.backgroundColor = "rgb(64,234,207)";
}
function visited(s) {
    let idCase = "cellule" + s["x"] + "_" + s["y"];
    document.getElementById(idCase).style.backgroundColor = "rgb(62,234,207)";
}


function lookAroundYou(position) {
    /*ordre : bas droite haut gauche */
    /*en reprenant notre position
    * SI on regarde en haut alors position = position - 1 pos x
    * SI on regarde à droite alors position = position + 1 pos y
    * SI on regarde en bas alors position = position + 1 pos x
    * SI on regarde à gauche alors position = position - 1 pos y
    * */
    let positionPossible = [];
    for(let i = 0; i<position.walls.length; i++) {
        console.log("on est dans le for");
        debugger
            if(!position.walls[i] && i === 0) {
                positionPossible = positionPossible.push(position.posX - 1)
            }
            if(!position.walls[i] && i === 1) {
                positionPossible = positionPossible.push(position.posY + 1)
            }
            if(!position.walls[i] && i === 2) {
            positionPossible = positionPossible.push(position.posX + 1)
            }
            if(!position.walls[i] && i === 3) {
                positionPossible = positionPossible.push(position.posY - 1)
            }
    }
    console.log(positionPossible);

}


function lastCase(nbCote, X, Y) {
    let final = Math.sqrt(nbCote.length)
    return (X === final) && (Y === final);
}