<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="https://icon-library.net/images/admin-icon-png/admin-icon-png-28.jpg"
                    alt="Vue Material Admin"
                    width="180"
                    height="180"
                  />
                  <h1 class="flex my-4 box--text">Admin Login</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="Användarnamn"
                    label="Användarnamn"
                    type="text"
                    v-model="username"
                    :error="error"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="box" @click="login" :loading="loading">Logga In</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>{{ result }}</v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
var sha224 = require('js-sha256').sha224;
export default {
  data() {
    return {
      loading: false,
      usernames: [
        "edvinvare",
        "jesperribe",
        "mybjork",
        "hildagwiten",
        "rasmusrisberg",
        "joakimflink",
    ],
      passwords:[
        
        "d76a4d96714e4294cadca058fd5ac965d8ace5c7e5ec72fcc4244bdd",
        "c0ad735f2c20c8d299160f5e84ca4111ff949599ba49b4a132e91c83",
        "3c35af7baa5bcd138778de80f3c23cf2e2ad83a2454565eff8212c89",
        "b5f07b2e1a86507ee5aa2f4c2921cf46d5de1eab2fcfdd940c3d8320",
        "a37e2a7b7da7f1c5eba74ad4970ab61283c1c144ffaf6dda271ac4ee",
        "5264d8f43059c602fcfb9b1372bc6fb6fa7d5fa71dc38ecc62193e0f",
      ]
       
        ,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Nödvändigt'
      }
    }
  },

  methods: {
    login() {
      const vm = this;

      if (!vm.username || !vm.password) {

        vm.result = "Du måste skriva något i fälten.";
        vm.showResult = true;
      

        return;
      }
      

      if (this.usernames.includes(vm.username) && this.passwords.includes(sha224(vm.password))) {
        vm.$router.push({ name: 'admin' });
      }
      else {
        vm.error = true;
        vm.result = "Användarnamnet eller lösenordet är fel.";
        vm.showResult = true;
      }
    }
  }
}
</script>

<style scoped lang="css">
#login {
  height: 130%;
  width: 100%;
  position: absolute;
  top: 1000;
  left: 0;
  content: "";
  z-index: 5;
}
</style>
