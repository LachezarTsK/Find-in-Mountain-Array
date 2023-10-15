
/**
 * API MountainArray is implemented internally by leetcode.com
 * Do not include it when running the code on the website.
 */
// This is the MountainArray's API interface.
// You should not implement it, or speculate about its implementation.
function MountainArray() {
    /**
     @param {number} index
     @return {number}
     */
    this.get = function (index) {};

    /**
     @return {number}
     */
    this.length = function () {};
}


/**
 * @param {number} target
 * @param {MountainArray} mountainArray
 * @return {number}
 */
var findInMountainArray = function (target, mountainArray) {
    this.NOT_FOUND = -1;
    this.mountainArray = mountainArray;
    this.target = target;
    const length = mountainArray.length();

    let indexPeakValue = binarySearch(1, length - 2, true, true);
    let indexTargetIncreasingValues = binarySearch(0, indexPeakValue, true, false);
    let indexTargetDecreasingValues = binarySearch(indexPeakValue + 1, length - 1, false, false);

    return (indexTargetIncreasingValues !== NOT_FOUND) ? indexTargetIncreasingValues : indexTargetDecreasingValues;
};

function  binarySearch(leftIndex, rightIndex, increasingOrder, searchForPeak) {

    while (leftIndex < rightIndex) {
        let middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
        let middleValue = this.mountainArray.get(middleIndex);
        let valueToCompareAgainst = searchForPeak ? this.mountainArray.get(middleIndex + 1) : this.target;

        if (increasingOrder && middleValue < valueToCompareAgainst) {
            leftIndex = middleIndex + 1;
        } else if (!increasingOrder && middleValue > valueToCompareAgainst) {
            leftIndex = middleIndex + 1;
        } else {
            rightIndex = middleIndex;
        }
    }

    return (searchForPeak || this.mountainArray.get(leftIndex) === target) ? leftIndex : this.NOT_FOUND;
}
