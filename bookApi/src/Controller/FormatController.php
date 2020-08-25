<?php

namespace App\Controller;

use App\Entity\Format;
use App\Repository\FormatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/format")
 */
class FormatController extends AbstractController
{
    /**
     * @Route("", name="format_list", methods={"GET", "HEAD"})
     */
    public function list(FormatRepository $repository)
    {
        $format = $repository->findAll();
        return $this->json($format);
    }

    /**
     * @Route("/{id}", name="format_view", methods={"GET", "HEAD"})
     */

    public function view($id, FormatRepository $repository)
    {
        $format = $repository->find($id);
        if ($format) {
            return $this->json($format);
        } else {
            return $this->json(
                [
                    'error_not_found' => sprintf("Format %d not found", $id)
                ],
                404
            );
        }
    }

    /**
     * @Route("", name="format_create", methods={"POST"})
     */

    public function create(Request $request, SerializerInterface $serializer)
    {
        $data = $request->getContent();
        if (!empty($data)) {
            $format = $serializer->deserialize($data, Format::class, 'json');
            $em = $this->getDoctrine()->getManager();
            $em->persist($format);
            $em->flush();

            return $this->json($format, 201);
        } else {
            return $this->json(
                [
                    'error_bad_request' => 'Bad request, check if the parameters match a Format resource'
                ],
                400
            );
        }
    }

    /**
     * @Route("/{id}", name="format_update", methods={"PUT"})
     */
    public function update($id, Request $request, SerializerInterface $serializer)
    {
        $format = $this->getDoctrine()->getRepository(Format::class)->find($id);
        if ($format) {
            $data = $request->getContent();
            $serializer->deserialize($data, Format::class, 'json', [
                'object_to_populate' => $format
            ]);

            $this->getDoctrine()->getManager()->flush();

            return $this->json($format);
        } else {
            return $this->json(
                [
                    'error_not_found' => sprintf("Format %d not found", $id)
                ],
                404
            );
        }
    }

    /**
     * @Route("/{id}", name="format_delete", methods={"DELETE"})
     */
    public function delete($id)
    {
        $format = $this->getDoctrine()->getRepository(Genre::class)->find($id);
        if ($format) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($format);
            $em->flush();
            return $this->json(
                [
                    "success" => sprintf("Format %d:%s successfully deleted", $id, $format->getName())
                ]
            );
        } else {
            return $this->json(
                [
                    "error_not_found" => sprintf("Format %d was not found", $id)
                ],
                404
            );
        }
    }
}
