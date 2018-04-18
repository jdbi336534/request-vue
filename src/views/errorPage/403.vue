<!-- err page 404 -->
<template>
    <div>
        <exception :code="403" />
    </div>
</template>
<script>
import Exception from '@/components/Exception';
export default {
    components: {
        Exception
    },
    name: 'Error403'
};
</script>
