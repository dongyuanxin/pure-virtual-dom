class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }

  render() {
    const dom = document.createElement(this.tagName);
    Reflect.ownKeys(this.props).forEach(name =>
      dom.setAttribute(name, this.props[name])
    );

    this.children.forEach(child => {
      const childDom =
        child instanceof Element
          ? child.render()
          : document.createTextNode(child);
      dom.appendChild(childDom);
    });

    return dom;
  }
}

function el(tagName, props, children) {
  return new Element(tagName, props, children);
}