import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  // DTO da transação
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // retorna todos as transações
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      // condição para retornar caso não tenha nenhum transação
      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    }
    const positive = this.transactions.map(transaction => {
      // pega somente os valores do type income e armazena em um array
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const negative = this.transactions.map(transaction => {
      // pega somente os valore do type outcome e armazena em um array
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    const income = positive.reduce((total, next) => {
      // soma todos os valores do type income
      return total + next;
    });
    const outcome = negative.reduce((total, next) => {
      // soma todos os valore do type outcome
      return total + next;
    });
    const total = income - outcome; // retorna o total

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value }); // cria uma nova transação
    this.transactions.push(transaction); // acrescenta no array
    return transaction; // retorna essa transação
  }
}

export default TransactionsRepository;
