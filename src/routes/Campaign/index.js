import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker } from 'antd';
import BilinBasicTable from '../../components/BilinBasicTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const datalist = {
  list: [{
    key: 0,
    disabled: true,
    no: 'TradeCode 0',
    title: '一个任务名称 0',
    description: '这是一段描述',
    callNo: 532,
    status: 1,
    updatedAt: '2017-06-30T16:00:00.000Z',
    createdAt: '2017-06-30T16:00:00.000Z',
    progress: 32,
  }, {
    key: 1,
    disabled: true,
    no: 'TradeCode 1',
    title: '一个任务名称 1',
    description: '这是一段描述',
    callNo: 320,
    status: 3,
    updatedAt: '2017-06-30T16:00:00.000Z',
    createdAt: '2017-06-30T16:00:00.000Z',
    progress: 93,
  }, {
    key: 2,
    disabled: true,
    no: 'TradeCode 2',
    title: '一个任务名称 2',
    description: '这是一段描述',
    callNo: 88,
    status: 0,
    updatedAt: '2017-07-01T16:00:00.000Z',
    createdAt: '2017-07-01T16:00:00.000Z',
    progress: 8,
  }, {
    key: 3,
    disabled: true,
    no: 'TradeCode 3',
    title: '一个任务名称 3',
    description: '这是一段描述',
    callNo: 14,
    status: 2,
    updatedAt: '2017-07-01T16:00:00.000Z',
    createdAt: '2017-07-01T16:00:00.000Z',
    progress: 23,
  }, {
    key: 4,
    disabled: true,
    no: 'TradeCode 4',
    title: '一个任务名称 4',
    description: '这是一段描述',
    callNo: 348,
    status: 0,
    updatedAt: '2017-07-02T16:00:00.000Z',
    createdAt: '2017-07-02T16:00:00.000Z',
    progress: 30,
  }, {
    key: 5,
    disabled: true,
    no: 'TradeCode 5',
    title: '一个任务名称 5',
    description: '这是一段描述',
    callNo: 839,
    status: 0,
    updatedAt: '2017-07-02T16:00:00.000Z',
    createdAt: '2017-07-02T16:00:00.000Z',
    progress: 86,
  }, {
    key: 6,
    disabled: true,
    no: 'TradeCode 6',
    title: '一个任务名称 6',
    description: '这是一段描述',
    callNo: 923,
    status: 0,
    updatedAt: '2017-07-03T16:00:00.000Z',
    createdAt: '2017-07-03T16:00:00.000Z',
    progress: 40,
  }, {
    key: 7,
    disabled: true,
    no: 'TradeCode 7',
    title: '一个任务名称 7',
    description: '这是一段描述',
    callNo: 575,
    status: 1,
    updatedAt: '2017-07-03T16:00:00.000Z',
    createdAt: '2017-07-03T16:00:00.000Z',
    progress: 48,
  }, {
    key: 8,
    disabled: true,
    no: 'TradeCode 8',
    title: '一个任务名称 8',
    description: '这是一段描述',
    callNo: 870,
    status: 0,
    updatedAt: '2017-07-04T16:00:00.000Z',
    createdAt: '2017-07-04T16:00:00.000Z',
    progress: 46,
  }, {
    key: 9,
    disabled: true,
    no: 'TradeCode 9',
    title: '一个任务名称 9',
    description: '这是一段描述',
    callNo: 737,
    status: 1,
    updatedAt: '2017-07-04T16:00:00.000Z',
    createdAt: '2017-07-04T16:00:00.000Z',
    progress: 91,
  }, {
    key: 10,
    disabled: true,
    no: 'TradeCode 10',
    title: '一个任务名称 10',
    description: '这是一段描述',
    callNo: 52,
    status: 3,
    updatedAt: '2017-07-05T16:00:00.000Z',
    createdAt: '2017-07-05T16:00:00.000Z',
    progress: 29,
  }],
  pagination: {
    total: 11,
    pageSize: 10,
    current: 1,
  },
};

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class Campaign extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('no')(
                <Input placeholder="Please input" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="Please select" style={{ width: '100%' }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                  <Option value="2">Completed</Option>
                  <Option value="3">Error</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">Query</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>Reset</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                Unfold <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('no')(
                <Input placeholder="Please input" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="Please select" style={{ width: '100%' }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                  <Option value="2">Completed</Option>
                  <Option value="3">Error</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="number">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Time">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="please input time" />
              )}
            </FormItem>
          </Col>

        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">Query</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>Reset</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              Fold <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { rule: { loading: ruleLoading } } = this.props;
    const { selectedRows } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="approval">Audit</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="Campaign List">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            {this.renderForm()}
          </div>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>Create</Button>
              <Button type="default" >Delete</Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        More <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>

            <BilinBasicTable
              selectedRows={selectedRows}
              loading={ruleLoading}
              data={datalist}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
