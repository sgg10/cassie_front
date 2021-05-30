<template>
  <div class="main-content bg-default">
    <base-nav
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main navbar-top navbar-dark"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <b-navbar-brand to="/">
          <img src="img/brand/white_logo.png">
        </b-navbar-brand>
      </div>
    </base-nav>

    <div class="text-center">
      <div class="header bg-gradient-success py-9 py-lg-9 pt-lg-9">
        <BaseLoading variant="dark" />
      </div>
    </div>

    <footer class="py-9 py-lg-9 pt-lg-9" id="footer-main">
      <b-container class="mb-1" >
        <b-row align-v="center" class="justify-content-xl-between">
          <b-col xl="6">
            <div class="copyright text-center text-xl-left text-muted">
              © {{year}} <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">SGG</a>
            </div>
          </b-col>
          <b-col xl="6" class="col-xl-6">
            <b-nav  class="nav-footer justify-content-center justify-content-xl-end">
              <b-nav-item href="https://www.creative-tim.com/presentation" target="_blank" >
                About Us
              </b-nav-item>
              <b-nav-item href="https://github.com/sgg10/"  target="_blank">
                GitHub
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
  import { BaseNav, BaseLoading } from '@/components';
  export default {
    components: { BaseNav, BaseLoading },
    props: {
      backgroundColor: {
        type: String,
        default: 'black'
      }
    },
    data() {
      return {
        showMenu: false,
        year: new Date().getFullYear(),
      };
    },
  };
</script>
