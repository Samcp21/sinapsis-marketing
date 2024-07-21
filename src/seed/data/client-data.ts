import * as bcrypt from 'bcrypt';
export const clientData = [
  { nombre: 'Saga Falabella' },
  { nombre: 'Ripley' },
  { nombre: 'Oechsle' },
  { nombre: 'H&M' },
  { nombre: 'Nike Store' },
];

export const usersData = [
  {
    usuario: 'johndoe',
    password: bcrypt.hashSync('JohnDoe', 10),
    idCliente: 1,
  },
  {
    usuario: 'janedoe',
    password: bcrypt.hashSync('JaneDoe', 10),
    idCliente: 2,
  },
  {
    usuario: 'admin',
    password: bcrypt.hashSync('admin', 10),
    idCliente: 1,
  },
  {
    usuario: 'user',
    password: bcrypt.hashSync('user', 10),
    idCliente: 3,
  },
];

export const campaignData = [
  {
    nombre: 'Black Friday',
    fechaHoraProgramacion: '2024-11-26 00:00:00',
    idUsuario: 1,
  },
  {
    nombre: 'Cyber Monday',
    fechaHoraProgramacion: '2024-11-29 00:00:00',
    idUsuario: 2,
  },
  {
    nombre: 'Navidad',
    fechaHoraProgramacion: '2024-12-25 00:00:00',
    idUsuario: 3,
  },
  {
    nombre: 'Año Nuevo',
    fechaHoraProgramacion: '2024-12-31 00:00:00',
    idUsuario: 4,
  },
  {
    nombre: 'Día de la Madre',
    fechaHoraProgramacion: '2024-05-08 00:00:00',
    idUsuario: 1,
  },
  {
    nombre: 'Día del Padre',
    fechaHoraProgramacion: '2024-06-19 00:00:00',
    idUsuario: 2,
  },
  {
    nombre: 'Día del Niño',
    fechaHoraProgramacion: '2024-08-21 00:00:00',
    idUsuario: 3,
  },
  {
    nombre: 'Día de la Mujer',
    fechaHoraProgramacion: '2024-03-08 00:00:00',
    idUsuario: 4,
  },
  {
    nombre: 'Día del Trabajo',
    fechaHoraProgramacion: '2024-05-01 00:00:00',
    idUsuario: 1,
  },
  {
    nombre: 'Día de la Independencia',
    fechaHoraProgramacion: '2024-07-28 00:00:00',
    idUsuario: 2,
  },
  {
    nombre: 'Día de la Canción Criolla',
    fechaHoraProgramacion: '2024-10-31 00:00:00',
    idUsuario: 3,
  },
  {
    nombre: 'Día de Todos los Santos',
    fechaHoraProgramacion: '2024-11-01 00:00:00',
    idUsuario: 4,
  },
  {
    nombre: 'Día de los Difuntos',
    fechaHoraProgramacion: '2024-11-02 00:00:00',
    idUsuario: 1,
  },
  {
    nombre: 'Día de la Inmaculada Concepción',
    fechaHoraProgramacion: '2024-12-08 00:00:00',
    idUsuario: 2,
  },
  {
    nombre: 'Día de la Marina de Guerra del Perú',
    fechaHoraProgramacion: '2024-10-08 00:00:00',
    idUsuario: 3,
  },
];

export const messageData = [
  {
    mensaje: '¡Hola! ¿Cómo estás? ¿Qué necesitas?',
    estadoEnvio: 1,
    idCampania: 1,
  },
  {
    mensaje: '¡Hola! ¿En qué puedo ayudarte?',
    estadoEnvio: 1,
    idCampania: 2,
  },
  {
    mensaje: '¡Hola! ¿En qué puedo ayudarte hoy?',
    estadoEnvio: 1,
    idCampania: 3,
  },
  {
    mensaje: '¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte?',
    estadoEnvio: 1,
    idCampania: 4,
  },
  {
    mensaje: '¡Hola! ¿Qué necesitas? ¿En qué puedo ayudaerte?',
    estadoEnvio: 1,
    idCampania: 5,
  },
];
