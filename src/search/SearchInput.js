import React from 'react';

import { withStyles } from 'material-ui/styles';
import ChipInput from 'material-ui-chip-input';

const styles = {
  label: {
    'width': '85%',
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
  },
  labelShrink: {
    'overflow': 'visible',
  },
};

function SearchInput(props) {

  const onBeforeAdd = (chip) => chip.length >= 2;

  const handleAdd = (chip) => {
    props.onInputChange([...props.value, chip.toLowerCase()]);
  };

  const handleDelete = (chip) => {
    props.onInputChange(props.value.filter((c) => c !== chip));
  };

  return (
    <ChipInput
      autoFocus
      classes={{ label: props.classes.label, labelShrink: props.classes.labelShrink }}
      fullWidth
      label={props.label}
      newChipKeyCodes={[13, 32]}
      value={props.value}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onBeforeAdd={onBeforeAdd}
    />
  );
}

export default withStyles(styles)(SearchInput);
