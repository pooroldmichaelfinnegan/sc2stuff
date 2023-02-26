import { useState, useEffect } from 'react'
// import './App.css'
import * as THREE from 'three'

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'
import abys from '../../a.json'

export default function App() {
  useEffect(() => {
    const canvas = document.getElementById("three") || undefined
    var renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
  
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    
    const Y: number = abys.placement_grid.size.y
    const X: number = abys.placement_grid.size.x
    const data = abys.placement_grid.data
    // const Y: number = 3 // abys.placement_grid.size.y
    // const X: number = 3 // abys.placement_grid.size.x
    // const data = [0, 0, 0, 0, 1, 0, 0, 0, 0] // abys.placement_grid.data
    let index: number = 0
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        if (!data[index]) continue
        const geo = new THREE.BoxGeometry(1, 1, 1)
        const mat = new THREE.MeshBasicMaterial({ color: data[index] ? 0x00FF00 : 0xFF0000 })
        const msh = new THREE.Mesh(geo, mat)
        
        msh.position.set(x, y, 0)
        scene.add(msh)
        index++
      }
    }


    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = false;
  
    camera.position.z = 500
  
  
    function animate() {
      requestAnimationFrame( animate )

      renderer.render( scene, camera )
    }

    animate()
  
  }, [])

  return (
    <div className="App">
      <canvas id="three" />
    </div>
  )
}
