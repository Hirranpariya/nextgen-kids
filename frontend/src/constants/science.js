// Data for basic science activities (9-12 age range)
export const PLANT_LAB = {
    name: "Plant Lab",
    description: "Help your plant grow by adjusting water, sunlight, and nutrients.",
    stages: [
        { label: "Seed", image: "🌱" },
        { label: "Sprout", image: "🌿" },
        { label: "Young Plant", image: "🌳" },
        { label: "Blooming", image: "🌸" }
    ],
    params: {
        water: { min: 0, max: 10, default: 5 },
        sunlight: { min: 0, max: 10, default: 5 },
        nutrients: { min: 0, max: 10, default: 5 }
    }
};

export const CIRCUIT_BUILDER = {
    name: "Circuit Builder",
    description: "Build a simple circuit to light up the bulb. Drag components to connect them.",
    components: [
        { id: 'battery', label: 'Battery', icon: '🔋' },
        { id: 'wire', label: 'Wire', icon: '🪢' },
        { id: 'switch', label: 'Switch', icon: '🔛' },
        { id: 'bulb', label: 'Bulb', icon: '💡' }
    ],
    goal: "Complete the circuit so the bulb lights up!"
};
