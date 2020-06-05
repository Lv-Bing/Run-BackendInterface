 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="signin"
        label="签到">
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            signin: '已签到'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            signin: '未签到'
          }, {
            date: '2016-05-01',
            name: '王小虎',
           signin: '未签到'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            signin: '未签到'
          }]
        }
      }
    }
  </script>