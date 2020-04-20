import React, { Component } from 'react';
import './DragApp.css';

export default class DragText extends Component {

    state = {
        tasks: [
          {id: "1", taskName:"Read book",type:"inProgress", backgroundColor: "red"},
          {id: "2", taskName:"Pay bills", type:"inProgress", backgroundColor:"green"},
          {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
          {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"green"}
        ]
    }

    onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	handleInputChange = (event) => {
		console.log("Changed: " + event.target.name + " : " + event.target.value);
		//setAlertType({...alertType, [event.target.name]: event.target.value })
		//if (event.target.name === 'alertMsgText') {
		  
		  //setMsgTxt(event.target.value);
		//}
	}




	onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let tasks = this.state.tasks.filter((task) => {
	        if (task.taskName == taskName) {
	            task.type = cat;
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        tasks
	    });
	}
	render() {

		const alertType = {
			name: '', description: '', queryString: '', queryName : '', alertMsgText: '', alertMsgSubject: '',
			 isInUse: '', alertMsgHeader: '', alertMsgSignature : '' };

		var tasks = {
	      inProgress: [],
	      Done: []
	    }

		this.state.tasks.forEach ((task) => {
		  tasks[task.type].push(
		    <div key={task.id} 
		      onDragStart = {(event) => this.onDragStart(event, task.taskName)}
		      draggable
		      className="draggable"
		      style = {{backgroundColor: task.bgcolor}}>
		      {task.taskName}
		    </div>
		  );
		});

	    return (
	      <div className="drag-container">
	        <h2 className="head">Työnalla lista DRAG & DROP</h2>
		    <div className="inProgress"
	    		onDragOver={(event)=>this.onDragOver(event)}
      			onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
	          <span className="group-header">TEKEILLÄ</span>
	          {tasks.inProgress}
	        </div>
	        <div className="droppable"
	        	onDragOver={(event)=>this.onDragOver(event)}
          		onDrop={(event)=>this.onDrop(event, "Done")}>
	          <span className="group-header">
			  <textarea   
                rows="5" cols="140"                             
                aria-label="PQ Query" 
                placeholder="PQ Query"
                name="queryString"                
                value={tasks.Done}
                type="text"
                rowsMin={3}                
                onChange = {e => this.handleInputChange(e)}
                fullWidth
            />
			  
			  
			  </span>
	          {tasks.Done}
	        </div>
            <div className="inProgress" onDragOver={(event)=>this.onDragOver(event)}
	        onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
  	        <span className="group-header">TYÖN ALLA</span>
  	        {tasks.inProgress}
            </div>        
	      </div>
	    );
  	}
  }
