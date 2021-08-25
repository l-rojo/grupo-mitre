<template>
    <v-layout align-center justify-center>
        <v-card width="100%" height="100%">
            <v-card-title primary-title>
                <h4>Usuarios</h4>
            </v-card-title>
            <v-card-text>
                <!-- <v-dialog
                    v-model="dialog" 
                    :overlay="false"
                    max-width="50%"
                    persistent
                    transition="dialog-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="white--text"
                            v-bind="attrs"
                            v-on="on"
                            color="indigo"
                            @click="nuevoUsuario=true"
                        >
                            <v-icon color="white">add</v-icon> Nuevo Usuario
                        </v-btn>
                        <v-btn
                            class="white--text"
                            v-bind="attrs"
                            v-on="on"
                            color="indigo"
                        >
                            <v-icon color="white">add</v-icon> Editar Usuario
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-card>
                                <v-toolbar
                                card
                                color="pink"
                                dark
                                >
                                <v-btn color="pink" @click="cancelar">
                                    <v-icon color="white">arrow_back</v-icon>
                                </v-btn>
                                <v-toolbar-title>{{ tituloModal }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn color="pink" @click="guardarUsuario">
                                    <v-icon color="white">send</v-icon>
                                </v-btn>
                                </v-toolbar>
                                <v-form>
                                <v-autocomplete
                                    v-model="selected"
                                    :items="[1,2,3]"
                                    chips
                                    label="To"
                                    full-width
                                    hide-details
                                    hide-no-data
                                    hide-selected
                                    multiple
                                    single-line
                                ></v-autocomplete>
                                 <v-autocomplete
                                    v-model="selected"
                                    :items="[1,2,3]"
                                    chips
                                    label="To"
                                    full-width
                                    hide-details
                                    hide-no-data
                                    hide-selected
                                    multiple
                                    single-line
                                ></v-autocomplete>
                                <v-divider></v-divider>
                                <v-text-field
                                    label="Subject"
                                    value="Plans for the weekend"
                                    single-line
                                    full-width
                                    hide-details
                                ></v-text-field>
                                <v-divider></v-divider>
                                <v-textarea
                                    v-model="title"
                                    label="Message"
                                    counter
                                    maxlength="120"
                                    full-width
                                    single-line
                                ></v-textarea>
                                </v-form>
                            </v-card>
                            <p>{{Prueba}}</p>
                        </v-card-text>
                    </v-card>
                </v-dialog> -->
            </v-card-text>
        </v-card>
    </v-layout>
</template>
<script>
// import axios from 'axios'
// export default {
//     data () {
//         return{
//             dialog: false,
//             nuevoUsuario: false,
//             Prueba:'',
//             value: ''
//         }
//     },
//     computed: {
//     	tituloModal () {
//     		return (this.nuevoUsuario?'Nuevo Usuario':'Editar Usuario')
//       	},
//     },
//     watch: {
// 		dialog (val) {
// 		    val || (false)
// 		},
//     },
//     methods: {
//         cancelar(){
//             this.dialog=false
//             this.nuevoUsuario=false
//             this.Prueba=''
//         },
//         guardarUsuario(){
//             var me = this
//             axios.put('usuarios/nuevoUsuario/', {HOla:'dahsjkdh',djakjd:12}).then(function (response) {
// 				console.log(response.data)
//                 me.Prueba=response.data
// 			}).catch(function (error) {
// 				console.log(error)
// 			})
//         },
//     }
// }
</script>
<style lang="css">

</style>