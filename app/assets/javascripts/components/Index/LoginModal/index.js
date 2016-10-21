import React, { Component } from 'react';
import MyLoader from '../../../common/my_loader';
let myLoader = new MyLoader();
import Validator from '../../../common/my_validator';
let validator = new Validator();


class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.initImageLoader(this.props.index);
  }

  componentDidUpdate(prevProps) {

  }

  initImageLoader(index) {
    myLoader.initLazyLoadingImage('b-lazy-id-' + index, 'loader-' + index, {color:'#000', lines: 12});
  }

  handleChangeEmail(){
    let email = this.refs.email.value;
    this.setState({email});
  }

  handleChangePassword(){
    let password = this.refs.password.value;
    this.setState({password});
  }

  login(){
    let isValid = validator.isValidForm($('#login-form'));
    if (isValid){
      let { email, password } = this.state;
      this.props.login(email, password);
    }
  }

  render() {
    let { email, password } = this.state;
    let { titleText, cancelText, emailText, passwordText } = this.props;
    return(
     <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">
                {titleText}
              </h4>
            </div>
            <div className="modal-body">
              <form id="login-form">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-envelope"></span>
                  </span>
                  <input
                    type="text"
                    id="login-email-field"
                    ref="email"
                    value={email}
                    onChange={this.handleChangeEmail.bind(this)}
                    className="form-control"
                    placeholder={emailText}
                    aria-describedby="basic-addon1"
                    data-my-validator="true"
                    data-my-validator-required="true"
                    data-my-validator-name={emailText}
                    data-my-validator-type="email"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-pencil"></span>
                  </span>
                  <input
                    type="password"
                    id="login-password-field"
                    ref="password"
                    value={password}
                    onChange={this.handleChangePassword.bind(this)}
                    className="form-control"
                    data-validator="my-validator"
                    placeholder={passwordText}
                    aria-describedby="basic-addon1"
                    data-my-validator="true"
                    data-my-validator-required="true"
                    data-my-validator-name={passwordText}
                  />
                </div>
                <div className="operations">
                  <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={this.login.bind(this)}>{titleText}</button>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default" data-dismiss="modal">{cancelText}</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;