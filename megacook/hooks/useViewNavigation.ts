import { useState } from 'react';

export const useViewNavigation = () => {
  const [currentView, setCurrentView] = useState(0);
  
  const nextView = () => {
    setCurrentView((prev) => {
      if (prev >= 3 && prev <= 5) return 0; // Si bottom view, retour à Front
      if (prev === 0) return 1; // Front -> Right
      if (prev === 1) return 6; // Right -> Back
      if (prev === 6) return 2; // Back -> Left
      if (prev === 2) return 0; // Left -> Front
      return 0;
    });
  };
  
  const prevView = () => {
    setCurrentView((prev) => {
      if (prev >= 3 && prev <= 5) return 0; // Si bottom view, retour à Front
      if (prev === 0) return 2; // Front -> Left
      if (prev === 2) return 6; // Left -> Back
      if (prev === 6) return 1; // Back -> Right
      if (prev === 1) return 0; // Right -> Front
      return 0;
    });
  };
  
  const bottomView = () => {
    setCurrentView(3); // FrontView -> BottomView
  };
  
  const bottomRightView = () => {
    setCurrentView(4); // RightView -> BottomRightView
  };
  
  const bottomLeftView = () => {
    setCurrentView(5); // LeftView -> BottomLeftView
  };
  
  const topView = () => {
    setCurrentView((prev) => {
      if (prev === 4) return 1; // BottomRight -> Right
      if (prev === 5) return 2; // BottomLeft -> Left
      return 0; // BottomFront -> Front
    });
  };
  
  const backView = () => {
    setCurrentView(6); // Aller à BackView
  };

  return {
    currentView,
    nextView,
    prevView,
    bottomView,
    bottomRightView,
    bottomLeftView,
    topView,
    backView,
  };
};
