<template lang="html">
    <div>
        <el-menu default-active="1" :collapse="true" style="float:left;height:700px;box-shadow:2px 0px 4px rgba(0, 0, 0, 0.04)">
            <el-menu-item index="1" @click="$router.push('/home')">
                <font-awesome-icon icon="home" size="lg"></font-awesome-icon>
                <span slot="title">BERANDA</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/user')">
                <font-awesome-icon icon="users" size="lg"></font-awesome-icon>
                <span slot="title">USER</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/log')">
                <font-awesome-icon icon="clock" size="lg"></font-awesome-icon>
                <span slot="title">LOG ABSENSI</span>
            </el-menu-item>
            <el-menu-item index="4" onclick="document.getElementById('logout-form').submit()">
                <font-awesome-icon icon="sign-out-alt" size="lg"></font-awesome-icon>
                <span slot="title">KELUAR</span>
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.el-card {
    border-radius: 0;
    border: none;
    box-shadow: none;
}
</style>
