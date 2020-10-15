import Orphanage from '../models/Orphanage';
import ImagesView from './images_view';

export default {
  //método para renderizar apenas um orfanato (show)
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: ImagesView.renderMany(orphanage.images),
    };
  },

  //Método para renderizar todos os orfanatos
  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};

//As views vão determinar como os dados vão estar visíveis,
//irão estar disponíveis para o front-end.
