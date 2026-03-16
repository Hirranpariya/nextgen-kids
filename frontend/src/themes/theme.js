export const theme = {
    colors: {
        primary: {
            main: '#6366f1', // Indigo 500
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#f6ad55', // Orange 400
        },
        accent: {
            main: '#d53f8c', // Pink 600
        },
        background: {
            page: '#f8faff',
            card: '#ffffff',
        },
        text: {
            main: '#2d3748',
            muted: '#718096',
        },
        status: {
            success: '#48BB78',
            error: '#F56565',
            warning: '#ED8936',
        }
    },
    fonts: {
        heading: "'Fredoka', sans-serif",
        body: "'Nunito', sans-serif",
        ui: "'Outfit', sans-serif",
    },
    radii: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.07)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    }
};

export const getAgeGroupTheme = (group) => {
    switch (group) {
        case 'toddler': return { color: '#63B3ED', label: 'Toddler' };
        case 'kid': return { color: '#9F7AEA', label: 'Kid' };
        case 'teen': return { color: '#F687B3', label: 'Teen' };
        default: return { color: '#9F7AEA', label: 'Kid' };
    }
};
