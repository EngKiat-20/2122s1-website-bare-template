function getBucketKey(value, bucketSize) {
    return value - (value % bucketSize);
}

function makeTimestampBuckets(timestamps, minValue, maxValue) {
    const bucketSize = 5; // This is a constant, it could be defined in DEFAULTS variable in commons.mjs

    const timestampMap = {};
    const timestampKeys = [];
    const minBucketKey = getBucketKey(minValue, bucketSize);
    for (let i = minBucketKey; i < maxValue; i += bucketSize) {
        timestampMap[i] = 0;
        timestampKeys.push(i);
    }
    timestamps.forEach((timestamp) => {
        timestampMap[getBucketKey(timestamp, bucketSize)] += 1;
    });

    const buckets = [['Timestamp', 'Count']];
    timestampKeys.forEach((timestamp) => {
        buckets.push([new Date(timestamp * 1000), timestampMap[timestamp]]);
    });
    return buckets;
}

function makeErrorChartPayloadToTimestampBuckets(payload, fromDayJs, toDayJs) {
    const minValue = fromDayJs.unix();
    const maxValue = toDayJs.unix();
    return makeTimestampBuckets(
        payload.map(({ timestamp }) => timestamp),
        minValue,
        maxValue,
    );
}