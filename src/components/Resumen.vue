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
                  v-model="Periodo"
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
                <td>{{ props.item.Nombre}}</td>
                <td>{{ props.item.factura }}</td>
                <td>{{ props.item.total }}</td>
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
    facturacion:[],
    Mes: null,
    headers: [
			{ text: 'Obra Social', value: 'Nombre', sortable: false },
			{ text: 'Factura', value: 'factura', sortable: false },
			{ text: 'Total', value: 'total', sortable: false },
		],
  }),
  created() {},
  methods: {
    close () {
			this.dialog=false
		},
		guardar () {
			this.dialog=false
			this.Periodo=this.convertDate()
		},
    convertDate(){
      var arre=this.Mes.split('-')
      return arre[1]+'/'+arre[0]
    },
    Informes(){
      var me=this
      axios.get("facturacionMes/Resumen/"+this.Periodo+"").then(response=>{
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
      console.log('lalalala')
			var doc = new jsPDF();
			const tempoTranscurrido = Date.now();
			const hoy = new Date(tempoTranscurrido);
			var me = this 
			const fecha = hoy.toLocaleDateString();
			var logo = new Image();

			logo.src = require ('../assets/LogoMitre.jpg');
			doc.addImage(logo, 'JPEG', 0, 0,200,50);
			doc.setFontSize(10);
			doc.text(10, 60, 'Fecha: '+ fecha);
      doc.text(50, 60, 'Periodo: '+ me.Periodo);
      var total1=0;
			let resultado = me.facturacion.map(function(obj){
				var Arre=[]
        total1+=obj.total
        //var a=obj.cerrado?"Cerrada":"Sin cierre"
				Arre.push( obj.Nombre, obj.factura, obj.total)
				return Arre
			})
			//console.log(resultado)
			doc.autoTable({
				margin: { top: 70 },
				columnStyles: { 0: { halign: 'left' } },
				head: [[ 'Nombre', 'factura', 'total']],
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
			doc.save(`Periodo-${me.Periodo}-${fecha}.pdf`);
    }
  },
};
</script>