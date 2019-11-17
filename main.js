/**
 * <div>
 *  <span>item 1</span>
 *  <li>item 2</li>
 * </div>
 */
const a = el("div", {}, [
  el("span", {}, ["item 1"])
]);

/**
 * <div>
 *  <span>item 1</span>
 *  <li>item 2</li>
 * </div>
 */
const b = el("div", {}, [
  el("span", {}, ["item 1"]),
  el("li", {}, ["item 2"])
]);

/**
 * <div>
 *  <span>item 1</span>
 *  <li>hello world!</li>
 * </div>
 */
const c = el("div", {}, [
  el("span", {}, ["item 1"]),
  el("li", {}, ["hello world!"])
]);

/**
 * <div class="night">
 *  <span>item 1</span>
 *  <li>hello world!</li>
 * </div>
 */
const d = el("div", { class: 'night' }, [
  el("span", {}, ["item 1"]),
  el("li", {}, ["hello world!"])
]);

const $root = document.querySelector("#root");
updateEl($root, a);

const btns = document.querySelectorAll('button')
btns[0].addEventListener('click', () => {
  updateEl($root, b, a);
})

btns[1].addEventListener('click', () => {
  updateEl($root, c, b);
})

btns[2].addEventListener('click', () => {
  updateEl($root, d, c);
})
