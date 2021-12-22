import React from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';

import {TradeItem} from '../../api/types';

import BurgerIcon from '../../../assets/icons/Burger.svg';
import CartIcon from '../../../assets/icons/Cart.svg';

import {Header} from '../header/Header';
import {Search} from '../search/Search';
import {TradeItemPreview} from '../trade-item-preview/TradeItemPreview';
import {InteractiveContent} from '../interactive-content/InteractiveContent';

import {styles as iconStyles} from '../icon/styles';

import {styles} from './styles';
import {ShadowContainer} from '../shadow-container/ShadowContainer';

export function Main({
  tradeItems,
  refetch,
  isLoading,
}: {
  tradeItems: TradeItem[];
  refetch: () => void;
  isLoading: boolean;
}) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }>
      <Header style={styles.header}>
        <InteractiveContent>
          <BurgerIcon style={iconStyles.root} color={styles.headerIcon.color} />
        </InteractiveContent>
        <Text style={styles.headerText}>Ecommerce Store</Text>
        <InteractiveContent>
          <CartIcon style={iconStyles.root} color={styles.headerIcon.color} />
        </InteractiveContent>
      </Header>
      <ShadowContainer distance={4} startColor="#0000004D" sides={['bottom']}>
        <View style={styles.search}>
          <Search style={styles.searchInput} />
        </View>
      </ShadowContainer>
      <View style={styles.items}>
        {tradeItems.map(item => (
          <ShadowContainer
            corners={[]}
            radius={5}
            key={item.id}
            distance={2}
            startColor="#00000040"
            sides={['left', 'right']}
            containerViewStyle={styles.itemShadow}>
            <ShadowContainer
              corners={['bottomLeft', 'bottomRight']}
              radius={5}
              distance={4}
              startColor="#00000040"
              sides={['bottom']}>
              <TradeItemPreview tradeItem={item} style={styles.item} />
            </ShadowContainer>
          </ShadowContainer>
        ))}
      </View>
    </ScrollView>
  );
}
