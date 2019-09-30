import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Input from 'reactstrap/lib/Input';
import { createSliderWithTooltip, Range as SliderRange } from 'rc-slider';
import { DebounceInput } from 'react-debounce-input';

import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';

import { GlobalFilters } from 'models/GlobalFilters';
import { Tag } from 'models/Tag';
import Button from 'reactstrap/lib/Button';
import DateRangePicker from 'views/components/DateRangePicker';
import TagSelect from '../TagSelect';

type Props = {
  globalFilters: GlobalFilters,
  tags: Tag[],
  updateGlobalFilter: (keyFilter: keyof GlobalFilters, value: any) => any,
  createTag: (tag: Tag) => any
}

type State = {
  credit?: number[],
  debit?: number[],
}


const Range = createSliderWithTooltip(SliderRange);

export default class GlobalFiltersComponent extends Component<Props, State> {

  static defaultProps = {
    globalFilters: {},
    tags: []
  }

  state = {
    credit: undefined,
    debit: undefined
  }

  render() {
    const {
      globalFilters: {
        startDate,
        endDate,
        tags: tagsSelected,
        credit,
        debit,
        description
      },
      tags,
      updateGlobalFilter,
      createTag,
    } = this.props;

    return <div>
      <Row>
        <Col xs={2}>
          <FormGroup>
            <Label>Description</Label>
            <DebounceInput
              element={Input}
              debounceTimeout={500}
              value={description}
              onChange={(e: any) => updateGlobalFilter('description', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Tags</Label>
            <TagSelect
              classNamePrefix="react-select"
              tagsSelected={tagsSelected || []}
              onChange={value => updateGlobalFilter('tags', value)}
            />
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label>Date range</Label><br />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              updateStartDate={(startDate) => updateGlobalFilter('startDate', startDate)}
              updateEndDate={(endDate) => updateGlobalFilter('endDate', endDate)}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Credit {
              credit ?
                <span>({credit[0]} - {credit[1]} <Button color="link" onClick={() => { updateGlobalFilter('credit', null) }}>X</Button>)</span> :
                ''
            }</Label>
            <Range
              min={0}
              max={10000}
              pushable={true}
              value={this.state.credit ? this.state.credit : credit || []}
              onChange={(value) => {
                this.setState({
                  credit: value
                });
              }}
              onAfterChange={value => {
                updateGlobalFilter('credit', value);
                this.setState({
                  credit: undefined
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <FormGroup>
            <Label>Debit {
              debit ?
                <span>({debit[0]} - {debit[1]} <Button color="link" onClick={() => { updateGlobalFilter('debit', null) }}>X</Button>)</span> :
                ''
            }</Label>
            <Range
              min={0}
              max={10000}
              pushable={true}
              value={this.state.debit ? this.state.debit : debit || []}
              onChange={(value) => {
                this.setState({
                  debit: value
                });
              }}
              onAfterChange={value => {
                updateGlobalFilter('debit', value);
                this.setState({
                  debit: undefined
                });
              }}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  }
}
