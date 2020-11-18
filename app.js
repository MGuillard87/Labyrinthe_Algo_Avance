
let arrayLab;

function randomOrNot() {
    let random = false;
    let content = document.getElementById('grid-container');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (random) {
        let randomCase = Math.floor(Math.random() * Object.keys(labyrinthes).length + 3);
        let randomEx = Math.floor(Math.random() * 3);
        new_labyrinthe(randomCase, labyrinthes[randomCase]["ex-" + randomEx]);
    }else {
        new_labyrinthe(5, labyrinthes["5"]["ex-0"]);
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
    let stack = [];// possibilités de direction
    console.log("avant", stack);
    stack.push(s);//là par nous sommes passé va dans le stack
    s["isVisited"] = true;//prouve que l'on est passé par là
    visited(s);
    console.log("après", stack);
    lookAroundYou(s, stack);
    debugger
    visited(stack[1])


}
function findMyPosition(X, Y) {
    let element = document.createElement("DIV");
    element.style.backgroundColor = "rgb(64,234,207)";
}
function visited(s) {
    let idCase = "cellule" + s["x"] + "_" + s["y"];
    document.getElementById(idCase).style.backgroundColor = "rgb(62,234,207)";
}


function lookAroundYou(position, stack) {
    /*ordre : bas droite haut gauche */
    /*en reprenant notre position
    * SI on regarde en haut alors position = position - 1 pos x
    * SI on regarde à droite alors position = position + 1 pos y
    * SI on regarde en bas alors position = position + 1 pos x
    * SI on regarde à gauche alors position = position - 1 pos y
    * */
    for(let i = 0; i<position.walls.length; i++) {
        console.log("on est dans le for");
            if(!position.walls[i]) {
                /*position actuel = position*/
                switch (i) {
                    case 0 : stack.push(position.x - 1);//haut
                    break;
                    case 1 : stack.push(position.y + 1);//droite
                    break;
                    case 2 : stack.push(arrayLab[position + 5]);//bas
                    break;
                    case 3 : stack.push(position.y - 1);//gauche
                }
            }
            /*l'idée : on récupoère l'index de notre tableau du
            * labyrinthe afon de savoir les infos de notre case actuel
            * ENSUITE, suivant l'endroit où il ya les murs
            * on applique la formule pour récupérer l'index et
            * ainsi l'objet de façon à ce que cet objet soit
            * pushé dans la stack*/
    }
    console.log(stack);

}


function lastCase(nbCote, X, Y) {
    let final = Math.sqrt(nbCote.length)
    return (X === final) && (Y === final);
}