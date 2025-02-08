export const NumberToK = (num: number): string | number => {
    if (Math.abs(num) >= 1e3) {
        const sign = Math.sign(num);
        return (sign * (Math.abs(num) / 1e3)).toFixed(1) + 'k';
    }
    return num;
};
