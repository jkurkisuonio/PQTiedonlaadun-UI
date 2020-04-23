import React, { Component } from 'react';
import pic from './primustiedonlaadunvalvonta.PNG';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Primus oppilashallinnon tiedon laadun –hälytysjärjestelmä </h1>
        <p></p>
        <img src={pic} alt="kuva primus tiedonlaadunvalvonta hälytysjärjestelmästä" />
        
       
       
        
      </div>
    );
  }
}
