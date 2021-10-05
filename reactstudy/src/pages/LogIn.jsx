import React, { useCallback } from 'react';
import useInput from '@hooks/useInput';
import Google from '@components/Google';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <header>LogIn</header>
      <main>
        <section>
          <form onSubmit={onSubmit}>
            <label id="email-label">
              <span>이메일</span>
              <div>
                <input type="text" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </label>
            <label id="password-label">
              <span>비밀번호</span>
              <div>
                <input type="password" name="password" value={password} onChange={onChangePassword} />
              </div>
            </label>
            <button type="sumbit">로그인</button>
          </form>
          <Google />
        </section>
      </main>
    </>
  );
};

export default LogIn;
