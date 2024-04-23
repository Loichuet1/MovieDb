export const utils = {

    convertTime: (timeToConvert) => {
        const heures = Math.floor(timeToConvert / 60);
        const minutes = timeToConvert - (60 * heures);
        return `${heures}h ${minutes}min`;
    },
    truncate: (string, n) => {
        return string.slice(0, n);
    },
};