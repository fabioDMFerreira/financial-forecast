import { Tag } from './ITag';

export default interface TransactionDataInterface {
  id?: string,
  startDate?: string,
  endDate?: string,
  description: string,
  credit?: string,
  debit?: string,
  particles?: string,
  totalValue?: string,
  interval?: string,
  visible?: boolean,
  tags?: Tag[],
  selected?: boolean,
}