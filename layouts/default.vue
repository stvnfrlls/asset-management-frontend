<template>
  <div>
    <section class="home-section">
      <div class="nav">
        <div class="logo-details">
          <i class="bx bx-sun" id="mode" v-if="this.isBlue === false && this.$cookies.get('Theme') === false"></i>
          <i class="bx bx-moon" id="mode" v-else-if="this.isBlue === true"></i>
          <i class="bx bx-moon" id="mode" v-else></i>
          <span class="logo-name">Asset Management System</span>
        </div>
      </div>
      <div class="home-content">
        <i class="bx bx-menu" id="bx-menu"></i>
        <span style="font-size: 15px;">Welcome {{ storedData | capitalizeFirst }},</span>
      </div>
      <div class="home-content logout" style="align-items: right; justify-content: right;padding-right: 20px;"
        @click="logout">
        <i class='bx bx-log-out' id="bx-log-out" style="font-size: 20px;"></i>
        <span>Logout</span>
      </div>
    </section>
    <div class="body">
      <div class="sidebar">
        <ul class="nav_links">
          <li class="Menu">
            <template v-if="UserPermission.dashboard === '1'">
              <NuxtLink to="/" id="dashLink">
                <a>
                  <i class="bx bx-grid-alt"></i>
                  <span class="link_name">Dashboard</span>
                </a>
              </NuxtLink>
            </template>
          </li>
          <li class="Menu">
            <NuxtLink to="/asset/assetListPage" class="icon_links">
              <a>
                <i class="bx bx-collection"></i>
                <span class="link_name">Assets</span>
              </a>
              <i class="bx bxs-chevron-down arrow"></i>
            </NuxtLink>
            <ul class="sub_menu">
              <li><a class="link_name">Assets</a></li>
              <template v-if="UserPermission.asset_create === '1'">
                <li>
                  <NuxtLink to="/asset/assetAddPage" class="a" id="createLink">New</NuxtLink>
                </li>
              </template>
              <li>
                <NuxtLink to="/asset/assetListPage" class="a">List</NuxtLink>
              </li>
              <template v-if="UserPermission.asset_device === '1'">
                <li>
                  <NuxtLink to="/asset/assetDevicePage" class="a">Device Specs</NuxtLink>
                </li>
              </template>
              <template v-if="UserPermission.asset_transfer === '1'">
                <li>
                  <NuxtLink to="/asset/assetListPage" class="a" v-b-modal.AssetTransfer>Allocate
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </li>
          <!-- DISPOSE -->
          <li class="Menu">
            <template v-if="UserPermission.asset_dispose === '1'">
              <NuxtLink to="/dispose/DisposeList" class="icon_links">
                <a>
                  <i class='bx bx-trash'></i>
                  <span class="link_name">Dispose</span>
                </a>
                <i class="bx bxs-chevron-down arrow"></i>
              </NuxtLink>
            </template>
            <ul class="sub_menu">
              <li><a class="link_name">Assets</a></li>

              <li>
                <NuxtLink to="/dispose/assetDisposePage" class="a" id="createLink">New</NuxtLink>
              </li>

              <li>
                <NuxtLink to="/dispose/DisposeList" class="a">List</NuxtLink>
              </li>
            </ul>
          </li>
          <li class="Menu">
            <div class="icon_links">
              <a>
                <i class="bx bx-list-plus"></i>
                <span class="link_name">Licensing</span>
              </a>
              <i class="bx bxs-chevron-down arrow"></i>
            </div>
            <ul class="sub_menu">
              <li><a class="link_name">Licensing</a></li>
              <template v-if="UserPermission.license_create === '1'">
                <li>
                  <NuxtLink to="/license/licensePage" class="a" v-b-modal.licenseAdd id="licenseLink">
                    New
                  </NuxtLink>
                </li>
              </template>
              <li>
                <NuxtLink to="/license/licensePage" class="a">List</NuxtLink>
              </li>
            </ul>
          </li>
          <template v-if="UserPermission.asset_upload === '1'">
            <li class="Menu">
              <div class="icon_links">
                <a>
                  <i class="bx bx-upload"></i>
                  <span class="link_name">Upload</span>
                </a>
                <i class="bx bxs-chevron-down arrow"></i>
              </div>
              <ul class="sub_menu">
                <li><a class="link_name">Posts</a></li>
                <li>
                  <NuxtLink to="/upload/uploadPage" class="a">New</NuxtLink>
                </li>
              </ul>
            </li>
          </template>
          <template v-if="UserPermission.view_logs === '1'">
            <li class="Menu">
              <div class="icon_links">
                <a>
                  <i class='bx bx-history'></i>
                  <span class="link_name">History</span>
                </a>
                <i class="bx bxs-chevron-down arrow"></i>
              </div>
              <ul class="sub_menu">
                <li><a class="link_name">History</a></li>
                <li>
                  <NuxtLink to="/log/transferHistory" class="a">Tranfers</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/log/auditHistory" class="a">Audit</NuxtLink>
                </li>
              </ul>
            </li>
          </template>
          <template v-if="UserPermission.dev_tools === '1'">
            <li class="Menu">
              <div class="icon_links">
                <a>
                  <i class="bx bx-list-plus"></i>
                  <span class="link_name">Dev Tools</span>
                </a>
                <i class="bx bxs-chevron-down arrow"></i>
              </div>
              <ul class="sub_menu">
                <li><a class="link_name">Dev Tools</a></li>
                <li>
                  <NuxtLink to="/dev/updateToolsPage" class="a">Selects</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dev/manageAccountPage" class="a">Accounts</NuxtLink>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
      <div class="main-container">
        <div style="margin: auto;width: 100%; height: 100%;padding: 20px 0;">
          <Nuxt />
        </div>
      </div>
    </div>
    <licenseAddModal />
    <TransferModal />
  </div>
</template>
<script>
import Vue from "vue";

Vue.filter('capitalizeFirst', function (value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

import licenseAddModal from "~/components/License/LicenseAdd.vue";
import TransferModal from "~/components/Asset/Transfer.vue";
import AddModal from "~/components/Asset/ModalAdd.vue";
export default {
  data() {
    return {
      storedData: null,
      isBlue: false,

      UserPermission: {
        asset_create: null,
        asset_update: null,
        asset_transfer: null,
        asset_device: null,
        asset_dispose: null,
        asset_download: null,
        dashboard: null,
        license_create: null,
        license_update: null,
        license_delete: null,
        asset_upload: null,
        view_logs: null,
        dev_tools: null
      },
    }
  },
  components: {
    TransferModal,
    licenseAddModal,
    AddModal,
  },
  created() {
    if (this.$cookies.get('Theme') === true) {
      this.isBlue = true;
    } else {
      this.isBlue = false;
    }
    const permissions = this.$cookies.get('permission');

    this.UserPermission.asset_create = permissions[0].asset_create;
    this.UserPermission.asset_update = permissions[0].asset_update;
    this.UserPermission.asset_transfer = permissions[0].asset_transfer;
    this.UserPermission.asset_device = permissions[0].asset_device;
    this.UserPermission.asset_dispose = permissions[0].asset_dispose;
    this.UserPermission.asset_download = permissions[0].asset_download;
    this.UserPermission.dashboard = permissions[0].dashboard;
    this.UserPermission.license_create = permissions[0].license_create;
    this.UserPermission.license_update = permissions[0].license_update;
    this.UserPermission.license_delete = permissions[0].license_delete;
    this.UserPermission.asset_upload = permissions[0].asset_upload;
    this.UserPermission.view_logs = permissions[0].view_logs;
    this.UserPermission.dev_tools = permissions[0].dev_tools;
  },
  mounted() {
    const root = document.documentElement;
    let sidebar = document.querySelector(".sidebar");
    let nav = document.querySelector(".nav");
    let homesection = document.querySelector(".home-section");
    let main_container = document.querySelector(".main-container");
    let sidebarBtn = document.getElementById("bx-menu");
    let modeBtn = document.getElementById("mode");

    if (this.$cookies.get('Theme') == false) {
      // White
      root.style.setProperty('--background', '#f5f7ff');
      root.style.setProperty('--white', '#ececec');
      root.style.setProperty('--white-side', '#fff');
      root.style.setProperty('--sidebar', '#fff');
      root.style.setProperty('--font-color', '#6c7383');
      root.style.setProperty('--read-only', '#D3D3D3');
    } else if (this.$cookies.get('Theme') == true) {
      // Dark
      root.style.setProperty('--background', '#1f1f1f');
      root.style.setProperty('--white', '#2d2d2d');
      root.style.setProperty('--white-side', '#2d2d2d');
      root.style.setProperty('--sidebar', '#2d2d2d');
      root.style.setProperty('--font-color', '#fff');
      root.style.setProperty('--read-only', '#808080');
    } else {
      // White
      root.style.setProperty('--background', '#f5f7ff');
      root.style.setProperty('--white', '#ececec');
      root.style.setProperty('--white-side', '#fff');
      root.style.setProperty('--sidebar', '#fff');
      root.style.setProperty('--font-color', '#6c7383');
      root.style.setProperty('--read-only', '#D3D3D3');
    }
    this.fetchDropdowns();
    this.$store.commit('setAuditName', this.$cookies.get('username'));
    const storedUsername = this.$cookies.get('username');
    if (storedUsername) {
      this.storedData = storedUsername;
    }

    let arrow = document.querySelectorAll(".Menu");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
      });
    }


    this.isBlue = false;
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("closed");
      nav.classList.toggle("closed");
      main_container.classList.toggle("closed");
      homesection.classList.toggle("closed");
      if (sidebarBtn.className === "bx bx-menu") {
        sidebarBtn.className = "bx bxs-arrow-from-left";
      } else {
        sidebarBtn.className = "bx bx-menu";
      }
    });

    modeBtn.addEventListener("click", () => {
      if (this.isBlue) {
        root.style.setProperty('--background', '#f5f7ff');
        root.style.setProperty('--white', '#ececec');
        root.style.setProperty('--white-side', '#fff');
        root.style.setProperty('--sidebar', '#fff');
        root.style.setProperty('--font-color', '#6c7383');
        root.style.setProperty('--read-only', '#D3D3D3');
        this.isBlue = false;
        this.$cookies.set('Theme', this.isBlue);
      } else {
        root.style.setProperty('--background', '#1f1f1f');
        root.style.setProperty('--white', '#2d2d2d');
        root.style.setProperty('--white-side', '#2d2d2d');
        root.style.setProperty('--sidebar', '#2d2d2d');
        root.style.setProperty('--font-color', '#fff');
        root.style.setProperty('--read-only', '#808080');
        this.isBlue = true;
        this.$cookies.set('Theme', this.isBlue);
      }
    });
  },
  methods: {
    logout() {
      this.$cookies.removeAll();
      location.reload();
    },
    async fetchDropdowns() {
      //Category
      try {
        const Category_Options = localStorage.getItem('Category_Options');
        const Category_List = localStorage.getItem('Category_List');
        if (!Category_Options && !Category_List) {
          const categories_response = await this.$axios.$get('/getCategories')
          const Category_List = categories_response.categories;
          const Category_Options = [
            { value: null, text: 'Please select an option' },
            ...categories_response.categories.map(categories => ({
              value: categories.id,
              text: categories.category_name
            }))
          ]
          localStorage.setItem('Category_Options', JSON.stringify(Category_Options));
          localStorage.setItem('Category_List', JSON.stringify(Category_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Classification
      try {
        const Classification_Options = localStorage.getItem('Classification_Options');
        const Classification_List = localStorage.getItem('Classification_List');
        if (!Classification_Options && !Classification_List) {
          const classification_response = await this.$axios.$get('/getClassifications')
          const Classification_List = classification_response.classifications;
          const Classification_Options = [
            { value: null, text: 'Please select an option' },
            ...classification_response.classifications.map(classifications => ({
              value: classifications.id,
              text: classifications.class_name
            }))
          ]
          localStorage.setItem('Classification_Options', JSON.stringify(Classification_Options));
          localStorage.setItem('Classification_List', JSON.stringify(Classification_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Asset Type
      try {
        const Asset_Type_Options = localStorage.getItem('Asset_Type_Options');
        const Asset_Type_List = localStorage.getItem('Asset_Type_List');
        if (!Asset_Type_Options && !Asset_Type_List) {
          const asset_type_response = await this.$axios.$get('/getAssetType')
          const Asset_Type_List = asset_type_response.assetTypes;
          const Asset_Type_Options = [
            { value: null, text: 'Please select an option' },
            ...asset_type_response.assetTypes.map(assetTypes => ({
              value: assetTypes.id,
              text: assetTypes.assetType_name
            }))
          ]
          localStorage.setItem('Asset_Type_Options', JSON.stringify(Asset_Type_Options));
          localStorage.setItem('Asset_Type_List', JSON.stringify(Asset_Type_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Manufacturer
      try {
        const Manufacturer_Options = localStorage.getItem('Manufacturer_Options');
        const Manufacturer_List = localStorage.getItem('Manufacturer_List');
        if (!Manufacturer_Options && !Manufacturer_List) {
          const manufacturer_response = await this.$axios.$get('/getManufacturers')
          const Manufacturer_List = manufacturer_response.manufacturers;
          const Manufacturer_Options = [
            { value: null, text: 'Please select an option' },
            ...manufacturer_response.manufacturers.map(manufacturers => ({
              value: manufacturers.id,
              text: manufacturers.manufacturer_name
            }))
          ]
          localStorage.setItem('Manufacturer_Options', JSON.stringify(Manufacturer_Options));
          localStorage.setItem('Manufacturer_List', JSON.stringify(Manufacturer_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Department
      try {
        const Department_Options = localStorage.getItem('Department_Options');
        const Department_List = localStorage.getItem('Department_List');
        if (!Department_Options && !Department_List) {
          const department_response = await this.$axios.$get('/getDepartments')
          const Department_List = department_response.departments;
          const Department_Options = [
            { value: null, text: 'Please select an option' },
            ...department_response.departments.map(departments => ({
              value: departments.id,
              text: departments.dept_name
            }))
          ]
          localStorage.setItem('Department_Options', JSON.stringify(Department_Options));
          localStorage.setItem('Department_List', JSON.stringify(Department_List));
        }
      } catch (error) {
        console.error(error);
      }
      //User Roles
      try {
        const Role_Options = localStorage.getItem('Role_Options');
        const Role_List = localStorage.getItem('Role_List');
        if (!Role_Options && !Role_List) {
          const role_response = await this.$axios.$get('/getUserRoles')
          const Role_List = role_response.roles;
          const Role_Options = [
            { value: null, text: 'Please select an option' },
            ...role_response.roles.map(roles => ({
              value: roles.id,
              text: roles.role
            }))
          ]
          localStorage.setItem('Role_Options', JSON.stringify(Role_Options));
          localStorage.setItem('Role_List', JSON.stringify(Role_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Status
      try {
        const Status_Options = localStorage.getItem('Status_Options');
        const Status_List = localStorage.getItem('Status_List');
        if (!Status_Options && !Status_List) {
          const status_response = await this.$axios.$get('/getStatusType')
          const Status_List = status_response.statusType;
          const Status_Options = [
            { value: null, text: 'Please select an option' },
            ...status_response.statusType.map(statusType => ({
              value: statusType.id,
              text: statusType.status_name
            }))
          ]
          localStorage.setItem('Status_Options', JSON.stringify(Status_Options));
          localStorage.setItem('Status_List', JSON.stringify(Status_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Disposal
      try {
        const Disposal_List = localStorage.getItem('Disposal_List');
        if (!Disposal_List) {
          const disposal_method_response = await this.$axios.$get('/getDisposalMethod')
          const Disposal_List = disposal_method_response.disposal_method;
          localStorage.setItem('Disposal_List', JSON.stringify(Disposal_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Software Category
      try {
        const Software_Category = localStorage.getItem('Software_Category_Options');
        const Software_Category_List = localStorage.getItem('Software_Category_List');
        if (!Software_Category && !Software_Category_List) {
          const software_category_response = await this.$axios.$get('/getSoftwareCategory')
          const Software_Category_List = software_category_response.software_category;
          const Sotware_Category_Options = [
            { value: null, text: 'Please select an option' },
            ...software_category_response.software_category.map(software_categories => ({
              value: software_categories.id,
              text: software_categories.software_category
            }))
          ]
          localStorage.setItem('Software_Category_Options', JSON.stringify(Sotware_Category_Options));
          localStorage.setItem('Software_Category_List', JSON.stringify(Software_Category_List));
        }
      } catch (error) {
        console.error(error);
      }
      //License Status
      try {
        const License_Status_List = localStorage.getItem('License_Status_List');
        if (!License_Status_List) {
          const license_status_response = await this.$axios.$get('/getLicensesStatus')
          const License_Status_List = license_status_response.license_status;
          localStorage.setItem('License_Status_List', JSON.stringify(License_Status_List));
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&display=swap");

@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900";


body {
  background-color: var(--background);
  /* var(--font-color) */
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.home-section {
  position: relative;
  box-shadow: 0 8px 10px -10px rgba(0, 0, 0, 0.2);
  z-index: 0;
  background-color: var(--white-side);
  overflow-y: auto;
  display: grid;
  grid-template-columns: 330px 1fr 1fr;
  transition: all 0.4s ease;
}

.home-section.dark {
  background-color: #000000;
}

.home-section.closed {
  grid-template-columns: 78px 1fr 1fr;
  overflow-y: none;
}

.home-section .home-content {
  height: 60px;
  display: flex;
  align-items: center;
}

.home-section .home-content .bx,
.home-section .home-content .text {
  color: var(--font-color);
  font-size: 35px;
}

.home-section.dark .home-content .bx,
.home-section.dark .home-content .text {
  color: white;
}

.home-section .home-content .bx-menu {
  margin: 0 15px;
}

.home-section .home-content .text {
  font-size: 26px;
  font-weight: 600;
}

.home-section .logout {
  cursor: pointer;
}

.home-section .logout:hover span,
.home-section .logout:hover .bx {
  color: var(--blue);
}

/* LOGO TITLE */
.nav {
  width: 330px;
}

.nav.closed {
  width: 78px;
}

.nav .logo-details {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}

.nav .logo-details i {
  font-size: 30px;
  color: var(--font-color);
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.home-section.dark .nav .logo-details i {
  color: white;
}

.nav .logo-details span {
  margin-left: -20px;
}

.nav .logo-details .logo-name {
  font-size: 17px;
  color: var(--font-color);
  font-weight: 600;
}

.nav.closed .logo-details .logo-name {
  opacity: 0;
  pointer-events: none;
}

/* SIDEBAR */
.sidebar a {
  cursor: pointer;
}

.sidebar {
  position: fixed;
  left: 0;
  height: 100%;
  width: 330px;
  background: var(--white-side);
  z-index: -1;
  transition: all 0.5s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}

.sidebar.closed {
  width: 78px;
}

.sidebar .nav_links {
  height: 100%;
  padding-top: 30px 0 15px 0;
  overflow: auto;
}

.sidebar.closed .nav_links {
  overflow: visible;
}

.sidebar .nav_links::-webkit-scrollbar {
  display: none;
}

.sidebar .nav_links li {
  position: relative;
  list-style: none;
  transition: all 0.5s ease;
  margin: 3px 15px 0 15px;
}

.sidebar .nav_links li:hover {
  background: var(--white);
  border-radius: 15px;
}

.sidebar .nav_links li .icon_links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar .nav_links li .icon_links span {
  pointer-events: none;
}

.sidebar.closed .nav_links li .icon_links {
  display: block;
}

.sidebar.showMenu .nav_links li {
  background-color: var(--white);
}

.sidebar.closed .nav_links li {
  width: 100%;
  margin-left: 0;
}

.sidebar .nav_links li i {
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  color: var(--font-color);
  font-size: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sidebar .nav_links li .icon_links a .bx {
  font-size: 26px;
}

.sidebar .nav_links li.showMenu i.arrow {
  transform: rotate(-180deg);
}

.sidebar .nav_links li.showMenu {
  background-color: var(--white);
  border-radius: 15px;
}

.sidebar.closed .nav_links i.arrow {
  display: none;
}

.sidebar .nav_links li a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.sidebar .nav_links li a .link_name {
  margin-top: 3px;
  font-size: 15px;
  font-weight: 400;
  color: var(--font-color);
}

.sidebar.closed .nav_links li a .link_name {
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav_links li .sub_menu {
  padding: 6px 6px 6px 80px;
  margin-top: -10px;
  background: var(--white);
  display: none;
}

.sidebar .nav_links li.showMenu .sub_menu {
  display: block;
  border-radius: 15px;
}

.sidebar .nav_links li .sub_menu a {
  color: var(--font-color);
  font-size: 15px;
  padding: 5px 0;
  white-space: nowrap;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.sidebar .nav_links li .sub_menu a:hover {
  opacity: 1;
}

.sidebar.closed .nav_links li .sub_menu {
  position: absolute;
  left: 100%;
  top: -10px;
  margin-top: 0;
  padding: 10px 20px;
  border-radius: 0 6px 6px 0;
  opacity: 0;
  display: block;
  pointer-events: none;
  transition: 0s;
}

.sidebar.closed .nav_links li:hover .sub_menu {
  top: 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
}

.sidebar .nav_links li .sub_menu .link_name {
  display: none;
}

.sidebar.closed .nav_links li .sub_menu .link_name {
  font-size: 18px;
  opacity: 1;
  display: block;
}

.sidebar .nav_links li .sub_menu.blank {
  opacity: 1;
  pointer-events: auto;
  padding: 30px;
  opacity: 0;
  pointer-events: none;
}

.sidebar.closed .nav_links li:hover .sub_menu.blank {
  top: 50%;
  transform: translateY(-50%);
}

.sidebar.closed~.navbar-element .home-section {
  left: 78px;
  width: calc(100% - 78px);
}

.main-container {
  position: fixed;
  width: calc(100% - 330px);
  left: 330px;
  height: 100%;
  transition: all 0.4s ease;
  padding: 0;
  overflow: auto;
  z-index: -2;
  display: grid;
  place-items: center;
}

.main-container.show {
  z-index: 5;
}

.main-container.closed {
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.4s ease;
}

#mode {
  cursor: pointer;
}

/* Search */
</style>
