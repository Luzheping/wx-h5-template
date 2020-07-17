<template>
  <div class='select-date'>
    <div class="item mrt-10" @click="openPicker">
      <span>{{text}}</span>
      <span class="arrow-bottom"></span>
    </div>
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleOk">
    </mt-datetime-picker>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'selectDate',
  data() {
    return {
      text: moment().format('YYYY-MM-DD'),
      pickerValue: new Date() // picker过渡存储
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open()
    },
    handleOk() {
      let vm = this
      vm.text = moment(vm.pickerValue).format('YYYY-MM-DD')
      vm.$emit('handleSure', vm.text)
    }
  }
}
</script>

<style scoped lang='less'>
.select-date {
  .item {
    float: left;
    clear: both;
    margin-bottom: 23px;
    width: 336px;
    height: 50px;
    line-height: 50px;
    border: 1px solid rgba(243, 243, 244, 1);
    border-radius: 2px;
    padding: 0 20px;
    position: relative;
  }
  /* 向下的箭头 */
  .arrow-bottom {
    font-size: 0;
    line-height: 0;
    border-width: 6px;
    border-color: #c3c6d3;
    border-bottom-width: 0;
    border-style: dashed;
    border-top-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
