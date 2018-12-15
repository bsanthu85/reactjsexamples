import _ from "lodash";

export function populatePagination(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  if (startIndex >= items.length) {
    return items;
  }
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
