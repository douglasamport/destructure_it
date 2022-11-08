export default function domCrawler(data, path = [], lvl = 0) {
  //   console.log(lvl);
  let parent = data.target ? data.target : data;
  // console.log(parent);
  const classes = [...parent.classList];
  if (classes.includes("pair")) {
    //GET PAIRS INFO
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
