const z = (n: number, length = 2) => n.toString().padStart(length, "0");

export { z, z as zeros };
