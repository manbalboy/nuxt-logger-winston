<template>
 <div>
   index
 </div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({$logger}) {
    $logger.error('error logger');
    $logger.alert('alert logger');
    $logger.access('access logger');
    $logger.warn('warn logger');
    $logger.info('info logger');
    $logger.debug('debug logger');
  }
}
</script>
