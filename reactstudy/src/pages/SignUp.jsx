import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header, Form, Error, MyButton, MyInput, MyInputPassword } from '@pages/styles';
import axios from 'axios';

import { Input, Button } from 'antd';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(true);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMissmatchError] = useState(false);

  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const test = useRef();

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
      setEmailConfirm(!e.target.value);
    },
    [email],
  );

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPasswordConfirm(!e.target.value);
      setMissmatchError(e.target.value === passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
    },
    [password],
  );

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        setSignUpSuccess(false);
        setSignUpError('');
        axios
          .post('http://localhost:8000/accounts/signup/', { email, password })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((err) => {
            console.log(err);
            // setSignUpError(err);
          });
      }
    },
    [email, password, mismatchError],
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
              <MyInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="이메일 입력"
                required
                ref={test}
                autoComplete="off"
              />
              {emailConfirm && <Error>이메일을 입력해주세요</Error>}
            </label>
            <label id="password-label">
              <MyInputPassword
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호 입력"
              />
              {passwordConfirm && <Error>비밀번호를 입력해주세요</Error>}
            </label>
            <label id="password-check-label">
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
            </label>
            <label id="nickname-label">
              <MyInput
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
                placeholder="이름 입력"
                required
              />
            </label>
            <label id="phone-label">
              <MyInput
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChangePhone}
                placeholder="휴대폰 번호(숫자만 입력)"
                required
              />
              <Button>인증번호</Button>
            </label>
            <MyButton htmlType="submit" type="primary" size="large">
              회원가입
            </MyButton>
          </Form>
          {signUpError && <Error>{signUpError}</Error>}
        </section>
      </main>
    </>
  );
};

export default SignUp;
