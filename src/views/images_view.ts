import Image from '../models/Image';

export default {
  //método para renderizar apenas um orfanato (show)
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  //Método para renderizar todos os orfanatos
  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
