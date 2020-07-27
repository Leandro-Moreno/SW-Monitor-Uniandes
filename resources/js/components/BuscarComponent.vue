<template>
    <div class="buscar">

        <div class="input-group no-border">
            <input type="text" class="form-control" placeholder="Buscar" v-model="query">
                <i class="material-icons">search</i>
        </div>
        <ul v-if="results.length > 0 && query">
            <li v-for="result in results.slice(0,10)" :key="result.id">
                <a :href="result.url">
                    <div class="dropdown-item" v-text="result.title"></div>
                </a>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                query: null,
                results: []
            }
        },
        watch: {
            query(after, before) {
                this.searchMembers();
            }
        },
        methods: {
            searchMembers() {
                axios.get('/buscar', { params: { query: this.query } })
                    .then(response => this.results = response.data)
                    .catch(error => {});
            }
        }
    }
</script>
