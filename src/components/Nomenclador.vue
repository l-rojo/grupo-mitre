<template>
  <v-layout align-start>
    <v-flex>
      <v-card>
        <v-toolbar-title>
          <v-icon> domain</v-icon> Grupo Mitre: Nomenclador
        </v-toolbar-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-autocomplete
                  v-model="idOS"
                  :items="ListObraSocial"
                  clearable
                  item-text="text"
                  item-value="value"
                  label="Obra Social"
                  @change="listar"
                  @keypress.enter="listar"
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-btn :disabled="idOS==undefined||idOS==0" color="primary" @click="aumentarPorcentaje">
                  &#37; Aumentar procentaje
                </v-btn>
                <v-dialog v-model="porcDialog" persistent max-width="500px" v-on:keydown.esc="cerrarPorc">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Aumentar Porcentaje</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs11 sm11 md11>
                            <v-text-field
                              ref="porcDialog"
                              v-model="por.Porcentaje"
                              label="Porcentaje  %"
                              type="number"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="por.Desde"
                              label="Fecha Desde"
                              v-mask="'##/##/####'"
                              hint="DD/MM/AAAA"
                              persistent-hint
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="por.Hasta"
                              label="Fecha Hasta"
                              v-mask="'##/##/####'"
                              hint="DD/MM/AAAA"
                              persistent-hint
                            ></v-text-field>
                            <!-- <v-menu
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
                                  label="Fecha De vigencia"
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
                            </v-menu> -->
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click.native="cerrarPorc">Cancelar</v-btn>
                      <v-btn color="warning" @click.native="VerificacionSeguro">Grabar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="Seguro"
                  persistent :overlay="false"
                  max-width="500px"
                  transition="dialog-transition"
                  v-on:keydown.esc="CerrarSeguro"
                >
                  <v-card>
                    <v-card-title>
                    Esta Seguro que desea continuar?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click.native="AumentarPorc">Grabar</v-btn>
                       <v-spacer></v-spacer>
                      <v-btn color="info" @click.native="CerrarSeguro">Cancelar</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <!-- <v-flex xs12 sm6 md6>
                <v-btn color="primary" @click="mensaje = false">
                  Datos del nomenclador
                </v-btn>
              </v-flex> -->
              <!-- <v-select v-model="idOS" :items="ListObraSocial" item-text="text" item-value="value" label="Seleccionar Obra sociales">
                    v-on:keydown.tab="listar"
                    @blur="listar"
                  </v-select> -->
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-toolbar flat color="white">
        <v-btn color="green" :disabled="idOS==undefined||idOS==0" @click="createItem"><v-icon color="white">add_box</v-icon> </v-btn>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px" v-on:keydown.esc="close">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm3 md3>
                    <v-text-field
                      v-model="itemSel.IdNomenclador"
                      readonly
                      label="IdNomenclador"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm3 md3>
                    <v-text-field
                      v-model="itemSel.Codigo"
                      :readonly="!ocultarcheck"
                      label="Codigo"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-checkbox :hidden="ocultarcheck" label="Editar Nombre y Tipo" v-model="EditarNombre"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="itemSel.Nombre"
                      :readonly="!EditarNombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="itemSel.TipoPractica"
                      :readonly="!EditarNombre"
                      label="Tipo Practica"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-checkbox :hidden="ocultarcheck" label="Editar Importe" v-model="EditarImporte"></v-checkbox>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field
                      v-model="itemSel.IdNomImp"
                      label="Id Importe"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    <v-text-field
                      v-model="itemSel.Importe"
                      :readonly="!EditarImporte"
                      label="Importe"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field
                      v-model="itemSel.FechaVigencia"
                      label="Fecha De vigencia"
                      v-mask="'##/##/####'"
                      hint="DD/MM/AAAA"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field
                      v-model="itemSel.FechaHasta"
                      label="Fecha Hasta"
                      v-mask="'##/##/####'"
                      hint="DD/MM/AAAA"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-checkbox :hidden="true" label="Editar Coseguro" v-model="EditarCoseguro"></v-checkbox>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field
                      v-model="itemSel.IdCoseguro"
                      label="Id Coseguro"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    <v-text-field
                      v-model="itemSel.Coseguro"
                      label="Coseguro"
                      type="number"
                      readonly
                    ></v-text-field>
                      <!-- :readonly="!EditarCoseguro" -->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close"><v-icon>cancel</v-icon>Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar"><v-icon>save</v-icon>Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="Nomenclador"
        :search="search"
        :loading="cargando"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
            <td>
                <v-icon small class="mr-2" @click="editItem(props.item)">
                edit
                </v-icon>
            </td>
            <!-- <td>{{ props.item.IdNomenclador }}</td> -->
            <td>{{ props.item.Codigo }}</td>
            <td>{{ props.item.Nombre }}</td>
            <td>{{ props.item.TipoPractica }}</td>
            <td>{{ props.item.Importe }}</td>
            <td>{{ props.item.Coseguro }}</td>
        </template>
        <!-- <template slot="no-data">
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template> -->
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data: vm => ({
    Nomenclador: [],
    ListObraSocial: [],
    dialog: false,
    Seguro:false,
    porcDialog: false,
    menu1:false,
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    Porcentaje:0,
    headers: [
      { text: "Editar", value: "", sortable: false },
      // { text: "IdNomenclador", value: "IdNomenclador", sortable: false },
      { text: "Codigo", value: "Codigo", sortable: false },
      { text: "Nombre", value: "Nombre", sortable: false },
      {
        text: "TipoPractica",
        value: "TipoPractica",
        sortable: false,
      },
      { text: "Importe", value: "Importe", sortable: false },
      { text: "Coseguro", value: "Coseguro", sortable: false }
    ],
    search: "",
    cargando: false,
    desserts: [],
    editedIndex: 1,
    por:{},
    itemSel: {},
    EditarItem: false,
    EditarImporte:false,
    EditarCoseguro:false,
    EditarNombre:false,
    ocultarcheck:false,
    id: 0,
    idOS: 0,
    Id: 0,
    IdNomenclador:'',
    Codigo: "",
    Nombre: "",
    nombre: "",
    NombreTipoPractica: "",
    Importe: "",
    Beneficiario: "",
    NombreTipoPractica: "",
    valida: 0,
    validaMensaje: [],
    IdEntrega: 0,
  }),
  computed: {
    formTitle() {
      return this.itemSel.IdNomenclador ? "Editar Practica" : "Nueva Practica";
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  created() {
    this.listar();
    this.SelectedObraSocial();
  },
  methods: {
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
    listar() {
      this.cargando = true;
      let me = this;
      //console.log("Os",me.idOS);
      if(me.idOS==undefined){
        this.cargando = false
        me.Nomenclador = Object.assign([])
        return
      }
      axios.get("Nomenclador/Listar/" + me.idOS + "")
        .then(function (response) {
          //console.log(response.data);
          me.Nomenclador = response.data;
          me.cargando = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    SelectedObraSocial() {
      let me = this;

      var osArray = [];
      axios.get("facturacionMes/getListadoObraSocial")
        .then(function (response) {
          osArray = response.data;
          //console.log(response.data);
          osArray.map(function (x) {
            me.ListObraSocial.push({ text: x.nombre, value: x.id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.itemSel=item
      this.EditarItem=1
      this.dialog = true;
    },
    createItem(){
      if(this.idOS==0){
        return
      }
      if(this.idOS==undefined){
        return
      }
      this.ocultarcheck=true
      this.EditarImporte=true
      this.EditarNombre=true
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
    close() {
      this.Limpiar()
      this.dialog = false;
    },
    Limpiar() {
      this.itemSel=Object.assign({})
      this.EditarImporte=false
      this.EditarCoseguro=false
      this.EditarNombre=false
      this.ocultarcheck=false
    },
    guardar() {
      // if (this.validar()) {
      //   return;
      // }
      console.log(this.itemSel);
      console.log(this.EditarItem);
      let me = this;
      me.itemSel.Op=this.$store.state.usuario.id
      me.itemSel.OpCrea=this.$store.state.usuario.id
      if (this.itemSel.IdNomenclador) {
        if ( me.EditarNombre ) {
          axios.put("Nomenclador/ModificarNomenclador/"+ me.itemSel.IdNomenclador +"", me.itemSel)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log("Error", error);
          })
        } 
        if ( me.EditarImporte ) {
          axios.put("Nomenclador/ModificarImporteNomenclador/"+ me.itemSel.IdNomImp +"", me.itemSel)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log("Error", error);
          })
        }
        me.listar();
        me.close();
      } else {
        if( me.itemSel.Codigo && me.itemSel.Nombre && me.itemSel.TipoPractica && me.itemSel.Importe && me.itemSel.FechaVigencia && me.itemSel.FechaVigencia){
          axios.get("Nomenclador/BuscarCodigo/" + me.idOS + "/" + me.itemSel.Codigo + "").then(function (response){
            if(response.data.id==0){
              me.itemSel.IdObraSocial=me.idOS
              axios.post("Nomenclador/NuevoNomenclador", me.itemSel)
                .then(function (response) {
                    console.log(response)
                    me.listar();
                    me.close();
                })
                .catch(function (error) {
                    console.log("Error", error);
                })
            }else{
              mensaje="codigo Existente"
            }
          }).catch(function (error) {
              console.log("Error", error);
          })
        }
      }
      
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.Nombre.length < 3 || this.Nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre debe tener mas de 3 caracteres y menos de 50"
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    aumentarPorcentaje(){
      this.porcDialog=true
    },
    cerrarPorc(){
      this.Porcentaje=0
      this.porcDialog=false
    },
    CerrarSeguro(){
      this.Seguro=false
      this.$refs["porcDialog"].$refs.input.focus()
    },
    VerificacionSeguro(){
      this.Seguro=true
    },
    AumentarPorc(){
      let me=this
      me.por.IdObraSocial=this.idOS
      axios.post("Nomenclador/ActualizaNomenclador",me.por).then((response)=>{
        me.por=Object.assign({})
        me.listar()
        me.CerrarSeguro()
        me.cerrarPorc()
      })
    }
  },
};
</script>


