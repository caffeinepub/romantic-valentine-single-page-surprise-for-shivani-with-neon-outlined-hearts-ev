import { useRef, useState, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useEvasiveButton(yessButtonRef: RefObject<HTMLButtonElement | null>) {
  const [position, setPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEvade = useCallback((e: React.MouseEvent | React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    
    const button = buttonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate safe boundaries (with padding)
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - buttonWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - buttonHeight - padding;

    // Get yess button safe zone
    let safeZone: DOMRect | null = null;
    if (yessButtonRef.current) {
      safeZone = yessButtonRef.current.getBoundingClientRect();
    }

    // Generate random position avoiding the safe zone
    let newX: number;
    let newY: number;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      newX = Math.random() * (maxX - minX) + minX;
      newY = Math.random() * (maxY - minY) + minY;
      attempts++;
    } while (
      attempts < maxAttempts && 
      (isNearCenter(newX, newY, viewportWidth, viewportHeight, buttonWidth, buttonHeight) ||
       (safeZone && overlapsWithSafeZone(newX, newY, buttonWidth, buttonHeight, safeZone)))
    );

    setPosition({ x: newX, y: newY });
  }, [yessButtonRef]);

  // Helper to avoid placing button too close to center
  const isNearCenter = (
    x: number,
    y: number,
    vw: number,
    vh: number,
    bw: number,
    bh: number
  ): boolean => {
    const centerX = vw / 2;
    const centerY = vh / 2;
    const buttonCenterX = x + bw / 2;
    const buttonCenterY = y + bh / 2;
    
    // Keep at least 250px away from center
    const distance = Math.sqrt(
      Math.pow(buttonCenterX - centerX, 2) + Math.pow(buttonCenterY - centerY, 2)
    );
    
    return distance < 250;
  };

  // Helper to check if button overlaps with safe zone (yess button area)
  const overlapsWithSafeZone = (
    x: number,
    y: number,
    bw: number,
    bh: number,
    safeZone: DOMRect
  ): boolean => {
    const padding = 50; // Extra padding around yess button
    
    return !(
      x + bw < safeZone.left - padding ||
      x > safeZone.right + padding ||
      y + bh < safeZone.top - padding ||
      y > safeZone.bottom + padding
    );
  };

  return { position, handleEvade, buttonRef };
}
