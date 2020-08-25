# Cahier des Charges de l'application Bibliothèque

La municipalité demande une application pour gérer la collection de livres de la bibliothèque publique.
Elle a besoin pour ça de différentes informations sur les livres, auteurs etc.
Pour un livre, l'application doit pouvoir afficher un titre, un résumé, une date de publication, un numéro ISBN. Un livre peut être écrit par un ou plusieurs auteurs, et peut appartenir à un ou plusieurs genres littéraires. On pourra également trier les livres par format et par édition. 

Un auteur sera représenté par un nom et un prénom, une date de naissance, une nationalité, et une date de décès. 

Chaque livre aura au moins une image de couverture. 

L'application devra avoir un accès administrateur pour pouvoir rajouter/modifier des livres, des auteurs etc. 

Pour les formats des livres on veut gérer les dimensions suivantes : 

* Poche: 11x18cm 
* Digest: 14x21,6cm
* Roman A5: 14,8x21cm
* Royal: 16x24cm
* A4: 21x29,7cm
* Carré - : 15x15cm
* Carré: 21x21cm

Mais, certains formats particuliers doivent quand même pouvoir être affichés. 
On doit pouvoir également différencier un livre en portrait d'un livre en paysage (à l'italienne).