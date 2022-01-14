<template>
  <div>
    <el-container>
      <el-aside width="240px" style="text-align:left">
          <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header>
            <headers></headers>
        </el-header>
        <el-main style="overflow:auto;background:rgb(240,242,245)">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "@/components/navLeft"
import Headers from "@/components/header"
export default {
    components:{
        NavLeft,Headers

    }
};
</script>

<style  scoped>
.el-header{
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-aside {
  background-color: #001529;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: calc(100vh - 100px);
}
</style>