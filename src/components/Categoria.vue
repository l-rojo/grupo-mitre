<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
            <v-btn @click="listar()"><v-icon>wifi_protected_setup</v-icon> </v-btn>
                <v-toolbar-title>Entrega de anteojos U.P.C.N</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Nombre" label="Nombre"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Beneficiario" label="Documento"></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="guardar">Grabar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="afiliados"
                :search="search"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        done
                        </v-icon>
                        
                    </td>
                    <td>{{ props.item.Periodo }}</td>
                     <td class="text-xs-right">{{ props.item.Entrega }}</td>
                     <td class="text-xs-right">{{ props.item.Comprobante }}</td>
                     <td class="text-xs-right">{{ props.item.Beneficiario }}</td>
                     <td class="text-xs-right">{{ props.item.Nombre }}</td>
                     <td class="text-xs-right">{{ props.item.Titular }}</td>
                
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
     import axios from 'axios'
      import jsPDF from 'jspdf'
      import autoTable from 'jspdf-autotable';
      import html2cavas from 'html2canvas'
    export default {
        data(){
            return {
                afiliados:[],
                dialog: false,
                headers: [
                    { text: 'Entregar', value: 'Entregar', sortable: false },
                    { text: 'Periodo', value: 'Periodo', sortable: false },
                    { text: 'Nº Entrega', value: 'Entrega', sortable: false  },                   
                    { text: 'Comprobante', value: 'Comprobante' },
                    { text: 'Beneficiario', value: 'Beneficiario' },
                    { text: 'Nombre', value: 'Nombre' },
                    { text: 'Titular', value: 'Titular' },
                                ],
                search: '',
                desserts: [],
                editedIndex: 1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                Id:0,
                Beneficiario:'',
                Nombre:'',
                Entrega :0,
                valida:0,
                validaMensaje:[],
                IdEntrega:0
              
            }
        },
        computed: {
            formTitle () {
            return this.Entrega  === 0 ? 'Generar Entrega' : 'Anular Entrega'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            
            this.listar();

        },
        methods:{
            crearPDF2(){
               console.log("pdf")
                const doc = new jsPDF();
                var texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                doc.text(texto,10,50);
               // doc.text("Nuemro de documento"+ this.Beneficiario, 10, 50);
                doc.save("a4.pdf") 
            },
            crearPDF(){
                    
                      var doc = new jsPDF();
                      //this.IdEntrega=2;
                      const tempoTranscurrido = Date.now();
                      const hoy = new Date(tempoTranscurrido);
                       
                     console.log(hoy.toLocaleDateString());
                      const fecha = hoy.toLocaleDateString();
                       var logo = new Image();
                      
                     logo.src = require ('../assets/upcn.jpg');
                     doc.addImage(logo, 'JPEG', 10, 5, 50, 70);
                      doc.setFontSize(22);
                      doc.text(60, 50, 'Comprobante de entrega Nº 00000'+ this.IdEntrega);
                      doc.setFontSize(15);
                      doc.text(10, 80, 'El dia '+ fecha + ', se hace entrega de un par de anteojos sin cargo');
                      doc.text (10,90 ,' al afiliado, '+ this.Nombre + ', documento Nº '+this.Beneficiario);
                      doc.text (10,100 ,'por convenio U.P.C.N.');

                      doc.text (10,150 ,' Firma : .............................');
                      doc.text (10,160 ,' Aclaracion : .............................');
                      doc.text (10,170 ,' Nº documento : .............................');

                     

                      doc.save('Test.pdf');

                /*console.log("pdf")
                const doc = new jsPDF();
                doc.text("Constancia de entrega de anteojos", 10, 10);
               // doc.text("Nuemro de documento"+ this.Beneficiario, 10, 50);
                doc.save("a4.pdf");
                var columns = [
                    {title: "Periodo", dataKey: "Periodo"},
                    {title: "Comprobante", dataKey: "Comprobante"}, 
                    {title: "Beneficiario", dataKey: "Beneficiario"}, 
                    {title: "Nombre", dataKey: "Nombre"},
                    {title: "Titular", dataKey: "Titular"}
                ];
                var rows = [];

                this.afiliados.map(function(x){
                    rows.push({Periodo:x.Periodo,Comprobante:x.Comprobante,Beneficiario:x.Beneficiario,Nombre:x.Nombre,Titular:x.Titular});
                });

                // Only pt supported (not mm or in)
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows, {
                    margin: {top: 60},
                    addPageContent: function(data) {
                        doc.text("Listado de Artículos", 40, 30);
                    }
                });
                doc.save('Afiliados.pdf');*/

            },
            listar(){
              let me=this;
             // console.log("me",me);
              axios.get('api/Afiliados').then(function(response){
                  console.log (response.data);
                  me.afiliados=response.data;
              }).catch(function(error){
                  console.log (error);
              });
            },
            initialize () {
            this.desserts = [
                {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0
                },
                {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3
                },
                {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0
                },
                {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3
                },
                {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9
                },
                {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0
                },
                {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0
                },
                {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5
                },
                {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9
                },
                {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7
                }
            ]
            },

            editItem (item) {
                this.id =item.Comprobante;
                this.Nombre=item.Nombre;
                this.Beneficiario=item.Beneficiario;
                //this.editItem= 1;
                this.Entrega=item.Entrega
                this.dialog = true
                console.log("Editar",this.Entrega);
            },

            deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
            this.dialog = false;
            
            },
            Limpiar(){
                this.id=0;
                this.Nombre="";
                this.Beneficiario="";
                this.IdEntrega=0;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                console.log(this.editItem);
                if (this.Entrega == 0) {
                    //codigo Editar
                    console.log ("Grabar");
                    let me=this;
                    console.log(me.id);
                   axios.post ('api/Entrega',{
                    'IdServicio':Number(me.id),
                    'OpCrea':14
                   
                   }).then(function(response){

                      me.IdEntrega=response.data.Id; 
                       me.crearPDF();
                       me.close();
                       me.listar();
                      // editItem();
                       me.Limpiar();
                   }).catch(function(error){
                       //console.log (m.id);
                       
                       console.log("Error",error);
                   });
                   
                 }
                else {
                   //codigo guardar
                    console.log ("Anular");
                    let me=this;
                    console.log(me.Entrega);
                    axios.post ('api/anularEntrega',{
                    'IdEntrega':Number(me.Entrega),
                    'OpCrea':14
                    
                    }).then(function(response){

                        me.IdEntrega=response.data.IdEntrega; 
                        // me.crearPDF();
                        me.close();
                        me.listar();
                        // editItem();
                        // me.Limpiar();
                    }).catch(function(error){
                        //console.log (m.id);
                        
                        console.log("Error",error);
                    });
                   
                }
               
            },
            validar(){
              this.valida=0;
              this.validaMensaje=[];
              if (this.Nombre.length <3 || this.Nombre.length>50){
                  this.validaMensaje.push("El nombre debe tener mas de 3 caracteres y menos de 50")
              }
              if (this.validaMensaje.length)
              {
                  this.valida=1;
              }
              return this.valida;
            }
        }        
    }
</script>


