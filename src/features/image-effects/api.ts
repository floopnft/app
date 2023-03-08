import { httpFetch } from '@shared/fetcher';
import { NftDto } from '@entities/nft/model';

export interface ApplyEffectCommand {
  imageUploadCareId: string;
  presetId: string;
}

export interface ImageWithEffect {
  imageUploadCareId: string;
}

async function applyAiEffect(command: ApplyEffectCommand) {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      presetId: command.presetId,
      imageUploadCareId: command.imageUploadCareId,
    }),
  };
  return httpFetch<ImageWithEffect>('image-effects', options);
}

export class PresetDto {
  id!: string;
  name!: string;
  nfts!: NftDto[];
}

export class TrendDto {
  id!: string;
  name!: string;
  nfts!: NftDto[];
}

export class CreatorConfigDto {
  presets!: PresetDto[];
  trends!: TrendDto[];
}

async function creatorConfig(): Promise<CreatorConfigDto> {
  return httpFetch('creator-config');
}
