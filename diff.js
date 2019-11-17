const CHANGE_TYPE_TEXT = Symbol('text')
const CHANGE_TYPE_PROP = Symbol('props')
const CHANGE_TYPE_REPLACE = Symbol('replace')

function checkChangeType(newNode, oldNode) {
  if (typeof newNode !== typeof oldNode || newNode.tagName !== oldNode.tagName) {
    return CHANGE_TYPE_REPLACE;
  }

  if (typeof newNode === 'string') {
    if (newNode !== oldNode) {
      return CHANGE_TYPE_TEXT;
    }
    return;
  }

  const propsChanged = Reflect
    .ownKeys(newNode.props)
    .reduce(
      (prev, name) => prev || (oldNode.props[name] !== newNode.props[name]), 
      false
    );

  if (propsChanged) {
    return CHANGE_TYPE_PROP;
  }
  return;
}

/**
 * 
 * @param {HTMLElement} $node 
 * @param {Object} removedAttrs 
 * @param {Object} newAttrWithVals 
 */
function replaceAttribute($node, removedAttrs, newAttrs) {
  if (!$node) {
    return
  }

  Reflect.ownKeys(removedAttrs)
    .forEach(attr => $node.removeAttribute(attr))
  Reflect.ownKeys(newAttrs)
    .forEach(attr => $node.setAttribute(attr, newAttrs[attr]))
}

function updateEl($parent, newNode, oldNode, index = 0) {
  let changeType = null;

  if (!oldNode) {
    $parent.appendChild(newNode.render());
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changeType = checkChangeType(newNode, oldNode)) {
    if (changeType === CHANGE_TYPE_TEXT) {
      $parent.replaceChild(
        document.createTextNode(newNode),
        $parent.childNodes[index]
      );
    } else if (changeType === CHANGE_TYPE_REPLACE) {
      $parent.replaceChild(newNode.render(), $parent.childNodes[index]);
    } else if (changeType === CHANGE_TYPE_PROP) {
      replaceAttribute($parent.childNodes[index], oldNode.props, newNode.props)
    }
  } else if (newNode.tagName) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; ++i) {
      updateEl(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}