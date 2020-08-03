<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="purple darken-1"
          dark
          v-bind="attrs"
          v-on="on">
          Adicionar nova tarefa semanal
        </v-btn>
      </template>
      <v-card class="pa-4">
        <v-card-title>
          <span class="headline">Nova Tarefa</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nome*"
                v-model="firstname"
                :error-messages="FirstNameErrorMessage"
                required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Sobrenome" v-model="lastname" hint="(Opcional)"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nome da tarefa*" 
                v-model="taskname" 
                :error-messages="TaskNameErrorMessage"
                required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea outlined label="Descrição da tarefa" v-model="description" required></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']"
                  label="Dia da tarefa*"
                  :error-messages="DaysErrorMessage"
                  multiple
                  v-model="days"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="purple darken-1" dark @click="onSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      firstname: null,
      lastname: null,
      taskname: null,
      description: null,
      days: [],
      errors: {
        firstname: false,
        taskname: false,
        days: false
      }
    }),
    methods: {
      onSubmit(){
        this.errors.firstname = false;
        this.errors.taskname = false;
        this.errors.days = false
        if (this.firstname && this.taskname && this.days){
          this.dialog = false;
          let task = {
            firstname: this.firstname,
            lastname: this.lastname,
            taskname: this.taskname,
            description: this.description,
            days: this.days
          };
          this.$store.commit('addTask', task);
          this.firstname = null;
          this.lastname = null;
          this.taskname = null;
          this.description = null;
          this.days = [];
        }
        else{
          if (!this.firstname)this.errors.firstname = true;
          if (!this.taskname)this.errors.taskname = true;
          if (this.days.length <= 0)this.errors.days = true;
        }
      }
    },
    watch: {
      dialog: function (){
        this.errors.firstname = false;
        this.errors.taskname = false;
        this.errors.days = false;
      }
    },
    computed: {
      FirstNameErrorMessage(){
        return this.errors.firstname? "Nome não pode ser vazio":"";
      },
      TaskNameErrorMessage(){
        return this.errors.taskname? "Escolha um nome para a tarefa":"";
      },
      DaysErrorMessage(){
        return this.errors.days? "Escolha um dia":"";
      }
    }
  }
</script>