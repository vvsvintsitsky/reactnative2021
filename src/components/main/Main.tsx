import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import {TradeItem} from '../../api/types';

import BurgerIcon from '../../../assets/icons/Burger.svg';
import CartIcon from '../../../assets/icons/Cart.svg';

import {Header} from '../header/Header';
import {Search} from '../search/Search';
import {TradeItemPreview} from '../trade-item-preview/TradeItemPreview';
import {InteractiveContent} from '../interactive-content/InteractiveContent';

import {styles as iconStyles} from '../icon/styles';

import {styles} from './styles';

export function Main({tradeItems}: {tradeItems: TradeItem[]}) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.root}>
      <Header style={styles.header}>
        <InteractiveContent>
          <BurgerIcon style={iconStyles.root} color={styles.headerIcon.color} />
        </InteractiveContent>
        <Text style={styles.headerText}>Ecommerce Store</Text>
        <InteractiveContent>
          <CartIcon style={iconStyles.root} color={styles.headerIcon.color} />
        </InteractiveContent>
      </Header>
      <View style={styles.search}>
        <Search />
      </View>
      <View style={styles.items}>
        {tradeItems.map(item => (
          <TradeItemPreview
            tradeItem={item}
            key={item.id}
            style={styles.item}
          />
        ))}
      </View>
    </ScrollView>
  );
}
