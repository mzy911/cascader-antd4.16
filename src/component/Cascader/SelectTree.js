import { Checkbox } from "antd";
import React from "react";
import { findActivePaths, addId, setActivce } from "../utils.js";
import "./SelectTree.less";

// json数组 获取数据的层级
// function getDeepestLevel(jsonArray) {
//   let maxDepth = 0;
//   jsonArray.forEach(function(item) {
//     let depth = 1;
//     let children = item.children;
//     while (children && children.length) {
//       depth++;
//       children = children.reduce((acc, child) => acc.concat(child.children || []), []);
//     }
//     maxDepth = Math.max(maxDepth, depth);
//   });
//   return maxDepth;
// }

function getDeepestLevel(node) {
  if (!node.children || node.children.length === 0) {
    // 如果没有子节点，则返回当前层级
    return 0;
  }

  // 获取子节点中最深的层级
  const childLevels = node.children.map(getDeepestLevel);

  // 返回最大的子节点层级加1（因为自己是一层）
  return Math.max(...childLevels) + 1;
}

const SelectTree = ({ data, checked, setSeleced }) => {
  // 给 data 添加 id
  const idData = addId(data, "abcd");

  // 根据指定 ID 返回激活的 "路径"
  const acticePaths = findActivePaths(idData, "id", "abcd000");

  // 给 data 设置 active
  const activeData = setActivce(idData, acticePaths);
  const len = activeData.len - 1;

  const renderTree = (index) => {
    // console.log("index", index);
    let deep = index;
    let indexId = 0;
    let id = "";
    let data = JSON.parse(JSON.stringify(activeData));

    do {
      id = acticePaths[indexId];
      console.log("id", deep);

      // const itemData = data.find((item) => item.id === id);
      // data = itemData?.children || [];
      deep = deep - 1;
      indexId = indexId + 1;
    } while (deep > 0 && index < len);

    return (
      <div className={"select-wrap"} key={"select-wrap" + id}>
        111111
        {/* {renderTree(index, id, item.children)} */}
      </div>
    );
  };

  return (
    <div className="select-tree">
      {acticePaths.map((_item, index) => {
        return renderTree(index);
      })}
    </div>
  );
};

export default SelectTree;
