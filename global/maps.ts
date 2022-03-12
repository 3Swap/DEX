export const supportedChainIdsToNetworkNameMap: { [key: number]: string } = {
  0x3: 'Ethereum',
  0x61: 'Binance',
  0x13881: 'Polygon',
  0xa869: 'Avalanche',
  0xfa2: 'Fantom'
};

export const chainIdToImageMap: { [key: number]: string } = {
  0x3: '/ethereum.svg',
  0x61: '/binance.svg',
  0x13881: '/polygon.svg',
  0xa869: '/avalanche.svg',
  0xfa2: '/fantom.svg'
};

export const chainIdToRouterMap: { [key: number]: string } = {
  0x3: '0xb62E0994c1F91120389935fb01bfd58312594350',
  0x61: '0x1ED388E063b8eDedcec1D1C81FA232c32e74FAA0',
  0xfa2: '0x1515B7652185388925F5D8283496753883416f09',
  0xa869: '0x1515B7652185388925F5D8283496753883416f09',
  0x13881: '0x1515B7652185388925F5D8283496753883416f09'
};
