import React, { useCallback } from 'react';
import { KakaoBtn } from '@components/styles';

const Kakao = () => {
  const responseKakao = useCallback((response) => {
    console.log(response);
  }, []);

  return (
    <>
      <KakaoBtn
        token={process.env.REACT_APP_KAKAO_JS_KEY}
        buttonText="KaKao"
        onSuccess={responseKakao}
        onFial={responseKakao}
        onLogout={console.info}
        style={{}}
      ></KakaoBtn>
    </>
  );
};

export default Kakao;
