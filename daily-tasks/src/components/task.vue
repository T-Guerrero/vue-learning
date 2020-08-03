<template>
  <v-card
    class="mx-auto pa-1 d-flex flex-column justify-space-between"
    max-width="344"
    min-height="100%">
    <v-card-text>
      <div class="d-flex flex-wrap">
        <p class="px-2" v-for="(day, index) in task.days" :key="index">{{day}}</p>
      </div>
      <p class="display-1 text--primary">
        {{task.taskname}}
      </p>
      <p>{{NomeCompleto}}</p>
      <div class="text--primary">
          {{task.description}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="purple darken-1" @click="deleteTask">
        Completar tarefa
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        task: Object,
        id: Number
    },
    methods: {
        deleteTask(){
            this.$store.commit('removeTask', this.id);
        }
    },
    computed: {
        NomeCompleto(){
            if (this.task.lastname)
                return this.task.firstname + ' ' + this.task.lastname;
            return this.task.firstname;
        }
    }
}
</script>
