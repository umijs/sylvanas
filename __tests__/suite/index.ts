import Component from './Component';
import Component2 from './sub/Component';

export function sum(...args: number[]) {
  let total: number = 0;
  args.forEach((num) => {
    total += num;
  });

  return total;
}

export default { Component, Component2 };
