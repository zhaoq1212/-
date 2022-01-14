<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-bottom:20px">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input placeholder="产品名称" v-model.trim="searchValue" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="searchValue" placeholder="利率" style="width:100%">
            <el-option label="3.8%" value="shanghai">3.8</el-option>
            <el-option label="3.9%" value="beijing">3.9</el-option>
            <el-option label="4.1%" value="beijing">4.1</el-option>
            <el-option label="4.3%" value="beijing">4.3</el-option>
          </el-select>
        </el-col>
        <el-col :span="6" >
          <el-date-picker
            v-model="searchValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:100%"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">重置</el-button>
          <span class="el-dropdown-link" @click="expand" v-show="!advanced">
            展开
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span class="el-dropdown-link" @click="expand" v-show="advanced">
            收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="advanced" style="margin-top:20px">
        <el-col :span="6">
          <el-input placeholder="产品类别" v-model.trim="searchValue" />
        </el-col>
        <el-col :span="6">
          <el-input placeholder="最高分期数" v-model.trim="searchValue" />
        </el-col>
        <el-col :span="6">
          <el-input placeholder="状态" v-model.trim="searchValue" />
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="产品类别"></el-table-column>
        <el-table-column prop="rate" label="利率"></el-table-column>
        <el-table-column prop="date" label="开放日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1" effect="dark">已启用</el-tag>
            <el-tag type="danger" v-else effect="dark">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="highest" label="最高分期数(月)"></el-table-column>
        <el-table-column prop="number" label="申请客户数量"></el-table-column>
        <el-table-column prop="total" label="累计签约金额"></el-table-column>
        <el-table-column prop="average" label="件均"></el-table-column>

        <el-table-column prop="remark" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==2" type="primary" @click="handleEdit(scope.row)">启用</el-button>
            <el-button v-else type="danger" @click="handleDelete(scope.row.account)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import breadCrumb from "@/mixins/breadCrumb.js";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      advanced: false,
      tableData: [],
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      get("/productList").then((res) => {
        console.log(12, res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    expand() {
      this.advanced = !this.advanced;
    },
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 10px;
}
</style>