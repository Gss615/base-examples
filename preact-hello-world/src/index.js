// import { h, render } from 'preact';
// import HelloWorld from './App';
// render(h(HelloWorld, { name: 'World' }), document.body);
// const foo = new Promise((resolve, reject) => {
//     const foo = { a: 1, b: 2, c: 3 };
//     setTimeout(() => resolve(Object.assign({}, foo, { a: 99 })));
// });
// foo.then(fooDone => console.log(fooDone));
// //# sourceMappingURL=app.js.map

// console.log('start')

// import { h } from 'preact'
// import { App } from './app'
// // import './index.css'
// console.log('000000')
// h(<App />, document.getElementById('root')
import { render,h } from 'preact';

const Foo = () => <div>foo</div>;

render(<Foo />, document.getElementById('root'));