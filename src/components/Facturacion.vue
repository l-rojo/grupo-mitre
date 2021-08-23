<template>
 <v-layout align-start>
        <v-flex>
         <v-card>
         <v-toolbar-title>
            <v-icon> mdi-domain</v-icon> Grupo Mitre: Facturacion 
           </v-toolbar-title>
           <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm2 md2>
                            
                         <v-select v-model="nombreMes"
                          :items="ListMeses" label="Mes" @change="selectChangeMes($event)">
                        </v-select>
                        </v-flex>
                        <v-flex xs12 sm1 md1>
                          <v-select v-model="nombreAño"
                          :items="ListAño" label="Año" @change="selectChangeAño($event)">
                        </v-select>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <v-select v-model="nombreOs"
                                :items="ListObraSocial" label="Seleccionar Obra sociales" @change="selectChange($event)">
                            </v-select>
                        </v-flex>
                         
                         <v-flex xs12 sm3 md3>
                         <v-select v-model="nombrePres"
                            :items="ListPrestador" label="Seleccionar Prestadores" @change="selectChange2($event)">
                        
                        </v-select>
                         </v-flex>

                         <v-flex xs12 sm2 md2>
                             <v-btn color="primary" @click="listar()">
                            Procesar
                        </v-btn>
                         </v-flex>

                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Factura" label="Factura"></v-text-field>
                        </v-flex >
                       
                            <v-flex xs5 sm2 md2>
                                <v-btn color="primary" @click="CerrarHabilitar()" > {{ btnTitle }} </v-btn>
                            </v-flex>
                      
                        

                        </v-layout>
                    </v-container>
           </v-card-text>
         </v-card>
           <v-toolbar flat color="white">       
         <v-btn @click="editItem2()"><v-icon>wifi_protected_setup</v-icon> </v-btn>
                
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                
              <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle2 }}</span>
                    </v-card-title>
        
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                         <v-flex xs12 sm3 md3>
                          <v-combobox
                            v-model="search2"
                            :items="searchHistory"
                            label="Search"
                            :menu-props="{openOnClick: false}" @change="selectChange3($event)" ></v-combobox>
                         </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Codigo" label="Codigo"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Cantidad" label="Cantidad2"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <v-btn color="blue darken-1" flat @click.native="BuscarNom">Buscar</v-btn>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="PrecioU" label="Precio Unitario"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Coseguro" label="Coseguro"></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Total" label="Total"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Nombre" label="Nombre"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Documento" label="Documento"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Afiliado" label="NombreAfiliado"></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Importe" label="Importe"></v-text-field>
                        </v-flex>
                     </v-layout>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>

                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="GrabarFact">Grabar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                

                <v-dialog v-model="dialog" max-width="500px">
                
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Fecha2" label="Fecha"></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm12 md12>
                          <v-combobox
                            v-model="ListadoObraSocial"
                            :items="searchHistory"
                            label="Search"
                            :menu-props="{openOnClick: false}"  @change="selectChange3($event)" ></v-combobox>
                         </v-flex>
                        

                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Cantidad" label="Cantidad"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <v-btn color="blue darken-1" flat @click.native="BuscarNom">Buscar</v-btn>    
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                          <span >{{ MsjBuscar }}</span>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="PUnitario" label="Precio Unitario" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Coseguro" label="Coseguro" readonly></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="Total" label="Total" readonly></v-text-field>
                        </v-flex>
                       
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="Documento" label="Documento" @keypress.enter="BuscarAfiliado"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="NombreAfiliado" label="Nombre Afiliado" ></v-text-field>
                             <span >{{ MsjNombre }}</span>
                        </v-flex>

                     </v-layout>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>

                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="GrabarFact">Grabar</v-btn>
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
                    <td >
                        <v-icon
                        small
                        class="mr-2"
                        @click="Anular(props.item)"
                        >
                        delete
                        </v-icon>
                        
                    </td>
                    <td> {{ props.item.Fecha }}</td>
                    <td> {{ props.item.Prestador }}</td>
                     <td> {{ props.item.codigo }}</td>
                     <td >{{ props.item.Nombre }}</td>
                     <td >{{ props.item.Documento }}</td>
                     <td >{{ props.item.NombreAfiliado }}</td>
                     <td >{{ props.item.PUnitario }}</td>
                     <td >{{ props.item.Coseguro }}</td>
                     <td >{{ props.item.cantidad }}</td>
                     <td >{{ props.item.Total }}</td>
                    
                   
                
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
                Afiliado:'',
                ListObraSocial:[],
                ListadoObraSocial:[],
                ListPrestador:[],
                ListNomenclador:[],
                ListMeses:[],
                ListAño:[],
                dialog: false,
                dialog2: false,
                 search: '',
                searchHistory: [],

                headers: [
                    { text: '-', value: '', sortable: false },
                    { text: 'Fecha', value: 'Fecha', sortable: false },
                    { text: 'Prestador', value: 'Prestador', sortable: false },
                    { text: 'Codigo', value: 'Codigo', sortable: false },
                    { text: 'Nombre', value: 'Nombre', sortable: false },
                    { text: 'Documento', value: 'Documento', sortable: false },
                    { text: 'NombreAfiliado', value: 'NombreAfiliado', sortable: false  },                   
                    { text: 'PUnitario', value: 'PUnitario', sortable: false },
                    { text: 'Coseguro', value: 'Coseguro', sortable: false },
                    { text: 'cantidad', value: 'cantidad', sortable: false },
                    { text: 'Total', value: 'Total', sortable: false },
                    
                  
                     ],
                search: '',
                desserts: [],
                editedIndex: 1,
                editedItem: {},
                id:0,
                Id:0,
                Rta:'',
                PFactura:0,
                Fecha:'',
                Fecha2:'',
                cierre:0,
                MsjNombre:'',
                MsjBuscar:'',
                PrecioU:'',
                IdNomenclador :0,
                Codigo:'',
                nombreOs:'',
                nombrePres:'',
                Nombre:'',
                Documento:'',
                PUnitario: 0,
                NombreAfiliado:'',
                Coseguro:0,
                Cantidad:0,
                Total:0,
                Importe:0,
                IdNom_Importe:0,
                IdDetalle:0,
                IdResumen:0,
                nombreMes:null,
                nombreAño:null,
                mes:'06',
                anio:'2020',
                IdObraSocial:0,
                IdPrestador:0,
                valida:0,
                validaMensaje:[],
                search2:'',
                IdEntrega:0,
                Factura:'',
                Codigo2:'',
                Nombre2:'',
                Documento2:'',
                PUnitario2: 0,
                NombreAfiliado2:'',
                Coseguro2:0,
                Cantidad2:0,
                Total2:0,
                IdNom_Importe2:0,
                IdDetalle2:0,
                IdResumen2:0,
                mes2:'06',
                anio2:'2020',
                IdObraSocial2:1,
                IdPrestador2:1,
            }
        },
        computed: {
            formTitle () {
            return this.IdDetalle  === 0 ? 'Carga de Prácticas' : 'Anular'
            },
            btnTitle(){
            return this.cierre  === 0 ? 'Cerrar' : 'Habilitar'
            },
            formTitle2 () {
            return this.IdDetalle  === 0 ? 'Carga de Prácticas' : 'Anular'
            },
            
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
           
        },

        created () {
            
           // this.listar();
            //this.SelectedPeriodo();
            this.SelectedObraSocial();
            this.SelectedPrestadores();
            this.Periodo();
           
           // this.SelectedNomenclador();
        },
        methods:{
            crearPDF2(){
            //    console.log("pdf")
                const doc = new jsPDF();
                var texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                doc.text(texto,10,50);
               // doc.text("Nuemro de documento"+ this.Beneficiario, 10, 50);
                doc.save("a4.pdf") 
            },
            selectChange(event) {
            //  console.log("Cambio");
             this.IdObraSocial = event
            // console.log( "Id ObraSocial", this.IdObraSocial);
          
            },
            selectChange2(event2) {
            // console.log("Evento prestador", event2);
             this.IdPrestador = event2
            // console.log( "Id Prestador", this.IdPrestador);
             let me=this;
              axios.get('facturacionMes/Prestador/' + this.IdPrestador ).then(function(response){
                // console.log(response.data[0].factura);
                
                  me.PFactura=response.data[0].factura;
                //  console.log("Prestador factura",me.PFactura)
              }).catch(function(error){
                //   console.log (error);
              });
             
            },
             selectChangeMes(event3) {
            // console.log("Evento mes", event3);
             this.mes = event3
            // console.log( "Id mes", this.mes);
          
            },
            selectChangeAño(event4) {
            // console.log("Evento Año", event4);
             this.anio = event4
            // console.log( "Id Año", this.anio);
          
            },
             selectChange3(event5) {
            // console.log("Evento Nomenclador", event5.value);
             this.IdNomenclador = event5.value
            // console.log( "Id Nomenclador", this.IdNomenclador);
            this.Coseguro=0;
            this.Total=0;
            this.PUnitario=0;
            this.IdNom_Importe=0;
            },
            
            crearPDF(){
                    
                      var doc = new jsPDF();
                      //this.IdEntrega=2;
                      const tempoTranscurrido = Date.now();
                      const hoy = new Date(tempoTranscurrido);
                       
                    //  console.log(hoy.toLocaleDateString());
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
              if (me.IdObraSocial==0 ){
                  alert("seleccione obra social ");
                  return;
              }
            //   console.log (this.mes,this.anio,this.IdObraSocial,this.IdPrestador)
            //  console.log("Facturacion",me.ListObraSocial.value);
            // axios.post('facturacionMes/Facturacion/'+this.anio +'/'+ this.mes + '/' + this.IdObraSocial + '/' + this.IdPrestador )
              axios.get('facturacionMes/Facturacion/'+this.anio +'/'+ this.mes + '/' + this.IdObraSocial + '/' + this.IdPrestador ).then(function(response){
                //  console.log("Datos",response.data);
                 if (response.data.length >0){

                    me.afiliados=response.data;
                    me.IdResumen=response.data[0].IdResumen;
                    //me.VerificarCierre();
                   
                    //  console.log (me.mes,me.anio,me.IdObraSocial,me.IdPrestador)
              }else {
                    me.afiliados=[];
                    me.IdResumen=0;
              }

              }).catch(function(error){
                //   console.log (error);
              });
            },
            Periodo (){
                let me=this;
                var empresasArray=[];
                var empresasArray2=[];
                axios.get('facturacionMes/Periodo').then(function(response){
                    empresasArray=response.data[1];
                    empresasArray2=response.data[0];
                    //console.log (response.data[1]);
                    //console.log (response.data[0]);
                    empresasArray.map(function(x){
                        //console.log(x);
                        me.ListMeses.push({text: x.nombre,value:x.idmes})
                    });   
                    empresasArray2.map(function(x){
                        //console.log(x);
                        me.ListAño.push({text: x.nombre,value:x.idaño})
                    });   
                }).catch(function(error){
                    console.log (error);
                });
            },
          SelectedObraSocial(){
              let me=this;
             
              var empresasArray=[];
              axios.get('facturacionMes/getListadoObraSocial').then(function(response){
                empresasArray=response.data;
                // console.log (response.data);
                empresasArray.map(function(x){
                    me.ListObraSocial.push({text: x.nombre,value:x.id})
                    // console.log("Obra Social",me.ListObraSocial)
                    });   
              }).catch(function(error){
                //   console.log (error);
              });
            //    console.log("Facturacion",me.ListObraSocial);
            },
             SelectedPrestadores(){
              let me=this;
            //    console.log ("Prestadores");
              var empresasArray=[];
              axios.get('facturacionMes/Prestadores').then(function(response){
                empresasArray=response.data;
                // console.log ("Prestadores", empresasArray);
                empresasArray.map(function(x){
                    me.ListPrestador.push({text: x.Nombre,value:x.idPrestador})
                    // console.log(x)
                    });   
              }).catch(function(error){
                //   console.log (error);
              });
            //    console.log("Facturacion",me.ListPrestador);
            },
             SelectedNomenclador(){
              let me=this;
               
              var empresasArray=[];
              axios.get('facturacionMes/Nomenclador/'+me.IdObraSocial).then(function(response){
                empresasArray=response.data;
                empresasArray.map(function(x){
                    me.ListNomenclador.push({text: x.codigo,value:x.id})
                    me.searchHistory=me.ListNomenclador;
                    // console.log("searchHistory",me.searchHistory) 
                    });   
              }).catch(function(error){
                //   console.log (error);
              });
               
            },
            initialize () {
                this.desserts = []
            },

            editItem (item) {

                this.Codigo=item.codigo,
                this.Nombre=item.Nombre,
                this.Documento=item.Documento,
                this.PUnitario=item.PUnitario,
                this.NombreAfiliado=item.NombreAfiliado,
                this.Coseguro=item.Coseguro,
                this.Cantidad=item.Cantidad,
                this.Total=item.Total,
                this.IdNom_Importe=item.IdNom_Importe,
                this.IdDetalle=item.IdDetalle,

                 
              
                this.dialog = true
                // console.log("Editar",this.IdDetalle);
            },
            editItem2 () {
                
                this.Codigo='',
                this.Nombre='',
                this.Documento='',
                this.PUnitario=0,
                this.NombreAfiliado='',
                this.Coseguro=0,
                this.Cantidad=0,
                this.Total=0,
                this.IdNom_Importe=0,
                this.IdDetalle=0
                 if(this.IdObraSocial==0){
                   alert("seleccione Obra Social");
                   this.dialog = false;
                   return;
                }
                if(this.IdPrestador==0){
                   alert("seleccione prestador");
                   this.dialog = false;
                   return;
                }
                if (this.PFactura>0)
                {
                    alert("Este prestador carga su facturación");
                   this.dialog = false;
                   return;
                }
                 this.SelectedNomenclador();
                this.dialog = true
                // console.log("Editar");
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
                // console.log(this.IdDetalle);
                if (this.IdDetalle == 0) {
                    //codigo Editar
                    // console.log ("Grabar");
                    let me=this;
                    // console.log("Detalle",me.IdDetalle);
                   axios.post ('facturacionMes/Entrega',{
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
                    //    //console.log (m.id);
                       
                    //    console.log("Error",error);
                   });
                   
                 }
                else {
                   //codigo guardar
                    // console.log ("Anular");
                    let me=this;
                    // console.log(me.IdDetalle);
                    axios.put('facturacionMes/AnularFacturacion/'+ this.IdDetalle).then(function(response){

                        me.Rta=response.data; 
                        // console.log(response.data)
                        // me.crearPDF();
                        me.close();
                        me.listar();
                        // editItem();
                        // me.Limpiar();
                    }).catch(function(error){
                        // //console.log (m.id);
                        
                        // console.log("Error",error);
                    });
                   
                }
               
            },
            Anular(item){
                //codigo guardar
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            // console.log(confirm);
            // console.log(index);
            // console.log(item);
            //return;
                    // console.log ("Anular");
                    let me=this;
                    me.IdDetalle=item.IdDetalle;
                    // console.log(me.IdDetalle);

                    axios.put('facturacionMes/AnularFacturacion/'+ this.IdDetalle).then(function(response){

                        me.Rta=response.data; 
                        // console.log(response.data)
                        // me.crearPDF();
                        me.close();
                        me.listar();
                        // editItem();
                        // me.Limpiar();
                    }).catch(function(error){
                        // //console.log (m.id);
                        
                        // console.log("Error",error);
                    });
                   
            },
            BuscarNom(){
            // console.log("Buscar Nomenclador");
             let me=this;
            
            //this.Fecha2 =this.Fecha2.replace('/','-');
             let F=this.Fecha2.substr(0,2) + "-"+this.Fecha2.substr(3,2)+"-"+this.Fecha2.substr(6,4);
              
            //  console.log(this.Fecha2);
            //   console.log(F);
             axios.get('facturacionMes/NomImportes/'+this.IdNomenclador +'/'+ this.Cantidad +'/' +F ).then(function(response){
            //  console.log (response.data);
            //  console.log("Nomenclador Importe",response.data[0].PUnitario);
              me.IdNom_Importe=response.data[0].IdNomencladorImporte;
              me.PUnitario= response.data[0].PUnitario;
              me.Coseguro= response.data[0].Coseguro;
              me.Total=response.data[0].Total;
              me.Nombre=response.data[0].Nombre;
            //  console.log("Nombre",me.Nombre);

              }).catch(function(error){
                //   console.log (error);
              });
            },

            GrabarFact(){
                let me=this;
                // console.log("Grabar Facturacion",me.Fecha2);
               axios.post ('facturacionMes/CargarFacturacion',{
                    'mes':me.mes ,
                    'anio':me.anio,
                    'IdObraSocial':1,
                    'IdPrestador':1,
                    'Cantidad':me.Cantidad,
                    'Documento':me.Documento,
                    'Nombre':me.NombreAfiliado,
                    'IdNomImporte':me.IdNom_Importe,
                    'Fecha':me.Fecha2

                   }).then(function(response){
                    //  console.log(Response.Date);
                      //me.IdEntrega=response.data.Id; 
                      // me.crearPDF();
                       me.close();
                       me.listar();
                      // editItem();
                      // me.Limpiar();
                   }).catch(function(error){
                    //    //console.log (m.id);
                       
                    //    console.log("Error",error);
                   });
            },
             CerrarFact(){
                 this.Factura="0000000";
                 let me=this;
                // console.log(me.NombreAfiliado);
                if (me.IdResumen==0){
                    return;
                }

                if (me.Factura==''){
                    alert("Ingrese numero de factura");
                    return;
                }

                axios.put ('facturacionMes/CerrarPeriodo/'+this.IdResumen,{
                    'Factura':me.Factura,
                    'mes':me.mes ,
                    'Año':me.anio,
                    'IdObraSocial':this.IdObraSocial
                }).then(function(response){

                    me.listar();
                     
                }).catch(function(error){
                    //    //console.log (m.id);
                       
                    //    console.log("Error",error);
                   });

            },
             HabilitarFact(){
                //   console.log ("Habilitar");
                    let me=this;
                   // me.IdDetalle=item.IdDetalle;
                    // console.log(me.IdResumen);
                //    // console.log(me.Factura);
                    axios.put('facturacionMes/HabilitarPeriodo/'+ me.IdResumen).then(function(response){

                        me.Rta=response.data; 
                        // console.log(response.data)
                        // me.crearPDF();
                        //me.close();
                        me.listar();
                        // editItem();
                        // me.Limpiar();
                    }).catch(function(error){
                        // //console.log (m.id);
                        
                        // console.log("Error",error);
                    });
            },
            CerrarHabilitar() {
            //  console.log("Cierre", this.cierre )
              if (this.cierre==0){
                //   console.log("Cierre", this.cierre )
                  this.CerrarFact(); 
              }
              else this.HabilitarFact();
            },
            VerificarCierre(){
              let me=this;
            //  console.log("Facturacion",me.ListObraSocial.value);
            // axios.post('facturacionMes/Facturacion/'+this.anio +'/'+ this.mes + '/' + this.IdObraSocial + '/' + this.IdPrestador )
              axios.get('facturacionMes/VerificarCierre/'+this.IdResumen ).then(function(response){
                 
                //   console.log(response);
                  me.cierre=response.data[0].Cerrado;
                  me.Factura=response.data[0].Factura;
                //   console.log("Cierre",me.cierre);
                  //listar();
                 
              }).catch(function(error){
                //   console.log (error);
              });
            },
             BuscarAfiliado(){
              let me=this;
            //  console.log("Buscar Afliado",this.Documento);
            // axios.post('facturacionMes/Facturacion/'+this.anio +'/'+ this.mes + '/' + this.IdObraSocial + '/' + this.IdPrestador )
              axios.get('facturacionMes/Afiliado/'+this.Documento ).then(function(response){
                 
                //   console.log(response);
                  me.NombreAfiliado=response.data[0].Nombre;
                  console.log(me.NombreAfiliado)
                  if (me.NombreAfiliado==''){
                      me.MsjNombre='Ingrese Nombre del Afiliado';
                  }
                  else me.MsjNombre='';

                  
              }).catch(function(error){
                //   console.log (error);
              });
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




