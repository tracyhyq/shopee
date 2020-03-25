/*
 * @description: 根据时间关键字计算截止时间戳
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 19:19:42
 */

import { 
  startOfToday,
  endOfToday,
  endOfTomorrow,
  startOfTomorrow,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  startOfMonth,
  format,
  getTime,
} from 'date-fns';

const methodMap: {
  [key: string]: Function
} = {
  today: getToday,
  tomorrow: getTomorrow,
  week: getWeek,
  month: getMonth,
};

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

  return methodMap[key]();
}

function getToday() {
  const startToday = startOfToday();
  const endToday = endOfToday();
  return {
    after: getTime(startToday),
    before: getTime(endToday),
    afterText: format(startToday, 'MM/dd/yyyy'),
    beforeText: format(endToday, 'MM/dd/yyyy')
  };
}

function getTomorrow() {
  const startTomorrow = startOfTomorrow();
  const endTomorrow = endOfTomorrow();
  return {
    after: getTime(startTomorrow),
    before: getTime(endTomorrow),
    afterText: format(startTomorrow, 'MM/dd/yyyy'),
    beforeText: format(endTomorrow, 'MM/dd/yyyy')
  };
}

function getWeek() {
  const now = Date.now();
  const startWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endWeek = endOfWeek(now, { weekStartsOn: 1 });
  return {
    after: getTime(startWeek),
    before: getTime(endWeek),
    afterText: format(startWeek, 'MM/dd/yyyy'),
    beforeText: format(endWeek, 'MM/dd/yyyy')
  };
}

function getMonth() {
  const now = Date.now();
  const startMonth = startOfMonth(now);
  const endMonth =   endOfMonth(now);
  return {
    after: getTime(startMonth),
    before: getTime(endMonth),
    afterText: format(startMonth, 'MM/dd/yyyy'),
    beforeText: format(endMonth, 'MM/dd/yyyy')
  };
}

/**
 * 获取当天凌晨的时间(单位： ms)
 */
export function getEarlyMorning(d: Date) {
  return new Date(d.setHours(0, 0, 0, 0)).getTime();
}

/**
 * 获取当天最后一秒（单位: ms）
 */
export function getLastest(d: Date) {
  return new Date(getEarlyMorning(d) + 24 * 60 * 60 * 1000 - 1).getTime();
}
