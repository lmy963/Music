<template>
    <div class="m-header">Music</div>
</template>
<script>
  export default{
    name:"m-header"
  }

</script>
<style lang="less" scoped>
  @import '../../../common/style/index.less';
  .m-header{
    .w(375);
    .h(44);
    text-align: center;
    .l-h(44);
    color:@font-color-header;
    font-size:@f-s-ms;

  }
</style>
