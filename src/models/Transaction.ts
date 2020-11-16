import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome'; // existe somente esses dois tipos

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    // omit id
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
