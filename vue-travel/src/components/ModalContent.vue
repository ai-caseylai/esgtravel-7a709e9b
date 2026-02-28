<template>
    <div>
        <h2> {{  title }}</h2>
        <p>{{ msg }}</p>
        <button @click="isOpen = false">Close</button>
    </div>
</template>


<script>
export default{
    props:['title', 'temsgxt'],
    methods:{
        closeModal(){
            this.$emit('closeme');
        },
    }
}
</script>