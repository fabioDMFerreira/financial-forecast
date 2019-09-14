import React, { Component, ChangeEvent } from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';
import FormGroup from 'reactstrap/lib/FormGroup';
import Select from 'react-select/lib/Creatable';
import randomColor from 'randomcolor';

import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import { Tag } from 'models/ITag';
import { valueContainerCSS } from 'react-select/lib/components/containers';

type Props = {
  opened: boolean | undefined,
  close: () => void,
  save: (update: any) => void,
  tags: Tag[],
  createTag: (tag: Tag) => void
}

type UpdateType = {
  tags?: any
  description?: string
}

type State = {
  update: UpdateType
}

export default class BulkUpdateModal extends Component<Props, State> {

  state = {
    update: {} as UpdateType
  }

  change = (key: keyof UpdateType, value: any) => {

    if (!value || !value.length) {
      const update = { ...this.state.update };

      delete update[key];

      return this.setState({
        update
      });
    }

    this.setState({
      update: {
        ...this.state.update,
        [key]: value
      }
    })
  }

  render() {
    const {
      opened,
      close,
      save,
      createTag,
      tags,
    } = this.props;

    const {
      update
    } = this.state;

    return <Modal isOpen={opened} toggle={close}>
      <ModalHeader toggle={close} > Bulk update</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              value={update.description ? update.description : ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { this.change("description", e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Tags</Label>
            <Select
              options={tags}
              onChange={(value: any) => this.change('tags', value)}
              value={update.tags ? update.tags : []}
              onCreateOption={(newOptionLabel: string) => {
                const newOption = { label: newOptionLabel, value: newOptionLabel.toLowerCase(), color: randomColor() }
                createTag(newOption);
                if (update.tags) {
                  this.change('tags', [...update.tags, newOption])
                }
                else {
                  this.change('tags', [newOption]);
                }
              }}
              isMulti
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => save(this.state.update)}>Bulk update</Button>{' '}
        <Button color="secondary" onClick={close}>Cancel</Button>
      </ModalFooter>
    </Modal >
  }
}

