import { Html } from '../lib/drei/index';
import DOMComponent from './ScreenContent';

export default function Screen () {
    return (
    <>
    <group position={[10, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <Html
          transform
          occlude
          position={[0, 0, 0.01]}
          style={{
            width: '300px',
            height: '300px',
            pointerEvents: 'auto',
            zIndex: 1,
          }}
        >
            <DOMComponent name="World" />
        </Html>
    </group>
    </>
    )
}