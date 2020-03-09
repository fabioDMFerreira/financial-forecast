import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllExternalTransactions } from 'state/ducks/financial-forecast/transactionsSelectors';
import { getTagsSelector, getTagsViewSelector, updateTagsView } from 'state/ducks/tags';

import Tags from './Tags';

const TagsContainer =
  connect(
    (state: any, props: any) => ({
      transactions: getAllExternalTransactions(state),
      tags: getTagsSelector(state),
      tagsView: getTagsViewSelector(state),
    }),
    {
      updateTagsView,
    },
  )(withRouter(Tags));

export default () => <TagsContainer />;