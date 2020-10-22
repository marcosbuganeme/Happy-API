import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanage_view';
import schemaOrphanage from '../schemas/schemaOrphanage';
import Orphanage from '../models/Orphanage';
import { OrphanagesService } from '../services'

class OrphanagesController {
  async index(req: Request, res: Response) {
    try {
      const { result, status } = await OrphanagesService.index()
      return res
        .status(status)
        .json(orphanageView.renderMany(result));
    } catch (error) {
      return res
        .status(error.status)
        .send({
          errorDetail: error,
          errorResume: 'Erro na chamada do index',
          message: 'CODE 56-A - Erro interno no servidor'
        });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    //findOneOrFail = encontre um ou retorne falha
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.json(orphanageView.render(orphanage));
  }

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    await schemaOrphanage.validate(data, {
      abortEarly: false,
    });

    // criando orphanage
    const orphanage = orphanagesRepository.create(data);

    //salvando no banco de dados
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}

export default new OrphanagesController()