import React, { useCallback } from 'react';
import useInput from '@hooks/useInput';
// import Google from '@components/Google';
// import Kakao from '@components/Kakao';
import { Header, Form, Label, MyInput, MyButton } from '@pages/styles';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Header>로그인</Header>
      <main>
        <section>
          <Form onSubmit={onSubmit}>
            <Label id="email-label">
              <MyInput type="text" name="email" value={email} onChange={onChangeEmail} placeholder="이메일 입력" />
            </Label>
            <Label id="password-label">
              <MyInput
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호 입력"
              />
            </Label>
            <MyButton type="sumbit">로그인</MyButton>
            {/* <Google />
            <Kakao /> */}
          </Form>
        </section>
      </main>
    </>
  );
};

export default LogIn;
