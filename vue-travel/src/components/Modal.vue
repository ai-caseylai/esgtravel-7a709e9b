<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{ sale: theme === 'sale' }">
            <h1>{{ header }}</h1>
            <p>{{ text}}</p>
            <p>modal view</p>
            <slot>default content</slot>
            <div class="actions">
                
                <slot name="links"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['header', 'text', 'theme'],
    methods:{
        closeModal(){
            this.$emit('closeme');
        },
    }
}

</script>

<style>
    .modal{
        width: 400px;
        padding: 50px;
        margin: 100px auto;
        background: red;
        border-radius: 10px;
    }
    .backdrop{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .modal h1{
        color: #03cfb4;
        border: none;
        padding: 0; 
    }
    .modal p{
        font-style: normal;
    }
    .modal .actions{
        text-align: center;
        margin: 30px 0 10px 0;
        color: #333;
    }
    .modal .actions a{
        margin: 10px;
        color: #333;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        border:1px solid #eee;
    }
    .modal.sale{
        background: crimson;
        color: white
    }
    .modal.sale h1{
        color: white;
    }
    .modal.sale .actions{
        color: white;
    }
    .modal.sale .actions a{
        color: white;
    }
</style>