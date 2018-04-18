<!-- err page 404 -->
<template>
    <div>
        <exception :code="500" />
    </div>
</template>
<script>
import Exception from '@/components/Exception';
export default {
    components: {
        Exception
    },
    name: 'Error500'
};
</script>
