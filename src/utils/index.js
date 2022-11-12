export function dedupeArr(array) {
  return [...new Set(array)];
}

export function makeDeepCopyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function domCrawler(data, path = [], lvl = 0) {
  //   console.log(lvl);
  let parent = data.target ? data.target : data;
  // console.log(parent);
  const classes = [...parent.classList];
  if (classes.includes("pair")) {
    //GET PAIRS INFO
    // console.log(parent, "PARENT");
    const key = [...parent.children].find((a) =>
      [...a.classList].includes("key")
    );
    const value = key?.textContent || "";
    const type = parent.getAttribute("data-object-type");
    path.push({ value, type, lvl });
  }

  if (classes.includes("pairsContainer")) {
  }

  if (classes.includes("mainViewer")) {
    // console.log(path);
    return path;
  } //ESCAPE STATEMENT when we hit main viewer we''re done
  //   console.log(parent);
  if (parent.parentNode) {
    //if there is a parent node we keep climbing up the chain.
    lvl = lvl + 1;
    return domCrawler(parent.parentNode, path, lvl);
  }
  //   return "path";
}

export function simpleObjectBuilder(arr) {
  const sorted = arr.sort(({ lvl: a }, { lvl: b }) => {
    return b - a;
  });

  const pathObject = buildObject(sorted);
  // console.log(pathObject, "object");
  return pathObject;
}

function buildObject(array, object = {}) {
  if (array.length) {
    let element = array.shift();
    let value = element.value;
    let type = element.type;

    if (type === "array") value = 0;
    object.value = element.value;
    object.type = element.type;
    object.children = array.length ? [buildObject(array)] : null;
    // console.log(object, "OBJECT IN BUILDER");
    return object;
  }
  return object;
}

export function reduceWrapperArray(array) {
  // console.log(array, "array in reducedWrapper");
  array = array.filter((a) => a);
  if (array === []) return null;
  return array.reduce((p, c) => {
    const unique = p.map(({ value }) => value);
    const current = c.value;
    if (!unique.includes(current)) {
      return p.concat(c);
    }
    let match = p.find((o) => o.value === current);
    let index = p.indexOf(match);
    let combined = match;

    let potentialChildren =
      match.children === null && c.children === null
        ? null
        : reduceWrapperArray([match.children, c.children].flat());

    combined.children = potentialChildren;
    p.splice(index, 1, combined);
    return p;
  }, []);
}
