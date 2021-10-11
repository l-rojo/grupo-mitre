<template>
  <v-card width="100%" height="100%">
    <v-card-title primary-title>
      <h3>Resumen De Facturacion</h3>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md6>
            <v-dialog v-model="dialog" max-width="375px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="ItemSel.Periodo"
                  label="Periodo"
                  prepend-icon="edit_calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
                <!-- :disabled="!Datos" -->
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Periodo</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-date-picker
                        v-model="Mes"
                        type="month"
                        class="mt-4"
                        min="1990-06"
                        :max="month1"
                      ></v-date-picker>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="guardar">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs12 sm6 md6>
				<v-autocomplete
					v-model="ItemSel.ObraSocial"
					:items="ObraSociales"
					clearable
					item-text="nombre"
					item-value="id"
					label="Obra Social"
				></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
				<v-autocomplete
					v-model="ItemSel.Prestador"
					:items="Prestadores"
					clearable
					item-text="Nombre"
					item-value="idPrestador"
					label="Prestador"
				>
					<!-- @blur="BuscarPeriodo"
					@change="BuscarPeriodo" -->
				</v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-autocomplete
                    v-model="ItemSel.TipoPractica"
                    :items="TipoPractica"
                    :auto-select-first=true
                    item-text="text"
                    item-value="value"
                    label="Tipo Practica"
                ></v-autocomplete>
            </v-flex>
          <v-flex xs12 sm3 md3>
            <v-btn color="accent" @click.native="Informes">Informe</v-btn>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-data-table
              :headers="headers"
              :items="facturacion"
              :items-per-page="25"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.Centro}}</td>
                <td>{{ props.item.Fecha }}</td>
                <td>{{ props.item.codigo }}</td>
                <td>{{ props.item.Documento }}</td>
                <td>{{ props.item.Nombre}}</td>
                <td>{{ props.item.OS }}</td>
                <td>{{ props.item.Prestador }}</td>
                <td>{{ props.item.TipoPrac}}</td>
                <td>{{ props.item.Total }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-footer absolute>
      <v-toolbar color="gray">
        <v-spacer></v-spacer>
        <v-btn color="accent"
          :disabled="Impresion"
          @click.native="ImprimirPeriodo"
        >Imprimir</v-btn>
      </v-toolbar>
    </v-footer>
  </v-card>
</template>
<script>
import axios from "axios"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
  data: (vm) => ({
    month1: new Date().toISOString().substr(0, 7),
    dialog: false,
    Periodo: "",
    Impresion: true,
    TipoPractica:[],
    facturacion:[],
    ObraSociales: [],
    Prestadores: [],
    Mes: null,
    ItemSel:{},
    headers: [			
      { text:'Centro', value: 'Centro', sortable: false },
      { text:'Fecha', value: 'Fecha', sortable: false },
      { text:'codigo', value: 'codigo', sortable: false },
      { text:'Documento', value: 'Documento', sortable: false },
      { text:'Nombre', value: 'Nombre', sortable: false },
      { text:'OS', value: 'OS', sortable: false },
      { text:'Prestador', value: 'Prestador', sortable: false },
      { text:'TipoPrac', value: 'TipoPrac', sortable: false },
      { text:'Total', value: 'Total', sortable: false },
		],
  }),
  created () {
        // this.listar()
    this.cargarObrasSociales()
    this.cargarPrestadores()
    // this.elijePrestador()
    this.GetTipoPracticas()
  },
  methods: {
    close () {
        this.dialog=false
    },
    guardar () {
        this.dialog=false
        this.ItemSel.Periodo=this.convertDate()
    },
    convertDate(){
      var arre=this.Mes.split('-')
      return arre[1]+'/'+arre[0]
    },
    Informes(){
      var me=this
      var arre=this.ItemSel.Periodo.split('/')
      me.ItemSel.mes=arre[0]
      me.ItemSel.anio=arre[1]
      var envio=me.ItemSel
      //console.log(envio)
      axios.post("facturacionMes/FacturacionCentros",envio).then(response=>{
        me.facturacion=response.data
        console.log(response.data)
        me.Impresion=false
      })
      .catch(error=>{
        console.log(error);
      })
    },
    ImprimirPeriodo()
    {
        var doc = new jsPDF();
        const tempoTranscurrido = Date.now();
        const hoy = new Date(tempoTranscurrido);
        var me = this 
        const fecha = hoy.toLocaleDateString();
        var logo = new Image();
        var imgLogo=me.facturacion[0].Logo;
        logo.src = require (`../assets/${imgLogo}`);
	doc.setFontSize(10);
	doc.text(10, 7, 'Expediente Nº ................................. Letra A, Año 2021, Folio.........');
        doc.addImage(logo, 'JPEG', 0, 10,200,50);
        doc.setFontSize(10);
        doc.text(10, 55, 'Fecha: '+ fecha);
        doc.text(50, 55, 'Periodo: '+ me.ItemSel.Periodo);
        doc.text(10, 65, 'Obra Social: '+ me.facturacion[0].OS);
        
        var total1=0;
        let resultado = me.facturacion.map(function(obj){
            var Arre=[]
            total1+=obj.Total
            //var a=obj.cerrado?"Cerrada":"Sin cierre"
            Arre.push( obj.Fecha, obj.Documento, obj.Nombre, obj.Prestador, obj.codigo, obj.TipoPrac, '____', '____', '____', obj.Total)
            return Arre
        })
			//console.log(resultado)
        doc.autoTable({
            margin: { top: 70 },
            columnStyles: { 0: { halign: 'left' } },
            head: [['Fecha', 'Documento', 'Nombre', 'Prestador', 'Codigo', 'Tipo Practica','%Categ.','Honorarios','Gastos', 'Total']],
            body: resultado,
            didDrawPage: function (data) {
                // // Header
                // doc.setFontSize(20);
                // doc.setTextColor(40);
                // doc.text("Report", data.settings.margin.left, 22);
                // console.log();
                // Footer
                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize;
                var pageHeight = pageSize.height
                    ? pageSize.height
                    : pageSize.getHeight();
                doc.setFontSize(10);
                doc.setTextColor(40);
                var str1="Total: " + total1 + ""
                doc.text(str1, data.settings.margin.left+100, pageHeight - 25);
                var str = "Page " + doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(str, data.settings.margin.left, pageHeight - 10);
            }
        })
        doc.save(`Periodo-${me.ItemSel.Periodo}-${Date()}.pdf`);
    },
    GetTipoPracticas(){
        let me = this;
        var osArray = [];
        //me.limpiar()
        axios.get("facturacionMes/GetTipoPractica/")
        .then(function (response) {
            osArray = response.data;
            //me.ListPrestador.push({ text: "Todos", value: 0 });
            osArray.map(function (x) {
                me.TipoPractica.push({ text: x.Codigo+" - "+x.Nombre, value: x.id });
            });
            console.log("TipoPractica")
            console.log(me.TipoPractica)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    cargarObrasSociales () {
			const me = this
			axios.get('facturacionmes/getListadoObraSocial').then(function (response) {
				console.log(response.data)
				me.ObraSociales = response.data
			}).catch(function (error) {
				console.log(error)
			})
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
  },
};
</script>
