const random = () => {
  let number = Math.random() * 100;
  let secNumber = Math.random() * 100;
  console.log(number, secNumber);
  let multiply = number * secNumber;
  let timestamp = Date.now();
  let fiveNum = multiply.toString().slice(1, 5);
  let randomString = `${timestamp.toString().slice(-3)}${fiveNum}`;
  console.log(randomString.replace(/\./g, ""));
  return `⠀${randomString.replace(/\./g, "")}`;
};
export { random };
