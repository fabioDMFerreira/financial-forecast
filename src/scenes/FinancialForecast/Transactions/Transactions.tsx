import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import randomColor from 'randomcolor';

import YYYYMMDD from 'utils/YYYYMMDD';
import csvJSON from 'utils/csvJSON';
import TransactionDataInterface from '../TransactionDataInterface';
import { addNewTransaction, bulkAddTransactions, updateTransaction, deleteTransaction, clearTransactions, dragTransaction, createTag, updateTransactionsFilters, filterType } from '../FinancialForecastActions';
import { TagType } from '../TagType';
import TransactionsTable from './TransactionsTable';
import Button from 'reactstrap/lib/Button';
import TransactionFieldsMetadata from '../TransactionFieldsMetadata';
import validateTransactionData from './validateTransactionData';
import ImportTransactionsModal from './ImportTransactionsModal';

const TableActions = styled.div`
  background-color: $white;
  margin-bottom:10px;

  button{
    margin: 0px 10px 0px 0px;
  }
`;

type Props = {
  transactions: TransactionDataInterface[],
  addNewTransaction: typeof addNewTransaction,
  bulkAddTransactions: typeof bulkAddTransactions,
  updateTransaction: typeof updateTransaction,
  deleteTransaction: typeof deleteTransaction,
  clearTransactions: typeof clearTransactions,
  dragTransaction: typeof dragTransaction
  createTag: typeof createTag,
  tags: TagType[],
  updateTransactionsFilters: typeof updateTransactionsFilters
  filters: filterType[],
}

type State = {
  importingModalOpened: boolean,
  importingData: object[],
}


export default class Transactions extends Component<Props, State> {

  static defaultProps = {
    transactions: [],
  }

  state: State = {
    importingModalOpened: false,
    importingData: [],
  }

  fileInput: any;

  parseTransactionsToCsv = (transactions: TransactionDataInterface[]) => {
    return transactions.map(t => {
      return {
        ...t,
        tags: t.tags ? t.tags.map(tag => tag.value).join(',') : []
      }
    });
  }

  importTransactions = (event: any) => {
    const reader = new FileReader();
    const file = this.fileInput.files[0];

    reader.onerror = () => {
    };
    reader.onload = (csv =>
      (e: any) => {
        let csvContent = csvJSON(e.target.result, TransactionFieldsMetadata);
        if (csvContent.length && !validateTransactionData(csvContent[0])) {

          csvContent = csvContent.map(this.configureTransactionFromCSV);

          this.setState({
            importingModalOpened: true,
            importingData: csvContent,
          });
        } else {
          csvContent = csvContent.map(this.configureTransactionFromCSV);

          this.props.bulkAddTransactions(csvContent);
        }

      }
    )(file);

    reader.readAsText(file);
  }

  configureTransactionFromCSV = (transaction: any) =>
    ({
      ...transaction,
      tags: transaction.tags && transaction.tags.split(',').map((tagValue: string) => {
        const tag = this.props.tags.find(tag => tagValue === tag.value);
        if (tag) {
          return {
            ...tag
          };
        };

        // create a new tag if it does not exist in store
        const newOption = { label: tagValue, value: tagValue.toLowerCase(), color: randomColor() }
        this.props.createTag(newOption);

        return newOption;
      })
    })

  render() {
    const {
      importingModalOpened,
      importingData,
    } = this.state;

    const {
      addNewTransaction,
      updateTransaction,
      deleteTransaction,
      clearTransactions,
      dragTransaction,
      createTag,
      tags,
      updateTransactionsFilters,
      filters,
      transactions,
      bulkAddTransactions,
    } = this.props;

    return <Fragment>
      <TableActions>
        <Button outline color="secondary" size="sm" onClick={addNewTransaction}>
          <FontAwesomeIcon icon={faPlus} /> Add
</Button>
        <CSVLink
          data={this.parseTransactionsToCsv(transactions)}
          filename={`transactions-${YYYYMMDD(new Date())}.csv`}
          headers={TransactionFieldsMetadata}
        >
          <Button outline color="secondary" size="sm">
            <FontAwesomeIcon icon={faUpload} /> Export
</Button>
        </CSVLink>
        <Button outline color="secondary" size="sm" onClick={() => this.fileInput.click()}>
          <FontAwesomeIcon icon={faDownload} /> Import
</Button>
        <Button outline color="secondary" size="sm" onClick={clearTransactions}>
          <FontAwesomeIcon icon={faTrash} /> Clear all
</Button>
        <input
          title="Import from .csv file"
          type="file"
          accept=".csv"
          ref={(input) => { this.fileInput = input; }}
          onChange={this.importTransactions}
          style={{ display: 'none' }}
        />
      </TableActions>
      <TransactionsTable
        transactions={transactions}
        updateTransaction={updateTransaction}
        removeTransaction={deleteTransaction}
        dragTransaction={dragTransaction}

        filters={filters}
        updateTransactionsFilters={updateTransactionsFilters}

        tags={tags}
        createTag={createTag}
      />

<ImportTransactionsModal
        opened={importingModalOpened}
        data={importingData}
        save={(transactions) => {
          bulkAddTransactions(transactions);
          this.setState({
            importingModalOpened: false
          });
        }
        }
        close={() => this.setState({ importingModalOpened: false })}
      />
    </Fragment>
  }
}