import { JSDOM } from 'jsdom';

describe('footer list item', () => {
  test('click toggles active class', () => {
    const dom = new JSDOM(`<footer><ul><li class="li">Link</li></ul></footer>`);
    global.document = dom.window.document;
    global.window = dom.window;

    require('./script.js');

    const item = document.querySelector('.li');
    item.dispatchEvent(new dom.window.Event('click', { bubbles: true }));
    expect(item.classList.contains('active')).toBe(true);
    item.dispatchEvent(new dom.window.Event('click', { bubbles: true }));
    expect(item.classList.contains('active')).toBe(false);
  });
});
