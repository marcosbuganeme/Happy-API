import * as Yup from 'yup';

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

export default schema;
