import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TextareaAutosize } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';



export default function AddAlertType(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props.alertType);
      //setAlertType({ name: props.alertType.name, description: props.alertType.description, queryString: props.alertType.queryString,  queryName: props.alertType.queryName, alertMsgText: props.alertType.alertMsgText, alertMsgSubject: props.alertType.alertMsgSubject, isInUse: props.alertType.isInUse})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [alertType, setAlertType] = React.useState({
            cardnumber: '',  name: '', description: '', queryString: '', queryName : '',  msgHeader: '',  alertMsgText: '', msgSignature: '', alertMsgSubject: '', isInUse: false
        }
    );

    const [msgTxt, setMsgTxt] = React.useState('');

     const handleInputChange = (event) => {
        console.log("Changed: " + event.target.name + " : " + event.target.value);
        setAlertType({...alertType, [event.target.name]: event.target.value })
        setMsgTxt(event.target.value);
    }
    

    const saveAlertType = () => {
        props.saveAlertType(alertType);
        handleClose();
    }

    const [checked, setChecked] = React.useState(alertType.isInUse);

    const toggleChecked = () => {
        if (alertType.isInUse) alertType.isInUse = false;
        else alertType.isInUse = true;
        setChecked(prev => !prev);
        console.log("alertType.isInuse: " + alertType.isInUse);
      };
 
    const appendTextMark = (name) => 
    {
      console.log(name);       
       alertType.alertMsgText = alertType.alertMsgText + "%" + name + "%";
       console.log(alertType.alertMsgText);
       setMsgTxt(alertType.alertMsgText);
    }   
 

    return (
    <div>
      <Button  color="primary" onClick={handleClickOpen}>
       Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">Add AlertType</DialogTitle>
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
                placeholder="Message Header"
                name="msgHeader"
                label="Message Header"
                value={alertType.messageHeader}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth />
            <textarea    
                rows="10" cols="140"                             
                placeholder="Message Body"
                name="alertMsgText"
                label="Message Body"
                value={msgTxt}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
                <textarea    
                rows="10" cols="140"                             
                placeholder="Message Footer"
                name="msgSignature"
                label="Message Footer"
                value={msgTxt}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />

            <div class="container">
              <div class="row">
                <div class="col-2">            
            <Button onClick={() => appendTextMark("DateTimeNow")}>DateTimeNow</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextMark("ReceiverEmail")}>ReceiverEmail</Button>                        
          </div>
          <div class="col-2">
          <Button onClick={() => appendTextMark("AlertTypeName")}>AlertTypeName</Button>                        
          </div>
          <div class="col-2">            
            <Button onClick={() => appendTextMark("StudentName")}>StudentName</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextMark("WilmaStudentUrl")}>WilmaStudentUrl</Button>                        
          </div>
          
          </div>
        </div>


        
            <TextField     
                margin="dense"
                name="alertMsgSubject"
                label="Subject"
                value={alertType.alertMsgSubject}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
  
            
            <Switch id="isInUse" checked={alertType.isInUse}  inputProps={{ 'aria-label': 'In use?' }} onChange={toggleChecked} />



        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveAlertType} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
);
}