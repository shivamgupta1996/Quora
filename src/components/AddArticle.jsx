import React, { Component } from 'react';
import { articleRef } from '../firebase';
import { connect } from 'react-redux';

class AddArticle extends Component {
  constructor(props){
    super(props);

    this.state = {
      title : '',
      body : '',
    }
  }

addArticle(){
  if(this.state.title ==''){
    return alert("Title cannot be left blank");

  }else if (this.state.body=='') {
    return alert("Body cannot be left blank");
  } else {
  const {title, body} = this.state;
  const { email } = this.props.user;
  articleRef.push({email, title, body});
          }
}

  render(){
    return(
      <div>
        <h2>Add Article</h2>
        <div className = "form-group">
          <input
            className = "form-control"
            type = "text"
            placeholder = "Enter Title"
            onChange ={event => this.setState({title : event.target.value})} />

          <input
            className = "form-control"
            style={{marginTop:'10px'}}
            type = "text"
            placeholder = "Type in your article content here"
            onChange ={event => this.setState({body : event.target.value})} />

            <button
              type = "button"
              style={{marginTop:'10px'}}
              className = "btn btn-primary"
              onClick = {() => this.addArticle()}
              >Add
              </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){

  const {user} = state;
  return {
    user
  }

}
export default connect (mapStateToProps, null)(AddArticle);
