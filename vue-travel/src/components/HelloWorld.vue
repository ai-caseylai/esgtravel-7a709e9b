<template>
    <div class="page">
        <h1>Jobs</h1>
        {{ id }}
        <div v-for="job in jobs" :key="job.id">
            <h2>{{job.title}}</h2>
        </div>
    </div>
</template>

<script>

export default{
    
  props: ["id"],
    data(){
        return{
            jobs: [
                {id: 1, title: 'Web Developer', company: 'Google', location: 'Mountain View, CA'},
                {id: 2, title: 'Frontend Developer', company: 'Facebook', location: 'Menlo Park, CA'},
                {id: 3, title: 'Backend Developer', company: 'Amazon', location: 'Seattle, WA'},
                {id: 4, title: 'Fullstack Developer', company: 'Apple', location: 'Cupertino, CA'},
            ]
        }
    }
}
</script>
