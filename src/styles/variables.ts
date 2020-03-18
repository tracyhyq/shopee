/*
 * @providesModule @styles/variables
 */
import { PixelRatio } from 'react-native';

export const FontScale = PixelRatio.getFontScale();
export const OnePX = 1 / PixelRatio.get();
export const PrimaryColor = '#ff6633';

export const SmallFontSize = 12 / FontScale;
export const DefaultFontSize = 16 / FontScale;

export const DefaultFontColor = '#333';
export const GrayFontColor = '#999';

export const Gap = 15;
export const ListSepColor = '#E7E7E7';
