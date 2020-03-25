// 公共函数

/**
 * filter in array tree.
 * thx https://github.com/afc163/array-tree-filter/
 * readme: https://github.com/afc163/array-tree-filter#readme
 * @param data : 待处理数据
 * @param filterFn : 过滤函数
 * @param options : 配置
 */

export function arrayTreeFilter(
  // tslint:disable-next-line:no-any
  data: any[],
  // tslint:disable-next-line:no-any
  filterFn: (item: any, level: number) => void,
  // tslint:disable-next-line:no-any
  options?: { childrenKeyName?: string }
) {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  let children = data || [];
  const result = [];
  let level = 0;
  // tslint:disable-next-line:no-any
  let foundItem: any;
  do {
    // tslint:disable-next-line:no-any
    foundItem = children.filter((item: any) => {
      return filterFn(item, level);
    })[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);
  return result;
}
