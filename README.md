# React Virtual Hangul Keyboard

`react-simple-keyboard` 라이브러리가 한글을 정상적으로 지원하지 않기 때문에 `hangul.js` 라이브러리의 `assemble`를 활용하여 한글의 받침 이슈를 처리하는 `hangul-virtual-keyboard` 라이브러리를 기반으로 레이아웃 커스텀 기능과 타입을 추가했습니다.

# install

```
npm install imlab-virtual-hangul-keyboard
```

# CSS 적용

`global.css`에 반드시 다음 내용을 포함해야 합니다.

```css
.hg-theme-default {
  width: 100%;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: manipulation;
}

.hg-theme-default .hg-button span {
  pointer-events: none;
}

/* When using option "useButtonTag" */
.hg-theme-default button.hg-button {
  border-width: 0;
  outline: 0;
  font-size: inherit;
}

.hg-theme-default {
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
  background-color: #ececec;
  padding: 5px;
  border-radius: 5px;
}

.hg-theme-default .hg-button {
  display: inline-block;
  flex-grow: 1;
  cursor: pointer;
}

.hg-theme-default .hg-row {
  display: flex;
}

.hg-theme-default .hg-row:not(:last-child) {
  margin-bottom: 5px;
}

.hg-theme-default .hg-row .hg-button:not(:last-child) {
  margin-right: 5px;
}

.hg-theme-default .hg-row .hg-button-container {
  margin-right: 5px;
}

.hg-theme-default .hg-row > div:last-child {
  margin-right: 0;
}

.hg-theme-default .hg-row .hg-button-container {
  display: flex;
}

.hg-theme-default .hg-button {
  box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.3);
  height: 40px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px;
  background: white;
  border-bottom: 1px solid #b5b5b5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.hg-theme-default .hg-button.hg-button-enter {
  min-width: 100px;
}

.hg-theme-default .hg-button.hg-activeButton {
  background: #efefef;
}

.hg-theme-default.hg-layout-numeric .hg-button {
  width: 33.3%;
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.hg-theme-default .hg-button.hg-button-numpadadd {
  height: 85px;
}

.hg-theme-default .hg-button.hg-button-numpadenter {
  height: 85px;
}

.hg-theme-default .hg-button.hg-button-numpad0 {
  width: 105px;
}

.hg-theme-default .hg-button.hg-button-com {
  max-width: 85px;
}

.hg-theme-default .hg-button.hg-standardBtn.hg-button-at {
  max-width: 45px;
}

.hg-theme-default .hg-button.hg-selectedButton {
  background: rgba(5, 25, 70, 0.53);
  color: white;
}

.hg-theme-default .hg-button.hg-standardBtn[data-skbtn='.com'] {
  max-width: 82px;
}

.hg-theme-default .hg-button.hg-standardBtn[data-skbtn='@'] {
  max-width: 60px;
}
```
