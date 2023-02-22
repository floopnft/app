import { ReactionType } from '@entities/feed/ui/Reaction';
import { observable } from '@legendapp/state';
import { nanoid } from 'nanoid';

interface Reaction {
  id: string;
  type: ReactionType;
  press: { x: number; y: number };
}

export const reactions = observable<Reaction[]>([]);

export function addReaction(reaction: Omit<Reaction, 'id'>) {
  reactions.push({ id: nanoid(), ...reaction });
}
