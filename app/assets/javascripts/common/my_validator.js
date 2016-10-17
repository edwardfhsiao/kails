import _ from 'lodash';
class MyValidator {

  constructor() {
    this.init();
  }

  validate($this) {
    let isMyValidator = $this.data('my-validator');
    let $parent = $this.parent();
    let $message = $parent.next('div[class^="my-validator-message"]');
    let $inputType = $this.attr('type');

    let error = false;
    let message;
    let validatorRequired = $this.data('my-validator-required');
    let name = $this.data('my-validator-name');

    if ($inputType == 'text' || $this.is('textarea')){
      if (isMyValidator){
        let $val = $this.val();
        let isEmpty = _.isEmpty($val);
        if (validatorRequired){
          if (isEmpty){
            error = true;
            message = name + '不能为空';
          }
        }
        let validatorType = $this.data('my-validator-type');
        let validatorMinLength = $this.data('my-validator-min-length');
        let validatorMaxLength = $this.data('my-validator-max-length');
        let validatorMinAmount = $this.data('my-validator-min-amount');
        let validatorMaxAmount = $this.data('my-validator-max-amount');
        if (validatorType == 'email'){
          if (!this.isEmail($val) && !isEmpty){
            error = true;
            message = name + '格式不正确';
          }
        }
        if (validatorType == 'number' && !isEmpty){
          if ((_.isNaN(_.toNumber($val)) || !_.isNumber(_.toNumber($val))) && !isEmpty){
            error = true;
            message = name + '必须为数字';
          }
        }
        if (!error && (validatorMinLength || validatorMaxLength)){
          let result = this.validateLength($val, name, validatorMinLength, validatorMaxLength);
          error = result.error;
          message = result.message;
        }
        if (!error && (validatorMinAmount || validatorMaxAmount)){
          let result = this.validateAmount($val, name, validatorMinAmount, validatorMaxAmount);
          error = result.error;
          message = result.message;
        }
        if ((validatorRequired && $message.length <= 0) || (!validatorRequired && $message.length <= 0 && $val.length > 0)){
          if (error){
            $parent.addClass('has-error');
            this.creatMessage($parent, message, 'error');
          }
          else{
            message = '正确';
            $parent.addClass('has-success');
            this.creatMessage($parent, message, 'success');
          }
        }
        else{
           if (error && $message.length <= 0){
            $parent.addClass('has-error');
            this.creatMessage($parent, message, 'error');
          }
        }
      }
    }
    else if ($inputType == 'checkbox'){
      if (isMyValidator && $message.length <= 0){
        if (validatorRequired){
          if (!$this.is(':checked')){
            message = '请勾选' + name;
            $parent.addClass('has-error');
            this.creatMessage($parent, message, 'error');
          }
        }
      }
    }
    if(error){
      return false;
    }
    return true;
  }

  validateLength (val, name, validatorMinLength, validatorMaxLength){
    validatorMinLength = _.toNumber(validatorMinLength);
    validatorMaxLength = _.toNumber(validatorMaxLength);
    let result = {
      error: false,
      message: ''
    };
    if (validatorMinLength && val.length < validatorMinLength){
      result.error = true;
      result.message = name + '不能小于' + validatorMinLength + '个字节';
    }
    if (validatorMinLength && val.length > validatorMaxLength){
      result.error = true;
      result.message = name + '不能超过' + validatorMaxLength + '个字节';
    }
    return result;
  }

  validateAmount (val, name, validatorMinAmount, validatorMaxAmount){
    val = _.toNumber(val);
    validatorMinAmount = _.toNumber(validatorMinAmount);
    validatorMaxAmount = _.toNumber(validatorMaxAmount);
    let result = {
      error: false,
      message: ''
    };
    if (validatorMinAmount && val < validatorMinAmount){
      result.error = true;
      result.message = name + '不能小于' + validatorMinAmount;
    }
    if (validatorMaxAmount && val > validatorMaxAmount){
      result.error = true;
      result.message = name + '不能超过' + validatorMaxAmount;
    }
    return result;
  }

  removeValidate($this){
    let isMyValidator = $this.data('my-validator');
    if (isMyValidator){
      let $parent = $this.parent();
      $parent.removeClass('has-error has-warning has-success');
      this.removeMessage($parent);
    }
  }

  init(){
    $(document).on('blur', 'input, textarea', { MyValidator : this }, function(event){
      event.data.MyValidator.validate($(this));
    });
    $(document).on('keyup', 'input, textarea', { MyValidator : this }, function(event) {
      event.data.MyValidator.removeValidate($(this));
    });
    $(document).on('change', ':checkbox', { MyValidator : this }, function(event) {
      if(this.checked){
        event.data.MyValidator.removeValidate($(this));
      }
      else{
        event.data.MyValidator.validate($(this));
      }
    });
  }

  isValidForm($form){
    let valid = true;
    $form.find('input, textarea').map((key, item)=>{
      if (!this.validate($(item))){
        valid = false;
      }
    });
    return valid;
  }

  creatMessage($parent, message, type='normal'){
    let icon = '';
    if (type == 'error'){
      icon = '<span class=\'glyphicon glyphicon-remove-circle\'></span>';
    }
    else if (type == 'success'){
      icon = '<span class=\'glyphicon glyphicon-ok-circle\'></span>';
    }
    let el = '<div class=\'my-validator-message my-validator-message--' + type + '\'>'+ icon + '&nbsp' + message + '</div>';
    $parent.after(el);
    return el;
  }

  removeMessage($parent){
    $parent.next('.my-validator-message').remove();
  }

  isEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}

export default MyValidator;