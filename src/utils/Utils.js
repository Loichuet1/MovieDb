export const utils = {

    convertTime: (timeToConvert) => {
        const heures = Math.floor(timeToConvert / 60);
        const minutes = timeToConvert - (60 * heures);
        return `${heures}h ${minutes}min`;
    },
    truncate: (string, n) => {

        if (!string || !n) {
            return "";
        }
        return string.slice(0, n);
    },

    convertToPercent(valueToConvert) {
        return valueToConvert.toFixed(1) * 10;
    }
};