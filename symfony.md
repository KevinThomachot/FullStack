# Créer un projet d'API basique en Symfony

## 1 - Mise en place de Symfony

Pour créer un projet symfony destiné à une API Web, on utilise, comme pour un projet de site web, `symfony new`. Cependant, comme certaines des fonctionnalités (comme `twig` et les `templates`) ne nous serviront pas, le projet sera plus léger que son penchant application complète. 
Au moment où on écrit ces lignes, la version LTS utilisées est la version 4.4. 

```
symfony new nomDuProjet --version=4.4
```

On se retrouve avec un projet symfony plus simple, et il nous faut donc installer certains des bundles nécessaires au développement de notre API. 

Pour installer Doctrine et les fonctions ORM associées :

```
composer require symfony/orm-pack
```

Pour installer le Maker-Bundle nous aidant à la création de nos entités et nos migrations : 

```
composer require --dev symfony/maker-bundle
```

Le `--dev` signifie que la dépendance du projet n'existe qu'en mode développement. 


Pour utiliser les fonctions de `serialization` il nous faut installer également le bundle `serializer` : 

```
composer require symfony/serializer
```

Pour que le `serializer` et d'autres composants de symfony puissent accéder facilement aux différentes propriétés de nos objets, on installe également les bundles suivants :

```
composer require symfony/property-info symfony/property-access 
```

PropertyInfo est un composant permettant de lire les propriétés d'un objet de façon plus "comfortable" sous forme de `string`. 
PropertyAccess quant à lui permet d'accéder aux propriétés d'un objet à l'aide de `string`.

## Création des entités et migrations
Doctrine nécessite toujours d'avoir paramétré notre `.env` pour se connecter à la base de données.   

Une fois le maker-bundle installé, on peut créer nos entités comme dans n'importe quel projet symfony avec 
```
php bin/console make:entity
```

puis effectuer nos migrations avec 
```
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

## Création d'un Controller et programmation de l'API 

Pour programmer notre API, il faut désormais faire correspondre des routes et méthodes HTTP avec des actions sur notre base de données.
Pour pouvoir connecter du code à un route, comme dans tout projet symfony, il faut utiliser un `controller`. 

```
php bin/console make:controller
```

Une fois le controller créé, on voit que le code généré diffère légèrement de notre projet symfony web classique, en celà que la réponse se fait au format `json`. 

Il faut maintenant coder les différentes routes (`CRUD` par exemple, `C`reate `R`ead `U`pdate `D`elete), avec les différentes méthodes HTTP (`POST`, `GET`, `PUT`, `DELETE`).

### Gestion des Méthodes Acceptées par Route 

Pour définir les méthodes acceptées pour une Route, et donc définir quelle route exécutera quel code, on peut définir dans l'annotation de la route le paramètre `methods` : 

Par exemple, pour un `endpoint` qui listerait toutes nos ressources via une requête `GET` on pourrait définir :

```php
/**
* @Route("/genre", name="genre_list", methods={"GET", "HEAD"})
*/
public function list()
{}
```

Le paramètre 
```
methods={"GET", HEAD"}
```
indique donc que seules les méthodes `GET` et `HEAD` déclencheront la fonction `list()` de notre controleur. 

Notre implémentation de `list` doit ensuite donc renvoyer du `json` : 

```php
/**
* @Route("/genre", name="genre_list", methods={"GET", "HEAD"})
*/
public function list()
{
    $genres = $this->getDoctrine()->getRepository(Genre::class)->findAll();
    return $this->json($genres);
}
```

Une fois notre requête `GET` envoyée sur notre serveur à l'uri `/genre` on reçoit donc du `json` représentant notre tableau de ressources. 

## Le Serializer 

Pour que Symfony puisse convertir du json en objets et vice versa, il fait appel à un composant du framework nommé le `Serializer`. 
La `serialization` est le fait de transformer des objets en texte, et la `deserialization` est le fait de transformer du texte en objets. 
En installant le `symfony/serializer` via composer, on offre à Symfony la possibilité d'appeler cette fonctionnalité, notamment lors de l'appel de `$this->json` dans notre controller. 

On peut également appeler le `Serializer` en tant que service, par injection de dépendance, dans une méthode de controller. 
Par exemple : 
```php

/**
* @Route("", name="genre_create", methods={"POST"})
*/
public function create(Request $request, SerializerInterface $serializer)
{
    $data = $request->getContent();
    //on demande au serializer de deserializer (transformer du json en objet) pour créer notre entité Genre
    $genre = $serializer->deserialize($data, Genre::class, 'json');        
}
```
En demandant d'injecter un service correspondant à  `SerializerInterface` on récupère notre service `Serializer` qui nous permet d'utiliser ses fonctionnalités. 
Pour utiliser `deserialize` il faut préciser en quelle entité on veut convertir le corps de la requête (ici `Genre::class`), mais également en quel format est écrit le corps de la requête (ici `json`).

Si on veut deserializer des données dans une entité déjà existante (dans le cadre d'un `update` par exemple), on peut préciser une option `object_to_populate` à notre `serializer` pour lui indiquer quelle entité cibler.

```php
/**
     * @Route("/{id}", name="genre_update", methods={"PUT"})
     */
    public function update($id, Request $request, SerializerInterface $serializer){
    
//pour modifier une entité, il faut d'abord la récupérer
$genre = $this->getDoctrine()->getRepository(Genre::class)->find($id);
//on récupère les nouvelles données
$data = $request->getContent()
//l'option object_to_populate permet de ranger nos donnée dans notre entité déjà existante
$serializer->deserialize($data, Genre::class, 'json', [
    'object_to_populate' => $genre
]);
}
```

## CORS et le NelmioCorsBundle

Lorsqu'on essaye d'effectuer une requête depuis une application front-end (sur un autre serveur typiquement, comme angular par exemple), on est accueilli sur le navigateur par une erreur parlant de [CORS (**C**ross **O**rigin **R**esource **S**haring)](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS), et la requête est bloquée. 

Les requêtes dîtes `Cross Origin` (multi-origines) sont bloquées par défaut. Pour les autoriser, il faut préciser un en-tête (header) HTTP dans la réponse de la requête (donc depuis le serveur d'API) explicitant les domaines autorisés à effectuer une transaction. 
Cet en-tête est `Access-Control-Allow-Origin`, et doit posséder une valeur définissant les domaines autorisés. Si on a 

```
Access-Control-Allow-Origin: *
```

alors toutes les origines sont autorisées. 

### Utiliser Access Control Allow Origin dans Symfony

Ce dispositif n'est pas propre à symfony mais à HTTP. De fait, insérer l'en-tête Access-Control-Allow-Origin dans une réponse se fait comme pour insérer n'importe quel en-tête HTTP. On le fait au moment d'envoyer la réponse. 

```php
return $this->json($response, 200, [
    'Access-Control-Allow-Origin' => *
]);

```

Mais cela oblige à préciser l'en-tête à chaque réponse, et ne prend pas en compte les [cas particuliers nécessitant l'envoi d'une requête OPTIONS préliminaire](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS#preflight). 

Pour automatiser le processus, on peut donc installer un bundle : le `NelmioCorsBundle`.


```
composer require nelmio/cors-bundle
```

### Paramétrer le NelmioCorsBundle

Une fois le `NelmioCorsBundle` installé, il crée un fichier de configuration `config/packages/nelmio_cors.yaml` qui contient les informations suivantes :

```yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']
        allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
        allow_headers: ['Content-Type', 'Authorization']
        expose_headers: ['Link']
        max_age: 3600
    paths:
        '^/': null
```

Dans ce fichier on retrouve donc la possibilité de gérer les méthodes autorisées sur notre serveur, ainsi que les headers autorisés en dehors de ceux gérés par le navigateur. 
On voit également que le paramètre du header `Allow-Access-Control-Origin` est défini dans le `.env` par la variable `CORS_ALLOW_ORIGIN`. 


Si on regarde le paramètre suivant dans le fichier `.env`

```ini
###> nelmio/cors-bundle ###
CORS_ALLOW_ORIGIN=^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$
###< nelmio/cors-bundle ###
```

on retrouve une regex permettant de définir avec un peu de flexibilité les domaines autorisés. Par défaut, la regex autorise les requêtes http ou https, sur localhost/127.0.0.1, sur n'importe quel port. 

Si on voulait changer les domaines autorisés, on pourait le faire directement dans le `.env`. 

Sans plus de configuration nécessaire, un serveur local (comme celui d'angular par exemple, https://localhost:4200) pourrait effectuer des requêtes HTTP sans être bloqué par la politique de requêtes multi-origines. 

Plus d'informations se trouvent sur la [documentation de CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) ainsi que sur la [documentation de NelmioCorsBundle](https://github.com/nelmio/NelmioCorsBundle).