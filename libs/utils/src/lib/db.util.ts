export const numericTransformer = {
  to: (value: number): number | null => (value !== null ? value : null),
  from: (value: string | null): number | null => (value !== null ? parseFloat(value) : null),
};
