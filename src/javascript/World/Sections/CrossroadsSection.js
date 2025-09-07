import * as THREE from 'three'

export default class CrossroadsSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setStatic()
        this.setTiles()
    }

    setStatic()
    {
        // this.objects.add({
        //     base: new THREE.Group(),
        //     collision: new THREE.Group(),
        //     floorShadowTexture: this.resources.items.projectsBonhomme10ansFloorTexture,
        //     offset: new THREE.Vector3(this.x, this.y, 0),
        //     mass: 0
        // })

        // this.objects.add({
        //     base: this.resources.items.crossroadsStaticFlag.scene,
        //     offset: new THREE.Vector3(this.x, this.y, 0),
        //     mass: 0
        // })
    }

    setTiles()
    {
        // To intro
        this.tiles.add({
            start: new THREE.Vector2(this.x, - 10),
            delta: new THREE.Vector2(0, this.y + 14)
        })

        this.tiles.add({
            start: new THREE.Vector2(this.x, - 22),
            delta: new THREE.Vector2(0, this.y + 14)
        })

         this.tiles.add({
            start: new THREE.Vector2(this.x, - 34),
            delta: new THREE.Vector2(0, this.y + 14)
        })

         this.tiles.add({
            start: new THREE.Vector2(this.x, - 46),
            delta: new THREE.Vector2(0, this.y + 14)
        })
         this.tiles.add({
            start: new THREE.Vector2(this.x, - 58),
            delta: new THREE.Vector2(0, this.y + 14)
        })

        this.tiles.add({
            start: new THREE.Vector2(this.x, - 70),
            delta: new THREE.Vector2(0, this.y + 14)
        })

        this.tiles.add({
            start: new THREE.Vector2(this.x, - 82),
            delta: new THREE.Vector2(0, this.y + 14)
        })

        // To projects
        // this.tiles.add({
        //     start: new THREE.Vector2(this.x + 12.5, this.y),
        //     delta: new THREE.Vector2(7.5, 0)
        // })

        // To projects
        this.tiles.add({
            start: new THREE.Vector2(this.x - 13, this.y),
            delta: new THREE.Vector2(- 6, 0)
        })
        this.tiles.add({
            start: new THREE.Vector2(this.x - 7, this.y),
            delta: new THREE.Vector2(- 6, 0)
        })
        this.tiles.add({
            start: new THREE.Vector2(this.x - 1, this.y),
            delta: new THREE.Vector2(- 6, 0)
        })
    }
}
