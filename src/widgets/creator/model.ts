import { creatorConfig, CreatorConfigDto } from '@features/image-effects/api';
import { observable } from '@legendapp/state';
import { EMPTY_ARR } from '@shared/utils';

export const $creatorConfig = observable<CreatorConfigDto>({
  trends: EMPTY_ARR,
  presets: EMPTY_ARR,
});

export const $trends = $creatorConfig.trends;
export const $presets = $creatorConfig.presets;

creatorConfig().then((it) => $creatorConfig.set(it));
