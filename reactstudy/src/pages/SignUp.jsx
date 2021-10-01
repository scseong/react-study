import React, { useCallback } from 'react';
import useInput from '@hooks/useInput';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <header>SignUp</header>
      <main>
        <section>
          <form onSubmit={onSubmit}>
            <label id="email-label">
              <span>이메일 주소</span>
              <div>
                <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </label>
            <label id="nickname-label">
              <span>닉네임</span>
              <div>
                <input type="nickname" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
              </div>
            </label>
            <label id="password-label">
              <span>비밀번호</span>
              <div>
                <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
              </div>
            </label>
            <label id="password-check-label">
              <span>비밀번호 확인</span>
              <div>
                <input
                  type="password-check"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </div>
            </label>
            <button type="sumbit">회원가입</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
