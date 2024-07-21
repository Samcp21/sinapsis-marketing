export async function buildAndExecuteQuery(
  messageRepository,
  month: string,
  clientId?: string,
) {
  const [year, monthNumber] = month.split('-');
  const startDate = new Date(`${year}-${monthNumber}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  const queryBuilder = messageRepository
    .createQueryBuilder('message')
    .innerJoinAndSelect('message.idCampania', 'campaign')
    .innerJoinAndSelect('campaign.idUsuario', 'user')
    .innerJoinAndSelect('user.idCliente', 'client')
    .select([
      'message.estadoEnvio AS estadoEnvio',
      'message.mensaje AS mensaje',
      'campaign.nombre AS campaignName',
      'user.usuario AS userName',
    ])
    .where('message.estado = :estado', { estado: true })
    .andWhere(
      'campaign.fechaHoraProgramacion BETWEEN :startDate AND :endDate',
      {
        startDate,
        endDate,
      },
    );

  if (clientId) {
    queryBuilder.andWhere('client.idCliente = :clientId', { clientId });
  }

  return await queryBuilder.getRawMany();
}
