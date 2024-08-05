:array $form : un tableau [clef => valeur] contenant comme clefs les nom des elements que l'on veux vérifier et en valeur 
les conditions de certification que l'on veux leur appliquer.

les conditions sont des chaines de charactères
il existe differentes conditions:
'r'     // <=> existe et n'est pas vide
'!int'  // <=> est un entier
'!float'// <=> est un réel
'!url'  // <=> est une url valide
'!email'// <=> est un email valide
':>,x'  // <=> est supérieur à x (remplacez x par le nombre que vous voulez)
':<,x'  // <=> est inférieur à x (remplacez x par le nombre que vous voulez)
':M,x'  // <=> fait au maximum x caractères (remplacez x par le nombre que vous voulez)
':m,x'  // <=> fait au moins x caractères (remplacez x par le nombre que vous voulez)

on peut appliquer plusieurs conditions en les séparant avec un espace
ex:
'!int :<,10' // <=> est un entier inférieur à 10

/!\ attention: la condition 'r' doit impérativement être appelé en première, sinon elle ne servira à rien
exemple:
'r !int'    // <=> est definie et est un entier
'!int'      // <=> est un entier ou n'est pas définit
'!int r'    //appliquera: est un entier ou n'est pas définit

/!\ attention: la fonction renvoie "validated" quand les verification sont passé et un tableau "message", "id" dans le cas où il y avais une erreur