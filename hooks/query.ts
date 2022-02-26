import { useRouter } from 'next/router';

export const useCurrencyQuery = () => {
  const router = useRouter();
  return { inputCurrency: router.query.inputCurrency, outputCurrency: router.query.outputCurrency };
};

export const usePageQuery = () => {
  const router = useRouter();
  return { ...router.query };
};
