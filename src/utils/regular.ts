/*
*正则匹配规则
*/
// 车架号
export const vinReg = /^[A-HJ-NPR-Z\d]{17}$/;

// 正整数 1,2,3...
export const positiveIntegerReg = /^[1-9][0-9]*$/;

// 自然数 0,1,2,3...
export const naturalNumber = /^(0|[1-9][0-9]*)$/;

// 去零整数
export const integerWithoutZero = /^-?[1-9]\d*$/;