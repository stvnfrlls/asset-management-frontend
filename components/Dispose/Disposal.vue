<template>
  <div class="disposal-asset">
    <div class="form-group">
      <label>Asset No</label>
      <input type="hidden" v-model="asset.asset_id">
      <input type="text" class="form-control" id="asset_no" placeholder="Asset No" list="AssetNoOptions"
        v-model="asset.asset_no" @blur="checkAsset()" />
      <datalist id="AssetNoOptions">
        <option v-for="assetNo in AssetNo" :value="assetNo.asset_no"></option>
      </datalist>
    </div>
    <div class="form-group">
      <label>Reference</label>
      <input type="text" class="form-control" placeholder="Reference" v-model="asset.reference" />
    </div>
    <div class="form-group">
      <label>Description</label>
      <input type="text" class="form-control" placeholder="Description" v-model="asset.description" />
    </div>
    <div class="form-group">
      <label>Purpose</label>
      <input type="text" class="form-control" placeholder="Purpose" v-model="asset.purpose" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asset: {
        asset_id: null,
        asset_no: null,
        reference: null,
        description: null,
        purpose: null,
      },
      AssetNo: [],
      AssetDetails: [],
      AssetList: [],
      hasDuplicateIds: false
    };
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.fetchAssetNo();
    this.fetchAssetDetails();
    this.$store.commit('setAuditAction', 'Dispose');
    this.getAssetNo();
  },
  mounted() {
  },
  watch: {
    'asset.asset_no'() {
      this.GET_ASSET_DETAILS();
    },
  },
  methods: {
    // Method to check if an asset number exists in the AssetList
    isAssetExist(asset_no, AssetList) {
      return AssetList.includes(asset_no);
    },

    // Method to check if the asset number exists and show an alert if not
    checkAsset() {
      if (this.isAssetExist(this.asset.asset_no, this.AssetList)) {
        // Asset number exists, handle accordingly
        // For example, you can perform actions here
      } else {
        // Asset number doesn't exist, show an alert and clear the input
        alert("Asset number doesn't exist.");
        this.asset.asset_no = "";
      }
    },

    // Method to fetch asset numbers using a GET request
    async getAssetNo() {
      try {
        const assetList_response = await this.$axios.$get("/getAll", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });
        // Extract and store asset numbers from the response
        this.AssetList = assetList_response.Asset_List.map(data => data.asset_no);
      } catch (error) {
        console.error(error);
      }
    },

    // Method to fetch asset numbers using a GET request and store in AssetNo variable
    fetchAssetNo() {
      this.$axios.$get('/getAssetList', {
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }).then(res => {
        this.AssetNo = res.Asset_List; // Store the response in the AssetNo variable
      });
    },

    // Method to fetch asset details using a GET request and store in AssetDetails variable
    fetchAssetDetails() {
      this.$axios.$get('/getAll', {
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }).then(res => {
        this.AssetDetails = res.Asset_List; // Store the response in the AssetDetails variable
      });
    },
    
    GET_ASSET_DETAILS() {
      // Find the matching data based on the selected asset no
      const assetDetails = this.AssetDetails.find(AssetDetails => AssetDetails.asset_no === this.asset.asset_no);
      // If matching  data is found, update the object
      if (assetDetails) {
        this.asset.asset_id = assetDetails.id;
      } else {
        // Clear the selectedOS object if no matching OS data
        this.asset.asset_id = null;
      }
    },

  }
};
</script>

<style scoped>
.form-control {
  color: var(--font-color);
}

.form-control::placeholder {
  color: var(--font-color);
}

.form-control::-webkit-calendar-picker-indicator {
  color: var(--font-color) !important;

}

input[readonly] {
  background-color: var(--read-only);
  /* Replace this with your preferred background color */
}
</style>
