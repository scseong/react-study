# 웹 게임을 만들며 배우는 React

## 학습내용
리액트(React): 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리



### 리액트 사용 이유

1. 사용자 경험 향상
   SPA(Single Page Application)
   화면 깜빡임 없이 자연스럽게 페이지 이동
2. 재사용 컴포넌트
3. 데이터-화면 일치



**[React 추가하기](https://ko.reactjs.org/docs/add-react-to-a-website.html)**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 리액트 동작 핵심코드 파일 -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <!-- 리액트 코드를 웹에 붙여주는 역할 -->
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <title>Document</title>
</head>
<body>
    <!-- React  -->
    <div id="root"></div> 
    <script>
        const e = React.createElement;

        class LikeButton extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    liked: false
                }
            }

            render() {
                return e('button', {onClick: () => this.setState({liked: true})}, this.state.liked ? 'Liked': 'Like'); 
            }
        }
    </script>
    <script>
        ReactDOM.render(e(LikeButton), document.querySelector('#root'))   // 렌더링
    </script>
</body>
</html>
```

React 컴포넌트를 만드려는 것을 ReactDOM이 웹에 렌더링

웹팩은 리액트를 html이 실행할 수 있는 Javascript 파일로 만들어주는 것

상태(state)는 바뀌면 화면이 자동으로 변경



### JSX ( JavaScript + XML )

```react
return <button type="submit" onClick={() => { this.setState({ liked: true }) }}>
  {this.state.liked === true ? 'Liked' : 'Like'}
</button>
```

자바스크립에서 html 태그를 쓰는 것이 문법적으로 가능하지 않음

➡ 바벨 - 최신/실험적인 문법을 자바스크립트에서 사용 가능하게 변경(JSX -> Javascript)



### state

> 무언가를 “기억하기”위해 component는 **state**를 사용합니다. (리액트 공식 문서)

state는 변경되는 부분. 리액트는 state를 직접 수정하지 않고 setState 메서드 이용해서 수정

컴포넌트에서 `setState`를 호출하면 React는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트. React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리(비동기)



### class & functional components

역할은 동일. 차이점이 있다면 클래스형 컴포넌트는 state, Life cycle 사용 가능 (함수형 컴포넌트는 사용 불가) ➡ 함수형 컴포넌트에서 hook 도입하여 사용 가능

|            | 클래스형 컴포넌트                                            | 함수형 컴포넌트                                              |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **장점**   | state,  life cycle 기능                                      | 선언 편리<br />메모리 덜 사용                                |
| **차이점** | render 메서드 필요<br /><br />state가 변경되면 render 메서드만 다시 실행<br />[this](https://maxkim-j.github.io/posts/react-component-this) | render 될 때의 값들을 유지<br />state가 변경되면 컴포넌트 내의 함수가 다시 실행 |



### 웹팩(webpack)

> **webpack은** 모던 JavaScript 애플리케이션을 위한 *정적 모듈 번들러* 입니다. webpack이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 *번들을* 생성하는 [디펜던시 그래프](https://webpack.kr/concepts/dependency-graph/)를 만듭니다.
> https://webpack.kr/concepts/



```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="/dist/app.js"></script>
</body>
</html>
```

`<script src="./dist/app.js">` script에서 인식하는 자바스크립트 파일은 하나뿐.

웹팩은 여러 개의 자바스크립트 파일을 하나의 자바스크립트 파일로 합쳐주는 역할



### 바벨(babel)

> Babel은 현재 및 이전 브라우저 또는 환경에서 ECMAScript 2015+ 코드를 이전 버전의 JavaScript로 변환하는 데 주로 사용되는 도구 체인입니다.
> https://babeljs.io/docs/en/

모든 자바스크립트 실행 환경에서 정상적으로 동작할 수 있도록 하기위해 



```js
📄 webpack.config.js

const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'webgame',
  // 모드에 따라 웹팩에서 내장 최적화 제공
  mode: 'development',
  // 소스 맵 생성 여부 및 방법 설정
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],	// entry의 확장자 생략
  },
  // 번들링을 시작할 파일
  entry: {
    app: ['./client'],
  },
  // 다양한 모듈들(js, image, css 등)을 처리하는 방법 결정
  module: {
    rules: [
      {
        // 처리할 모듈 형식 결정
        test: /\.jsx?$/,
        // 이 모듈에 사용할 loader
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: ['> 5% in KR', 'last 2 Chrome versions'],
                },
              },
            ],
            '@babel/react',
          ],
          plugins: ['react-refresh/babel'],
        },
      },
    ],
  },
  // 적용할 플러그인 목록
  plugins: [new RefreshWebpackPlugin()],
  // 번들링 된 파일이 생성될 위치 설정
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
  // 빠르게 개발할 수 있도록 개발서버 제공 (핫 리로딩)
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
```

