
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
        arrayLab[i]["posX"] = ex[i]["posX"];
        arrayLab[i]["posY"] = ex[i]["posY"];
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
    DFS(arrayLab, arrayLab[0]);
}
/*==============CODE SE DEPLACANT DANS LE LABYRINTHE=================*/
function DFS(labyrinthe, caseDepart) {
   let stack = [];
   stack.push(caseDepart);
   visited(caseDepart);
   while (stack.length > 0) {
       let v = stack.pop()
       visited(v);
       if (lastCase(v)) { return; }
       let listesCasesVoisines = allVoisin(v, arrayLab);
       for (let w = 0; w<listesCasesVoisines.length;w++) {
           if (!listesCasesVoisines[w].isVisited) {
               stack.push(listesCasesVoisines[w]);

           }
       }

   }
    return false;
}

function visited(s) {
    s.isVisited = true;
    let idCase = "cellule" + s["posX"] + "_" + s["posY"];
    document.getElementById(idCase).style.backgroundColor = "rgb(62,234,207)";
}

function allVoisin(caseActuelle, tableauLabyrinthe) {

    let result = [];
    for (let i = 0; i<caseActuelle.walls.length; i++) {
        if (!caseActuelle.walls[i]) {
            switch (i) {
                case 0 : result.push(getCaseByCoordinate(caseActuelle.posX-1, caseActuelle.posY));//haut
                    break;
                case 1 : result.push(getCaseByCoordinate(caseActuelle.posX, caseActuelle.posY+1));//droite

                    break;
                case 2 : result.push(getCaseByCoordinate(caseActuelle.posX+1, caseActuelle.posY));//bas
                    break;
                case 3 : result.push(getCaseByCoordinate(caseActuelle.posX, caseActuelle.posY-1));//gauche
            }
        }
    }
    return result;
}

function getCaseByCoordinate(x, y) {
    for (let i = 0; i <arrayLab.length; i++) {
        if (x === arrayLab[i].posX && y === arrayLab[i].posY) {
            return arrayLab[i];
        }
    }
    return null;
}

function getCaseByIndex(i) {

}

function getIndexByCoordonate(x, y) {

}

function lastCase(currentCase) {
   return arrayLab.indexOf(currentCase) === arrayLab.length -1

}