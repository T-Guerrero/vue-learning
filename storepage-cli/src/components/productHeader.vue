<template>
  <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
</template>

<script>
export default {
    props: {
        brand: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.name;
        }
    }
}
</script>