const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.65, ease: 'easeOut' } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -52 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 52 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
};

export const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

export const containerFast = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
