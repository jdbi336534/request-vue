<!-- err page 404 -->
<template>
    <div>
        <exception :code="404" />
    </div>
</template>
<script>
import Exception from '@/components/Exception';
export default {
    components: {
        Exception
    },
    name: 'Error404'
};
</script>
