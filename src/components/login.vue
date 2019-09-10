<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->
      <h2>Admin Login</h2>
      <!-- Icon -->
      <div class="fadeIn first">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="96"
          height="96"
          viewBox="0 0 192 192"
          style=" fill:#000000;"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,192v-192h192v192z" fill="none"></path>
            <g>
              <g id="surface1">
                <path d="M96,156l-20,-24v-24h40v24z" fill="#ff9800"></path>
                <path
                  d="M140,84c0,4.42188 -3.57812,8 -8,8c-4.42188,0 -8,-3.57812 -8,-8c0,-4.42188 3.57812,-8 8,-8c4.42188,0 8,3.57812 8,8M68,84c0,-4.42188 -3.57812,-8 -8,-8c-4.42188,0 -8,3.57812 -8,8c0,4.42188 3.57812,8 8,8c4.42188,0 8,-3.57812 8,-8"
                  fill="#ffa726"
                ></path>
                <path
                  d="M132,60c0,-30.54688 -72,-19.89062 -72,0v28c0,19.89062 16.10938,36 36,36c19.89062,0 36,-16.10938 36,-36z"
                  fill="#ffb74d"
                ></path>
                <path
                  d="M96,24c-24.29688,0 -40,19.70312 -40,44v9.14062l8,6.85938v-20l48,-16l16,16v20l8,-6.96875v-9.03125c0,-16.09375 -4.15625,-32.0625 -24,-36l-4,-8z"
                  fill="#424242"
                ></path>
                <path
                  d="M108,84c0,-2.20312 1.79688,-4 4,-4c2.20312,0 4,1.79688 4,4c0,2.20312 -1.79688,4 -4,4c-2.20312,0 -4,-1.79688 -4,-4M76,84c0,2.20312 1.79688,4 4,4c2.20312,0 4,-1.79688 4,-4c0,-2.20312 -1.79688,-4 -4,-4c-2.20312,0 -4,1.79688 -4,4"
                  fill="#784719"
                ></path>
                <path d="M96,180l-20,-48l20,4l20,-4z" fill="#ffffff"></path>
                <path
                  d="M92,148l-2.67188,17.85938l6.67188,16l6.67188,-16l-2.67188,-17.85938l4,-4l-8,-8l-8,8z"
                  fill="#d32f2f"
                ></path>
                <path
                  d="M116,132l-20,48l-20,-48c0,0 -44,7.9375 -44,52h128c0,-43.90625 -44,-52 -44,-52"
                  fill="#3f51b5"
                ></path>
              </g>
            </g>
            <path
              d="M96,192c-53.01934,0 -96,-42.98066 -96,-96v0c0,-53.01934 42.98066,-96 96,-96v0c53.01934,0 96,42.98066 96,96v0c0,53.01934 -42.98066,96 -96,96z"
              fill="none"
            ></path>
            <path
              d="M96,188.16c-50.89856,0 -92.16,-41.26144 -92.16,-92.16v0c0,-50.89856 41.26144,-92.16 92.16,-92.16v0c50.89856,0 92.16,41.26144 92.16,92.16v0c0,50.89856 -41.26144,92.16 -92.16,92.16z"
              fill="none"
            ></path>
            <path d="M0,192v-192h192v192z" fill="none"></path>
            <path d="M3.84,188.16v-184.32h184.32v184.32z" fill="none"></path>
          </g>
        </svg>
      </div>

      <!-- Login Form -->
      <form>
        <span v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </span>
        <input
          type="email"
          id="login"
          class="fadeIn second"
          name="email"
          placeholder="email"
          v-model="email"
        >
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="pass"
          placeholder="password"
          v-model="pass"
          autocomplete="off"
        >
        <input
          type="submit"
          class="fadeIn fourth"
          value="Log In"
          @click="checkForm"
          :disabled="validated == 1"
        >
        <!-- <div v-bind:class="{ spinner: active }">
          <i class="fa fa-spinner fa-spin fa-2x"></i>
        </div>-->
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a class="underlineHover" href="#">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
      validated: 0,
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      if (this.email && this.pass) {
        this.validated = 1;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.pass)
          .then(
            user => {
              this.validated = 0;
              alert(`Logged in as ${user.user.email}`);
              this.$router.push("/admin/v/dashboard");
            },
            err => {
              this.validated = 0;
              alert(err.message);
            }
          );
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.pass) {
        this.errors.push("Password required.");
      }
      e.preventDefault();
    }
  }
};
</script>

<style lang="css" scoped>
body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.wrapper h2 {
  text-transform: uppercase;
  background: linear-gradient(to right, #0897b1 0%, #f3d73a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2em;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input:placeholder {
  color: #cccccc;
}
input:disabled {
  background-color: lightblue;
  cursor: not-allowed;
}
.spinner {
  padding: 5%;
  display: none;
}
/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* error */
form ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: red;
}

/* OTHERS */

*:focus {
  outline: none;
}
</style>