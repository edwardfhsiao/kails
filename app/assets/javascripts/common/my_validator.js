import _ from 'lodash';
import Config from '../config';
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
    // let name = $this.data('my-validator-name'); will use cache;
    let name = $this[0].getAttribute('data-my-validator-name');

    let localeName = window.localeName;
    if (_.isEmpty(localeName) || _.isUndefined(localeName)){
      localeName = Config.localeName;
    }
    let locale = require('./locales/' + localeName);

    if ($inputType == 'text' || $inputType == 'password' || $this.is('textarea')){
      if (isMyValidator){
        let $val = $this.val();
        let isEmpty = _.isEmpty($val);
        if (validatorRequired){
          if (isEmpty){
            error = true;
            message = name + locale.myValidator.required;
          }
        }
        let validatorType = $this.data('my-validator-type');
        let validatorMinLength = $this.data('my-validator-min-length');
        let validatorMaxLength = $this.data('my-validator-max-length');
        let validatorMinAmount = $this.data('my-validator-min-amount');
        let validatorMaxAmount = $this.data('my-validator-max-amount');
        let showValidMessage = $this.data('my-validator-show-valid-message');
        if (validatorType == 'email'){
          if (!this.isEmail($val) && !isEmpty){
            error = true;
            message = name + locale.myValidator.invalidFormat;
          }
        }
        if (validatorType == 'number' && !isEmpty){
          if ((_.isNaN(_.toNumber($val)) || !_.isNumber(_.toNumber($val))) && !isEmpty){
            error = true;
            message = name + locale.myValidator.numberOnly;
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
            // $parent.addClass('has-error');
            this.creatMessage($parent, message, 'error');
          }
          else{
            if (showValidMessage){
              message = locale.myValidator.valid;
              // $parent.addClass('has-success');
              this.creatMessage($parent, message, 'success');
            }
          }
        }
        else{
           if (error && $message.length <= 0){
            // $parent.addClass('has-error');
            this.creatMessage($parent, message, 'error');
          }
        }
      }
    }
    else if ($inputType == 'checkbox'){
      if (isMyValidator && $message.length <= 0){
        if (validatorRequired){
          if (!$this.is(':checked')){
            message = locale.myValidator.pleaseCheck + name;
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
      result.message = name + locale.myValidator.cannotLessThan + validatorMinLength + locale.myValidator.charactor;
    }
    if (validatorMinLength && val.length > validatorMaxLength){
      result.error = true;
      result.message = name + locale.myValidator.cannotGreatThan + validatorMaxLength + locale.myValidator.charactor;
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
      result.message = name + locale.myValidator.cannotLessThan + validatorMinAmount;
    }
    if (validatorMaxAmount && val > validatorMaxAmount){
      result.error = true;
      result.message = name + locale.myValidator.cannotGreatThan + validatorMaxAmount;
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
    $parent.addClass('has-' + type);
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

  creatMessageApi($parent, message, type='normal'){
    let $message = $parent.next('div[class^="my-validator-message"]');
    if ($message.length <= 0){
      this.creatMessage($parent, message, type)
    }
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