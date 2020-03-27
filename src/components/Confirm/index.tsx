/**
 * @desc Comfirm component
 * @author heyanqiu
 * @date 2020-3-26
 */
import * as React from 'react';
import { ReactNode, SFC } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { globalStyle } from '@styles/variables';
import { Button } from '../Button';
import { Overlay, OverlayView } from '../Overlay';
import { Txt } from '../Txt';
// tslint:disable:no-shadowed-variable
// tslint:disable:jsx-no-lambda

export interface IConfirmProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  content?: ReactNode | string;
  cancel?: string;
  // 返回 false 阻止关闭
  onCancel?: () => boolean | void;
  // 返回 false 阻止关闭
  onConfirm?: () => boolean | void;
  confirm?: string;
}

/**
 * Confirm
 */
const Confirm: SFC<IConfirmProps> = ({
  style,
  title,
  content,
  cancel = '取消',
  confirm = '确认',
  onCancel,
  onConfirm,
}) => (
  <View style={[styles.container, style]}>
    <View style={styles.topCon}>
      {title ? <Txt style={styles.title}>{title}</Txt> : null}
      {typeof content === 'string' ? (
        <Txt style={styles.content}>{content}</Txt>
      ) : (
        content
      )}
    </View>
    <View style={styles.buttonContainer}>
      {cancel ? (
        <Button
          clear
          rect
          style={[
            styles.buttonStyle,
            {
              borderBottomRightRadius: confirm ? 0 : 4,
            },
          ]}
          titleStyle={{
            color: '#000',
          }}
          title={cancel}
          onPress={onCancel}
        />
      ) : null}
      {confirm ? (
        <Button
          clear
          type="ghost"
          rect
          style={[
            styles.buttonStyle,
            {
              borderBottomLeftRadius: cancel ? 0 : 4,
              borderLeftWidth: globalStyle.px1,
              borderColor: globalStyle.color.border,
            },
          ]}
          title={confirm}
          onPress={onConfirm}
          titleStyle={{
            fontWeight: globalStyle.fontWeightBold,
          }}
        />
      ) : null}
    </View>
  </View>
);

export function confirm({
  onCancel,
  onConfirm,
  ...others
}: IConfirmProps): () => void {
  const overlayView = (
    <OverlayView
      overlayClosable={false}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Confirm
        onCancel={() => {
          if (typeof onCancel === 'function') {
            if (onCancel() !== false) {
              close();
            }
          } else {
            close();
          }
        }}
        onConfirm={() => {
          if (typeof onConfirm === 'function') {
            if (onConfirm() !== false) {
              close();
            }
          } else {
            close();
          }
        }}
        {...others}
      />
    </OverlayView>
  );

  const key = Overlay.show(overlayView);

  function close() {
    Overlay.hide(key);
  }

  return close;
}

const styles = StyleSheet.create({
  container: {
    width: 270,
    backgroundColor: globalStyle.color.white,
    borderRadius: 4,
  },
  topCon: {
    padding: 20,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: globalStyle.fontSize.l,
    marginBottom: 10,
  },
  content: {
    fontSize: globalStyle.fontSize.s,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: globalStyle.px1,
    borderColor: globalStyle.color.border,
  },
  buttonStyle: {
    flex: 1,
    height: 50,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
