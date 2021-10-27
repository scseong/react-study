

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



### import vs require

require와 import는 모듈 키워드. 외부 파일이나 라이브러리를 불러올 때 사용

| require                                                      | import                        |
| ------------------------------------------------------------ | ----------------------------- |
| NodeJS에서 사용되고 있는 CommonJS 키워드<br />(CommonJS: NodeJS에서 JavaScript In 모듈을 캡슐화하는 데 사용하는 표준) | ES2015에서 새로 도입된 키워드 |
| 동기식                                                       | 비동기식                      |
| 프로그램 내부 어디에서나 호출                                | 파일의 시작 부분              |

💡 **NodeJS로 웹팩을 실행하는데 Node는 CommonJS를 지원**

import를 쓰면 에러가 발생하지만 바벨이 ES 문법을 CommonJS 문법으로 변경해준다.(import -> require)



### 리액트 반복문(map)

`map()` 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환

리액트는 key를 보고 같은 컴포넌트인지 아닌지 판단

**⚠ key를 map의 index로 사용하지 말 것**

➡ React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인
인덱스를 key로 사용하면, 항목의 순서가 바뀌었을 때 key도 바뀐다.



### 컴포넌트 분리

**장점**

- 가독성
- 재사용성
- 성능 최적화



### props (properties)

어떤 값을 컴포넌트에게 전달해줘야 할 때 사용 (부모 컴포넌트 ➡ 자식 컴포넌트)



리액트 주석 `{/*  */}`



### 메서드 바인딩

#### Arrow function

**Arrow function의 this는 항상 그것을 둘러싼 enclosing scope에서 상속받는다.**

render 메소드에서 onClickButton 함수를 호출했을 때 함수의 this가 **window**나 **undefined**이 되는 문제

window나 undefined에는 setState 메소드가 없기 때문에 에러가 발생

🚨`TypeError: Cnnot read property 'setState' of undefined`

Solution: arrow function은 this를 자동으로 bind

[참고: 컴포넌트 이벤트 연결(바인딩)](https://www.zerocho.com/category/React/post/578232e7a479306028f43393)



### 리액트 불변성

> 불변성은 어떤 값을 직접적으로 변경하지 않고 새로운 값을 만들어내는 것입니다. 필요한 값을 변형해서 사용하고 싶다면 어떤 값의 사본을 만들어서 사용해야 합니다.
> React에서는 값을 비교할 때는 얕은 비교를 실행하여 성능 최적화를 만들어내게 됩니다. 
> 출처: https://webigotr.tistory.com/293 [diligent web hacker]

리액트에서 값이 바뀌었는지 확인하는 방법은 참조하는 값이 변경되었는지 비교

```
// state가 가르키고 있는 객체의 참조값은 동일 (렌더링X)
<button onClick={() => {
	state.count += 1; 
	setState(state); 
	}} 
>+1</button>


// 콜백함수에 의해 새로운 객체가 리턴 (렌더링O)
<button onClick={() => { 
	setState((prevState) => ({ count: prevState.count + 1 })); 
}}>+1</button>
```



### React Devtools

**크롬 웹스토어 - React Developer Tools**

개발자 도구 - Components

리액트로 개발된 사이트 확인할 수 있음. state, props 값 

state, props가 변경되었을 때 렌더링이 일어남

Highlight Updates 체크하면 렌더링 될때마다 효과

Devtool을 이용해서 렌더링되는 부분을 확인하고 최적화하는 과정이 필요



### React.memo

성능 개선을 위한 도구

컴퍼넌트를 렌더링하고 결과를 메모이징(Memoizing)하고 다음 렌더링이 일어날 때 `props`가 같다면 메모이징된 내용을 재사용

가장 하위 컴포넌트에 권장 - 데이터가 없이 화면만 담당하는 경우

**[React.memo - 리액트 공식 문서](https://ko.reactjs.org/docs/react-api.html#reactpurecomponent)**

**[React.memo() 현명하게 사용하기](https://ui.toast.com/weekly-pick/ko_20190731)**



### props와 state 연결하기

props는 자식 컴포넌트에서 직접 변경 불가

바꿀 경우에는 state에 넣어서 사용



### React 조건문

JSX 문법에서 for, if 사용 불가

false, undefined, null은 jsx에서 태그없음을 의미

리액트에서 조건문은 삼항 연산자 이용

```jsx
{result.length === 0 ? null : (
    <div>평균 시간: {result.length.reduce((a, c) => a + c) / result.length}ms
    </div>
)}
```

가독성을 위해 함수로 작성해서 사용하기도 함 (단, 새로운 컴포넌트로 작성하는 것을 권장)



### (+) setTImeout

`setTimeout()` 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머를 설정합니다.

setTimeout 함수가 실행되면서 setState를 호출하기때문에 초기화 필요

setTimeout 초기화 

- timeout 선언
- timeout = setTImeout() // timeout 변수에 setTimeout() 초기화
- clearTimeout(timeout)

`clearTImeout()` 이전에 설정된 타이머를 취소



### useRef

class component에서 this의 속성들을 hooks에서는 ref로 표현

state는 변경되면 return 부분이 재실행(렌더링)되지만 useRef의 값이 변경되어도 렌더링되지 않음

불필요한 렌더링을 막기 위해 값이 바뀌어도 렌더링이 되지 않아도 되는 값은 ref (화면에 영향을 미치지 않을때)

> **인스턴스 변수와 같은 것이 있습니까?**
> 네! [`useRef()`](https://ko.reactjs.org/docs/hooks-reference.html#useref) Hook은 DOM ref만을 위한 것이 아닙니다. “ref” 객체는 `현재` 프로퍼티가 변경할 수 있고 어떤 값이든 보유할 수 있는 일반 컨테이너입니다. 이는 class의 인스턴스 프로퍼티와 유사합니다.
> https://ko.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables



### useEffect

> *Effect Hook*을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있습니다.
> 데이터 가져오기, 구독(subscription) 설정하기, 수동으로 React 컴포넌트의 DOM을 수정하는 것까지 이 모든 것이 side effects입니다. 
> https://ko.reactjs.org/docs/hooks-effect.html

Hooks에 라이프 사이클은 없지만 흉내낼 수 있다.

```jsx
// componentDidMount, componentDidUpdate 역할
useEffect(() => {
    ...
	return() => {	// componentWillUnmount 역할
        
    }
}, [])	// 배열에 넣은 값이 변경되면 useEffect 실행
```

함수 컴포넌트는 렌더링되면 함수 내부 코드가 다시 실행 -> useEffect 실행

리렌더링된 이후에 [] 배열 안의 값이 이전 렌더링 값과 비교하여 useEffect 실행 결정



![undefined](https://cdn.filestackcontent.com/ApNH7030SAG1wAycdj3H)



useEffect를 여러번 사용가능

(커스텀 훅으로 만들어 다른 컴포넌트에서 재사용)



### useMemo

[메모이제이션된](https://ko.wikipedia.org/wiki/메모이제이션) 값을 반환

계산량이 많은 함수는 반복 실행된다면 성능 문제 발생 -> 불필요한 렌더링을 막기 위해 사용



### useCallback

[메모이제이션된](https://ko.wikipedia.org/wiki/메모이제이션) 콜백을 반환

**자식 컴포넌트에 props로 함수를 전달할 때** 필수로 사용

useEffect와 같이 dependency가 변경되면 실행

단, useCallback 내에서 state를 사용할 때는 주의. 변경된 값이 반영되지 않고 적용될 수 있음



**useMemo vs useCallback**

useMemo는 값을 기억, useCallback은 함수 자체를 기억



### useReducer

react에서 redux 핵심부분을 도입

소규모 앱에서는 redux를 사용할 필요없이 useReducer + Context 조합으로 사용

규모가 있는 앱에서는 **비동기 처리**를 위해 Redux를 사용해야 함



useState를 대체해 사용 가능한 **상태 업데이트 로직 분리 hooks**

state 개수가 많아지면 관리와 props 전달이 어렵기 때문에 useReducer를 사용하여 하나의 state와 setState로 관리할 수 있음



`const [state, dispatch] = useReducer(reducer, initialArg, init);`

state: 컴포넌트에서 사용하는 상태

dispatch:  액션을 발생시키는 함수

reducer: 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환

initialArg:  초기 state 설정

![React useReducer()](https://dmitripavlutin.com/d730963db46908eaa6113c3e18a5472f/reducer-4.svg)

action의 종류가 많으면 switch문으로 type별로 구분

기존 state를 직접 변경하지 않고 새로운 객체를 만들어서 바뀐 값만 반영해야 함 (불변성) - 얕은 복사

(+) immer 라이브러리를 사용해 가독성 문제 해결 가능



dispatch가 state를 바꾸는 것은 **비동기**



**정리) state를 하나로 모아두고 action을 통해서만 state를 변경**

**dispatch하면 action이 실행 -> reducer에 정의한대로 state를 변경**
