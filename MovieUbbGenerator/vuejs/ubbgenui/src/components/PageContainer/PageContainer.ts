import clsx from "clsx";
import { computed, defineComponent, h } from "vue";

export default defineComponent({
    name: 'PageContainer',
    props: {},
    setup(props) {
        const computedClass = computed(() => {
            return clsx(
                'page',
                'container'
            )
        })

        return { computedClass }
    },
    render() {
        return h('div', { class: this.computedClass }, this.$slots.default?.())
    }
})