import { GlobalFiltersType } from 'models/GlobalFiltersType';
import TransactionDataInterface from 'models/ITransactionData';

export default (globalFilters: GlobalFiltersType = {}) => (transaction: TransactionDataInterface) => {
  let matchesStartDate = true;
  let matchesEndDate = true;
  let matchesTags = true;
  let matchesCredit = true;
  let matchesDebit = true;
  let matchesDescription = true;

  if (globalFilters.startDate && transaction.startDate) {
    matchesStartDate = new Date(transaction.startDate) >= new Date(globalFilters.startDate);
  } else if (globalFilters.startDate && !transaction.startDate) {
    matchesStartDate = false;
  }

  if (globalFilters.endDate && transaction.endDate) {
    matchesEndDate = new Date(transaction.endDate) <= new Date(globalFilters.endDate);
  } else if (globalFilters.endDate && !transaction.endDate) {
    matchesEndDate = false;
  }

  if (globalFilters.tags && globalFilters.tags.length && transaction.tags) {
    const globalTagsIds = globalFilters.tags.map(tag => tag.value);
    matchesTags = transaction.tags.some(tag => globalTagsIds.includes(tag.value));

    if (globalTagsIds.includes('null') && (!transaction.tags || !transaction.tags.length)) {
      matchesTags = true;
    }
  }

  if (globalFilters.credit && transaction.credit && +transaction.credit > 0) {
    matchesCredit = +transaction.credit >= globalFilters.credit[0] && +transaction.credit <= globalFilters.credit[1];
  } else if (globalFilters.credit && !transaction.credit) {
    matchesCredit = false;
  }

  if (globalFilters.debit && transaction.debit && +transaction.debit > 0) {
    matchesDebit = +transaction.debit >= globalFilters.debit[0] && +transaction.debit <= globalFilters.debit[1];
  } else if (globalFilters.debit && !transaction.debit) {
    matchesDebit = false;
  }

  if (globalFilters.description && transaction.description) {
    matchesDescription = transaction.description.toLowerCase().includes(globalFilters.description.toLowerCase());
  } else if (globalFilters.description && !transaction.description) {
    matchesDescription = false;
  }

  return matchesStartDate && matchesEndDate && matchesTags && matchesCredit && matchesDebit && matchesDescription;
}