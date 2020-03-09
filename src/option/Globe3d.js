export default {
    backgroundColor: '#000',
    globe: {
        baseTexture: "/static/world.topo.bathy.200401.jpg",
        heightTexture: "/static/world.topo.bathy.200401.jpg",
        displacementScale: 0.04,
        shading: 'realistic',
        environment: '/static/asset/starfield.jpg',
        realisticMaterial: {
            roughness: 0.9
        },
        postEffect: {
            enable: true
        },
        light: {
            main: {
                intensity: 5,
                shadow: true
            },
            ambientCubemap: {
                texture: '/static/pisa.hdr',
                diffuseIntensity: 0.2
            }
        }
    }
}
