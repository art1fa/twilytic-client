import React from 'react';
import Button from 'material-ui/Button';


export default function LoadMore(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="outlined"
      color="primary"
      style={{
        display: 'flex',
        margin: '20px auto',
      }}
    >
      Mehr {props.entities} laden
    </Button>
  );
}
