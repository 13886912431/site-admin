import { debounce } from 'lodash';

export default {
    data() {
        return {
            $_resizeHandler: null
        };
    },
    mounted() {
        this.$_initListener();
    },
    beforeUnmount() {
        this.$_destroyListener();
    },
    methods: {
        $_initListener() {
            this.$_resizeHandler = debounce(() => {
                this.$_resize();
            }, 300);
            window.addEventListener('resize', this.$_resizeHandler);
        },
        $_destroyListener() {
            window.removeEventListener('resize', this.$_resizeHandler);
            this.$_resizeHandler = null;
        },
        $_resize() {
            const { chart } = this;
            chart && chart.resize();
        }
    }
};
