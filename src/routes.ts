import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;

// {
// 	"name": "Lar dos meninos",
// 	"latitude": -16.6638255,
// 	"longitude": -49.416106,
// 	"about": "Coisas sobre o orfanato",
// 	"instructions": "Venha visitar",
// 	"opening_hours": "Das 08:00h até 19:00h",
// 	"open_on_weekends": true
// }
