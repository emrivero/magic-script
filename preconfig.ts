const prompts = require('prompts');
const dotenv = require('dotenv');
const moment = require('moment');
const fs = require('fs');
dotenv.config();

const configureEnv = async () => {
  if (!process.env.CLOCKWORK_USER) {
    const response = await prompts({
      type: 'text',
      name: 'user',
      message: 'Usuario no configurado. Inserte usuario de Team2Go: ',
    });

    const { user } = response;
    fs.writeFileSync('.env', `CLOCKWORK_USER=${user}`);
    dotenv.config();
  }

  const response2 = await prompts([
    {
      type: 'password',
      name: 'pass',
      message: 'Inserte contraseña de Team2Go: ',
    },
    {
      type: 'text',
      name: 'start',
      message: 'Inserte hora de entrada (formato hh:mm):',
      initial: '07:00',
      validate: (value) =>
        /([0-1][0-9]|2[0-3]):[0-5][0-9]/.test(value)
          ? true
          : 'Formato inválido',
    },
    {
      type: 'text',
      name: 'end',
      initial: '14:00',
      message: 'Inserte hora de salida (formato hh:mm):',
      validate: (value) =>
        /([0-1][0-9]|2[0-3]):[0-5][0-9]/.test(value)
          ? true
          : 'Formato inválido',
    },
    {
      type: 'text',
      name: 'date',
      initial: moment().format('DD/MM/YYYY'),
      message: 'Inserte fecha de trabajo (formato dd/mm/yyyy):',
      validate: (value) =>
        moment(value, 'DD/MM/YYYY').isValid() &&
        /\d{2}\/(0[1-9]|1[1-2])\/\d{4}/.test(value)
          ? true
          : 'Fecha no válida',
    },
  ]);

  const { pass, start, end, date } = response2;
  if (!pass) {
    throw new Error('¡Contraseña no introducida!');
  }

  if (moment(start, 'hh:mm').isAfter(moment(end, 'hh:mm'))) {
    throw new Error('¡Fecha de entrada más tarde que la de salida!');
  }
  return { pass, start, end, date };
};

module.exports = {
  configureEnv,
};
