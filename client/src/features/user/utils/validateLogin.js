export default async function validateLogin({ username, password }) {
  await sleep(3); //simulate fetch call
  //TODO actually implemnet api validation
  if (username == "abc" && password == "123") {
    return true;
  }

  return false;
}

async function sleep(n) {
  return new Promise((r) => setTimeout(r, n * 1000));
}
