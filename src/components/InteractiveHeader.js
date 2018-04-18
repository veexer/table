import React, {Component} from "react";

import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import TiInfoOutline from 'react-icons/lib/ti/info-outline';

export default class InteractiveHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: null,
      name: '',
      email: '',
      nameHolder: 'Name...',
      emailHolder: 'E-mail...',
      emailValid: false,
      nameValid: false,
      emailBorder: '',
      nameBorder: '',
      disableColor: '',
      infoMsg: '',
      worked: true,
      confirm: true
    };
  }

  handleClick(e) {
    if (this.props.erCallback)
      this.setState({worked: false, infoMsg: "You can't add new User because of limit"});
    else
      this.setState({click: 'clicked', worked: true});
    }

  handleNameChange(event) {
    this.setState({name: event.target.value});
    if (event.target.value.match(/^[a-zA-Z]*$/))
      this.setState({nameValid: true, disableColor: 'Green', nameBorder: '1px solid #42f448'});
    else {
      this.setState({nameValid: false, disableColor: 'Grey', nameBorder: '1px solid red'});
    }
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
    if (event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      this.setState({emailValid: true, disableColor: 'Green', emailBorder: '1px solid #42f448'});
    else
      this.setState({emailValid: false, disableColor: 'Grey', emailBorder: '1px solid red'});
    }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({click: null, infoMsg: "Successfully Added user", worked: false});
    this.props.arrayCallback(this.state);
  }

  clearInput() {
    this.setState({name: '', email: ''});
  }

  render() {
    const {
      worked,
      email,
      name,
      emailValid,
      nameValid,
      nameBorder,
      emailBorder,
      colorSwap,
      infoMsg
    } = this.state;
    const clickStatus = this.state.click;
    const isDup = this.props.dupCallback;
    const isEnabled = email.length > 0 && name.length > 0 && emailValid === true && nameValid === true;
    const enableReset = email.length > 0 && name.length > 0;

    return (<div className="inheader">
      {
        clickStatus
          ? (<form onSubmit={e => this.handleSubmit(e)}>
            <input autoFocus="autoFocus" className="inputbrack" type="text" value={this.state.name} style={{
                border: nameBorder
            }} maxLength={20} placeholder={this.state.nameHolder} onChange={e => this.handleNameChange(e)}/>
            <input className="inputbrack2" id="emailbrack" type="text" value={this.state.email} style={{
                border: emailBorder
            }} placeholder={this.state.emailHolder} onChange={e => this.handleEmailChange(e)}/>
            <button disabled={!isEnabled} className="inputbutt" type="submit" style={{
                background: colorSwap
            }} onClick={e => this.handleSubmit(e)}>
              Submit
            </button>
            {
              enableReset
                ? (<p className="resetForm" onClick={e => this.clearInput(e)}>Reset Fields</p>)
                : (null)
            }
          </form>)
          : (<div className="addpanel">
            <button onClick={e => this.handleClick(e)} className="addbutton">
              <FaPlusCircle icon-size={25}/>
              Add User
            </button>
            {
              worked
                ? null
                : (
                  isDup
                    ? <p className="alert"><TiInfoOutline icon-size={25} color="red"/>
                    User not added to the table, email was a duplicate</p>
                    : (<p className="alert"><TiInfoOutline icon-size={25} color="red"/> {infoMsg}</p>))
            }}
          </div>)
      } < /div>
      )
      }
      }
