import { getRepository } from 'typeorm';
import httpStatus from 'http-status'

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
}

export default new OrphanagesService()