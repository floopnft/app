import { observable } from '@legendapp/state';
import { NFT } from '@entities/nft/model';

// export const DATA: NFT[] = [
//   {
//     id: '1',
//     collectionAvatarUrl: 'https://i.imgur.com/bMH6qNc.png',
//     collectionName: 'Solana Monkey Business',
//     title: 'SMB #4705',
//     imgUrl: 'https://cdn.solanamonkey.business/gen2/4705.png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [345, 77, 77],
//   },
//   {
//     id: '2',
//     collectionAvatarUrl:
//       'https://bafkreidc5co72clgqor54gpugde6tr4otrubjfqanj4vx4ivjwxnhqgaai.ipfs.nftstorage.link',
//     collectionName: 'y00ts',
//     title: 'y00t #4035',
//     imgUrl: 'https://metadata.y00ts.com/y/4035.png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [44, 50, 90],
//   },
//   {
//     id: '3',
//     collectionAvatarUrl:
//       'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
//     collectionName: 'DeGods',
//     title: 'DeGod #3324',
//     imgUrl: 'https://metadata.degods.com/g/3324-dead.png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [280, 30, 96],
//   },
//   {
//     id: '4',
//     collectionAvatarUrl:
//       'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreidgfsdjx4nt4vctch73hcchb3pkiwic2onfw5yr4756adchogk5de.ipfs.nftstorage.link/',
//     collectionName: 'Okay Bears',
//     title: 'Okay Bear #8020',
//     imgUrl:
//       'https://bafybeibyysgzsc6xbitkclvm3laxw6ns34heyqcynqaxnag7fbiftjxleq.ipfs.nftstorage.link/8019.png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [155, 57, 72],
//   },
//   {
//     id: '5',
//     collectionAvatarUrl:
//       'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
//     collectionName: 'JellyRascals',
//     title: 'Jelly Rascals #255',
//     imgUrl:
//       'https://arweave.net/WiaUHRDCnbVOus_HdsbBnyNTwAPf6Xua1EFOFrwXzzI?ext=png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [201, 100, 79],
//   },
//   {
//     id: '6',
//     collectionAvatarUrl:
//       'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/cats_on_crack_pfp_1644850873089.png',
//     collectionName: 'CETS ON CRECK',
//     title: 'Cet #21',
//     imgUrl:
//       'https://arweave.net/RbSeYkbGQ3LdPDs6Ij_YzWowppjQhGqy2FcnQHBnBH0?ext=png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [166, 82, 50],
//   },
//   {
//     id: '7',
//
//     collectionAvatarUrl:
//       'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihwrpyr52wax3i5drzi5pg4v2wrgylpwi54im7qb7nzz7tpdsmmzm.ipfs.nftstorage.link/',
//     collectionName: 'LILY',
//     title: 'LILY #9164',
//     imgUrl:
//       'https://bafybeickfm4lwzlark6sudll6dbs6ktwl2qbrjrcitl5f6ok6ldcsaqa4e.ipfs.nftstorage.link/8177.png?ext=png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [41, 100, 78],
//   },
//   {
//     id: '8',
//
//     collectionAvatarUrl:
//       'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/duelbots_pfp_1671410776687.png',
//     collectionName: 'DUELBOTS',
//     title: 'DUELBOTS #1769',
//     imgUrl:
//       'https://arweave.net/uynkiG5MJ6wOe_8GmEnRBAPi6lkCnKNwM9Sd04Yx6xI?ext=png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [62, 54, 49],
//   },
//   {
//     id: '9',
//
//     collectionAvatarUrl:
//       'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreiatsxp4ygj4muopasqisvjpvuhuvdk734zldbhvkx74hfnhik6mja.ipfs.nftstorage.link',
//     collectionName: 'Transdimensional Fox Federation',
//     title: 'Fox #3614',
//     imgUrl: 'https://famousfoxes.com/tff/3614.png',
//     hints: ['collection', 'PFPs'],
//     bgColor: [265, 88, 74],
//   },
// ];

export const $unviewedNftFeedItems = observable<Record<string, NFT>>({});
export const $nftFeed = observable<NFT[]>([]);
