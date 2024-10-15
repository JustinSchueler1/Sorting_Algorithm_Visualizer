export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
        // Record comparisons
        animations.push([i, j]);
        animations.push([i, j]);
        
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations; // Return an empty animation if array is too small
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;

    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx]; // Use the last element as the pivot
    let partitionIdx = startIdx; // Initialize the partition index

    for (let i = startIdx; i < endIdx; i++) {
        // Highlight the comparison
        animations.push([i, endIdx]); // Comparing indices
        animations.push([i, endIdx]); // Reverting color

        if (array[i] < pivotValue) {
            // Highlight the swap
            animations.push([i, partitionIdx]); // Highlight swap positions
            animations.push([i, partitionIdx]); // Revert color after comparison

            // Swap the elements in the animations array
            animations.push([partitionIdx, array[i]]); // Show the swap
            animations.push([i, array[partitionIdx]]); // Show the swap

            // Perform the actual swap
            [array[i], array[partitionIdx]] = [array[partitionIdx], array[i]];
            partitionIdx++;
        }
    }

    // Place the pivot in the correct position
    animations.push([partitionIdx, endIdx]); // Highlight the final swap
    animations.push([partitionIdx, endIdx]); // Revert color

    animations.push([partitionIdx, array[endIdx]]); // Show the swap
    animations.push([endIdx, array[partitionIdx]]); // Show the swap

    // Swap the pivot into the correct position
    [array[partitionIdx], array[endIdx]] = [array[endIdx], array[partitionIdx]];

    return partitionIdx; // Return the index of the pivot
}