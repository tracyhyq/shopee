/*
 * @description: 根据时间关键字计算截止时间戳
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 14:18:03
 */

export function getTimeByKey(key: string) {
  // 选择时间段和anytime，返回空
  if (key === 'later' || key === 'anytime' ) {
    return {
      after: '',
      before: '',
      beforeText: '',
      afterText: ''
    };
  }

  return {
    after: '',
    before: '',
    beforeText: '',
    afterText: ''
  };
}
