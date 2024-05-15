import React from 'react';
import Cascader from 'rc-cascader';
import './cascader.less'

const options = [{
  'label': '福建',
  'value': 'fj',
  'children': [{
    'label': '福州',
    'value': 'fuzhou',
    'children': [{
      'label': '马尾',
      'value': 'mawei',
    }],
  }, {
    'label': '泉州',
    'value': 'quanzhou',
  }],
}, {
  'label': '浙江',
  'value': 'zj',
  'children': [{
    'label': '杭州',
    'value': 'hangzhou',
    'children': [{
      'label': '余杭',
      'value': 'yuhang',
    }],
  }],
}, {
  'label': '北京',
  'value': 'bj',
  'children': [{
    'label': '朝阳区',
    'value': 'chaoyang',
  }, {
    'label': '海淀区',
    'value': 'haidian',
  }],
}];
const onChange = (value) => {
  console.log(value);
};
const Cascader1 = () => {
  return <div style={{margin:'40px', width:'200px'}}>
    <div>11111</div>
  <Cascader
  options={options}
  onChange={onChange}
  // multiple
  // maxTagCount="responsive"
/>

<div className='two'>2222</div>
<div>3333</div>
</div>
}
export default Cascader1;