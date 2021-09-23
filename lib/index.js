"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pivot = void 0;
// Pivot table function
function Pivot(data, index, aggregate, rename = []) {
    // Set starting variables
    let counter = 0;
    let len = 0;
    const store = {};
    const totalHash = {};
    // Order array by column index passed
    const order = data.sort((a, b) => {
        if (typeof a[index] === 'number') {
            return a[index] - b[index];
        }
        else {
            return a[index].localeCompare(b[index]);
        }
    });
    // Find columns on data array, expose if not present
    const notInColumns = Object.keys(aggregate).find((entry) => !Object.keys(data[0]).includes(entry));
    if (notInColumns) {
        throw Error(`${notInColumns} does not exists`);
    }
    // Check rename function has enough items
    if (rename.length) {
        const columns = Object.keys(aggregate).length + 1;
        const missing = columns - rename.length;
        if (missing) {
            throw new Error(`The rename array is too short, missing ${missing}`);
        }
    }
    // Calculate pivots
    const pivots = order.reduce((acc, row) => {
        var _a, _b;
        // Collect data for pivots
        for (const [name, type] of Object.entries(aggregate)) {
            len = !acc.has(row[index]) ? 1 : counter + 1;
            switch (type) {
                case 'count':
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
        for (const [i, [name, type]] of Object.entries(aggregate).entries()) {
            const id = (_a = rename[i + 1]) !== null && _a !== void 0 ? _a : false;
            let title = '';
            switch (type) {
                case 'count':
                    title = id ? id : `Count of ${name}`;
                    aggregateObj[title] = counter;
                    break;
                case 'mean':
                    title = id ? id : `Mean of ${name}`;
                    aggregateObj[title] = store[name].value / len;
                    break;
                case 'min':
                case 'max':
                    title = id ? id : `${type.charAt(0).toUpperCase() + type.slice(1)} of ${name}`;
                    aggregateObj[title] = Math[type](...store[name].minmax);
                    break;
                case 'sum':
                    title = id ? id : `Sum of ${name}`;
                    aggregateObj[title] = store[name].value + ((_b = aggregateObj[title]) !== null && _b !== void 0 ? _b : 0);
                    break;
            }
            totalHash[title] = { type, name };
        }
        // Add default name to first entry or use renames array
        const indexID = rename.length
            ? rename[0]
            : `${index.charAt(0).toUpperCase()}${index.slice(1)}`;
        // Set table and spread aggregate calcs
        acc.set(row[index], Object.assign({ [indexID]: row[index] }, aggregateObj));
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
        // For sum use pivoted results
        totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0);
    }
    // Add totals to pivot table
    pivotTable.push(totals);
    return pivotTable;
}
exports.Pivot = Pivot;
// console.log(
//   Pivot(
//     [
//       {
//         position: 1,
//         TF: 100
//       },
//       {
//         position: 2,
//         TF: 140
//       },
//       {
//         position: 3,
//         TF: 20
//       },
//       {
//         position: 1,
//         TF: 10
//       }
//     ],
//     'position',
//     {
//       TF: 'sum'
//     }
//   )
// )
//# sourceMappingURL=index.js.map