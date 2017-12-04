import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Select, Radio, Switch, DatePicker, Row, Col, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <PageHeaderLayout title="Campaign Create">
        <Card bordered={false}>
          <Row>
            <Col span={12} offset={6}>

              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="Account"
                  hasFeedback
                >
                  {getFieldDecorator('account', {
                    rules: [
                      { required: true, message: 'Please select the account!' },
                    ],
                  })(
                    <Select placeholder="Please select a account">
                      <Option value="option1">option1</Option>
                      <Option value="option2">option2</Option>
                      <Option value="option3">option3</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Name"
                  hasFeedback
                >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: 'Please input the name!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Data Center"
                >
                  {getFieldDecorator('radio-group', {
                    rules: [{
                      required: true, message: 'Please select data center!',
                    }],
                  })(
                    <RadioGroup>
                      <Radio value="us">US</Radio>
                      <Radio value="cn">CN</Radio>
                      <Radio value="eu">EU</Radio>
                      <Radio value="ap">AP</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Flight Date"
                >
                  {getFieldDecorator('date', {
                    rules: [{
                      required: true, message: 'Please select time!',
                    }],
                  })(
                    <RangePicker />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Goal Impression"
                >
                  {getFieldDecorator('goal_impression', {
                    rules: [{
                      required: true, message: 'Please input goal impression!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Price"
                >
                  {getFieldDecorator('price', {
                    rules: [{
                      required: true, message: 'Please input!',
                    }],
                  })(
                    <Input addonBefore="$" type="number" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Select[multiple]"
                >
                  {getFieldDecorator('select-multiple', {
                    rules: [
                      { required: true, message: 'Please select your option', type: 'array' },
                    ],
                  })(
                    <Select mode="multiple" placeholder="Please select option">
                      <Option value="1">option1</Option>
                      <Option value="2">option2</Option>
                      <Option value="3">option3</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Radio.Button"
                >
                  {getFieldDecorator('radio-button')(
                    <RadioGroup>
                      <RadioButton value="a">item 1</RadioButton>
                      <RadioButton value="b">item 2</RadioButton>
                      <RadioButton value="c">item 3</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Switch"
                >
                  {getFieldDecorator('switch', { valuePropName: 'checked' })(
                    <Switch />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
