// Think & Learn challenges for 9-12 year olds
export const LOGIC_PUZZLES = [
    {
        id: 1,
        title: "The Classroom Mystery",
        description: "Use clues to figure out who brought which snack.",
        clues: [
            "Alice did not bring chips.",
            "The person who brought cookies is sitting next to Ben.",
            "Charlie brought juice.",
            "Dana is not sitting next to the person with cookies."
        ],
        answers: {
            Alice: "Cookies",
            Ben: "Chips",
            Charlie: "Juice",
            Dana: "Fruit"
        }
    },
    {
        id: 2,
        title: "Treasure Chest Code",
        description: "Decode the number pattern to open the treasure chest.",
        pattern: [2, 4, 8, 16, "?"],
        answer: 32,
        choices: [24, 28, 32, 36]
    }
];

export const STRATEGY_CHALLENGES = [
    {
        id: 1,
        title: "Bridge Crossing",
        description: "Four friends need to cross a bridge at night. Only two can cross at a time, and they share one flashlight. Each has a different speed. Plan the fastest crossing.",
        steps: [
            "Anna - 1 min", "Ben - 2 min", "Cara - 5 min", "Dylan - 10 min"
        ],
        hints: [
            "Send the fastest people together.",
            "Use the flashlight efficiently to reduce return trips."
        ],
        solution: "1+2 cross, 1 returns, 5+10 cross, 2 returns, 1+2 cross (total 17 min)"
    },
    {
        id: 2,
        title: "Island Rescue",
        description: "You have a boat that holds two people. Move everyone across the river without leaving the boat unattended.",
        steps: ["Sheriff", "Doctor", "Thief", "Child"],
        hints: ["The thief can't be left alone with anyone without the sheriff.", "Use the doctor to escort the thief when needed."],
        solution: "Sheriff+Thief go, Sheriff returns, Sheriff+Doctor go, Sheriff returns, Sheriff+Child go, Sheriff returns, Sheriff+Thief go."
    }
];
