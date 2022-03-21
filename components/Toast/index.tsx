import styled, { css } from 'styled-components';
import { useToastContext } from '../../contexts/toast';
import Icon from '../Icon';

interface IToast {
  direction?: string;
  status?: 'success' | 'danger' | 'warning';
  children?: any;
}

const ToastNotification = styled.div<IToast>`
  position: absolute;
  ${({ direction }) =>
    direction === 'topRight'
      ? css`
          right: 40px;
          top: 0;
        `
      : direction === 'topLeft'
      ? css`
          left: 40px;
          top: 0;
        `
      : direction === 'bottomRight'
      ? css`
          bottom: 40px;
          right: 40px;
        `
      : css`
          bottom: 40px;
          left: 40px;
        `}

  min-width: 350px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  color: #000;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 999;

  @media screen and (min-width: 320px) and (max-width: 375px) {
    min-width: 83%;
    margin: 0 auto;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    min-width: 80%;
    margin: 0 auto;
  }
`;
const ToastContainer = styled.div<IToast>`
  display: flex;
  width: 100%;
  .badge {
    ${({ status }) =>
      status === 'success'
        ? css`
            background: green;
          `
        : status === 'warning'
        ? css`
            background: yellow;
          `
        : status === 'danger'
        ? css`
            background: red;
          `
        : css`
            background: #fff;
          `}
    flex: 0.1;
    padding: 20px 25px;
    color: #fff;
  }
  .body {
    display: flex;
    align-items: center;
    color: #000;
    width: 100%;
    justify-content: space-between;
    position: relative;
    .message {
      padding: 5px;
      font-size: 14px;
      font-weight: 500;
      text-transform: normal;
    }
    .close {
      position: absolute;
      right: 4px;
      top: 4px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.3s ease-in;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #dcdcdc;
      text-align: center;
      display: flex;
      justify-content: center;
      padding-top: 2px;

      &:hover {
        color: rgba(9, 0, 0, 1);
      }
    }
  }
`;

const Toast = ({ direction, status, children }: IToast) => {
  const { close } = useToastContext();
  return (
    <>
      {/* possible values direction="topRight | topLeft | bottomRight | bottomLeft" : status="success | danger | warning | info" */}
      <ToastNotification direction={direction}>
        <ToastContainer status={status}>
          <div className="badge">
            <Icon
              iconType="solid"
              name={status === 'warning' ? 'triangle-exclamation' : status === 'danger' ? 'ban' : 'check'}
            />
          </div>
          <div className="body">
            <div className="message">{children}</div>
            <div className="close" onClick={close}>
              <Icon iconType="solid" name="times" width="13px" height="13px" fontSize="13px" />
            </div>
          </div>
        </ToastContainer>
      </ToastNotification>
    </>
  );
};

export default Toast;
