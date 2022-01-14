<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card class="wrap">
        <div slot="header" class="clearfix">
          <h2 style="text-align:center">蚂蚁金融后台管理系统</h2>
        </div>
        <el-col>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {post} from "@/utils/http"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          post("/login",this.ruleForm).then((res)=>{
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("nickname",res.nickname);
            this.$router.push("/index")
          })
          //发送请求提交表单
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style  scoped>
.wrap {
  width: 500px;
  margin-top: 200px;
}
</style>