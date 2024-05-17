enum Command {
  RIGHT = "RIGHT",
  LEFT = "LEFT",
  PICK = "PICK",
  PLACE = "PLACE",
  WARNING = "WARNING",
}

type CommandType =
  | Command.RIGHT
  | Command.LEFT
  | Command.PICK
  | Command.PLACE
  | Command.WARNING;

const MAX_ALLOWED_HEIGHT = 5;

function solve(
  clawPos: number,
  boxes: number[],
  boxInClaw: 1 | 0
): CommandType {
  const totalBoxes = boxes.reduce((acc, box) => acc + box, 0);
  const numStacks = boxes.length;
  const targetHeight = Math.floor(totalBoxes / numStacks);

  //check if the target height is greater than the max allowed height
  if (targetHeight > MAX_ALLOWED_HEIGHT * numStacks + boxInClaw) {
    return Command.WARNING;
  }

  if (boxInClaw) {
    //look for the first stack that is less than the target height and less than the max allowed height. If found, move the claw to that stack and place the box
    for (let i = 0; i < numStacks; i++) {
      if (boxes[i] < targetHeight && boxes[i] < MAX_ALLOWED_HEIGHT) {
        if (clawPos < i) return Command.RIGHT;
        if (clawPos > i) return Command.LEFT;
        return Command.PLACE;
      }
    }

    //if no stack is found, look for the first stack that is less than the max allowed height. If found, move the claw to that stack and place the box
    for (let i = 0; i < numStacks; i++) {
      if (boxes[i] < MAX_ALLOWED_HEIGHT) {
        if (clawPos < i) return Command.RIGHT;
        if (clawPos > i) return Command.LEFT;
        return Command.PLACE;
      }
    }

    //if no stack is found, return warning
    return Command.WARNING;
  } else {
    //look for the first stack that is greater than the target height. If found, move the claw to that stack and pick the box
    for (let i = 0; i < numStacks; i++) {
      if (boxes[i] > targetHeight) {
        if (clawPos < i) return Command.RIGHT;
        if (clawPos > i) return Command.LEFT;
        return Command.PICK;
      }
    }

    //if no stack is found, return warning
    return Command.WARNING;
  }
}

function runTests() {
  const tests: {
    clawPos: number;
    boxes: number[];
    boxInClaw: 1 | 0;
    expected: string;
  }[] = [
    { clawPos: 0, boxes: [3, 2, 1, 4], boxInClaw: 0, expected: "PICK" },
    { clawPos: 0, boxes: [3, 2, 1, 4], boxInClaw: 1, expected: "RIGHT" },
    { clawPos: 3, boxes: [3, 2, 1, 4], boxInClaw: 1, expected: "LEFT" },
    { clawPos: 1, boxes: [3, 1, 2, 4], boxInClaw: 1, expected: "PLACE" },
    { clawPos: 0, boxes: [5, 5, 5, 5], boxInClaw: 1, expected: "WARNING" },
    { clawPos: 0, boxes: [4, 4, 4, 4], boxInClaw: 0, expected: "WARNING" },
    { clawPos: 0, boxes: [5, 0], boxInClaw: 0, expected: "PICK" },
    { clawPos: 0, boxes: [5, 1], boxInClaw: 1, expected: "RIGHT" },
    { clawPos: 0, boxes: [2, 2, 2], boxInClaw: 0, expected: "WARNING" },
    {
      clawPos: 0,
      boxes: [0, 1, 2, 3, 4, 5, 6, 7],
      boxInClaw: 0,
      expected: "RIGHT",
    },
    {
      clawPos: 6,
      boxes: [5, 5, 5, 5, 5, 5, 5, 5],
      boxInClaw: 1,
      expected: "WARNING",
    },
    {
      clawPos: 7,
      boxes: [5, 5, 5, 5, 5, 5, 5, 5],
      boxInClaw: 1,
      expected: "WARNING  ",
    },
    { clawPos: 0, boxes: [4, 4, 4, 4], boxInClaw: 0, expected: "WARNING" },
    { clawPos: 0, boxes: [3, 3, 3], boxInClaw: 0, expected: "WARNING" },
    { clawPos: 0, boxes: [4, 4, 1, 5, 2], boxInClaw: 0, expected: "PICK" },
    { clawPos: 0, boxes: [4, 4, 1, 5, 2], boxInClaw: 1, expected: "RIGHT" },
    { clawPos: 0, boxes: [5, 5, 5, 5], boxInClaw: 0, expected: "WARNING" },
    { clawPos: 0, boxes: [5, 5, 5, 5], boxInClaw: 1, expected: "WARNING" },
  ];

  tests.forEach(({ clawPos, boxes, boxInClaw, expected }, index) => {
    const result = solve(clawPos, boxes, boxInClaw);
    const pass = result === expected ? "PASS" : "FAIL";
    console.log(
      `Test ${index + 1}: ${pass} (Expected: ${expected}, Got: ${result})`
    );
  });
}

runTests();
