export default  {
    tooltip: {},
    visualMap: {
        show: false,
        min: 0.1,
        max: 4,
        inRange: {
            color: ['#010103', '#2f490c', '#b0b70f', '#fdff44', '#fff']
        }
    },
    xAxis3D: {
        type: 'value'
    },
    yAxis3D: {
        type: 'value'
    },
    zAxis3D: {
        type: 'value',
        min: -6,
        max: 6
    },
    grid3D: {
        show: false,
        environment: '#000',
        viewControl: {
            distance: 100
        },
        postEffect: {
            enable: true,
            FXAA: {
                enable: true
            }
        },
        light: {
            main: {
                shadow: true,
                intensity: 10,
                quality: 'high'
            },
            ambientCubemap: {
                texture: 'data-gl/asset/canyon.hdr',
                exposure: 0,
                diffuseIntensity: 0.2
            }
        }
    },
    series: [{
        type: 'bar3D',
        silent: true,
        shading: 'lambert',
        data: [],
        barSize: 1,
        lineStyle: {
            width: 4
        },
        // animation: false,
        animationDurationUpdate: 100
    }]
}