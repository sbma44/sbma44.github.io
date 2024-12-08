const url = 'https://sbma44.s3.amazonaws.com/137t/sensors/environment/xmas-tree.csv';
const xhr = new XMLHttpRequest();
xhr.open("GET", url);
// Handle response headers and parse the data as a CSV.
xhr.responseType = "text";
xhr.onload = function() {
if (xhr.status === 200) {
    let maxDist = 0;
    const csvData = this.response
        .split("\n").slice(1)
        .map((row) => {
            const rowParts = row.split(',');
            const r = [
                new Date(parseInt(rowParts[0]) * 1000),
                rowParts[rowParts.length - 1].trim().length > 0 ? -1 * parseFloat(rowParts[rowParts.length - 1]) : false
            ];
            if (r[1] && (r[1] > maxDist))
                maxDist = r[1];
            return r;
        })
        .filter(row => !!row[1]);

    new Dygraph(
        document.getElementById("darkbg"),
        csvData,
        {
            title: 'Christmas Tree Water Level',
            ylabel: 'Distance from Sensor (mm)',
            labels: ['date', 'mm_from_sensor'],
            showRangeSelector: true,
            colorValue: 0.9,
            fillAlpha: 0.4,
            rollPeriod: 3,
            rangeSelectorPlotFillGradientColor: '',
            rangeSelectorPlotFillColor: ''
        }
    );
} else {
    console.log('error fetching CSV');
}
};

xhr.send();