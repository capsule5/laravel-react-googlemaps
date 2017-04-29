import { css } from 'styled-components';

export const TitleStyles = css`
  margin-top: ${props => props.mt ? '40' : '0'}px;
  margin-bottom: 0;
  font-size: 26px;
  font-weight: normal;
  color:#333;
`;

export const FormGroupStyles = css`
  display: flex;
  justify-content: ${props => props.actions ? 'flex-end' : 'flex-start'};
  margin-top: ${props => props.actions ? '40' : '0'}px;

  .inline{ margin-right: 80px;}
  .inline:last-child{ margin-right: 0;}
`;
