import { useRouter } from 'next/router';

export const useCurrencyQuery = () => {
  const router = useRouter();
  return {
    inputCurrency1: router.query.inputCurrency1,
    inputCurrency2: router.query.inputCurrency2,
    outputCurrency: router.query.outputCurrency,
    chainId: router.query.chainId
  };
};

export const usePageQuery = () => {
  const router = useRouter();
  return { ...router.query };
};
