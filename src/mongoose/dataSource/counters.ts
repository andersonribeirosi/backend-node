
export class CountersDataSource {
  models: any
  constructor(models: any) {
    this.models = models
  }

  async createSeqNext<T>(collectionName: string) {
    try {

      const counter = await this.models?.create({
        id: collectionName,
        seq: 0
      });

      return counter;
    } catch (error) {
      console.error('Erro ao criar o contador de sequencia:', error);
      throw error;
    }
  }


  async seqNext(collectionName: string) {
    try {
      // Encontra o contador com o nome 'orders' e o atualiza
      const counter = await this.models?.findOneAndUpdate(
        { id: collectionName },
        { $inc: { seq: 1 } }, // Incrementa o campo seq em 1
        { new: true }
      );

      // O novo valor de seq no contador representa o próximo orderId
      const nextOrderId = counter.seq;

      return nextOrderId;
    } catch (error) {
      console.error('Erro ao incrementar o orderId:', error);
      throw error;
    }
  }

}