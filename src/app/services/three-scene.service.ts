import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { ThreeModelsService } from './three-models.service';

@Injectable({
  providedIn: 'root',
})
export class ThreeSceneService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private animationId: number | null = null;
  private mouse = { x: 0, y: 0 };
  private targetRotation = { x: 0, y: 0 };
  private currentRotation = { x: 0, y: 0 };

  constructor(private modelsService: ThreeModelsService) {}

  initScene(container: ElementRef<HTMLDivElement>) {
    const width = container.nativeElement.offsetWidth;
    const height = container.nativeElement.offsetHeight;

    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 30;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.nativeElement.appendChild(this.renderer.domElement);

    // Create gradient particles
    this.particles = this.modelsService.createGradientParticles(800);
    this.scene.add(this.particles);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);

    // Start animation
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize(container));

    console.log('✅ Three.js scene initialized with themed models');
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    // Smooth mouse follow
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x = this.currentRotation.x * 0.2;
      this.particles.rotation.y = this.currentRotation.y * 0.2;
      this.particles.rotation.z += 0.0003;
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  };

  onMouseMove(event: MouseEvent, container: ElementRef<HTMLDivElement>) {
    const rect = container.nativeElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetRotation.x = this.mouse.y * Math.PI * 0.5;
    this.targetRotation.y = this.mouse.x * Math.PI * 0.5;
  }

  onScroll(scrollY: number) {
    if (this.particles) {
      this.particles.position.y = scrollY * 0.03;
    }
  }

  private onWindowResize(container: ElementRef<HTMLDivElement>) {
    const width = container.nativeElement.offsetWidth;
    const height = container.nativeElement.offsetHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }
    console.log('🛑 Three.js scene destroyed');
  }
}
