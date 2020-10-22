import { Request, Response } from 'express';

import orphanageView from '../views/orphanage_view';
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
    try {
      const { id } = req.params;
      const { result, status } = await OrphanagesService.show(id)
      return res
        .status(status)
        .json(orphanageView.render(result));
    } catch (error) {
      return res
        .status(error.status)
        .send({
          errorDetail: error,
          errorResume: 'Erro na chamada do show',
          message: 'CODE 57-A - Erro interno no servidor'
        });
    }
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

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => ({ path: image.filename }));

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

    const { result, status } = await OrphanagesService.create(data)
    return response.status(status).json(result);
  }
}

export default new OrphanagesController()