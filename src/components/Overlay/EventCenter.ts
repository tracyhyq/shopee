/*
 * @description: EventCenter
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:50:02
 */

const EventEmitter = require('eventemitter3');
export { EventEmitterStatic, EventEmitter } from 'eventemitter3';

export const EventNameMap = {
  ADD_OVERLAY: 'ADD_OVER_LAY',
  REMOVE_OVERLAY: 'REMOVE_OVER_LAY',
  REMOVE_ALL_OVERLAY: 'REMOVE_ALL_OVERLAY',
  CLOSE_CURRENT_OVERLAY: 'CLOSE_CURRENT_OVERLAY',
};

export const UIEventNameMap = {
  // UI Events
  rootViewTouchStart: 'rootViewTouchStart',
  rootViewTouchMove: 'rootViewTouchMove',
  rootViewTouchEnd: 'rootViewTouchEnd',
  rootViewTouchCancel: 'rootViewTouchCancel',
};

export const EventCenter = new EventEmitter();
