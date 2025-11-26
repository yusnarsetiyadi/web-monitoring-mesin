export const generateYearOptions = (startYear?: number, endYear?: number) => {
    const currentYear = new Date().getFullYear();
    const start = startYear || (currentYear - 10);
    const end = endYear || (currentYear + 5);

    return Array.from({ length: end - start + 1}, (_,i) => {
        const year = start + i;
        return {
            value: year.toString(),
            label: year.toString(),
        };
    }).reverse();
}