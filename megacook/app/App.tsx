import Scene from "@/components/Scene";
import React, { useState } from "react";
import { LoadingScreen } from "@/components/loadingScreen/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Scene onSceneReady={() => setIsLoading(false)} />
    </>
  );
}
