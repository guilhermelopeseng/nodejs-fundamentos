import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    }
    const positive = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });
    const negative = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });
    const income = positive.reduce((total, next) => {
      return total + next;
    });
    const outcome = negative.reduce((total, next) => {
      return total + next;
    });
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
