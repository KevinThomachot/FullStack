# API (Application Programming Interface) Web

## Qu'est ce qu'une API web ?

Une API Web est un dispositif de programmation permettant de préparer des actions correspondant à des requêtes HTTP. 
Ces actions peuvent concerner du `CRUD` (**C**reate **R**ead **U**pdate **D**elete), de l'authentification, ou des actions plus complexes. 

En général, ces actions sont en lien avec des données et connectées à une base de données. 

Par exemple, pour une API de gestion de ressources comme des Livres, on pourrait avoir une route du genre :

https://api.monsite/books

et cette route, lorsque appelée via une requête GET, renverrait une réponse contenant la liste des ressources : 

```json
{
    "count": 20,
    "page": 1,
    "results" : [
        0 : { 
            "title": "Le Comte de Monte-Cristo", "datePublished": 1844, 
            "authors": [{
            //...
            }]
        }
        ,
        1 : { 
            "title": 'Martine va aux Prud'hommes', "datePublished": 2014, 
            "authors": [{
                //...
            }]
        },
    ]
}
```

Lorsqu'on appelerait cette route via une requête `POST` cependant, on pourrait demander la création d'une ressource, en passant des paramètres via notre requête au format `json` également par exemple. 

Pour récupérer une ressource Book en particulier, on pourrait avoir une route au format suivant :

https://api.monsite/books/1

1 représentant un identifiant unique de la resource, et qui renverrait un résultat de ce genre : 

```json
    { 
        "id": 1, 
        "title": "Le Comte de Monte-Cristo", 
        "datePublished": 1844, 
        "authors": [{
            "id": 45,
            "name": "Alexandre Dumas",
            "dob": 1700,
            //etc...
        }],
        //etc...
    }
```

Sur cette même route, avec les méthodes `DELETE` et `PUT` on obtiendrait donc une action de suppression, ou de remplacement (modification).

## Comment paramétrer une API web ? 

Il existe plusieurs façons de paramétrer son API web. Personne n'est d'accord sur comment faire. Essayez juste de faire quelque chose de facilement utilisable, lisible, et consistant dans son utilisation. 

Certains principes existent pour essayer de guider le développement des API, parmis ces principes le plus connu est [REST (REpresentational State Transfer)](https://fr.wikipedia.org/wiki/Representational_state_transfer).

`REST` n'est pas un standard, c'est à dire qu'il n'est pas un ensemble de règles à suivre auxquelles tout le monde peut se réferer, mais plutôt un ensemble de conseils sur la mise en place d'une application web. 

Il existe par contre des protocoles comme [SOAP](https://fr.wikipedia.org/wiki/SOAP) qui eux sont plus stricts et auxquels tout le monde peut se réferer pour développer leurs APIs. 

## Qu'est ce qu'une API doit renvoyer ? 

N'importe quelle donnée formatée de façon standard que tout le monde pourrait lire facilement. Mais dans l'idée, il s'agit juste de faciliter le développement de votre application. Donc quelque soit le format de données et le type de données dont vous pouvez avoir besoin, vous pouvez l'utiliser dans votre API. 
Les formats les plus utilisés sont JSON et XML.

## Quid des codes d'erreur HTTP ?

Quels codes renvoyer via HTTP lorsqu'on effectue telle ou telle action ? 
On se contente de suivre le standard HTTP : [https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP](Liste des Codes HTTP).

Par exemple, une requête de création en poste devrait renvoyer `201` si elle réussie, `400` si la requête manque de paramètres, `500` et + en cas d'erreur du serveur.

Dans le cas où une ressource ne serait pas accessible, le sempiternel `404` est d'usage. 

## Méthode HTTP Idempotente ?

En mathématique, se dit idempotente une fonction qui a exactement le même résultat qu'on l'appelle une fois ou plusieurs.

Une méthode HTTP est donc idempotente lorsqu'on constate le même changement sur le serveur qu'on effectue une requête ou qu'on en effectue plusieurs. 

Les méthodes censées être idempotentes (lorsque bien implémentées) dans une API sont `GET`, `HEAD`, `PUT` et `DELETE`.

Par exemple, lorsqu'on effectue la requête suivante : 

```
GET https://api.monsite/book/1
```

Aucun changement sur le serveur n'est appliqué. Donc la requête sera par défaut idempotente. 

Si on effectue la requête suivante :

```
DELETE https://api.monsite/book/1
```
La première requête supprimera le livre d'id 1. Le changement serveur est donc la suppression d'une entité. 
La deuxième requête ne pourra pas supprimer le livre d'id 1, car déjà supprimé, donc le résultat sera le même que si on l'avait effectuée une fois. `DELETE` dans ce cas de figure est donc itempotente. 

Pour le cas de `POST` cependant : 

```
POST https://api.monsite/book
```
avec comme corps
```json
{
    "title": "Les Fleurs du Mal",
    "author": 145,
    "datePublished": 1857
}
```
Lorsque lancée une fois, cette requête créera l'entité correspondant à ces paramètres.
Lorsque lancée une deuxième fois, une autre entité identique (sauf pour l'id et la date de création par exemple) sera créée. 
Deux changements de données sont survenus, la méthode n'est donc pas idempotente. 