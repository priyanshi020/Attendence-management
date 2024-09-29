import { Dimensions, PixelRatio, Platform } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').height >= Dimensions.get('window').width ? Dimensions.get('window').width : Dimensions.get('window').height;
export const WINDOW_HEIGHT = Dimensions.get('window').height >= Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;

export const scaleFont = size => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function fontSize(size) {
  return (WINDOW_HEIGHT / 2) * size;
}

export function marginTopAndBottom(size) {
  return Dimensions.get('window').height >= Dimensions.get('window').width ? (WINDOW_HEIGHT * size) - 15 : WINDOW_HEIGHT * size
  //WINDOW_HEIGHT * size;
}

export function height(size) {
  return WINDOW_HEIGHT * size;
}
export function width(size) {
  return WINDOW_WIDTH * size;
}
export function marginLeftAndRight(size) {
  return WINDOW_WIDTH * size;
}
export function paddingOneSide(size) {
  return WINDOW_WIDTH * size;
}

export function iconSize(size) {
  return WINDOW_HEIGHT * size;
}
export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(color, offset = { height: 2, width: 2 },
  radius = 8, opacity = 0.2) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function screenPadding() {
  return Platform.OS === 'ios' ? WINDOW_WIDTH * 0.040 : WINDOW_WIDTH * 0.040;
}
export function appIconSize(size) {
  return (WINDOW_HEIGHT / 2) * 0.050;
}

export function appLogoSize(size) {
  return (WINDOW_HEIGHT / 2) * size;
} export function imageSize(size) {
  return (WINDOW_HEIGHT / 2) * size;
}