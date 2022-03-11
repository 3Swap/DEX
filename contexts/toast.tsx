import React, { useContext, createContext, useCallback, useState } from 'react';

type ToastContextType = {
  toastType?: 'success' | 'warning' | 'danger';
  isVisible: boolean;
  content?: any;
  showSuccessToast: (content: JSX.Element, timeout: number) => void;
  showErrorToast: (content: JSX.Element, timeout: number) => void;
  showWarningToast: (content: JSX.Element, timeout: number) => void;
};

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const ToastProvider = ({ children }: any) => {
  const [content, setContent] = useState<JSX.Element | undefined>(undefined);
  const [toastType, setType] = useState<'success' | 'warning' | 'danger'>('success');
  const [isVisible, setVisible] = useState<boolean>(false);

  const showSuccessToast = useCallback((content: JSX.Element, timeout: number) => {
    setType('success');
    setContent(content);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setContent(undefined);
    }, timeout * 1000);
  }, []);

  const showErrorToast = useCallback((content: JSX.Element, timeout: number) => {
    setType('danger');
    setContent(content);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setContent(undefined);
    }, timeout * 1000);
  }, []);

  const showWarningToast = useCallback((content: JSX.Element, timeout: number) => {
    setType('warning');
    setContent(content);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setContent(undefined);
    }, timeout * 1000);
  }, []);

  return (
    <ToastContext.Provider
      value={{ content, toastType, isVisible, showSuccessToast, showErrorToast, showWarningToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  return context;
};
