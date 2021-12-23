import React from 'react';

import {Main} from '../../components/main/Main';
import {useMainScreen} from './useMainScreen';

export function MainScreen() {
  const {isLoading, products, refetch} = useMainScreen();

  return <Main tradeItems={products} refetch={refetch} isLoading={isLoading} />;
}