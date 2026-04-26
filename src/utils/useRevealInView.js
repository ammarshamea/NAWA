import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Reveal state that stays "shown" after the first time in view, so changing
 * locale / layout does not replay scroll-triggered animations like whileInView.
 */
export function useRevealInView(viewport) {
  const ref = useRef(null);
  const inView = useInView(ref, viewport);
  return { ref, inView };
}
