import React, { useState } from 'react';

const data = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'xiasha', label: 'Xia Sha', disabled: true },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
];

const Cascader = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleClick = (option, level) => {
    const newSelectedOptions = selectedOptions.slice(0, level);
    newSelectedOptions[level] = option;
    setSelectedOptions(newSelectedOptions);

    if (onChange) {
      onChange(newSelectedOptions.map((o) => o.value));
    }
  };

  const renderOptions = (options, level = 0) => {
    return (
      <ul>
        {options.map((option) => (
          <li key={option.value} onClick={() => handleClick(option, level)} style={{ cursor: 'pointer' }}>
            {option.label}
            {selectedOptions[level] && selectedOptions[level].value === option.value && option.children
              ? renderOptions(option.children, level + 1)
              : null}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderOptions(options)}</div>;
};

const App = () => {
  const handleChange = (value) => {
    console.log(value);
  };

  return <Cascader options={data} onChange={handleChange} />;
};

export default App;
