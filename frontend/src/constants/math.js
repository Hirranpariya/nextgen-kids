// Sample math problems for 9-12 year olds
export const MATH_PROBLEMS = {
    addition: [
        { question: "What is 47 + 23?", answer: 70, options: [67, 70, 73, 76] },
        { question: "Add 156 + 89", answer: 245, options: [235, 245, 255, 265] },
        { question: "What is 312 + 187?", answer: 499, options: [489, 499, 509, 519] }
    ],
    multiplication: [
        { question: "What is 12 × 8?", answer: 96, options: [84, 96, 108, 120] },
        { question: "Multiply 15 × 7", answer: 105, options: [95, 105, 115, 125] },
        { question: "What is 23 × 4?", answer: 92, options: [88, 92, 96, 100] }
    ],
    fractions: [
        { question: "What is 1/2 + 1/4?", answer: "3/4", options: ["1/4", "1/2", "3/4", "1"] },
        { question: "Simplify 8/12", answer: "2/3", options: ["1/2", "2/3", "3/4", "4/5"] },
        { question: "What is 3/5 of 20?", answer: 12, options: [8, 10, 12, 15] }
    ],
    geometry: [
        { question: "What is the area of a rectangle with length 8cm and width 5cm?", answer: 40, options: [30, 35, 40, 45], unit: "cm²" },
        { question: "What shape has 4 equal sides and 4 right angles?", answer: "Square", options: ["Rectangle", "Square", "Triangle", "Circle"] },
        { question: "What is the perimeter of a square with side 6cm?", answer: 24, options: [18, 20, 24, 30], unit: "cm" }
    ]
};

export const MATH_EXERCISES = [
    {
        id: 1,
        type: "number-line",
        title: "Number Line Jumps",
        description: "Use the number line to solve addition problems.",
        problems: [15, 23, 8] // Add these numbers step by step
    },
    {
        id: 2,
        type: "pattern",
        title: "Find the Pattern",
        description: "Complete the number sequence.",
        sequences: [
            { pattern: [2, 4, 6, 8, "?"], answer: 10 },
            { pattern: [1, 3, 6, 10, "?"], answer: 15 },
            { pattern: [5, 10, 20, 40, "?"], answer: 80 }
        ]
    }
];