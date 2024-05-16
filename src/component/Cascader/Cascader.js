import React, { useState } from "react";
import { Select } from "antd";
import { Tooltip, Tag } from "antd";
import data from "./data.json";
import SelectTree from "./SelectTree";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const init = ["a10", "c12", "d13"];

const Cascader1 = () => {
  const [selected, setSeleced] = useState(init);

  const handleChange = (value) => {
    setSeleced(value);
  };

  const deleteTag = (val) => () => {
    setSeleced(selected.filter((select) => select !== val));
  };

  return (
    <div>
      <Select
        mode="multiple"
        autoClearSearchValue={true}
        style={{ width: "200px" }}
        placeholder="Please select"
        defaultValue={init}
        value={selected}
        onChange={handleChange}
        maxTagCount={2}
        showSearch={true}
        open={false}
        maxTagPlaceholder={(a) => {
          const label = a?.[0]?.label;
          const aa = (
            <div>
              {selected.map((item) => {
                return (
                  <Tag key={item} closable onClose={deleteTag(item)}>
                    {item}{" "}
                  </Tag>
                );
              })}
            </div>
          );

          return (
            <Tooltip placement="topLeft" title={aa}>
              <div>+{label}...</div>
            </Tooltip>
          );
        }}
      />

      <SelectTree
        data={data.data}
        selected={selected}
        setSeleced={setSeleced}
      ></SelectTree>
    </div>
  );
};
export default Cascader1;
