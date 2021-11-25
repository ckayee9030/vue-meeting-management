<template>
    <div style="background:#f0f2f5;margin-top: -20px;height:100%;">
        <div class="wscn-http404">
            <div class="pic-404"></div>
            <div class="bullshit">
                <div class="bullshit__headline">{{ message }}</div>
                <div class="bullshit__info">请检查您输入的网址是否正确</div>
                <a @click="backToHome" class="bullshit__return-home">返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page404',
    data() {
        return {
            message:''
        }
    },
    methods: {
        backToHome() {
            this.$router.push('/')
        }
    },
    computed: {
        message() {
            return '找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面找不到页面'
        }
    }
}
</script>
<style  scoped>

</style>
