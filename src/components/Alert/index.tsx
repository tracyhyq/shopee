/**
 * @desc Alert component
 * @author heyanqiu
 * @date 2020-3-26
 */
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { confirm } from '../Confirm';

export interface IAlertProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  content?: ReactNode | string;
  onConfirm?: () => boolean | void;
  confirm?: string;
}

export function alert({ ...others }: IAlertProps): () => void {
  return confirm({
    ...others,
    cancel: '',
  });
}
