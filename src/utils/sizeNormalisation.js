import {Dimensions, PixelRatio} from 'react-native';

const Size = 375;
const {width} = Dimensions.get('window');
const scale = width / Size;

const fontCache = {};

export function NormalizeSize(size) {
  if (size in fontCache) {
    return fontCache[size];
  }

  const newSize = size * scale;
  fontCache[size] = Math.round(PixelRatio.roundToNearestPixel(newSize));
  return fontCache[size];
}
