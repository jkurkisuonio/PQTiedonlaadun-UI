import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TextareaAutosize } from '@material-ui/core';



export default function EditAlertType(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props.alertType);
      setAlertType({ name: props.alertType.name, description: props.alertType.description, queryString: props.alertType.queryString, 
        queryName: props.alertType.queryName, alertMsgText: props.alertType.alertMsgText, alertMsgSubject: props.alertType.alertMsgSubject, isInUse: props.alertType.isInUse})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [alertType, setAlertType] = React.useState({
            brand: '', model: '', color: '', fuel: '', year: '', price: ''
        }
    );

     const handleInputChange = (event) => {
        setAlertType({...alertType, [event.target.name]: event.target.value })
    }
    

    const updateAlertType = () => {
        props.updateAlertType(alertType, props.alertType.link);
        handleClose();
    }


 

    return (
    <div>
      <Button  color="primary" onClick={handleClickOpen}>
       Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"   maxWidth="lg">
        <DialogTitle id="form-dialog-title">Edit AlertType</DialogTitle>
        <DialogContent >
        <DialogContentText>
      
          </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                value={alertType.name}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <TextField     
                margin="dense"
                name="description"
                label="Description"
                value={alertType.description}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <textarea   
                rows="5" cols="140"                             
                aria-label="PQ Query" 
                placeholder="PQ Query"
                name="queryString"                
                value={alertType.queryString}
                type="text"
                rowsMin={3}                
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <TextField     
                margin="dense"
                name="queryName"
                label="Query Name"
                value={alertType.queryName}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <textarea    
                rows="10" cols="140"                             
                placeholder="Alert Message"
                name="alertMsgText"
                label="Alert Message"
                value={alertType.alertMsgText}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <TextField     
                margin="dense"
                name="alertMsgSubject"
                label="Subject"
                value={alertType.alertMsgSubject}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
            <TextField     
                margin="dense"
                name="isInUse"
                label="In use?"
                value={alertType.isInUse}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateAlertType} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
);
}