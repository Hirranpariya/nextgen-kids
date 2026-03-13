// Sample stories data for young learners
export const STORIES = [
    {
        id: 1,
        title: "The Little Red Hen",
        description: "A story about a hardworking hen and her lazy friends.",
        text: "Once upon a time, there was a little red hen who found some grains of wheat. She asked her friends, the duck, the cat, and the dog, 'Who will help me plant the wheat?' 'Not I,' said the duck. 'Not I,' said the cat. 'Not I,' said the dog. So the little red hen planted the wheat all by herself. When the wheat grew tall, she asked, 'Who will help me harvest the wheat?' 'Not I,' said the duck. 'Not I,' said the cat. 'Not I,' said the dog. The little red hen harvested it alone. Then she asked, 'Who will help me grind the wheat into flour?' Again, her friends said no. Finally, when the bread was baked, she asked, 'Who will help me eat the bread?' This time, all her friends wanted to eat! But the little red hen said, 'No, you didn't help me work, so you can't eat the bread.' And she ate it all by herself.",
        audioUrl: "/assets/audio/stories/little-red-hen.mp3", // Placeholder - replace with actual audio file
        duration: "2:30", // Approximate duration
        quiz: [
            {
                question: "Who found the grains of wheat?",
                options: ["The duck", "The little red hen", "The cat", "The dog"],
                correctAnswer: 1
            },
            {
                question: "Who helped the hen plant the wheat?",
                options: ["Nobody", "The duck", "The cat", "The dog"],
                correctAnswer: 0
            },
            {
                question: "What did the hen make with the wheat?",
                options: ["Cake", "Bread", "Pasta", "Cookies"],
                correctAnswer: 1
            },
            {
                question: "Did the friends get to eat the bread?",
                options: ["Yes", "No"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 2,
        title: "The Three Little Pigs",
        description: "Three pigs build houses and face a big bad wolf.",
        text: "Once there were three little pigs. The first pig built a house of straw. The second pig built a house of sticks. The third pig built a house of bricks. Along came a big bad wolf. He huffed and puffed and blew down the straw house. The first pig ran to the stick house. The wolf huffed and puffed and blew down the stick house too. Both pigs ran to the brick house. The wolf huffed and puffed, but he couldn't blow down the brick house. The three little pigs were safe inside.",
        audioUrl: "/assets/audio/stories/three-little-pigs.mp3",
        duration: "2:15",
        quiz: [
            {
                question: "What did the first pig build his house with?",
                options: ["Bricks", "Straw", "Sticks", "Wood"],
                correctAnswer: 1
            },
            {
                question: "What did the third pig build his house with?",
                options: ["Straw", "Sticks", "Bricks", "Mud"],
                correctAnswer: 2
            },
            {
                question: "Who tried to blow down the houses?",
                options: ["A fox", "A wolf", "A bear", "A lion"],
                correctAnswer: 1
            },
            {
                question: "Which house could the wolf not blow down?",
                options: ["Straw house", "Stick house", "Brick house", "All of them"],
                correctAnswer: 2
            }
        ]
    }
];

// Sample reading exercises for Learn Reading
export const READING_EXERCISES = [
    {
        id: 1,
        type: "phonics",
        title: "Sound Match",
        description: "Match letters to their sounds.",
        letters: ["A", "B", "C"],
        sounds: ["ah", "buh", "kuh"]
    },
    {
        id: 2,
        type: "sight-words",
        title: "Sight Words",
        description: "Read these common words.",
        words: ["the", "and", "you", "it", "in"]
    }
];