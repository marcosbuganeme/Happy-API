import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanage_view';
import schemaOrphanage from '../schemas/schemaOrphanage';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  // retorna apenas um único orfanato
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    //findOneOrFail = encontre um ou retorne falha
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.json(orphanageView.render(orphanage));
  },

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
  },
};
