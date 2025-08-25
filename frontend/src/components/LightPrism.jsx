import React, { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { TextureLoader } from 'three'

// Load your GIF
import prismGif from '/src/assets/prism.gif'

function PrismImage() {
  const texture = useLoader(TextureLoader, prismGif)
  const ref = useRef()

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

export default function PrismScene() {
  return (
    <img src="/src/assets/prism.gif" style={{height:"50%"}}></img>
  )
}
