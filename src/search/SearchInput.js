import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { withStyles } from 'material-ui/styles';

import { Content } from '../styles/SearchInput';

const styles = {
  label: {
    //color: blue[500],
  }
};

function SearchInput(props) {

  const onBeforeAdd = (chip) => chip.length >= 2

  const handleAdd = (chip) => {
    props.onInputChange([...props.value, chip.toLowerCase()]);
  };

  const handleDelete = (chip) => {
    props.onInputChange(props.value.filter((c) => c !== chip));
  };

  return (
    <Content>
      <ChipInput
        autoFocus
        //classes={{ label: props.classes.label }}
        fullWidth
        label={props.label}
        newChipKeyCodes={[13, 32]}
        value={props.value}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onBeforeAdd={onBeforeAdd}
      />
    </Content>
  );
}

export default SearchInput;
