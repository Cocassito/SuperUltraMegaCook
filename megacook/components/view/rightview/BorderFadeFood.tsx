import BorderFadeShader from "@/components/shaders/borderFadeShader/BorderFadeShader"

export const BorderFadeFood = () => {
  return (
    <>
      <BorderFadeShader
        position={[18, 0.6, 13]} 
        rotation={[Math.PI / 2, 0, 0]}
        planeSize={[4.0, 4.0]}
      />
      <BorderFadeShader
        position={[18, 0.6, 18]} 
        rotation={[Math.PI / 2, 0, 0]}
        planeSize={[4.0, 4.0]}
      />
      <BorderFadeShader
        position={[18, 0.6, 23]} 
        rotation={[Math.PI / 2, 0, 0]}
        planeSize={[4.0, 4.0]}
      />
    </>
  )
}