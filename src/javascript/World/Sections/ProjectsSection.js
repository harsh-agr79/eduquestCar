import * as THREE from 'three'
import Project from './Project'
import gsap from 'gsap'

export default class ProjectsSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.camera = _options.camera
        this.passes = _options.passes
        this.objects = _options.objects
        this.areas = _options.areas
        this.zones = _options.zones
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('projects')
            this.debugFolder.open()
        }

        // Set up
        this.items = []

        this.interDistance = 24
        this.positionRandomess = 5
        this.projectHalfWidth = 9

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setGeometries()
        this.setMeshes()
        this.setList()
        this.setZone()

        // Add all project from the list
        for(const _options of this.list)
        {
            this.add(_options)
        }
    }

    setGeometries()
    {
        this.geometries = {}
        this.geometries.floor = new THREE.PlaneGeometry(16, 8)
    }

    setMeshes()
    {
        this.meshes = {}

        // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
        this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter
        this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter
        this.meshes.boardPlane = this.resources.items.projectsBoardPlane.scene.children[0]
        this.meshes.areaLabel = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaOpenTexture }))
        this.meshes.areaLabel.matrixAutoUpdate = false
    }

    setList()
    {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get("user") || "";
        this.list = [
            {
                name: 'Three.js Journey',
                imageSources:
                [
                    './models/projects/threejsJourney/slideB.jpeg',
                    // './models/projects/threejsJourney/slideB.webp',
                    // './models/projects/threejsJourney/slideC.webp',
                    // './models/projects/threejsJourney/slideD.webp'
                ],
                floorTexture: this.resources.items.projectsThreejsJourneyFloorTexture,
                link:
                {
                    href: '#',
                    x: 0,
                    y: 2000,
                    halfExtents:
                    {
                        x: 0,
                        y: 0,
                    }
                },
                // distinctions:
                // [
                //     { type: 'fwa', x: 3.95, y: 4.15 }
                // ]
            },
            {
                name: 'Chartogne Taillet',
                imageSources:
                [
                    './models/projects/chartogne/slideA.jpg',
                    // './models/projects/chartogne/slideB.jpg',
                    // './models/projects/chartogne/slideC.jpg'
                ],
                floorTexture: this.resources.items.projectsPhysicsStudyFloorTexture,
                link:
                {
                    href: 'https://chartogne-taillet.com',
                    x: - 4.8,
                    y: - 3.3,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                // distinctions:
                // [
                //     { type: 'awwwards', x: 3.95, y: 4.15 },
                //     { type: 'fwa', x: 5.6, y: 4.15 },
                //     { type: 'cssda', x: 7.2, y: 4.15 }
                // ]
            },
            {
                name: 'Bonhomme | 10 ans',
                imageSources:
                [
                    './models/projects/physics/esc.png',
                ],
                floorTexture: this.resources.items.projectsEscRoomFloorTexture,
                link:
                {
                    href: 'https://eduquest-chi.vercel.app/escaperoom/physics',
                    x: - 4.8,
                    y: - 2,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                [
                    
                ]
            },
            {
                name: 'Luni.app',
                imageSources:
                [
                    './models/projects/physics/clif.png'
                ],
                floorTexture: this.resources.items.projectsKnowClifFloorTexture,
                link:
                {
                    href: 'https://eduquest-chi.vercel.app/lessons',
                    x: - 4.8,
                    y: - 3,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                [
                    
                ]
            },
            {
                name: 'Madbox',
                imageSources:
                [
                    './models/projects/physics/rpg.png',
                ],
                floorTexture: this.resources.items.projectsRPGFloorTexture,
                link:
                {
                    href: 'https://mpo3.mypowerworld.com/rpgphysics/',
                    x: - 4.8,
                    y: - 4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                [
                   
                ]
            },
            {
                name: 'Scout',
                imageSources:
                [
                    './models/projects/physics/fpsb.png',
                ],
                floorTexture: this.resources.items.projectsFPSFloorTexture,
                link:
                {
                    href: "https://mpo3.mypowerworld.com/?fps=1&" + (userParam ? `user=${userParam}` : ""),
                    x: - 4.8,
                    y: - 2,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                [
                ]
            }
        ]
    }

    setZone()
    {
        const totalWidth = this.list.length * (this.interDistance / 2)

        const zone = this.zones.add({
            position: { x: this.x + totalWidth - this.projectHalfWidth - 6, y: this.y },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: 'projects' }
        })

        zone.on('in', (_data) =>
        {
            this.camera.angle.set(_data.cameraAngle)
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: 0, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: 0, duration: 2 })
        })

        zone.on('out', () =>
        {
            this.camera.angle.set('default')
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: this.passes.horizontalBlurPass.strength, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: this.passes.verticalBlurPass.strength, duration: 2 })
        })
    }

    add(_options)
    {
        const x = 10 + this.items.length * this.interDistance
        let y = this.y
        if(this.items.length > 0)
        {
            y += (Math.random() - 0.5) * this.positionRandomess
        }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options
        })

        this.container.add(project.container)

        // Add tiles
        if(this.items.length >= 1)
        {
            const previousProject = this.items[this.items.length - 1]
            const start = new THREE.Vector2(previousProject.x + this.projectHalfWidth, previousProject.y)
            const end = new THREE.Vector2(project.x - this.projectHalfWidth, project.y)
            const delta = end.clone().sub(start)
            this.tiles.add({
                start: start,
                delta: delta
            })
        }

        // Save
        this.items.push(project)
    }
}
