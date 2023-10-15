
using System;
using System.Collections.Generic;

/**
 * API MountainArray is implemented internally by leetcode.com
 * Do not include it when running the code on the website.
*/
// This is MountainArray's API interface.
// You should not implement it, or speculate about its implementation
class MountainArray
{
    public int Get(int index) { }
    public int Length() { }
}


class Solution
{
    static readonly int NOT_FOUND = -1;
    private MountainArray mountainArray;
    private int target;
    public int FindInMountainArray(int target, MountainArray mountainArray)
    {
        this.mountainArray = mountainArray;
        this.target = target;
        int length = mountainArray.Length();

        int indexPeakValue = binarySearch(1, length - 2, true, true);
        int indexTargetIncreasingValues = binarySearch(0, indexPeakValue, true, false);
        int indexTargetDecreasingValues = binarySearch(indexPeakValue + 1, length - 1, false, false);

        return (indexTargetIncreasingValues != NOT_FOUND) ? indexTargetIncreasingValues : indexTargetDecreasingValues;
    }

    private int binarySearch(int leftIndex, int rightIndex, bool increasingOrder, bool searchForPeak)
    {

        while (leftIndex < rightIndex)
        {
            int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
            int middleValue = mountainArray.Get(middleIndex);
            int valueToCompareAgainst = searchForPeak ? mountainArray.Get(middleIndex + 1) : target;

            if (increasingOrder && middleValue < valueToCompareAgainst)
            {
                leftIndex = middleIndex + 1;
            }
            else if (!increasingOrder && middleValue > valueToCompareAgainst)
            {
                leftIndex = middleIndex + 1;
            }
            else
            {
                rightIndex = middleIndex;
            }
        }

        return (searchForPeak || mountainArray.Get(leftIndex) == target) ? leftIndex : NOT_FOUND;
    }
}
