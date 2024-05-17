enum RESPONSE {
  YES = "YES",
  NO = "NO",
}

function tickets(bills: number[]): RESPONSE {
  let cash = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 25) {
      cash += 25;
    } else if (bills[i] === 50) {
      cash -= 25;
    } else {
      cash -= 75;
    }
    if (cash < 0) {
      return RESPONSE.NO;
    }
  }
  return RESPONSE.YES;
}

console.log(tickets([25, 25, 50]));
console.log(tickets([25, 100]));
console.log(
  tickets([25, 50, 25, 100, 25, 25, 25, 100, 25, 25, 50, 100, 50, 25])
);
