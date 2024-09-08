import { useEffect } from "react";

/**
 * Hook que detecta cuando el usuario hace clic fuera del elemento referenciado.
 * @param ref - Referencia al elemento que contiene el menú o componente.
 * @param handler - Función a ejecutar cuando se hace clic fuera del elemento.
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};
