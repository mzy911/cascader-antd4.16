import React, { useState, useRef, useEffect } from "react";
import { Select } from "antd";
import { Tooltip, Tag } from "antd";
import data from "./data.json";
import SelectTree from "./SelectTree";
import { addId } from "../utils.js";
import "./Cascader.less";

const init = ["abcd0"];

const Cascader1 = () => {
  const myRef = useRef(null);
  const [selected, setSeleced] = useState(init);
  const [showSelect, setShowSelect] = useState(false);

  const handleChange = (value) => {
    console.log("change", value, selected);

    setSeleced(value);
  };

  const deleteTag = (val) => () => {
    console.log("delete", val, selected);
    setSeleced(selected.filter((select) => select !== val));
  };

  const handleClickOutside = (event) => {
    const input = document.querySelector(".ant-select-selection-overflow");
    const inputContent = document.querySelector(
      ".ant-select-selection-item-content"
    );
    const svg = document.querySelector("svg");

    console.log("input", event.target, event.target === svg, svg);

    if (
      !myRef.current?.contains?.(event.target) &&
      !(
        event.target == input ||
        event.target === inputContent ||
        event.target === svg
      )
    ) {
      // 点击弹窗外部
      setShowSelect(false);
    }
  };

  useEffect(() => {
    // 在组件挂载时添加事件监听器
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      // 在组件卸载时移除事件监听器
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className="select-tree-container"
      style={{ marginTop: "50px", marginLeft: "50px" }}
    >
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

      <br />

      {showSelect ? (
        <div className="select-tree-warp" ref={myRef}>
          <SelectTree
            data={addId(data.data, "abcd")}
            value={selected}
            onChange={setSeleced}
          />

          <div style={{ border: "1px solid #ddd" }}>
            <button type="">确定</button>
            <button type=""> 取消</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Cascader1;
