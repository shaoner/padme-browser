import { main } from 'padme-wasm';
import { h, render } from 'preact';
import App from './components/app';

import './style/index.scss';

main();

render(<App />, document.querySelector("#app") as Element);
