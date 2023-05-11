import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: any, params: any) {
  navigationRef.current && navigationRef.current?.navigate(name, params);
}
export function dispatch(action: any) {
  navigationRef.current && navigationRef.current?.dispatch(action);
}
export function jumpTo(name: any, params: any) {
  navigationRef.current && navigationRef.current?.jumpTo(name, params);
}
export function replace(name: string, params: object | undefined) {
  navigationRef.current &&
    navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function push(name: string, params: object | undefined) {
  navigationRef.current &&
    navigationRef.current?.dispatch(StackActions.push(name, params));
}
export function goBack() {
  navigationRef.current && navigationRef.current?.goBack();
}
export const navigation = {
  navigate,
  dispatch,
  jumpTo,
  replace,
  push,
  goBack,
};
