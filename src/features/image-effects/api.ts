import { httpFetch } from '@shared/fetcher';

export enum AiEffectType {
  DREAMSHAPER = 'dreamshaper',
  REALISTIC_VISION = 'realistic_vision_1_3',
  TSHIRT_DIFFUSION = 'tshirt_diffusion',
  STABLE_DIFFUSION_VOXELART = 'stable_diffusion_voxelart',
}

export interface ApplyAiEffectCommand {
  imageUrl: string;
  type: AiEffectType;
}

export interface ImageWithEffect {
  imageUrl: string;
  imageUploadCareId: string;
}

async function applyAiEffect(command: ApplyAiEffectCommand) {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      preset: command.type,
      imageUrl: command.imageUrl,
    }),
  };
  return httpFetch<ImageWithEffect>('image-effects/ai', options);
}
