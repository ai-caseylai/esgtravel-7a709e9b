
<template>
 <!-- <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/helloworld">Hello World</router-link> |
    <router-link to="/signup">Signup</router-link>
  </div>-->
  
<router-view v-slot="{ Component }">
  <transition name="route" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
<!--

  <teleport to="modals" v-if="showModal">
   <div v-if="showModal">
   <Modal :header="header" :text="text" theme="sale" @closeme="toggleModal" />
    <Modal theme="" @closeme="toggleModal">
      <template v-slot:links>
        <a href="#">sign up </a>
        <a href="#">more info </a>
        <div>
          <h1>aaaaaaa</h1>
          <p>bbbbbbb</p>
        </div>
      </template>
    </Modal>
 </div>
</teleport>


  <div v-if="showModalTwo">
   <Modal :header="header" :text="text" theme="sale" @closeme="toggleModal" />
    <Modal @closeme="toggleModalTwo">
      <h1>ccccaaaac</h1>
      <p>dddddaaaa</p>
      <p>xxxxxxaaa</p>
    </Modal>
  </div>
  
  <div>
    <button @click.shift="toggleModal">Click me</button>
    <button @click="toggleModalTwo">Click me Two</button>
  </div>
  
  <div>  
    <button @click="toggleLayer">Click me!</button>  
    <div v-if="showLayer" class="layer">  
      This is the rising layer.  
    </div>  
  </div>
    -->
</template>

<script>
import Modal from './components/Modal.vue';
export default {
  name: 'App',
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      showModalTwo: false,
      showLayer: false,  

    }
  },

}
</script>



