<?php

namespace App\Controller;

use App\Entity\Genre;
use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/genre")
 */
class GenreController extends AbstractController
{
    //avec le paramètre methods dans l'annotation de la route
    //on peut préciser quelles sont les méthodes acceptées pour une route de controleur
    //ainsi, seules les requêtes faites avec ces méthodes http là feront exécuter le code correspondant
    /**
     * @Route("", name="genre_list", methods={"GET", "HEAD"})
     */
    public function list(GenreRepository $repository)
    {
        $genres = $repository->findAll();
        return $this->json($genres);
        //return $this->json() correspond a peu près a la ligne suivante : 
        //return new JsonResponse($genres);
        //qui correspond à la ligne suivante : 
        //return new Response(json_encode($genres), 200, ['content-type' => 'application/json']);
    }

    /**
     * @Route("/{id}", name="genre_view", methods={"GET", "HEAD"})
     */
    public function view($id, GenreRepository $repository)
    {
        $genre = $repository->find($id);
        if ($genre) {
            return $this->json($genre);
        } else {
            return $this->json(
                [
                    'error_not_found' => sprintf("Genre %d not found", $id)
                ]
            , 404);
        }
    }

    /**
     * @Route("", name="genre_create", methods={"POST"})
     */
    public function create(Request $request, SerializerInterface $serializer)
    {
        $data = $request->getContent();
        if(!empty($data)){
            //on demande au serializer de deserializer (transformer du json en objet) pour créer notre entité Genre
            $genre = $serializer->deserialize($data, Genre::class, 'json');
            //TODO : vérifier que l'entité deserializée corresponde bien à une entity Genre
            $em = $this->getDoctrine()->getManager();
            $em->persist($genre);
            $em->flush();
    
            return $this->json($genre, 201);
        } else {
            return $this->json(
                [
                    'error_bad_request' => 'Bad request, check if the parameters match a Genre resource'
                ],
                400
            );
        }
    }

    /**
     * @Route("/{id}", name="genre_update", methods={"PUT"})
     */
    public function update($id, Request $request, SerializerInterface $serializer){
        //pour modifier une entité, il faut d'abord la récupérer
        $genre = $this->getDoctrine()->getRepository(Genre::class)->find($id);
        if ($genre){
            //on récupère les nouvelles données
            $data = $request->getContent();
            //lors de la deserialization, on peut préciser une option object_to_populate
            //de façon à indiquer au serializer dans quelle entité "ranger" les données reçues 
            $serializer->deserialize($data, Genre::class, 'json', [
                'object_to_populate' => $genre
            ]);
            //comme l'entité existait déjà, on a pas besoin de faire persist à nouveau
            $this->getDoctrine()->getManager()->flush();
            //on renvoie l'objet nouvellement modifié
            return $this->json($genre);
        } else {
            return $this->json(
                [
                    'error_not_found' => sprintf("Genre %d not found", $id)
                ]
            , 404);
        }
    }

    /**
     * @Route("/{id}", name="genre_delete", methods={"DELETE"})
     */
    public function delete($id){
        $genre = $this->getDoctrine()->getRepository(Genre::class)->find($id);
        if ($genre) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($genre);
            $em->flush();
            return $this->json(
                [
                    "success" => sprintf("Genre %d:%s successfully deleted", $id, $genre->getName())
                ]
            );
        } else {
            return $this->json(
                [
                    "error_not_found" => sprintf("Genre %d was not found", $id) 
                ],
                404
            );
        }
    }
}
