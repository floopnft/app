import { getFilenameFromUrl, ucarecdn } from '@shared/utils';
import { createNft, uploadImage } from './api';

export async function uploadFloop(uri: string) {
  const cdnImage = await uploadImage({
    name: getFilenameFromUrl(uri),
    uri,
    type: 'image/jpeg', //TODO mime type detection?
  });

  return createNft(ucarecdn(cdnImage.file));
}
