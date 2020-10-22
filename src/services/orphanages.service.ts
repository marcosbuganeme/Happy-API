import * as Yup from 'yup';
import httpStatus from 'http-status'
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

class OrphanagesService {

  index = async () => {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({ relations: ['images'] })

    return {
      status: httpStatus.OK,
      result: orphanages
    };
  }

  show = async (id: any) => {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOneOrFail(id, { relations: ['images'] });
    return {
      status: httpStatus.OK,
      result: orphanage
    };
  }

  create = async (data: any) => {
    // Criando a validação dos dados
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);

    return {
      status: httpStatus.CREATED,
      result: orphanage
    }
  }
}

export default new OrphanagesService()