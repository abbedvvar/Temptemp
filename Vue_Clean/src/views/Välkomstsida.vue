<template>
  <v-card flat class="py-12" color="#0D47A1">
    <v-card-text>
      <v-row align="center" justify="center">
        <p id="namn" class="display-3">Välkommen</p>
        <v-col cols="12">
          <p id="namn" class="headline">Välj en termometer:</p>
        </v-col>
        <v-card class="mx-auto" width="700" outlined color="#0D47A1" elevation="0">
          <v-flex v-for="(dev,index) in devices" :key="dev">
            <v-btn>
              <v-text>Termometer {{index+1}}: Plats: {{dev.location}}, Ägare: {{dev.owner}}</v-text>
            </v-btn>
          </v-flex>
          <router-link :to="{ path: '/Vidareinfo'}" replace style="text-decoration: none">
            <v-btn>
              <v-text>Se alla termometrar</v-text>
            </v-btn>
          </router-link>
        </v-card>
        <h3 id="namn">{{rand}}</h3>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      toggle_exclusive: undefined,
      jokes: [
        "- Tänk dig att bo på något ställe med vackert väder året om. Inga fler höststormar, snöoväder eller midsomrar i täckjacka. Vore det inte härligt? - Nej, vad skulle vi då ha att prata om?",
        "- Fy fan vad kallt det är. - Ställ dig i hörnet då, där är det alltid 90 grader.",
        "- Det är kallt ute, säger blondinen. - Stäng fönstret då. - Blir det varmare ute då?",
        "- Hur är vädret i Tjernobyl? - Strålande!",
        '-273°C: ALL atombaserad rörelse avstannar. Finnarna börjar säga till varandra: -"Perkele, vad kallt det känns ute i dag."',
        "-300°C: Helvetet fryser till is. Finländarna vinner Melodifestivalen...",
        "Två män stod och spelade golf trots att det blåste kallt och småregnade. När en löpare kom springande lite längre bort sa den ene golfspelaren till den andre: - Kolla vilken idiot! Springa i det här vädret!",
        'Norrmannen till sin fru:-"De sa att det skulle snöa på radion". Frun: - "Då borde du täcka över radion."',
        '-" Var vädret vackert under din semester?"-"Ja, för all del, men inte där jag var..."',
        'Två kompanjoner var ute och cyklade i blåsväder. Då säger den ene:-" Vilken jobbig vind! Vi får verkligen hoppas att den vänder tills vi ska hem igen..."',
        'Lilla Stella säger till sin mamma:- "Jag undrar om det är vår by som får snö i morgon?" -" Varför undrar du det?"- "Joo, dom sa på väderleksrapporten: Någon by med snö i morgon..."',
        '- "Kan jag få en biljett till Sikte?"-" Sikte var ligger det?"-" Jag vet inte, men de sa på TV att det var bättre väder i sikte"'
      ],
      rand: 0,
      location: [],
      devices: []
    };
  },
  mounted() {
    this.getiot();
  },
  created() {
    this.rand = this.jokes[Math.floor(Math.random() * this.jokes.length)];
  },
  methods: {
    getiot() {
      var self = this;

      axios
        .get(
          "https://jj3mdr0w1m.execute-api.us-east-1.amazonaws.com/beta/device"
        )
        .then(response => {
          self.devices = response.data.Items;
        });
      axios.post(
        "https://jj3mdr0w1m.execute-api.us-east-1.amazonaws.com/beta/device",
        {
          location: this.location,
          update_rate: this.update_rate,
          mac_address: this.mac_address
        }
      );
    }
  }
};
</script>

<style scoped>
#namn{
  color: aliceblue;
}
</style>