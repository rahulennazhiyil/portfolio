import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class ThreeModelsService {
  constructor() {}

  // Create Angular "A" logo shape
  createAngularLogo(size = 2): THREE.Mesh {
    const shape = new THREE.Shape();

    // Create Angular "A" shape
    shape.moveTo(0, size);
    shape.lineTo(-size * 0.8, -size);
    shape.lineTo(-size * 0.4, -size);
    shape.lineTo(0, size * 0.2);
    shape.lineTo(size * 0.4, -size);
    shape.lineTo(size * 0.8, -size);
    shape.closePath();

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshStandardMaterial({
      color: 0xdd0031, // Angular red
      emissive: 0xdd0031,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  // Create code symbols ({}, <>, [], etc.)
  createCodeSymbols(): THREE.Group {
    const group = new THREE.Group();
    const symbols = ['{', '}', '<', '>', '[', ']', '(', ')', ';', '=', '+', '-'];
    const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4, 0x10b981];

    symbols.forEach((symbol, i) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 128;
      canvas.height = 128;

      context.fillStyle = '#ffffff';
      context.font = 'bold 80px monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(symbol, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.8,
      });

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(2, 2, 1);

      // Random position
      sprite.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );

      group.add(sprite);
    });

    return group;
  }

  // Create Git branch visualization
  createGitBranches(): THREE.Group {
    const group = new THREE.Group();

    // Create commit nodes
    const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Main branch
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(i * 2 - 7, 0, 0);
      group.add(node);

      if (i > 0) {
        const points = [
          new THREE.Vector3((i - 1) * 2 - 7, 0, 0),
          new THREE.Vector3(i * 2 - 7, 0, 0),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x6366f1,
          opacity: 0.6,
          transparent: true,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
      }
    }

    // Feature branch
    const branchMaterial = nodeMaterial.clone();
    branchMaterial.color.setHex(0x8b5cf6);
    branchMaterial.emissive.setHex(0x8b5cf6);

    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(nodeGeometry, branchMaterial);
      node.position.set(i * 2 - 3, i * 0.5 + 1, 0);
      group.add(node);
    }

    return group;
  }

  // Create AI neural network
  createNeuralNetwork(): THREE.Group {
    const group = new THREE.Group();

    // Create layers
    const layers = [4, 6, 6, 3]; // nodes per layer
    const layerSpacing = 4;
    const nodeSpacing = 2;

    const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodes: THREE.Mesh[][] = [];

    layers.forEach((nodeCount, layerIndex) => {
      const layerNodes: THREE.Mesh[] = [];
      const startY = (-(nodeCount - 1) * nodeSpacing) / 2;

      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
          layerIndex * layerSpacing - (layers.length * layerSpacing) / 2,
          startY + i * nodeSpacing,
          0
        );
        group.add(node);
        layerNodes.push(node);
      }

      nodes.push(layerNodes);

      // Connect to previous layer
      if (layerIndex > 0) {
        const prevLayer = nodes[layerIndex - 1];
        layerNodes.forEach((node) => {
          prevLayer.forEach((prevNode) => {
            const points = [prevNode.position, node.position];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0x6366f1,
              opacity: 0.2,
              transparent: true,
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
          });
        });
      }
    });

    return group;
  }

  // Create floating particles with gradient colors
  createGradientParticles(count = 500): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x6366f1); // Indigo
    const color2 = new THREE.Color(0x8b5cf6); // Purple
    const color3 = new THREE.Color(0xec4899); // Pink

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Gradient color based on position
      const t = Math.random();
      const color = t < 0.33 ? color1 : t < 0.66 ? color2 : color3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  }
}
