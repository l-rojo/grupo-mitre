<template>
    <v-layout align-center justify-center>
        <v-card width="100%" height="100%">
            <v-card-title primary-title>
                <h4>Usuarios</h4>
            </v-card-title>
            <v-card-text>
                <template>
                    <div>
                        <v-toolbar flat color="white">
                            <v-spacer></v-spacer>
                            <!-- <v-divider
                                class="mx-2"
                                inset
                                vertical
                            ></v-divider> -->
                            <v-dialog
                                v-model="dialog" 
                                :overlay="false"
                                max-width="50%"
                                persistent
                                transition="dialog-transition"
                                v-on:keydown.esc="cancelar"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        class="white--text"
                                        v-bind="attrs"
                                        v-on="on"
                                        color="indigo"
                                        @click="nuevoUsuario=true"
                                    >
                                        <v-icon color="white">person_add_alt</v-icon> Nuevo Usuario
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-text>
                                        <v-card>
                                            <v-toolbar
                                            card
                                            color="primary"
                                            dark
                                            >
                                            <v-btn color="primary" @click="cancelar">
                                                <v-icon color="white">arrow_back</v-icon>
                                            </v-btn>
                                            <v-toolbar-title>{{ tituloModal }}</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" @click="guardarUsuario">
                                                <v-icon color="white">save</v-icon>
                                            </v-btn>
                                            </v-toolbar>
                                            <v-form>
                                            <v-text-field
                                                v-model="usuario.Nombre"
                                                label="Nombre"
                                                :disabled="!nuevoUsuario"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="usuario.Usuario"
                                                label="Usuario"
                                                :disabled="!nuevoUsuario"
                                            ></v-text-field>
                                            <v-divider></v-divider>
                                            <v-text-field
                                                v-model="usuario.Password"
                                                label="Password"
                                            ></v-text-field>
                                            <v-divider></v-divider>
                                            <v-select
                                                v-model="usuario.Rol"
                                                :items="Roles"
                                                item-text="Text"
                                                item-value="Value"
                                                label="Rol"
                                            ></v-select>
                                            <v-select
                                                v-model="usuario.IdPrestador"
                                                :items="Prestadores"
                                                item-text="Nombre"
                                                item-value="idPrestador"
                                                v-if="(usuario.Rol==3)"
                                                label="Prestador"
                                            ></v-select>    
                                            </v-form>
                                        </v-card>
                                        <!-- <p>{{Prueba}}</p> -->
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                        <v-data-table
                        :headers="headers"
                        :items="usuarios"
                        class="elevation-1"
                        >
                            <template v-slot:items="props">
                                <td>{{ props.item.Id }}</td>
                                <td>{{ props.item.Nombre }}</td>
                                <td>{{ props.item.Usuario }}</td>
                                <td>{{ props.item.Rol }}</td>
                                <td>{{ props.item.IdPrestador }}</td>
                                <!-- <td class="justify-center layout px-0">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(props.item)"
                                >
                                    manage_accounts
                                </v-icon>
                                <v-icon
                                    small
                                    @click="deleteItem(props.item)"
                                >
                                    delete
                                </v-icon>
                                </td> -->
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="ListarUsuarios">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </div>
                </template>
            </v-card-text>
        </v-card>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return{
            dialog: false,
            nuevoUsuario: false,
            Prestadores:[],
            usuarios:[],
            editedIndex: -1,
            headers: [
                { text: 'Id', align: 'left', value: 'Id' },
                { text: 'Nombre', value: 'Nombre' },
                { text: 'Usuario', value: 'Usuario' },
                { text: 'Rol', value: 'Rol' },
                { text: 'IdPrestador', value: 'IdPrestador' },
                // { text: 'Actions', value: 'name', sortable: false }
            ],
            Prueba:'',
            value: '',
            Roles:[{"Text":"Administrador","Value":1},{"Text":"GrupoMitre","Value":2} ,{"Text":"Prestador","Value":3}],
            usuario: {},

        }
    },
    created () {
        this.cargarPrestadores()
        this.ListarUsuarios()
    },
    computed: {
    	tituloModal () {
    		return (this.nuevoUsuario?'Nuevo Usuario':'Editar Usuario')
      	},
    },
    watch: {
		dialog (val) {
		    val || (false)
		},
    },
    methods: {
        cancelar(){
            this.dialog=false
            this.nuevoUsuario=false
            this.usuario=Object.assign({})
        },
        guardarUsuario(){
            var me = this
            if(me.usuario.Rol==1||me.usuario.Rol==2)
                me.usuario.IdPrestador=0
            const Condicion = this.usuarios.filter(function(element){
                return element.Usuario == me.usuario.Usuario;
            });
            //console.log(Condicion.length);
            if(Condicion.length==0){
                axios.post('usuarios/nuevoUsuario/', me.usuario).then(function (response) {
				    console.log(response.data)
                    //me.Prueba=response.data
                    me.cancelar();
                }).catch(function (error) {
                    console.log(error)
                })
            }
        },
        cargarPrestadores () {
			const me = this
			let header={"token": this.$store.state.token}
			let configuracion = {headers: header} 
			axios.get('facturacionmes/Prestadores',configuracion).then(function (response) {
				console.log(response.data)
				me.Prestadores = response.data
			}).catch(function (error) {
				console.log(error)
			})
        },
        ListarUsuarios(){
            const me = this
            axios.get('usuarios/Listar').then(function (response) {
				console.log(response.data)
				me.usuarios = response.data
			}).catch(function (error) {
				console.log(error)
			})
        },
        editItem (item) {
            this.editedIndex = this.usuarios.indexOf(item)
            this.usuario = Object.assign({}, item)
            this.dialog = true
        },
    }
}
</script>
<style lang="css">

</style>