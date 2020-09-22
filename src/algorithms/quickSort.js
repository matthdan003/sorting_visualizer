export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doQuickSort(animations, auxiliaryArray, 0, auxiliaryArray.length - 1);
    return animations;
}
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

function swap(animations, items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

    animations.push([leftIndex, rightIndex]);
}
export function quickSortPartition(items, left, right, animations) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(animations, items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

export function doQuickSort(animations, items, left, right) {
    var index;
    if (items.length > 1) {
        index = quickSortPartition(items, left, right, animations); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            doQuickSort(animations, items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            doQuickSort(animations, items, index, right);
        }
    }
    console.log(items);
    return items;
}