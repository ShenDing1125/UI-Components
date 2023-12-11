import { FC } from 'react';
import Icon from './icon';
import IconShadow, { IconShadowProps } from './iconShadow';

export type IComponent = typeof Icon & {
    IconShadow: FC<IconShadowProps>;
};

export const TransIcon: IComponent = Icon as IComponent;
TransIcon.IconShadow = IconShadow;
