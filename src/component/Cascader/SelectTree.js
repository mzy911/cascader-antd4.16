import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import {
  findActivePaths,
  addId,
  setActivce,
  setChecked,
  setDisabled,
} from "../utils.js";
import "./SelectTree.less";

const SelectTree = ({ data, checked, setSeleced }) => {
  const [activeId, setActivceId] = useState("abcd000");

  // 初始化数据时，给每一项增加 id
  const [renderData, setRenderData] = useState(addId(data, "abcd"));
  const [acticePaths, setActicePaths] = useState([]);

  // console.log('renderData',renderData);

  const renderTree = (index) => {
    let deep = index;
    let indexId = 0;
    let id = acticePaths[0];
    let disabledData = setDisabled(renderData);
    let data = JSON.parse(JSON.stringify(disabledData));

    while (deep > 0) {
      const preId = acticePaths[indexId];
      const preData = data.find((item) => item.id === preId);
      indexId++;
      const nextId = acticePaths[indexId];
      data = preData.children;
      id = nextId;
      deep--;
    }

    const checkBoxChange =
      (id, checked = false) =>
      () => {
        setRenderData(setChecked(renderData, id, !checked));
        setActivceId(id);
      };

    const checkBoxClick = (id) => () => {
      setActivceId(id);
    };

    return (
      <div className={"select-container"} key={"select-container" + id}>
        {data.map((item) => {
          return (
            <div
              className={item.active ? "select-item active" : "select-item"}
              key={"select-item" + item.id}
              onClick={checkBoxClick(item.id)}
            >
              <Checkbox
                defaultChecked={item.checked}
                onChange={checkBoxChange(item.id, item.checked)}
                disabled={item.disabled}
              >
                {item.label}
              </Checkbox>
              {/* <Icon type="right" /> */}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    setActicePaths(findActivePaths(renderData, "id", activeId));
  }, [activeId]);

  useEffect(() => {
    // 给 data 设置 active
    setRenderData(setActivce(renderData, acticePaths));
  }, [acticePaths]);

  return (
    <div className="select-tree">
      {acticePaths.map((_item, index) => {
        return renderTree(index);
      })}
    </div>
  );
};

export default SelectTree;
