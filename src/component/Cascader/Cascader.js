import React, { useState, useRef,useEffect } from "react";
import { Select } from "antd";
import { Tooltip, Tag } from "antd";
import data from "./data.json";
import SelectTree from "./SelectTree";
import { addId } from "../utils.js";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const init = ["abcd0"];

const Cascader1 = () => {
  const [selected, setSeleced] = useState(init);

  const myRef = React.createRef();

  const handleChange = (value) => {
    setSeleced(value);
  };

  const deleteTag = (val) => () => {
    setSeleced(selected.filter((select) => select !== val));
  };

  const onBlur = () => {
    // console.log("inputRef", inputRef);
  };

  const [showSelect, setShowSelect] = useState(false);

  const handleClickOutside = (event) => {
    console.log('event',myRef);
    // 检查事件是否发生在组件外
    if (!myRef.current || !myRef.current.contains(event.target)) {
      // 如果是在组件外部点击，执行需要的操作
      console.log('Clicked outside the component!');
    }
  };
 

  useEffect(() => {
    // 在组件挂载时添加事件监听器
    document.addEventListener('click', handleClickOutside, true);
 
    return () => {
      // 在组件卸载时移除事件监听器
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="select-tree-container"  style={{ marginTop: "50px", marginLeft: "50px" }}>
      <Select
        mode="multiple"
        autoClearSearchValue={true}
        style={{ width: "200px" }}
        placeholder="Please select"
        defaultValue={init}
        value={selected}
        onChange={handleChange}
        maxTagCount={1}
        showSearch={true}
        open={false}
        onFocus={() => {
          setShowSelect(true);
        }}
        // onBlur={onBlur}
        maxTagPlaceholder={(a) => {
          const label = a?.[0]?.label;
          const tabs =
            selected.length > 2 ? (
              <div>
                {selected
                  .filter((_item, index) => index > 1)
                  .map((item) => {
                    return (
                      <Tag key={item} closable onClose={deleteTag(item)}>
                        {item}{" "}
                      </Tag>
                    );
                  })}
              </div>
            ) : null;

          return (
            <Tooltip placement="topLeft" title={tabs}>
              <div>+{label}...</div>
            </Tooltip>
          );
        }}
      />

      {showSelect ? (
        <SelectTree
          ref={myRef}
          data={addId(data.data, "abcd")}
          value={selected}
          onChange={setSeleced}
        />
      ) : null}
    </div>
  );
};
export default Cascader1;
