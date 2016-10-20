import React, { Component } from 'react';
import MyLoader from '../../../common/my_loader';
let myLoader = new MyLoader();

class Modal extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initImageLoader(this.props.index);
  }

  componentDidUpdate(prevProps) {

  }

  initImageLoader(index) {
    myLoader.initLazyLoadingImage('b-lazy-id-' + index, 'loader-' + index, {color:'#000', lines: 12});
  }

  render() {
    return(
     <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">
                <div className="modal_module movie__title form-group">
                </div>
              </h4>
            </div>
            <div className="modal-body">
              <div className="modal_module movie row">
                <div className="modal_module movie__image col-md-5">

                </div>
                <div className="modal_module movie__content col-md-7">
                  <div className="form-group">
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;