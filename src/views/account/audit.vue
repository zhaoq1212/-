<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row  style="margin-bottom:20px">
      <el-col :span="8">
        <el-input placeholder="手机号、姓名、角色类型" v-model.trim="searchValue">
          <el-button slot="append" icon="el-icon-search" v-on:click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8" :offset="8" style="text-align:right">
        <el-button type="primary" @click="create">新建角色</el-button>
        <el-button :disabled="!selected.length" @click="operate(1)">启动</el-button>
        <el-button :disabled="!selected.length" @click="operate(2)">冻结</el-button>
        <el-button :disabled="!selected.length" @click="operate(3)">删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="account" label="账户"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="character" label="角色"></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reason" label="创建原因"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status==1?"已启用":"未启用"}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.account)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建角色" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="forms">
        <el-form-item label="角色" label-width="100px" prop="character">
          <el-select v-model="form.character" placeholder="请选择角色" style="width:100%">
            <el-option label="业务人员" value="1"></el-option>
            <el-option label="审核人员" value="2"></el-option>
            <el-option label="风控经理" value="3"></el-option>
            <el-option label="管理员" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="100px" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建原因" label-width="100px" prop="reason">
          <el-input type="textarea" v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import breadCrumb from "@/mixins/breadCrumb.js"
export default {
  mixins:[breadCrumb],
  data() {
    return {
        selected:[],
      searchValue: "",
      form: {
        character: "",
        remark: "",
        reason: "",
      },
      dialogFormVisible: false,
      tableData: [],
      total: "",
      rules: {
        character: [
          { required: true, message: "请选择角色", trigger: "change" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        reason: [
          { required: true, message: "请输入创建原因", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      get("/all").then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    //编辑
    handleEdit(data) {
      this.dialogFormVisible = true;
      this.form = {
        character: data.character,
        remark: data.remark,
        reason: data.reason,
      };
    },
    //新增
    create(){
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
            this.$refs["forms"].resetFields();
        })
    },
    //删除
    handleDelete(account) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: `账户${account}已成功删除`,
          });
          this.list();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //搜索
    search() {
      this.$message({
        showClose: true,
        message: `您的搜索内容是${this.searchValue}`,
      });
    },
    //操作
    operate(type) {
      let counts = this.selected.map((item) => item.account);
      this.$message.success(
        `账户${counts}已被${type == 1 ? "启动" : type == 2 ? "冻结" : "删除"}`
      );
      this.list();
    },
    handleSelectionChange(selection){
        this.selected=selection
    },
    onOk() {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          console.log(this.form.character);
          this.$message.success("创建成功");
          this.list();
          this.dialogFormVisible = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>