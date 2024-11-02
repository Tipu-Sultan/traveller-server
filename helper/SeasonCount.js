exports.getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'summer';
    if (month >= 10 && month <= 2) return 'winter';
    return null; // Return null if no specific season is applicable
};