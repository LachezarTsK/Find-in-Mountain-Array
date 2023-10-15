
#include <memory>
using namespace std;

/**
 * API MountainArray is implemented internally by leetcode.com
 * Do not include it when running the code on the website.
 */
// This is the MountainArray's API interface.
// You should not implement it, or speculate about its implementation
class MountainArray {
public:
    int get(int index);
    int length();
};

class Solution {
    
    static const int NOT_FOUND = -1;
    unique_ptr<MountainArray> mountainArray;
    int target;

public:
    int findInMountainArray(int target, const MountainArray& mountainArr) {
        mountainArray = make_unique<MountainArray>(mountainArr);
        this->target = target;
        int length = mountainArray->length();

        int indexPeakValue = binarySearch(1, length - 2, true, true);
        int indexTargetIncreasingValues = binarySearch(0, indexPeakValue, true, false);
        int indexTargetDecreasingValues = binarySearch(indexPeakValue + 1, length - 1, false, false);

        return (indexTargetIncreasingValues != NOT_FOUND) ? indexTargetIncreasingValues : indexTargetDecreasingValues;
    }

private:
    int binarySearch(int leftIndex, int rightIndex, bool increasingOrder, bool searchForPeak) {

        while (leftIndex < rightIndex) {
            int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
            int middleValue = mountainArray->get(middleIndex);
            int valueToCompareAgainst = searchForPeak ? mountainArray->get(middleIndex + 1) : target;

            if (increasingOrder && middleValue < valueToCompareAgainst) {
                leftIndex = middleIndex + 1;
            } else if (!increasingOrder && middleValue > valueToCompareAgainst) {
                leftIndex = middleIndex + 1;
            } else {
                rightIndex = middleIndex;
            }
        }

        return (searchForPeak || mountainArray->get(leftIndex) == target) ? leftIndex : NOT_FOUND;
    }
};
