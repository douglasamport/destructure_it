// console.log("WORKING");

// console.log(NaN);
// console.log(NaN === NaN);
// const tuesday = NaN;
// console.log(tuesday);
// console.log(tuesday === NaN);
// console.log(Number.isNaN(NaN));
// console.log(isNaN(NaN));
// console.log(isNaN(tuesday));
// let wed = "Totally Random String";
// console.log(isNaN(wed));
// console.log(typeof NaN);

const url = "http://localhost:3000/";

async function getSomething(url) {
  await (await fetch(url)).then((response) => console.log(response));
}

getSomething(url);
