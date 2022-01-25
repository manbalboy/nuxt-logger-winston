<template>
 <div>
   index
 </div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({$logger}) {
    throw new Error('error test message');
  }
}
</script>
