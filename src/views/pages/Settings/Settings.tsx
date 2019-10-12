import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { Tag } from 'models/Tag';
import TagItem from './containers/TagItem';
import { createTag } from 'state/ducks/financial-forecast/actions';
import NewButton from 'views/components/NewButton';

type Props = {
  tags: Tag[],
  createTag: typeof createTag,
}

const Settings = (props: Props) =>
  <Fragment>
    <div className="mb-4">
      <h3>Tags</h3>
      <NewButton className="mb-2" onClick={() => {
        props.createTag({ label: 'new tag', id: 'new tag' });
      }} />
      <ListGroup>
        <Row>
          {
            props.tags && props.tags.map((tag: Tag) => <Col xs="4" key={tag.label}>
              <ListGroupItem>
                <TagItem
                  tag={tag}
                />
              </ListGroupItem>
            </Col>)
          }
        </Row>
      </ListGroup>
    </div>
  </Fragment>

export default connect(
  (state: any) => {
    const { financialForecast: { tags } } = state;

    return {
      tags: tags && tags.toJS(),
    }
  }
  , {
    createTag
  })(Settings);
