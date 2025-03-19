// The goal is to reach the last airport with the minimum number of planes.

function minPlanesSimple(arr) {
    let n = arr.length;
    
    if (n <= 1) return 0;  // If only one airport, no planes needed

    // planes => To count the number of planes hired.
    // fuel => The current fuel available.
    // lastPlane => The fuel capacity of the last plane you hired.
    // lastIndex => The index where you hired the last plane.

    let planes = 0;
    let fuel = arr[0];
    let lastPlane = 0;
    let lastIndex = 0;

    for (let i = 0; i < n; i++) {

        // If fuel > 0, move forward
        if (fuel > 0) {
            fuel--;  
        }

        // If you reach the last airport, return the plane count
        if (i === n - 1) {
            return planes;
        }

        // Update lastPlane and lastIndex if a new plane with fuel is found
        if (arr[i] !== 0) {
            lastPlane = arr[i];
            lastIndex = i;
        }

        // When you run out of fuel
        if (fuel === 0) {
            if (lastPlane > 0) {
                planes++;  // Hire a plane
                fuel = lastPlane;  // Refuel with last plane's fuel
                lastPlane = 0;     // Reset last plane
                i = lastIndex;     // Jump to where you hired the plane
            } else {
                return -1;  // If no plane available, return -1
            }
        }
    }
    
    return -1;
}

console.log(`Test 1: [2, 1, 2, 3, 1] → Minimum planes needed: ${minPlanesSimple([2, 1, 2, 3, 1])}`);         
console.log(`Test 2: [1, 6, 3, 4, 5, 0, 0, 0, 6] → Minimum planes needed: ${minPlanesSimple([1, 6, 3, 4, 5, 0, 0, 0, 6])}`);  
console.log(`Test 3: [1, 1, 0, 1] → Result: ${minPlanesSimple([1, 1, 0, 1])} (Destination unreachable)`);            
console.log(`Test 4: [3, 2, 1, 0, 4] → Result: ${minPlanesSimple([3, 2, 1, 0, 4])} (Destination unreachable)`);          
console.log(`Test 5: [2, 3, 1, 1, 4] → Minimum planes needed: ${minPlanesSimple([2, 3, 1, 1, 4])}`);          
