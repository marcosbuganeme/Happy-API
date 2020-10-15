import { request } from 'express';
import multer from 'multer';
import path from 'path';

/**
 * Exportando um objeto com várias configurações
 * para upload de imagens
 */
export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
