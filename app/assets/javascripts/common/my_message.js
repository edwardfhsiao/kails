class MyMessage {

  constructor() {
    this.init();
  }

  init(){
    $(document).on('click', '.my-message__close', (evt) => {
      $(evt.target).parent().removeClass('show');
    });
  }

  createBox(className, content) {
    let messageBox = document.createElement('div');
    messageBox.className = 'module my-message my-message--' + className;
    let el = document.body.appendChild(messageBox);
    content = '<div class=\'my-message__content\'>' + content + '</div>' + '<i class=\'my-message__close mdi-icon mdi-highlight-off\'></i>';
    el.innerHTML = content;
    setTimeout(() => {
      el.className = el.className + ' show';
    }, 100)
    return el;
  }

  showError(content = '', autoHide = true, expiredTime = 5000) {
    let messageBox = this.createBox('error', content);
    this.hide(messageBox, content, autoHide, expiredTime);
  }

  showWarning(content = '', autoHide = true, expiredTime = 5000) {
    let messageBox = this.createBox('warning', content);
    this.hide(messageBox, content, autoHide, expiredTime);
  }

  showMessage(content = '', autoHide = true, expiredTime = 5000) {
    let messageBox = this.createBox('success', content);
    this.hide(messageBox, content, autoHide, expiredTime);
  }

  hide(messageBox, content, autoHide, expiredTime){
    if (autoHide){
      let time;
      if (expiredTime != 5000){
        if (expiredTime < 1000){
          time = 1000;
        }
        else{
          time = expiredTime;
        }
      }
      else{
        time = (content.length) * 800;
      }
      this.removeMessage(messageBox, time);
    }
  }

  removeMessage(messageBox, expiredTime) {
    setTimeout(() => {
      $(messageBox).removeClass('show');
    }, expiredTime)
  }

}

export default MyMessage;
