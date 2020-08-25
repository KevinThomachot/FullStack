<?php

namespace App\Controller;

use App\Repository\FormatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/format")
 */
class FormatController extends AbstractController
{
/**
* @Route("", name="format_list", methods={"GET", "HEAD"})
*/
public function list(FormatRepository $repository) {

}

}
