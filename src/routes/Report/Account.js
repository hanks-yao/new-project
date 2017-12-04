import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Table, Input, Select, Icon, Button, Radio, InputNumber, DatePicker, Tooltip } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import numeral from 'numeral';
import { dollar, ChartCard, Field, MiniArea, MiniBar, MiniProgress } from '../../components/Charts';
import Trend from '../../components/Trend';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Account.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
// const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const op1 = {
  title: {
    show: false,
    text: 'Ad Format Impressions',
    // subtext: '',
    x: 'center',
  },
  // backgroundColor: 'rgb(239, 240, 244)',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    show: false,
    orient: 'horizontal',
    x: 'left',
    data: ['320×50', '728×90', '360×600', '300×600', '300×250'],
  },
  series: [
    {
      name: 'Ad Format Impressions',
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '320×50' },
        { value: 310, name: '728×90' },
        { value: 234, name: '360×600' },
        { value: 135, name: '300×600' },
        { value: 1548, name: '300×250' },
      ],
      labelLine: {
        normal: {
          show: true,
          length: 3,
          length2: 3,
        },
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 2,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

const op2 = {
  title: {
    show: false,
    text: 'Chart one',
    left: 'center',
  },
  // backgroundColor: 'rgb(239, 240, 244)',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Impressions', 'Clicks'],
    left: 'right',
  },
  grid: {
    show: true,
    left: 15,
    right: 15,
    // bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      // axisLine: {onZero: false},
      data: ['Mar 30', 'Mar 31', 'Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8', 'Apr 9', 'Apr 10', 'Apr 11', 'Apr 12', 'Apr 13', 'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20', 'Apr 21', 'Apr 22', 'Apr 23', 'Apr 24', 'Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1', 'May 2', 'May 3', 'May 4', 'May 1', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10'],
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },

    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Impressions',
      min: 0,
      splitNumber: 6,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    {
      type: 'value',
      name: 'Clicks',
      min: 0,
      // max: 'dataMax',
      splitNumber: 6,
      max(value) {
        return parseInt((value.max / 3), 10) * 6;
        // return value.max*2;
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
        },
      },

    },
  ],
  series: [
    {
      name: 'Impressions',
      type: 'line',
      // stack: '总量',
      // lineStyle: {
      //  normal:{
      //    color: 'rgb(100,149,237)',
      //  }
      // },
      // areaStyle: {
      //  normal: {
      //    color:  'rgba(100,149,237,0.7)',
      //  },
      // },
      areaStyle: { normal: {} },
      data: [1511, 1530, 1013, 1657, 1590, 1426, 1410, 954, 905, 1506, 1550, 1520, 1410, 1340, 1004, 954, 1553, 1466, 1526, 1413, 1342, 952, 904, 1504, 1552, 1524, 1413, 1340, 1003, 952, 1022, 1520, 1512, 1531, 1022, 1653, 1592, 1425, 1415, 956, 1004, 1132, 1321, 1445],
    },
    {
      name: 'Clicks',
      type: 'line',
      yAxisIndex: 1,
      // stack: '总量',
      areaStyle: { normal: {} },
      data: [8, 8, 1, 3, 3, 4, 4, 5, 7, 5, 2, 9, 11, 7, 8, 9, 11, 10, 4, 4, 5, 7, 5, 2, 9, 11, 7, 8, 9, 11, 7, 8, 8, 1, 3, 3, 4, 4, 5, 7, 5, 3, 5, 6],
    },
  ],
};

const tableData = [
  {
    name: 'Accenture',
    industry: 'Information Technology and Services',
    employees: '10001+',
    impressions: 6421,
    clicks: 13,
    consumption: 43.12,
  }, {
    name: 'Accruent',
    industry: 'Computer Software',
    employees: '501-1000',
    impressions: 760,
    clicks: 8,
    consumption: 22.32,
  }, {
    name: 'Aprimo',
    industry: 'Computer Software',
    employees: '501-1000',
    impressions: 2667,
    clicks: 10,
    consumption: 32.82,
  }, {
    name: 'Castle Digital Partners',
    industry: 'Information Technology and Services',
    employees: '51-200',
    impressions: 125,
    clicks: 3,
    consumption: 4.52,
  }, {
    name: 'CloudBees',
    industry: 'Computer Software',
    employees: '201-500',
    impressions: 762,
    clicks: 5,
    consumption: 8.18,
  }, {
    name: 'Conviva',
    industry: 'Internet',
    employees: '51-200',
    impressions: 485,
    clicks: 9,
    consumption: 5.92,
  }, {
    name: 'Delivery Hero',
    industry: 'Internet',
    employees: '5001-10000',
    impressions: 21203,
    clicks: 15,
    consumption: 157.12,
  }, {
    name: 'Dude Solutions',
    industry: 'Computer Software',
    employees: '201-500',
    impressions: 667,
    clicks: 3,
    consumption: 7.14,
  }, {
    name: 'Elastic',
    industry: 'Computer Software',
    employees: '501-1000',
    impressions: 1412,
    clicks: 6,
    consumption: 19.63,
  }, {
    name: 'Ericsson',
    industry: 'Information Technology and Services',
    employees: '10001+',
    impressions: 21206,
    clicks: 22,
    consumption: 167.95,
  }, {
    name: 'eSentire',
    industry: 'Computer & Network Security',
    employees: '201-500',
    impressions: 1232,
    clicks: 6,
    consumption: 17.12,
  }, {
    name: 'FreedomPop',
    industry: 'Telecommunications',
    employees: '51-200',
    impressions: 3232,
    clicks: 1,
    consumption: 24.56,
  }, {
    name: 'Graydon',
    industry: 'Information Services',
    employees: '51-200',
    impressions: 5232,
    clicks: 3,
    consumption: 43.12,
  }, {
    name: 'Hazelcast',
    industry: 'Telecommunications',
    employees: '51-200',
    impressions: 2464,
    clicks: 2,
    consumption: 19.13,
  }, {
    name: 'Iress',
    industry: 'Computer Software',
    employees: '1001-5000',
    impressions: 41245,
    clicks: 10,
    consumption: 327.45,
  }, {
    name: 'Postel',
    industry: 'Information Technology and Services',
    employees: '1001-5000',
    impressions: 9232,
    clicks: 5,
    consumption: 75.13,
  }, {
    name: 'Zendesk',
    industry: 'Telecommunications',
    employees: '51-200',
    impressions: 5232,
    clicks: 2,
    consumption: 41.25,
  }, {
    name: 'FreedomPop',
    industry: 'Computer Software',
    employees: '1001-5000',
    impressions: 9235,
    clicks: 4,
    consumption: 80.14,
  }, {
    name: 'BMC Software',
    industry: 'Wholesale Trade',
    employees: '51-200',
    impressions: 4257,
    clicks: 3,
    consumption: 35.16,
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 400,
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Impressions',
    dataIndex: 'impressions',
    key: 'impressions',
    width: 210,
    render: val => (
      <p style={{ textAlign: 'right' }}>
        {val}
      </p>
    ),
  }, {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
    width: 200,
    render: val => (
      <p style={{ textAlign: 'right' }}>
        {val}
      </p>
    ),
  }, {
    title: 'Content Consumption',
    dataIndex: 'consumption',
    key: 'consumptiom',
    width: 410,
    render: val => (
      <p style={{ textAlign: 'right' }}>
        {val}
      </p>
    ),
  }, {
    title: 'Industry',
    dataIndex: 'industry',
    key: 'industry',
    width: 500,
  }, {
    title: '# of Employees',
    dataIndex: 'employees',
    key: 'employees',
    width: 360,
    render: val => (
      <p style={{ textAlign: 'right' }}>
        {val}
      </p>
    ),
  },
];

const visitData22 = [];

const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData22.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

@connect(state => ({
  rule: state.rule,

}))
export default class Account extends Component {
  state = {
    expandForm: false,
    // loading: true,
    // salesType: 'all',
    // currentTabKey: '',
    // rangePickerValue: [],
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderSimpleForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem label="Date">
              <RangePicker
                format="YYYY/MM/DD"
                size="small"
                style={{ width: 210 }}
              />
            </FormItem>
          </Col>
          <Col md={24} sm={24}>
            <FormItem
              label="Option1"
            >
              <Radio.Group defaultValue="111" size="small">
                <Radio.Button value="111">111</Radio.Button>
                <Radio.Button value="222">222</Radio.Button>
                <Radio.Button value="333">333</Radio.Button>
              </Radio.Group>
            </FormItem>

            <FormItem
              label="Option2"
            >
              <Radio.Group defaultValue="333" size="small">
                <Radio.Button value="111">111</Radio.Button>
                <Radio.Button value="222">222</Radio.Button>
                <Radio.Button value="333">333</Radio.Button>
                <Radio.Button value="444">444</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Col>

          <Col md={24} sm={24}>
            <FormItem
              label="Select option"
            >
              <Select defaultValue="2" style={{ width: 120 }} size="small">
                <Option value="1">option1</Option>
                <Option value="2">option2</Option>
                <Option value="3">option3</Option>
              </Select>
            </FormItem>
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
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
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
    // const { rule: { loading: ruleLoading, data } } = this.props;

    // const { selectedRows, modalVisible, addInputValue } = this.state;

    const content = (
      <div>
        <Form layout="inline">
          <FormItem label="Date">
            <Radio.Group defaultValue="today" size="small">
              <Radio.Button value="today">Today</Radio.Button>
              <Radio.Button value="yesterday">Yesterday</Radio.Button>
              <Radio.Button value="this_week">This Week</Radio.Button>
              <Radio.Button value="this_month">This Month</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
            <RangePicker
              ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
              defaultValue={[moment(), moment()]}
              format="YYYY/MM/DD"
              size="small"
              style={{ width: 210 }}
            />
          </FormItem>
          <br />
          <FormItem label="Device">
            <Radio.Group defaultValue="all" size="small">
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="pc">PC</Radio.Button>
              <Radio.Button value="mobile">Mobile</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem label="Visitors">
            <Radio.Group defaultValue="all" size="small">
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="new">new</Radio.Button>
              <Radio.Button value="old">old</Radio.Button>
            </Radio.Group>
          </FormItem>

        </Form>

      </div>
    );

    const extraContent = (
      <div>
        ^
      </div>
    );

    const tabList = [{
      key: 'type',
      tab: 'Source Type',
    }, {
      key: 'website',
      tab: 'Source Website',
    }];

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <PageHeaderLayout
        // title="Account Report"
        // action={action}
        content={content}
        extraContent={extraContent}
        tabList={tabList}
      >
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="Cost"
              action={<Tooltip title="Description"><Icon type="info-circle-o" /></Tooltip>}
              total={dollar(126560)}
              footer={<Field label="Daily Cost" value={numeral(12423).format('0,0')} />}
              contentHeight={46}
            >
              <span>
                Trend
                <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>5%</Trend>
              </span>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="Impressions"
              action={<Tooltip title="Description"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(123241).format('0,0')}
              contentHeight={46}
              footer={<Field label="Daily Impressions" value={numeral(9234).format('0,0')} />}
            >
              <MiniArea
                line
                height={45}
                data={visitData22}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="Clicks"
              action={<Tooltip title="Description"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(1846).format('0,0')}
              footer={<Field label="Daily Clicks" value={numeral(134).format('0,0')} />}
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={visitData22}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="Duration"
              action={<Tooltip title="Description"><Icon type="info-circle-o" /></Tooltip>}
              total="78%"
              footer={<Field label="Remaining" value={`${numeral(34).format('0,0')} days`} />}
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={78} />
            </ChartCard>
          </Col>
        </Row>

        <Card bordered={false}>
          <div>
            <div className={styles.optionForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>

        <Card bordered={false} style={{ marginTop: 20 }}>
          <Row gutter={20}>
            <Col md={8} sm={24}>
              {/* <Pie
                  hasLegend
                  title="销售额"
                  subTitle="销售额"
                  total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                  data={salesPieData}
                  valueFormat={val => yuan(val)}
                  height={240}
                /> */}
              <ReactEcharts
                option={op1}
                style={{ height: '350px', width: '100%' }}
                className="react_for_echarts"
              />
            </Col>
            <Col md={16} sm={24}>
              <ReactEcharts
                option={op2}
                style={{ height: '350px', width: '100%' }}
                className="react_for_echarts"
              />
            </Col>
          </Row>
        </Card>

        <Card bordered={false} style={{ marginTop: 20 }}>
          <Table
            bordered="false"
            pagination="true"
            columns={columns}
            dataSource={tableData}
            rowSelection={{}}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
