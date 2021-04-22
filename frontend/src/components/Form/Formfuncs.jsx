import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import axios from '../../utils/api';

// Valores iniciais do formik usados para estruturação
const initialValues = {
  bookday: null,
  hour: '',
  name: '',
  birthday: null,
};

// Schema para validação utilizando a biblioteca Yup
const validationSchema = Yup.object({
  bookday: Yup.date().required('Campo Obrigatório').nullable(),
  hour: Yup.string().required('Campo Obrigatório'),
  name: Yup.string().min(2, 'Mínimo 2 caracteres').max(64, 'Limite de caracteres excedido').required('Campo Obrigatório'),
  birthday: Yup.date().required('Campo Obrigatório').nullable(),
});

// Manipula os dados recebidos para uma melhor apresentação na aba de agendamentos
const onSubmit = async (values) => {
  const date = JSON.parse(JSON.stringify(values)); // Recebe em formato ISO8601
  /* const formatedBookday = format(parseISO(date.bookday), 'dd/MM/yyyy'); */
  const formatedBirthday = format(parseISO(date.birthday), 'dd/MM/yyyy');

  const newObj = {
    bookday: values.bookday,
    hour: values.hour,
    name: values.name,
    birthday: formatedBirthday,
  };

  try {
    await axios.post('/booking', newObj);
    window.open('http://localhost:3000/success', '_self');
    toast.success('Agendamento concluído!');
  } catch (e) {
    toast.error(e.response.data.message);
  }
};

export { validationSchema, initialValues, onSubmit };
