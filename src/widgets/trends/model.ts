import { creatorConfig, TrendDto } from '@features/image-effects/api';
import { observable } from '@legendapp/state';

export const $trends = observable<TrendDto[]>([]);

creatorConfig().then((it) => $trends.set(it.trends));
