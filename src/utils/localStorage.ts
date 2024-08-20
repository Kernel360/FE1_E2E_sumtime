const setLocalItem = (key: string, item: unknown) => {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem(key, jsonItem);
};

const getLocalItem = <ItemType>(key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return undefined;
  }

  const parseItem: ItemType | undefined = JSON.parse(item);
  return parseItem;
};

const deleteLocalItem = (key: string) => {
  localStorage.removeItem(key);
};

export { setLocalItem, getLocalItem, deleteLocalItem };
