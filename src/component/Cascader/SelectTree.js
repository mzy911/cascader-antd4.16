import { Divider, Checkbox } from 'antd';
import React from 'react';
import './SelectTree.less'


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
 


const SelectTree = ({data, checked, setSeleced})=>{
  const deep = getDeepestLevel(data);
  console.log('deep',data, deep);
  return <div>
    {
      // data.map((item, index)=>{
      //   return <div className={"select-wrap"} key={item.label}>
      //     <Checkbox >
      //       {item.label}
      //     </Checkbox>
      //   </div>
      // })
    }
  </div>
}

export default SelectTree;