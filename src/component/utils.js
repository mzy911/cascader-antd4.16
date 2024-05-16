// 点击事件处理函数
export function findActivePaths(data, key = "id", target) {
  function find(nodes, isFind) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (isFind && i === 0) {
        if (node?.children?.length > 0) {
          const res = find(node.children, isFind) || [];
          return [node[key], ...res];
        } else {
          return [node[key]];
        }
      } else if (!isFind && node[key] === target) {
        if (node?.children?.length > 0) {
          const res = find(node.children, true) || [];
          return [target, ...res];
        } else {
          return [target];
        }
      } else if (node?.children?.length > 0) {
        const res = find(node.children, isFind) || [];
        if (res.length > 0) {
          return [node[key], ...res];
        }
      }
    }
  }

  return find(data, false) || [];
}

// 元素添加 id
export function addId(data, id = "0") {
  let newData = JSON.parse(JSON.stringify(data));
  newData = newData.map((item, index) => {
    const newItem = { ...item, id: id + index };
    if (item?.children?.length > 0) {
      newItem.children = addId(item.children, id + index);
    }
    return newItem;
  });

  return newData;
}

// 元素设置active
export function setActivce(data, arr = []) {
  let newData = JSON.parse(JSON.stringify(data));
  newData = newData.map((item, index) => {
    const newItem = { ...item, active: !!arr.includes(item.id) };
    if (item.children && item.children.length > 0) {
      newItem.children = setActivce(item.children, arr);
    }
    return newItem;
  });

  return newData;
}
