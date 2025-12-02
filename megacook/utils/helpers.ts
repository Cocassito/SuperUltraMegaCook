export const getRandomItems = <T,>(items: T[], count: number = 3): T[] => {
  const copie = [...items];
  return copie.sort(() => Math.random() - 0.5).slice(0, count);
};