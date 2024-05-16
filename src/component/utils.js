// 点击事件处理函数
export function findActivePaths(data, key = "id", activeId) {
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
      } else if (!isFind && node[key] === activeId) {
        if (node?.children?.length > 0) {
          const res = find(node.children, true) || [];
          return [activeId, ...res];
        } else {
          return [activeId];
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

// 设置 checked 状态
export function setChecked(data, id, val) {
  const newData = JSON.parse(JSON.stringify(data));
  // 父节点取消勾选，子节点也要取消
  function find(nodes, cancel) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === id) {
        node.checked = cancel ? false : val;
        return;
      } else if (node?.children?.length > 0) {
        find(node.children, cancel || node.checked);
      }
    }
  }
  find(newData);

  return newData;
}

// 设置 disabled 状态
export function setDisabled(data, father) {
  const newData = JSON.parse(JSON.stringify(data));
  function find(nodes, father) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node?.children?.length > 0) {
        if (father) {
          node.disabled = !father.checked;
        }
        find(node.children, node);
      } else {
        if (father) {
          node.disabled = !father.checked;
        }
      }
    }
  }
  find(newData, null) ;

  return newData;
}
