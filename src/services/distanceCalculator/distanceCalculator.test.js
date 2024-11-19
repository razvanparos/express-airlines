import { distanceCalculator } from "./distanceCalculator";

test('properly calculates distance between two airports', ()=>{
    expect(distanceCalculator(9.071364,-79.383453,12.994414,80.180517)).toBe(16681)
})