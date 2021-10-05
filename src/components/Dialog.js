import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactJson from 'react-json-view'

export default function ScrollDialog({ dialog, closeModal, data, dialogButtons, showJson, dialogTitle }) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (dialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [dialog]);

  return (
    <Dialog
      open={dialog}
      onClose={closeModal}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          component={'span'}
        >
          { showJson ? <ReactJson src={data} /> : data }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {dialogButtons && dialogButtons.map((b,i) => <Button onClick={b.onClick} key={`${b.label}-i`}>{b.label}</Button>)}
      </DialogActions>
    </Dialog>
  );
}
