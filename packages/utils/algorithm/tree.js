export function travse(items) {
  const root = [];
  const map = {};
  items.forEach((element) => {
    map[element.id] = { ...element, children: [] };
  });

  items.forEach((item) => {
    if (!item.parentId) {
      root.push(map[item.id]);
    } else {
      if (item.parentId) {
        map[item.parentId].children.push(map[item.id]);
      }
    }
  });
  return root;
}

const items = [
  { id: 1, name: "Node 1", parentId: null },
  { id: 2, name: "Node 2", parentId: 1 },
  { id: 3, name: "Node 3", parentId: 1 },
  { id: 4, name: "Node 4", parentId: 2 },
  { id: 5, name: "Node 5", parentId: null },
  { id: 6, name: "Node 6", parentId: 5 },
];

const dat = travse(items);
console.log(dat);
