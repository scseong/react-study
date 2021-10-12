import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header, Form, Error, MyButton, MyInput, MyInputPassword } from '@pages/styles';
import axios from 'axios';
import useInput from '@hooks/useInput';
import AuthTimer from '@components/AuthTimer';

import { Input, Button } from 'antd';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(true);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const [nickname, onChangeNickname] = useInput('');
  const [phone_number, onChangePhoneNumber] = useInput('');
  const [otp, onChangeOtp] = useInput('');
  const [timer, setTimer] = useState(false);
  const [signUpError, setSignUpError] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const test = useRef();

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailConfirm(!e.target.value);
  }, []);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPasswordConfirm(!e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        setSignUpSuccess(false);
        setSignUpError({});
        axios
          .post('/accounts/signup/', { user_name: nickname, nickname, email, phone_number, password })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((err) => {
            console.log(err.response.data);
            setSignUpError(err.response.data);
          });
      }
    },
    [email, phone_number, nickname, password, mismatchError],
  );

  const onClickPhoneAuth = useCallback(
    (e) => {
      setTimer(false);
      axios.post('/accounts/phone_verify_request/', { phone_number }, { withCredentials: true }).then((response) => {
        console.log(response);
        setTimer(true);
      });
    },
    [phone_number],
  );

  const onClickPhoneAuthCheck = useCallback(
    (e) => {
      axios.post('accounts/phone_verify/', { phone_number, otp }, { withCredentials: true }).then((response) => {
        console.log(response);
        setTimer(false);
      });
    },
    [phone_number, otp],
  );

  useEffect(() => {
    test.current.focus();
  }, []);

  return (
    <>
      <Header>회원가입</Header>
      <main>
        <section>
          <Form onSubmit={onSubmit}>
            <label id="email-label">
              <div>
                <span>이메일</span>
                <MyInput
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="이메일 입력"
                  required
                  ref={test}
                />
                {emailConfirm && <Error>이메일을 입력해주세요</Error>}
              </div>
            </label>
            <label id="password-label">
              <div>
                <span>비밀번호</span>
                <MyInputPassword
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="비밀번호 입력"
                />
                {passwordConfirm && <Error>비밀번호를 입력해주세요</Error>}
              </div>
            </label>
            <label id="password-check-label">
              <div>
                <span>비밀번호 확인</span>
                <MyInputPassword
                  type="password"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  placeholder="비밀번호 확인"
                  required
                />
                {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
              </div>
            </label>
            <label id="nickname-label">
              <div>
                <span>이름</span>
                <MyInput
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="이름 입력"
                  required
                />
              </div>
            </label>
            <label id="phone-label">
              <div>
                <span>전화번호</span>
                <MyInput
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone_number}
                  onChange={onChangePhoneNumber}
                  placeholder="휴대폰 번호(숫자만 입력)"
                  required
                />
              </div>
              <Button onClick={onClickPhoneAuth}>인증번호</Button>
            </label>
            <label id="phone-auth-label">
              <div>
                <MyInput
                  type="number"
                  id="phone-auth"
                  name="phone-auth"
                  value={otp}
                  onChange={onChangeOtp}
                  placeholder="인증번호"
                  required
                />
                {timer && <AuthTimer />}
              </div>
              <Button onClick={onClickPhoneAuthCheck}>인증확인</Button>
            </label>
            <MyButton htmlType="submit" type="primary" size="large">
              회원가입
            </MyButton>
            {signUpError && Object.entries(signUpError).map((k) => <Error>{k[1][0]}</Error>)}
          </Form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
