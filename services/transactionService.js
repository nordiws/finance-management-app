import TransactionModel from '../models/TransactionModel.js';

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/

const getTrx = async (req, res) => {
  try {
    const { period } = req.query;
    if (!period) {
      res
        .status(400)
        .send(
          'É necessário informar o parâmetro "period", cuyo valor deve estar no formato yyyy-mm'
        );
      return;
    }
    const currentYearMonth = await TransactionModel.find({
      yearMonth: period,
    });
    res.send(currentYearMonth);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getTrxById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .send(
          'É necessário informar o parâmetro "id", cuyo valor deve ser o id do documento'
        );
      return;
    }
    const transaction = await TransactionModel.find({ _id: id });
    res.send(transaction);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createTrx = async (req, res) => {
  try {
    if (!req.body) {
      res
        .status(400)
        .send('É necessário enviar os dados para criação de um registro');
    }
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTrxById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .send(
          'É necessário informar o parâmetro "id", cuyo valor deve ser o id do documento'
        );
    }
    const updateTrx = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(updateTrx);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteTrxById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTrx = await TransactionModel.findByIdAndRemove(id);
    if (!deleteTrx) {
      res.status(404).send('A transação informada não existe');
      return;
    }
    res.send(deleteTrx);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { getTrx, getTrxById, createTrx, updateTrxById, deleteTrxById };
