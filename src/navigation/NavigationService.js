import * as React from 'react';

export const navigationRef = React.createRef();

export const isReadyRef = React.createRef();
// export const homeNavigatorRef = React.createRef();

export function navigate(name, params) {
    if (
        isReadyRef.current &&
        navigationRef.current &&
        navigationRef.current?.navigate
    ) {
        // Perform navigation if the app has mounted
        navigationRef.current?.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function addListener(listener) {
    if (
        isReadyRef.current &&
        navigationRef.current &&
        navigationRef.current?.addListener
    ) {
        // Perform navigation if the app has mounted
        navigationRef.current?.addListener(listener);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function rootDispatch(dispatch) {
    if (
        isReadyRef.current &&
        navigationRef.current &&
        navigationRef.current?.dispatch
    ) {
        navigationRef.current?.dispatch(dispatch);
        // Perform navigation if the app has mounted
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function replace(name, params) {
    if (
        isReadyRef.current &&
        navigationRef.current &&
        navigationRef.current?.replace
    ) {
        // Perform navigation if the app has mounted
        navigationRef.current?.replace(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function popToTop() {
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current?.popToTop();
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function goBack() {
    if (
        isReadyRef.current &&
        navigationRef.current &&
        navigationRef.current?.goBack
    ) {
        // Perform navigation if the app has mounted
        navigationRef.current?.goBack();
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
