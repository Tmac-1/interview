
import React,{useRef} from 'react';

class FormStore {
  constructor() {
    this.store = {} // 存儲數據，比如説username password
    this.fieldEnetities = []
    this.callbacks = {}
  }
  registryEntity = entity => {
    this.fieldEnetities.push(entity);
    return ()=> {  // 返回函数，用于取消订阅
      this.fieldEnetities = this.fieldEnetities.filter(item => item !== entity);
      delete this.store[entity.props.name]
    }
  }
  setFieldsValue = (newStore)=>{
    this.store = {
      ...this.store,
      ...newStore
    }
    console.log('store',this.store)
    // 对应组件需要更新
    this.fieldEnetities.forEach(entity => {
      const {name}=entity.props;
      Object.keys(newStore).forEach(key => {
        if(key === name){
          entity.onStoreChange()
        }
      }) 
    })
  };
  getFieldValue = name => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return this.store
  }
  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }
  validate = () => {
    let err = [];
    // todo
    this.fieldEnetities.forEach(entity => {
      const { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      console.log(name, rules,value,rule,this.store)
      if (rule && rule.required && (value === undefined || value === "")) {
        // 出错
        err.push({
          [name]: rules.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    console.log("this.", this.fieldEnetities); //sy-log
    let err = this.validate();
    // 在这⾥校验 成功的话 执⾏onFinish ，失败执⾏onFinishFailed
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执⾏onFinish
      onFinish(this.getFieldsValue());
    } else if (err.length > 0) {
      // ，失败执⾏onFinishFailed
      onFinishFailed(err);
    }
  };

  getForm(){
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      registryEntity: this.registryEntity,
      submit: this.submit,
      setCallback: this.setCallback
    }
  }
}



export default function useForm(form) {
  const formRef = useRef();
  if(!formRef.current){
    if(form) {
      formRef.current = form;
    }else{
      const formStore = new FormStore();
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}