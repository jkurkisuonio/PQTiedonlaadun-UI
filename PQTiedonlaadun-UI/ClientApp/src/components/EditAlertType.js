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
import DragText from './DragText';
import insertAtCaret from './InsertAtCaret';
import $ from 'jquery';



export default function EditAlertType(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {                
      setAlertType({ name: props.alertType.name, description: props.alertType.description, queryString: props.alertType.queryString, alertMsgHeader: props.alertType.alertMsgHeader,
         alertMsgSignature: props.alertType.alertMsgSignature, queryName: props.alertType.queryName, alertMsgText: props.alertType.alertMsgText, alertMsgSubject: props.alertType.alertMsgSubject, isInUse: props.alertType.isInUse})
        setMsgTxt(props.alertType.alertMsgText);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [alertType, setAlertType] = React.useState({
            name: '', description: '', queryString: '', queryName : '', alertMsgText: '', alertMsgSubject: '', isInUse: '', alertMsgHeader: '', alertMsgSignature : ''
        }
    );

    const handleInputChange = (event) => {
      console.log("Changed: " + event.target.name + " : " + event.target.value);
      setAlertType({...alertType, [event.target.name]: event.target.value })
      if (event.target.name === 'alertMsgText') {
        
        setMsgTxt(event.target.value);
      }
      console.log("Event.target.name: " + event.target.name);
      if (event.target.name === 'alertMsgSignature') {
        setFooterTxt(event.target.value);
      }
      if (event.target.name === 'alertHeaderText') {
        setHeaderTxt(event.target.value);
      }
  }
    

    const updateAlertType = () => {
        props.updateAlertType(alertType, props.alertType.link);
        handleClose();
    }

    const [checked, setChecked] = React.useState(alertType.isInUse);

    const toggleChecked = () => {
        if (alertType.isInUse) alertType.isInUse = false;
        else alertType.isInUse = true;
        setChecked(prev => !prev);
        console.log("alertType.isInuse: " + alertType.isInUse);
      };
    
      const [msgTxt, setMsgTxt] = React.useState(alertType.alertMsgText);
      const [headerTxt, setHeaderTxt] = React.useState(alertType.alertMsgHeader);
      const [footerTxt, setFooterTxt] = React.useState(alertType.alertMsgSignature);

      const appendTextMark = (name) => 
      {
        console.log(name);       
         alertType.alertMsgText = alertType.alertMsgText + "%" + name + "%";
         
         console.log(alertType.alertMsgText);
         setMsgTxt(alertType.alertMsgText);
         

         // Get the focused element:
         var focused = $(':focus');
         alert("Focused is: " + focused);
         insertAtCaret("textareaid", name);
      }  
      
      const appendTextElementToArea = (text,area) => 
      {
        console.log("TEXT: " + text);       
        console.log("AREA:" + area);
         text = "%" + text + "%";
         var data = alertType;
         data[area] = data[area] + text;
         console.log("data[area] is " + data[area]);
         console.log("Signautr is:" +data.alertMsgSignature);
         setAlertType(data);
         
         if (area === 'alertMsgSignature') {
          console.log("DEBUG: alerMsgSignature");
          setFooterTxt(data.area);
        }        
        else if (area === 'alertMsgHeader')
        {
          setHeaderTxt(data.area);
        }
         
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

            <TextField     
                margin="dense"
                name="alertMsgSubject"
                label="Subject"
                value={alertType.alertMsgSubject}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />


            <textarea    
                rows="10" cols="140"                             
                placeholder="Message Header"
                name="alertMsgHeader"
                label="Message Header"
                value={alertType.alertMsgHeader}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth />

            <div class="container">
              <div class="row">
                <div class="col-2">            
            <Button onClick={() => appendTextElementToArea("DateTimeNow", "alertMsgHeader")}>DateTimeNow</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextElementToArea("ReceiverEmail", "alertMsgHeader")}>ReceiverEmail</Button>                        
          </div>
          <div class="col-2">
          <Button onClick={() => appendTextElementToArea("AlertTypeName", "alertMsgHeader")}>AlertTypeName</Button>                        
          </div>
          <div class="col-2">            
            <Button onClick={() => appendTextElementToArea("StudentName", "alertMsgHeader")}>StudentName</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextElementToArea("WilmaStudentUrl", "alertMsgHeader")}>WilmaStudentUrl</Button>                        
          </div>
          
          </div>
        </div>




            <textarea    
                rows="10" cols="140"                             
                placeholder="Alert Message"
                name="alertMsgText"
                label="Alert Message"
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



              <textarea    
                rows="10" cols="140"                             
                placeholder="Message Footer"
                name="alertMsgSignature"
                label="Message Footer"
                id="textareaid"
                value={alertType.alertMsgSignature}
                type="text"
                onChange = {e => handleInputChange(e)}
                fullWidth
            />
                       <div class="container">
              <div class="row">
                <div class="col-2">            
            <Button onClick={() => appendTextElementToArea("DateTimeNow", "alertMsgSignature")}>DateTimeNow</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextElementToArea("ReceiverEmail", "alertMsgSignature")}>ReceiverEmail</Button>                        
          </div>
          <div class="col-2">
          <Button onClick={() => appendTextElementToArea("AlertTypeName", "alertMsgSignature")}>AlertTypeName</Button>                        
          </div>
          <div class="col-2">            
            <Button onClick={() => appendTextElementToArea("StudentName", "alertMsgSignature")}>StudentName</Button>                        
              </div>
            <div class="col-2">
            <Button onClick={() => appendTextElementToArea("WilmaStudentUrl", "alertMsgSignature")}>WilmaStudentUrl</Button>                        
          </div>
          
          </div>
        </div>


          

           
          
          
          
          
      
  
            
            <Switch id="isInUse" checked={alertType.isInUse}  inputProps={{ 'aria-label': 'In use?' }} onChange={toggleChecked} />



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