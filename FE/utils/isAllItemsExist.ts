export function isAllItemsExist(...items: any[]) {
  for (const iterator of items) {
    if (!iterator) {
      return false;
    }
  }
  return true;
}
