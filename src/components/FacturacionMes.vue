<template>
	<v-card width=100% height="100%">
    <v-card-title primary-title>
      <h3>
        Carga De Facturacion
      </h3>
    </v-card-title>
    <v-card-text>
	<v-layout align-start>
		<v-flex>
			<v-layout wrap>
			<v-toolbar flat color="gray-100">
				<v-flex xs12 sm6 md6>
				<v-text-field
					:disabled="(!Datos)"
					label="Cod. O.S."
					v-model="ItemSel.ObraSocial"
				></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md6>
				<v-autocomplete
					v-model="ItemSel.ObraSocial"
					:items="ObraSociales"
					clearable
					item-text="nombre"
					item-value="id"
					:disabled="(!Datos)"
					label="Obra Social"
				></v-autocomplete>
				</v-flex>
				<v-flex xs12 sm6 md6>
				<v-text-field
					label="Cod.Prestador"
					v-model="ItemSel.Prestador"
					:disabled="esPrestador"
					@blur="BuscarPeriodo"
				></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md6>
				<v-autocomplete
					v-model="ItemSel.Prestador"
					:items="Prestadores"
					clearable
					item-text="Nombre"
					item-value="idPrestador"
					label="Prestador"
					:disabled="esPrestador"
					@blur="BuscarPeriodo"
					@change="BuscarPeriodo"
				>
				</v-autocomplete>
				</v-flex>
				<!-- <label for="">{{ItemSel}}</label> -->
			
				<v-flex xs12 sm6 md6>
					<v-dialog v-model="dialog" max-width="375px">
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="ItemSel.Periodo"
								label="Periodo"
								prepend-icon="edit_calendar"
								:disabled="(!Datos)"
								v-bind="attrs"
								v-on="on"
							></v-text-field>
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
					<v-btn color="info" title="Buscar Periodo"  @click="BuscarPeriodo">Buscar</v-btn>
				</v-flex>
				</v-toolbar>
			</v-layout>
			<v-layout wrap>
			<v-dialog v-model="Cargas" max-width="650px" persistent>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="white--text"
						v-bind="attrs"
						v-on="on"
						color="indigo"
						@click="CargarNomen()"
						:disabled="(Cerrado || Datos)"
					>
						<v-icon color="white">add</v-icon> Agregar practicas
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Practica</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-text-field
									v-model="PractCarga.Documento"
									ref="Documento"
									label="Documento"
									@keypress.enter="BuscarAfiliado()"
									v-on:keydown.tab="BuscarAfiliado()"
									@blur="BuscarAfiliado()"
								></v-text-field>
								<v-text-field
									v-model="PractCarga.Nombre"
									ref="Nombre"
									label="Nombre"
								></v-text-field>
							</v-layout>
							<v-layout wrap>
								<v-text-field
									ref="Cantidad"
									v-model="PractCarga.Cantidad"
									label="Cantidad"
									type="number"
								></v-text-field>
								<v-menu
									ref="menu1"
									v-model="menu1"
									:close-on-content-click="false"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="dateFormatted"
											label="Fecha Realizacion"
											v-mask="'##/##/####'"
											hint="DD/MM/AAAA"
											persistent-hint
											prepend-icon="mdi-calendar"
											v-bind="attrs"
											@blur="date = parseDate(dateFormatted)"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker
										v-model="date"
										no-title
										@input="menu1 = false"
									></v-date-picker>
								</v-menu>
							</v-layout>
							<v-layout wrap>
								<v-flex xs12 sm2 md2>
								<v-autocomplete
									v-model="PractCarga.IdNomImporte"
									:items="Nomenclador"
									item-text="codigo"
									item-value="id"
									label="Codigo"
									@keypress.enter="getPrecios()"
									v-on:keydown.tab="getPrecios()"
									@blur="getPrecios()"
									solo
								></v-autocomplete>
								</v-flex>
								<v-flex xs12 sm7 md7>
								<v-autocomplete
									v-model="PractCarga.IdNomImporte"
									:items="Nomenclador"
									item-text="Nombre"
									item-value="id"
									label="Nomenclador"
									@keypress.enter="getPrecios()"
									v-on:keydown.tab="getPrecios()"
									@blur="getPrecios()"
									solo
								></v-autocomplete>
								</v-flex>
								<v-flex xs12 sm3 md3>
									<v-autocomplete
										v-model="PractCarga.TipoPractica"
										:items="TipoPractica"
										:auto-select-first=true
										item-text="text"
										item-value="value"
										label="Tipo Practica"
										solo
									></v-autocomplete>
								</v-flex>
							</v-layout>
							<v-layout wrap>
								<!--fecha, coseguro, importe unitario, total-->
								<v-text-field
									v-model="Precio.PUnitario"
									label="Importe Unitario"
									readonly
								></v-text-field>
								<v-text-field
									v-model="Precio.Coseguro"
									label="Coseguro"
									type="number"
									readonly
								></v-text-field>
								<v-text-field
									v-model="Precio.Total"
									label="Total"
									readonly
								></v-text-field>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
					<v-spacer></v-spacer>
						<v-btn class="white--text" color="primary" @click.native="GrabarCarga">Grabar</v-btn>
						<v-btn class="primary--text" color="white" @click.native="CerrarCarga">Cerrar</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-spacer></v-spacer>
			<v-btn
				class="white--text"
				color="info"
				@click="OtroPeriodo()"
				:disabled="Datos"
			>
				<v-icon color="white">sync_alt</v-icon> Otro periodo
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				color="green"
				class="white--text"
				@click="ImprimirPeriodo()"
				:disabled="(!Cerrado || Datos)"
			>
				<v-icon color="white">print</v-icon> Imprimir
			</v-btn>
			<v-spacer :hidden="esPrestador"></v-spacer>
			<v-btn
				color="orange"
				class="white--text"
				@click="HabilitarEdicion()"
				:disabled="(!Cerrado || Datos)"
				:hidden="esPrestador"
			>
				<v-icon color="white">edit</v-icon> Habilitar Edicion
			</v-btn>
			<v-spacer :hidden="esPrestador"></v-spacer>
			<v-btn
				color="orange"
				class="white--text"
				@click="editarfactura()"
				:disabled="(!Cerrado || Datos)"
				:hidden="esPrestador"
			>
				<v-icon color="white">edit</v-icon>Editar Nº Factura
			</v-btn>
			<v-spacer :hidden="esPrestador"></v-spacer>
			<v-btn
				color="error"
				@click="CerrarPeriodo()"
				:disabled="(Cerrado || Datos)"
				:hidden="esPrestador"
			>
				<v-icon color="white">close</v-icon> Cerrar periodo
			</v-btn>
			<!-- <v-btn
				color="error"
				@click="CerrarPeriodo()"
				:disabled="(Cerrado || Datos)"
			>
				<v-icon color="white">done_all</v-icon> Cerrar periodo
			</v-btn> -->
			<v-dialog v-model="dialogFactura" max-width="500px" persistent>
				<v-card>
					<v-card-title class="text-h5">Número de Factura</v-card-title>
					<v-card-text>
						<v-text-field
							label="Factura"
							v-model="Factura.Factura"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="info" text @click="cancelFactura">Cancelar</v-btn>
					<v-btn color="error" text @click="guardarFactura">Continuar</v-btn>
					<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="dialogCierre" max-width="500px">
				<v-card>
					<v-card-title class="text-h5">Esta seguro que desea cerrar el periodo? Ingrese Nro de Factura</v-card-title>
					<v-card-text>
						<v-text-field
							label="Factura"
							v-model="Factura.Factura"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="info" text @click="cancelCierre">Cancelar</v-btn>
					<v-btn color="error" text @click="cierreConfirm">Continuar</v-btn>
					<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-dialog>
			</v-layout>
			<v-layout wrap width="100%">
          		<v-flex xs12 sm12 md12>
				<v-data-table
					:headers="headers"
					:items="Practicas"
					:items-per-page="25"
					:loading="cargando"
					class="elevation-1"
					:disabled="Datos"
            	>
					<template slot="items" slot-scope="props">
						<td> {{ props.item.Prestador }}</td>
						<td> {{ props.item.Fecha }}</td>
						<td> {{ props.item.Documento }}</td>
						<td >{{ props.item.NombreAfiliado }}</td>
						<td >{{ props.item.codigo }}</td>
						<td >{{ props.item.Nombre }}</td>
						<td >{{ props.item.TPNomb }}</td>
						<td >{{ props.item.cantidad }}</td>
						<td >{{ props.item.Coseguro }}</td>
						<td >{{ props.item.PUnitario }}</td>
						<td >{{ props.item.Total }}</td>
						<td >
							<v-icon
							small
							color="error"
							class="mr-2"
							@click="deleteItem(props.item)"
							:disabled="(Cerrado || Datos)"
							>
							delete
							</v-icon>		
							<v-dialog v-model="dialogDelete" max-width="500px">
								<v-card>
									<v-card-title class="text-h5">Esta seguro que desea eliminar el elemento?</v-card-title>
									<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="info" text @click="closeDelete">Cancelar</v-btn>
									<v-btn color="error" text @click="deleteItemConfirm">Continuar</v-btn>
									<v-spacer></v-spacer>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</td>
					</template>
				</v-data-table>
					<!-- class="elevation-1" -->
				</v-flex>
			</v-layout>
			
		</v-flex>
	</v-layout>
	</v-card-text>
  </v-card>
</template>

<script>
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import html2cavas from 'html2canvas'
import axios from 'axios'
export default {
    data: vm => ({
		date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      	dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      	menu1: false,
		Prestador: null,
		Precio: {},
		Afiliado: {},
		Prestadores: [],
		Datos: true,
		ObraSocial:null,
		ObraSociales: [],
		cargando:false,
		Nomenclador: [],
		Practicas: [],
		TipoPractica:[],
		Factura: {},
		FacturaAux: '',
		NumFactura:-1,
		IdAnular: null,
		CierreFinal: null,
		Cerrado: false,
		dialog: false,
		dialogDelete: false,
		dialogCierre: false,
		dialogFactura: false,
		Cargas: false,
		PractCarga: {},
		month1: new Date().toISOString().substr(0, 7),

		Mes: null,
		ItemSel:{},
		headers: [
			{ text: 'Prestador', align: 'start', sortable: false, value: 'Prestador' },
			{ text: 'Fecha', align: 'start', sortable: false, value: 'Fecha' },
			{ text: 'Documento', align: 'start', sortable: false, value: 'Documento' },
			// { text: 'Documento', value: 'Documento', sortable: false },
			{ text: 'Nombre Afiliado', value: 'NombreAfiliado', sortable: false },
			{ text: 'Cod. Practica', value: 'codigo', sortable: false },
			{ text: 'Practica', value: 'Nombre', sortable: false },
			{ text: 'Tipo de Practica', value: 'TPNomb', sortable: false },
			{ text: 'Cantidad', value: 'cantidad', sortable: false },
			{ text: 'Coseguro', value: 'Coseguro', sortable: false },
			{ text: 'Precio Unitario', value: 'PUnitario', sortable: false },
			{ text: 'Total', value: 'Total', sortable: false },
		],
	}),
	computed: {
    	computedDateFormatted () {
    		return this.formatDate(this.date)
      	},
		esPrestador(){
			return this.$store.state.usuario.idPrestador != 0
		}
    },
	created () {
    	// this.listar()
		this.cargarObrasSociales()
    	this.cargarPrestadores()
		this.elijePrestador()
		this.GetTipoPracticas()
  	},
	watch: {
		dialog (val) {
		val || this.close()
		},
		dialogDelete (val) {
		val || this.closeDelete()
		},
		Cargas (val) {
		val || this.CerrarCarga()
		},
		dialogFactura (val) {
		val || this.cancelFactura()
		},
		dialogCierre (val) {
		val || this.cancelCierre()
		},
		date (val) {
        this.dateFormatted = this.formatDate(this.date)
      	},
	},
	methods: {
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
		getPrecios(){
			let me = this
			let foo = this.PractCarga
			axios.get('facturacionmes/NomImportes/'+me.PractCarga.IdNomImporte+'/'+me.PractCarga.Cantidad+'/'+me.dateFormatted+'').then(function (response) {
				console.log(response.data)
				me.Precio = response.data[0]
			}).catch(function (error) {
				console.log(error)
			})
		},
		elijePrestador () {
			if( this.$store.state.usuario.idPrestador!=0 )
				this.ItemSel.Prestador=this.$store.state.usuario.idPrestador
		},
		BuscarAfiliado () {
			let me = this
			let foo = this.PractCarga
			axios.get('facturacionmes/Afiliado/'+me.PractCarga.Documento+'').then(function (response) {
				console.log(response.data)
				me.Afiliado = response.data
				me.PractCarga.Nombre = me.Afiliado[0].Nombre
				console.log('paso');
				me.$refs["Cantidad"].$refs.input.focus()
			}).catch(function (error) {
				console.log('catch')
				me.$refs["Nombre"].$refs.input.focus()
				console.log(error)
			})
    	},
		CargarNomen () {
			const me = this
			axios.get('facturacionmes/Nomenclador/'+me.ItemSel.ObraSocial+'').then(function (response) {
				console.log(response.data)
				me.Nomenclador = response.data
			}).catch(function (error) {
				console.log(error)
			})
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
		BuscarPeriodo () {
			//console.log(this.$store.state.usuario);
			if(this.ItemSel.Periodo && this.ItemSel.Prestador && this.ItemSel.ObraSocial)
			{
				this.Datos=false
				this.cargando=true
				const me=this
				me.Cerrado=false
				let Item=this.ItemSel
				let anio=this.ItemSel.Periodo.substr(0, 4)
				let mes=this.ItemSel.Periodo.substr(5, 7)
				axios.get('facturacionMes/GetFactura/'+mes+'/'+anio+'/'+Item.ObraSocial+'').then(function (response) {
					if(response.data.length !==0){
						me.Factura = response.data[0]
						me.Cerrado = true
					}
					console.log(me.Factura)
				}).catch(function (error) {
					console.log(error)
				})
				axios.get('facturacionmes/Facturacion/'+anio+'/'+mes+'/'+Item.ObraSocial+'/'+Item.Prestador+'').then(function (response) {
					console.log(response.data)
					me.Practicas = response.data
					me.cargando=false
				}).catch(function (error) {
					console.log(error)
				})
			}
		},
		Limpiar () {
			this.BuscarPeriodo()
			this.PractCarga.Cantidad=null
			this.PractCarga.Documento=null
			this.PractCarga.Nombre=null
			this.PractCarga.IdNomImporte=null
			this.PractCarga.Fecha=null
			this.$refs["Documento"].$refs.input.focus()
		},
		CerrarCarga () {
			// this.PractCarga.Docue=null
			this.Limpiar ()
			this.Cargas=false
		},
		GrabarCarga () {
			// if (this.validar()) {
			// 	return
			// }
			let anio=this.ItemSel.Periodo.substr(0, 4)
			let mes=this.ItemSel.Periodo.substr(5, 7)
			let me = this.PractCarga
			me.Cantidad=parseInt(me.Cantidad)
			me.IdNomImporte=parseInt(me.IdNomImporte)
			let foo=this
			if (me.Cantidad && me.Documento && me.Nombre && me.IdNomImporte) {
				me.mes=mes
				me.anio=anio
				me.IdObraSocial=parseInt(this.ItemSel.ObraSocial)
				me.IdPrestador=parseInt(this.ItemSel.Prestador)
				me.Fecha=foo.date
				console.log(Object.entries(me))
				axios.post('facturacionmes/CargarFacturacion', me).then(function (response) {
					console.log(response.data)
					foo.Limpiar()
				}).catch(function (error) {
					console.log('Error', error)
				})
			} 
			//PractCarga=null
		},
		close () {
			this.dialog=false
		},
		guardar () {
			this.dialog=false
			this.ItemSel.Periodo=this.Mes
		},
		deleteItem (item) {
			this.dialogDelete = true
			// this.editedIndex = this.desserts.indexOf(item)
			// this.editedItem = Object.assign({}, item)
			this.IdAnular = item.IdDetalle
		},
		deleteItemConfirm () {
			// this.desserts.splice(this.editedIndex, 1)
			let anio=this.ItemSel.Periodo.substr(0, 4)
			let mes=this.ItemSel.Periodo.substr(5, 7)
			let me={}
			me.mes=mes
			me.anio=anio
			me.IdObraSocial=parseInt(this.ItemSel.ObraSocial)
			me.IdPrestador=parseInt(this.ItemSel.Prestador)
			axios.put('facturacionmes/AnularFacturacion/'+this.IdAnular+'',me).then(function (response) {
				console.log(response.data)
			}).catch(function (error) {
				console.log('Error', error)
			})
			this.closeDelete()
		},
		closeDelete () {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.IdAnular = null
			//  this.editedItem = Object.assign({}, this.defaultItem)
			//  this.editedIndex = -1
				this.BuscarPeriodo()
			})
		},
		CerrarPeriodo(){
			this.dialogCierre = true
			this.CierreFinal = this.Practicas[0].IdResumen
		},
		cierreConfirm(){
			let me=this
			me.Factura.mes=this.ItemSel.Periodo.substr(5, 7)
		    me.Factura.anio=this.ItemSel.Periodo.substr(0, 4)
			me.Factura.IdObraSocial=parseInt(this.ItemSel.ObraSocial)
			me.Factura.Op=this.$store.state.usuario.id
			if(!me.Factura.Factura){
				me.Factura.Factura='-'
			}
			console.log(this.CierreFinal);
			console.log(me.Factura);
			axios.put('facturacionmes/CerrarPeriodo/'+this.CierreFinal+'',me.Factura).then(function (response) {
				console.log(response.data)
			}).catch(function (error) {
				console.log('Error', error)
			})
			this.Datos=!this.Datos
			this.Practicas=Object.assign([])
			this.ItemSel=Object.assign({})
			this.Factura=Object.assign({})
			this.cancelCierre()
		},
		OtroPeriodo()
		{
			this.Datos=!this.Datos
			this.Practicas=Object.assign([])
			this.ItemSel=Object.assign({})
			this.Factura=Object.assign({})
			if(this.esPrestador)
			{
				this.elijePrestador()
			}
		},
		cancelCierre(){
			this.dialogCierre = false
			this.$nextTick(() => {
				this.CierreFinal = null
			//  this.editedItem = Object.assign({}, this.defaultItem)
			//  this.editedIndex = -1
			})
			this.BuscarPeriodo()
		},
		HabilitarEdicion(){
			let me=this
			me.CierreFinal=me.Practicas[0].IdCierre
			let Op=this.$store.state.usuario.id
			axios.put('facturacionmes/HabilitarPeriodo/'+me.CierreFinal+'',{Op}).then(function (response) {
				console.log(response.data)
			}).catch(function (error) {
				console.log('Error', error)
			})
			this.Practicas=Object.assign([])
			this.Factura=Object.assign({})
			this.Cerrado=false
			this.BuscarPeriodo()
		},
		ImprimirPeriodo(){
			let me=this
			function esOS(fruta) {
				return fruta.id === me.ItemSel.ObraSocial
			}
			me.ObraSocial=me.ObraSociales.find(esOS).nombre.trim()
			function esPrestador(fruta) {
				return fruta.idPrestador === me.ItemSel.Prestador
			}
			me.Prestador=me.Prestadores.find(esPrestador).Nombre.trim()
			//console.log(me.Prestador +'-'+me.ObraSocial)
			me.NumFactura=me.Factura.Factura
			console.log(me.NumFactura)
			me.crearPDF()
		},
		crearPDF(){
			var doc = new jsPDF();
			const tempoTranscurrido = Date.now();
			const hoy = new Date(tempoTranscurrido);
			var me = this 
			console.log(hoy.toLocaleDateString());
			const fecha = hoy.toLocaleDateString();
			var logo = new Image();

			logo.src = require ('../assets/LogoMitre.jpg');
			doc.addImage(logo, 'JPEG', 0, 0);
			doc.setFontSize(16);
			doc.text(60, 80, 'Factura Nº 00000'+ me.NumFactura);
			doc.setFontSize(15);
			doc.text(10, 90, 'Fecha: '+ fecha);
			doc.text(10,100 ,' Obra Social: '+ me.ObraSocial + ', Prestador Nº: '+me.Prestador);
			// doc.text(10,100 ,'por convenio U.P.C.N.');
			let resultado = me.Practicas.map(function(obj){
				var Arre=[]
				Arre.push(obj.Documento, obj.NombreAfiliado, obj.codigo, obj.Nombre, obj.cantidad, obj.Coseguro, obj.PUnitario, obj.Total)
				return Arre
			})
			console.log(resultado)
			doc.autoTable({
				margin: { top: 110 },
				columnStyles: { 0: { halign: 'center' } },
				head: [['Documento', 'Nombre Afiliado', 'Cod. Practica', 'Practica', 'Cantidad', 'Coseguro', 'Precio Unitario', 'Total']],
				body: resultado
			})
			doc.save('Test.pdf');
		},
		formatDate (date) {
			if (!date) return null

			const [year, month, day] = date.split('-')
			return `${day}-${month}-${year}`
		},
		parseDate (date) {
			if (!date) return null

			const [day, month, year] = date.split('/')
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      	},
		editarfactura(){
			this.FacturaAux=this.Factura.Factura
			this.dialogFactura=true
		},
		cancelFactura(){
			this.Factura.Factura=this.FacturaAux
			this.dialogFactura=false
		},
		guardarFactura(){
			console.log(this.Factura.Factura)
			var me=this
			let Op=this.$store.state.usuario.id
			axios.put('facturacionmes/EditarFactura/'+me.Factura.Id+'/'+me.Factura.Factura+'',{Op}).then(function (response) {
				console.log(response.data)
				me.dialogFactura=false
				me.FacturaAux=me.Factura.Factura
			}).catch(function (error) {
				console.log('Error', error)
			})
		},
		GetTipoPracticas() {
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
	}
}
</script>

<style>

</style>
