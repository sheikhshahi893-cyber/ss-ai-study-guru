// Mathematical & Science Utilities for S.S AI Study Guru

export interface FormulaItem {
  id: string;
  subject: "math" | "physics" | "chemistry";
  title: string;
  formula: string;
  explanation: string;
  variables: { symbol: string; meaning: string }[];
}

export const formulaCollection: FormulaItem[] = [
  {
    id: "quad_1",
    subject: "math",
    title: "Quadratic Equation Formula",
    formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    explanation: "Used to find the roots of any quadratic equation of the standard form ax² + bx + c = 0.",
    variables: [
      { symbol: "a, b, c", meaning: "Coefficients of the polynomial terms" },
      { symbol: "b² - 4ac", meaning: "Discriminant (determines real/imaginary roots)" },
    ],
  },
  {
    id: "pyth_2",
    subject: "math",
    title: "Pythagorean Theorem",
    formula: "a^2 + b^2 = c^2",
    explanation: "Relates the three sides of a right-angled triangle.",
    variables: [
      { symbol: "a, b", meaning: "Perpendicular and Base legs" },
      { symbol: "c", meaning: "Hypotenuse (longest side opposite 90° angle)" },
    ],
  },
  {
    id: "newton_3",
    subject: "physics",
    title: "Newton's Second Law of Motion",
    formula: "F = m \\cdot a",
    explanation: "The force applied to an object equals its mass multiplied by acceleration.",
    variables: [
      { symbol: "F", meaning: "Net Force (in Newtons)" },
      { symbol: "m", meaning: "Mass of the object (in kg)" },
      { symbol: "a", meaning: "Acceleration (in m/s²)" },
    ],
  },
  {
    id: "kinetic_4",
    subject: "physics",
    title: "Kinetic Energy Formula",
    formula: "KE = \\frac{1}{2} m v^2",
    explanation: "Energy possessed by an object due to its motion.",
    variables: [
      { symbol: "m", meaning: "Mass (kg)" },
      { symbol: "v", meaning: "Velocity (m/s)" },
    ],
  },
  {
    id: "gas_5",
    subject: "chemistry",
    title: "Ideal Gas Equation",
    formula: "PV = nRT",
    explanation: "Equation of state of a hypothetical ideal gas.",
    variables: [
      { symbol: "P", meaning: "Pressure (atm/Pa)" },
      { symbol: "V", meaning: "Volume (L/m³)" },
      { symbol: "n", meaning: "Amount of substance (moles)" },
      { symbol: "R", meaning: "Universal gas constant (8.314 J/mol·K)" },
      { symbol: "T", meaning: "Absolute temperature (Kelvin)" },
    ],
  },
];

export function solveQuadratic(a: number, b: number, c: number) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { type: "two_real", root1, root2, discriminant };
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    return { type: "one_real", root1: root, root2: root, discriminant };
  } else {
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * a);
    return { type: "complex", realPart, imagPart, discriminant };
  }
}
