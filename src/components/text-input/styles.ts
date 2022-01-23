import {StyleSheet} from 'react-native';

export const borderColor = '#8F8F8F';
export const paddingHorizontal = 14;

export const height = 40;

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal,
    height,
    borderColor,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#1C1F27',
  },
  placeholder: {
    position: 'absolute',
  },
});
