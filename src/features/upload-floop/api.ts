import { httpFetch } from '@shared/fetcher';
import { ucarecdn } from '@shared/utils';

interface ImageUploadCommand {
  name: string;
  uri: string;
  type: string; // prob mime? not sure..
}

export async function uploadImage(
  cmd: ImageUploadCommand
): Promise<{ file: string }> {
  const body = new FormData();
  body.append('file', {
    // @ts-ignore this is valid type
    name: cmd.name,
    uri: cmd.uri,
    type: cmd.type,
  });
  body.append('UPLOADCARE_PUB_KEY', 'be7be1fc84c93f2fb6e1'); // prob we should bfg git history later
  body.append('UPLOADCARE_STORE', '1'); // 1 means store permanently, otherwise 24h

  return fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body,
  }).then((res) => res.json());
}

export async function createNft(
  contentUrl: string,
  imageUploadCareId?: string
) {
  return httpFetch('/nfts', {
    method: 'POST',
    body: JSON.stringify({ imageUrl: contentUrl, imageUploadCareId }),
  });
}
