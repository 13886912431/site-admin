<template>
    <div class="error-page">
        <div class="img" :style="`background-image: url(${not_found});`"></div>
        <div class="content">
            <h1>404</h1>
            <div class="desc">抱歉，你访问的页面不存在</div>
            <div class="actions">
                <router-link to="/">
                    <el-button type="primary">返回首页</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import not_found from '@/assets/img/404.svg'
</script>

<style lang="scss" scoped>
.error-page {
    background: #f0f2f5;
    margin-top: -30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
        margin-right: 80px;
        height: 360px;
        width: 100%;
        max-width: 430px;
        background-repeat: no-repeat;
        background-position: left top;
        background-size: contain;
    }
    
    .content {
        h1 {
            color: #434e59;
            font-size: 72px;
            font-weight: 600;
            line-height: 72px;
            margin-bottom: 24px;
        }
        .desc {
            color: rgba(0, 0, 0, 0.45);
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 16px;
        }
    }
}
</style>
