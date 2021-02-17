import React, { Component, useEffect } from "react";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;
const nameRules = { required: true, message: "请输⼊姓名！" };
const passworRules = { required: true, message: "请输⼊密码！" };


// export default class AntdFormPage extends Component {
//     formRef = React.createRef();
//     componentDidMount() {
//         this.formRef.current.setFieldsValue({ name: "default" });
//     }
//     onReset = () => {
//         this.formRef.current.resetFields();
//     };
//     onFinish = val => {
//         console.log("onFinish", val); //sy-log
//     };
//     onFinishFailed = val => {
//         console.log("onFinishFailed", val); //sy-log
//     };

//     render() {
//         console.log("AntdFormPage render", this.formRef.current); //sy-log
//         return (
//             <div>
//                 <h3>AntdFormPage</h3>
//                 <Form
//                     ref={this.formRef}
//                     onFinish={this.onFinish}
//                     onFinishFailed={this.onFinishFailed}
//                     onReset={this.onReset}>
//                     <FormItem label="姓名" name="name" rules={[nameRules]}>
//                         <Input placeholder="name input placeholder" />
//                     </FormItem>
//                     <FormItem label="密码" name="password" rules={[passworRules]}>
//                         <Input placeholder="password input placeholder" />
//                     </FormItem>
//                     <FormItem>
//                         <Button type="primary" size="large" htmlType="submit">
//                             Submit
//                             开课吧web全栈架构师
//                             function实现：
//                             注意 useForm 是React Hooks的实现，只能⽤于函数组件。
//                         </Button>
//                     </FormItem>
//                     <FormItem>
//                         <Button type="default" size="large" htmlType="reset">
//                             Reset
//                         </Button>
//                     </FormItem>
//                 </Form>
//             </div>
//         );
//     }
// }


export default function AntdFormPage(props) {
    const [form] = Form.useForm();

    const onFinish = val => {
        console.log("onFinish", val); //sy-log
    };
    const onFinishFailed = val => {
        console.log("onFinishFailed", val); //sy-log
    };
    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        form.setFieldsValue({ name: "default" });
    }, []);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onReset={onReset}>
            <FormItem label="姓名" name="name" rules={[nameRules]}>
                <Input placeholder="name input placeholder" />
            </FormItem>
            <FormItem label="密码" name="password" rules={[passworRules]}>
                <Input placeholder="password input placeholder" />
            </FormItem>
            <FormItem>
                <Button type="primary" size="large" htmlType="submit">
                    开课吧web全栈架构师
                    antd3表单组件设计思路
                    表单组件要求实现数据收集、校验、提交等特性，可通过⾼阶组件扩展
                    ⾼阶组件给表单组件传递⼀个input组件包装函数接管其输⼊事件并统⼀管理表单数据
                    ⾼阶组件给表单组件传递⼀个校验函数使其具备数据校验功能
                    但是antd3的设计有个问题，就是局部变化会引起整体变化，antd4改进了这个问题。
                    antd4表单组件实现
                    antd4的表单基于rc-field-form，github源码地址。
                    安装rc-field-form， yarn add rc-field-form 。
                    使⽤useForm，仅限function：
                    Submit
        </Button>
            </FormItem>
            <FormItem>
                <Button type="default" size="large" htmlType="reset">
                    Reset
        </Button>
            </FormItem>
        </Form>
    );
}