let arrayLab;

/*===============CODE GENERANT LE LABYRINTHE AlEATOIREMENT si random à true=========================*/

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

//  On initialise une stack et un tableau vide: va être empilée et dépilée tout au long du processus
   let stack = [];
/* On empile le point de départ dans la stack:
Au début, le point de départ est le paramètre d’entrée.
Puis, à chaque itération, ça va être le chemin au sommet de la stack -> le plus profond trouvé!
*/
   stack.push(caseDepart);
   visited(caseDepart);

// Tant que la stack n’est pas vide, on itère sur chacun des chemins de la même façon
   while (stack.length > 0) {
/* C’est dans ce while que l’algorithme de parcours en profondeur (DFS) va travailler.
  La fin de cette boucle signifie la résolution du problème.
*/

// On dépile du sommet de la stack le chemin sur lequel on va travailler cette itération
       let v = stack.pop()
       visited(v);
       if (lastCase(v)) {
           return;
       }
//  On va chercher toutes les cases adjacentes à la case courante. On va pousser seulement celles qui sont valides dans la stack
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
// fonction permettant d'indiquer si une case est en mode visitée ou non pour ne plus passer dessus dans l’avenir
// Si la case est visitée, on met une couleur dessus
    s.isVisited = true;
    let idCase = "cellule" + s["posX"] + "_" + s["posY"];
    document.getElementById(idCase).style.backgroundColor = "rgb(62,234,207)";
}

function allVoisin(caseActuelle) {
// On initialise un tableau vide: stock toutes les cases voisines à la case courante
//permettra de se rappeler quel chemin on a déjà visité pour être sûr de jamais repasser deux fois au même endroit.
    let result = [];
    for (let i = 0; i<caseActuelle.walls.length; i++) {
/* on cherche les cases autour de la case courante. On peut le fait dans un ordre arbitraire (ici haut, droite, bas, gauche)
 en changeant les coordonnées du chemin.
 // Les cases valides pour un parcours doivent être dans les limites du labyrhinte
*/
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

//Fonction permettant d'obtenir la case par les coordonnées x et Y
function getCaseByCoordinate(x, y) {
    for (let i = 0; i <arrayLab.length; i++) {
        if (x === arrayLab[i].posX && y === arrayLab[i].posY) {
            return arrayLab[i];
        }
    }
    return null;
}

// Fonction permettant de trouver la dernière case du labyrhinte
function lastCase(currentCase) {
   return arrayLab.indexOf(currentCase) === arrayLab.length -1

}






// Fonctions alternatives (à la fonction getCaseByCoordinate) à tester

function getCaseByIndex(i) {

}

function getIndexByCoordonate(x, y) {

}
