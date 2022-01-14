export default {
    data() {
        return {
            breadList: [] // 路由集合
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {

        getBreadcrumb() {
            this.breadList=this.$route.meta.bread?this.$route.meta.bread:[]
        }
    },
    created() {
        this.getBreadcrumb();
    }
};