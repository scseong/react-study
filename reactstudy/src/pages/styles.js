import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';

export const Header = styled.header`
  text-align: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`;

export const Label = styled.label`
  margin-bottom: 16px;
`;

export const MyInput = styled(Input)`
  margin: 8px;
  padding: 0.8em;
  transition: none;
  margin-bottom: ${(props) => (props.value ? '30px' : '8px')};
`;
// border: ${(props) => (props.value ? '' : '1px solid red')};
export const MyInputPassword = styled(Input.Password)`
  margin: 8px;
  padding: 0.8em;
  transition: none;
  margin-bottom: ${(props) => (props.value ? '30px' : '8px')};
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 0 8px;
  font-weight: bold;
`;

export const MyButton = styled(Button)`
  font-weight: bold;
  background-color: #3d5afe;
  margin: 8px;
  width: 100%;
`;
