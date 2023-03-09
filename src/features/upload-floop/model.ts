import { getFilenameFromUrl } from '@shared/utils';
import { createNft, uploadImage } from './api';
import { PresetId } from '@features/image-effects/api';

export async function uploadFloop(
  uri: string,
  presetId: string = PresetId.Lego
) {
  // TODO: pass presetId and hints
  const cdnImage = await uploadImage({
    name: getFilenameFromUrl(uri),
    uri,
    type: 'image/jpeg', //TODO mime type detection?
  });
  return createNft([], presetId, cdnImage.file);
}
