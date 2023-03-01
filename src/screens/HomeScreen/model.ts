import { observable } from '@legendapp/state';

interface VisibleCard {
  id: string;
  index: number;
  ts: number;
}

export const $currentVisibleCard = observable<VisibleCard>(null);
