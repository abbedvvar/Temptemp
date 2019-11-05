<template>
  <v-card
    class="mx-auto mt-5"
    max-width="700"
  >
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="mr-4 ml-4 mt-4 mb-4"
  >
    <v-select
      v-model="mac_address"
      :items="mac_address_list"
      :rules="[v => !!v || 'Item is required']"
      label="Mac Adress"
      @change="uppdateadmin($event)"
      required
    ></v-select>

    <v-text-field
      v-model="owner"
      :counter="15"
      :rules="nameRules"
      label="Ägare"
      required
    ></v-text-field>

    <v-text-field
      v-model="location"
      label="Plats"
      required
    ></v-text-field>

    <v-select
      v-model="update_rate"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Uppdateringsfrekvens"
      required
    ></v-select>
    <v-btn
      :disabled="!valid"
      color="primary"
      id="button"
      block
      @click="updatedb"
      v-on:click="snackbar=true"
    >
      Spara Ändringar
    </v-btn>
  </v-form>
 
  <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color='secondary'
        text
        @click="snackbar = false"
      >
        Stäng
      </v-btn>
    </v-snackbar>
    </v-card>
</template>

<script>

const axios = require('axios');
export default {
  data:function() {
      return{
          devices: [],
          location: "",
          update_rate: "",
          mac_address: "",
          valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Namn är ett krav',
        v => (v && v.length <= 15) || 'Namnet måste vara kortare än 15 bokstäver',
      ],
      email: '',
      select: null,
      items: [
        '100000',
        '50000',
        '10000',
        '5000',
      ],
      mac_address_list: [],
        color: 'darken',
        mode: '',
        snackbar: false,
        text: 'Dina Ändringar Är Sparade',
        timeout: 4000,
        x: null,
        y: 'top',}
  },

  mounted(){
      this.getiot()
  },

  methods: {
      getiot(){

          var self= this;

          axios.get("https://jj3mdr0w1m.execute-api.us-east-1.amazonaws.com/beta/device").then(response => {
            console.log(response)
            self.devices= response.data.Items
            console.log(this.devices)
            self.devices.forEach(device=> {
              self.mac_address_list.push(device.mac_address)
            })
              
          })
          .catch(error => {
          console.log('error')
          console.log(error)
          })

      },          
      updatedb(){
      axios.post('https://jj3mdr0w1m.execute-api.us-east-1.amazonaws.com/beta/device', {
                location: this.location,
                updateRate: this.update_rate,
                macAddress: this.mac_address,
                owner: this.owner,
                password: "1234"

            }).then(response => {
              console.log(response)
            }).catch(error => {
              console.log(error)
            })
      },
      uppdateadmin(e){
        this.devices.forEach(device => {
          if(device.mac_address==this.mac_address){
            this.owner=device.owner || ""
            this.uppdate_rate=device.update_rate || ""
            this.location=device.location || ""
          }

        })
      }
      
  }
}
</script>
<style scoped lang="css">
#button{
 height: 20%;
  width: 100%;
  position: absolute;
  top: 1000;
  left: 0;
  content: "";
  z-index: 5;
}
</style>