import React, { Component, useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../components/my-rc-field-form/";
// import Input from '../components/Input';
import { Input } from "antd";

const nameRules = { required: true, message: "请输⼊姓名！" };
const passworRules = { required: true, message: "请输⼊密码！" };

export default function MyRCFieldForm(props) {
    const [form] = Form.useForm();
    console.log('form',form)
    const onFinish = val => {
        console.log("onFinish", val); //sy-log
    };
    // 表单校验失败执⾏
    const onFinishFailed = val => {
        console.log("onFinishFailed", val); //sy-log
    };
    useEffect(() => {
        console.log("form", form); //sy-log
        form.setFieldsValue({ username: "default" });
    }, []);
    return (
        <div>
            <h3>MyRCFieldForm</h3>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Field name="username" rules={[nameRules]}>
                    <Input placeholder="input UR Username" />
                </Field>
                <Field name="password" rules={[passworRules]}>
                    <Input placeholder="input UR Password" />
                </Field>
                <button>Submit</button>
            </Form>
        </div>
    );
}

// export default class MyRCFieldForm extends Component {
//     formRef = React.createRef();
//     componentDidMount() {
//         console.log("form", this.formRef.current); //sy-log
//         // this.formRef.current.setFieldsValue({ username: "default" });
//     }
//     onFinish = val => {
//         console.log("onFinish", val); //sy-log
//     };
//     // 表单校验失败执⾏
//     onFinishFailed = val => {
//         console.log("onFinishFailed", val); //sy-log
//     };
//     render() {
//         return (
//             <div>
//                 <h3>MyRCFieldForm</h3>
//                 <Form
//                     ref={this.formRef}
//                     onFinish={this.onFinish}
//                     onFinishFailed={this.onFinishFailed}>
//                     开课吧web全栈架构师
//                     实现my-rc-field-form
//                     实现Form/index
//                     实现Form
//         <Field name="username" rules={[nameRules]}>
//                         <Input placeholder="Username" />
//                     </Field>
//                     <Field name="password" rules={[passworRules]}>
//                         <Input placeholder="Password" />
//                     </Field>
//                     <button>Submit</button>
//                 </Form>
//             </div>
//         );
//     }
// }