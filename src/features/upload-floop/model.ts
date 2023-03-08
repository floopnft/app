import { getFilenameFromUrl, ucarecdn } from '@shared/utils';
import { createNft, uploadImage } from './api';

export async function uploadFloop(uri: string) {
  const cdnImage = await uploadImage({
    name: getFilenameFromUrl(uri),
    uri,
    type: 'image/jpeg', //TODO mime type detection?
  });

  const contentUrl = ucarecdn(cdnImage.file);
  return createNft(contentUrl, [], 'lego', cdnImage.file); // TODO: pass presetId and hints
}
