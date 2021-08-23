<template>
  <v-card width=100% height="100%">
    <v-card-title primary-title>
      <h3>
        Informes De Facturacion
      </h3>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm3 md3>
            <v-autocomplete
              v-model="inf.ObraSocial"
              :items="ListObraSocial"
              item-text="text"
              item-value="value"
              label="Obra Social"
              required
            ></v-autocomplete>
              <!-- @change="listar"
              clearable
              @keypress.enter="listar" -->
          </v-flex>
          <!-- <v-flex xs12 sm6 md6>
            <v-text-field label="Obra Social" v-model="inf.ObraSocial"></v-text-field>
          </v-flex> -->
          <v-flex xs12 sm3 md3>
            <v-autocomplete
              v-model="inf.Prestador"
              :items="ListPrestador"
              item-text="text"
              item-value="value"
              label="Prestador"
              required
            ></v-autocomplete>
              <!-- @change="listar"
              clearable
              @keypress.enter="listar" -->
          </v-flex>
          <v-flex xs12 sm3 md3>
            <v-text-field label="Fecha Hasta" v-model="inf.Periodo" v-mask="'####/##'" hint="AAAA/MM" persistent-hint></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 md3>
            <v-btn color="green" @click.native="Informes">Informe</v-btn>
            <!-- <v-text-field label="Prestador" v-model="inf.Prestador"></v-text-field> -->
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-data-table
              :headers="headers"
              :items="Practicas"
              :items-per-page="25"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td> {{ props.item.Documento }}</td>
                <td >{{ props.item.NombreAfiliado }}</td>
                <td >{{ props.item.codigo }}</td>
                <td >{{ props.item.Nombre }}</td>
                <td >{{ props.item.cantidad }}</td>
                <td >{{ props.item.Coseguro }}</td>
                <td >{{ props.item.PUnitario }}</td>
                <td >{{ props.item.Total }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      
      <v-toolbar color="gray">
        <v-spacer></v-spacer>
        <v-btn :disabled="Impresion" color="green" @click.native="ImprimirPeriodo">Imprimir</v-btn>
      </v-toolbar>
    </v-card-actions>
  </v-card>
</template>
<script>
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import html2cavas from 'html2canvas'
import axios from "axios"
export default {
  data: vm => ({
    inf:{
      ObraSocial: 0,
      Prestador: 0,
      Periodo: new Date().toISOString().substr(0, 7),
    },
    headers: [
      {
				text: 'Documento',
				align: 'start',
				sortable: false,
				value: 'Documento'
      },
			{ text: 'Nombre Afiliado', value: 'NombreAfiliado', sortable: false },
			{ text: 'Cod. Practica', value: 'codigo', sortable: false },
			{ text: 'Practica', value: 'Nombre', sortable: false },
			{ text: 'Cantidad', value: 'cantidad', sortable: false },
			{ text: 'Coseguro', value: 'Coseguro', sortable: false },
			{ text: 'Precio Unitario', value: 'PUnitario', sortable: false },
			{ text: 'Total', value: 'Total', sortable: false },
		],
    Impresion:true,
    Practicas:[],
    ObraSocial: '',
    Prestador: '',
    ListObraSocial:[],
    ListPrestador:[],
  }),
  created() {
    this.SelectObraSocial();
    this.SelectPrestador();
  },
  methods: {
    Informes(){
      var me=this
      axios.get("Nomenclador/InformeFacturacion/"+this.inf.Periodo+"/"+this.inf.ObraSocial+"/"+this.inf.Prestador+"").then(response=>{
        me.Practicas=response.data
        me.Impresion=false
      })
      .catch(error=>{
        console.log(error);
      })
    },
    SelectObraSocial() {
      let me = this;
      var osArray = [];
      axios.get("facturacionMes/getListadoObraSocial")
        .then(function (response) {
          osArray = response.data;
          me.ListObraSocial.push({ text: "Todas", value: 0 });
          osArray.map(function (x) {
            me.ListObraSocial.push({ text: x.nombre, value: x.id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SelectPrestador() {
      let me = this;
      var osArray = [];
      me.limpiar()
      axios.get("facturacionMes/Prestadores")
        .then(function (response) {
          osArray = response.data;
          //me.ListPrestador.push({ text: "Todos", value: 0 });
          osArray.map(function (x) {
            me.ListPrestador.push({ text: x.Nombre, value: x.idPrestador });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    crearPDF(){
			var doc = new jsPDF();
			const tempoTranscurrido = Date.now();
			const hoy = new Date(tempoTranscurrido);
			var me = this 
			//console.log(hoy.toLocaleDateString());
			const fecha = hoy.toLocaleDateString();
			var logo = new Image();

			logo.src = require ('../assets/LogoMitre.jpg');
			doc.addImage(logo, 'JPEG', 0, 0);
			//doc.setFontSize(16);
			//doc.text(60, 80, 'Factura Nº 00000'+ me.NumFactura);
			doc.setFontSize(15);
			doc.text(10, 90, 'Fecha: '+ fecha);
			doc.text(10,100 ,' Obra Social: '+ me.ObraSocial + ', Prestador: '+me.Prestador);
			// doc.text(10,100 ,'por convenio U.P.C.N.');
			let resultado = me.Practicas.map(function(obj){
				var Arre=[]
				Arre.push(obj.Documento, obj.NombreAfiliado, obj.codigo, obj.Nombre, obj.cantidad, obj.Coseguro, obj.PUnitario, obj.Total)
				return Arre
			})
			//console.log(resultado)
			doc.autoTable({
				margin: { top: 110 },
				columnStyles: { 0: { halign: 'center' } },
				head: [['Documento', 'Nombre Afiliado', 'Cod. Practica', 'Practica', 'Cantidad', 'Coseguro', 'Precio Unitario', 'Total']],
				body: resultado
			})
			doc.save('Test.pdf');
		},
    ImprimirPeriodo(){
      let me=this
      function esOS(fruta) {
        return fruta.value === me.inf.ObraSocial
      }
      me.ObraSocial=me.ListObraSocial.find(esOS).text.trim()
      function esPrestador(fruta) {
        return fruta.value === me.inf.Prestador
      }
      me.Prestador=me.ListPrestador.find(esPrestador).text.trim()
      me.crearPDF()
		},
    limpiar(){
      this.Practicas=Object.assign([])
    },

  }
}
</script>