import styled, { css } from 'styled-components';
import Icon from '../Icon';
interface IToast {
  direction?: string;
  status?: string;
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
  }
  .body {
    display: flex;
    align-items: center;
    color: #000;
    width: 100%;
    justify-content: space-between;
    position: relative;
    .message {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 500;
      text-transform: normal;
    }
    .close {
      position: absolute;
      right: 20px;
      top: 8px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.3s ease-in;

      &:hover {
        color: rgba(9, 0, 0, 1);
      }
    }
  }
`;

const Toast = ({ direction, status }: IToast) => {
  return (
    <>
      <ToastNotification direction={direction}>
        <ToastContainer status={status}>
          <div className="badge">&nbsp;</div>
          <div className="body">
            <div className="message">Toast Notification goes here.</div>
            <div className="close">
              <Icon iconType="solid" name="times" width="20px" height="20px" fontSize="20px" />
            </div>
          </div>
        </ToastContainer>
      </ToastNotification>
    </>
  );
};

export default Toast;
