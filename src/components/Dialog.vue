<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <span>{{dialogMsg}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {inject} from 'vue'
export default {
  name:'Dialog',

  setup() {
    const dialogVisible = inject("isShow")
    const dialogMsg = inject("msg")
    const handleClose = (done) => {
      done()
    }
    return {
      dialogVisible,
      handleClose,
      dialogMsg
    }
  },
}
</script>
