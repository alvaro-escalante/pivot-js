"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Pivot table function
function default_1(data, index, aggregate, rename = []) {
    // Set starting variables
    let counter = 0;
    const store = {};
    const totalHash = {};
    // Validate with asserts if
    function assertIsString(value) {
        if (typeof value !== 'string') {
            throw new Error(`Expected a string, but got ${typeof value}`);
        }
    }
    // Order array by column index passed
    const order = data.sort((a, b) => {
        const avalue = a[index];
        const bvalue = b[index];
        assertIsString(avalue);
        assertIsString(bvalue);
        return avalue.localeCompare(bvalue);
    });
    // Find columns on data array, expose if not present
    const missing = Object.keys(aggregate).find((entry) => !Object.keys(data[0]).includes(entry));
    if (missing) {
        throw Error(`${missing} does not exists`);
    }
    // Add counter if none has been passed explicitly
    if (!Object.values(aggregate).includes('counter'))
        aggregate[index] = 'counter';
    // Calculate pivots
    const pivots = order.reduce((acc, row) => {
        var _a;
        // Collect data for pivots
        for (const [name, type] of Object.entries(aggregate)) {
            switch (type) {
                case 'display':
                    store[name] = { type, title: row[name] };
                    break;
                case 'counter':
                    store[name] = { type, value: counter };
                    counter = !acc.has(row[index]) ? 1 : counter + 1;
                    break;
                case 'min':
                case 'max':
                    if (!acc.has(row[index]))
                        store[name] = { type, minmax: [] };
                    store[name].minmax.push(row[name]);
                    break;
                default:
                    store[name] = {
                        type,
                        value: !acc.has(row[index])
                            ? row[name]
                            : store[name].value + row[name]
                    };
                    break;
            }
        }
        const aggregateObj = {};
        for (const [index, [name, type]] of Object.entries(aggregate).entries()) {
            const id = (_a = rename[index + 1]) !== null && _a !== void 0 ? _a : name;
            totalHash[id] = { type, name };
            switch (type) {
                case 'display':
                    aggregateObj[id] = store[name].title;
                    break;
                case 'counter':
                    aggregateObj[id] = counter;
                    break;
                case 'mean':
                    aggregateObj[id] = store[name].value / counter;
                    break;
                case 'min':
                    aggregateObj[id] = Math[type](...store[name].minmax);
                    break;
                default:
                    aggregateObj[id] = store[name].value;
                    break;
            }
        }
        // Add default name to first entry or use renames array
        let rowID = rename.length ? rename[0] : 'row';
        // Set table and spread aggregate calcs
        acc.set(row[index], Object.assign({ [rowID]: row[index] }, aggregateObj));
        return acc;
    }, new Map());
    const pivotTable = [...pivots.values()];
    // Calculate totals
    // Get names of posibly renamed columns
    const headers = Object.keys(pivotTable[0]);
    // Remove the first entry to use as row index
    const first = headers.splice(0, 1)[0];
    const totals = {};
    totals[first] = 'Grand Total';
    // Calculate totals based on original data and tabled data
    for (const header of headers) {
        const item = totalHash[header];
        const value = item.name;
        // For mean take the whole data as a reference
        if (item.type === 'mean') {
            totals[header] =
                data.reduce((acc, curr) => acc + Number(curr[value]), 0) / data.length;
            continue;
        }
        // For min/max use pivoted results
        if (['min', 'max'].includes(item.type)) {
            totals[header] = data.reduce((acc, curr) => {
                const evaluation = item.type === 'min' ? acc < curr[value] : acc > curr[value];
                return acc !== 0 && evaluation ? acc : curr[value];
            }, 0);
            continue;
        }
        // For displays reset row there is nothing to reduce
        if (item.type === 'display') {
            totals[header] = '-';
            continue;
        }
        // For sum use pivoted results
        totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0);
    }
    // Add totals to pivot table
    pivotTable.push(totals);
    return pivotTable;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map