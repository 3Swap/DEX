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
  0x3: '0x27b14220DD749343979da9ea1434d086f99f2ABB',
  0x61: '0xBAa9d6B799213FAC3bF9216844Dd2e580B0a6D09',
  0xfa2: '0xc2a9e1dE895a2f8D9F82E67F46ea2cD1BE1f2087',
  0xa869: '0x1317Cb1C75D16A42f9575df753FC70a50A193024',
  0x13881: '0xE125F57EAF50C4e93B8c24c5c49D405e51D7122D'
};
