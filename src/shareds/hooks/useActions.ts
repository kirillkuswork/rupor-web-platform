/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { bindActionCreators, ActionCreator } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { AppDispatchType } from '@/redux/store/store';

type ActionCreatorsMapObject = {
  [key: string]: ActionCreator<any>;
};

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useDispatch<AppDispatchType>();
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch],
  );
};
