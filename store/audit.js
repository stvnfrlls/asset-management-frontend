const state = {
  Audit_Page: null,
  Audit_Name: null,
  Audit_Action: null,
  Audit_ItemNo: null,
  Audit_List: [],
};

const mutations = {
  addToAuditList(state, auditItem) {
    state.Audit_List.push(auditItem);
  },
  setAuditPage(state, page) {
    state.Audit_Page = page;
  },
  setAuditAction(state, action) {
    state.Audit_Action = action;
  },
  setAuditItemNo(state, itemno) {
    state.Audit_ItemNo = itemno;
  },
  setAuditName(state, newName) {
    state.Audit_Name = newName;
  },
};
const actions = {
  commitToAuditList({ state, commit }) {
    const auditItem = {
      Audit_Name: state.Audit_Name,
      Audit_Page: state.Audit_Page,
      Audit_Action: state.Audit_Action,
      Audit_ItemNo: state.Audit_ItemNo,
    };
    commit("addToAuditList", auditItem);
  },
};

const getters = {
  getAuditPage: (state) => {
    return state.Audit_Page;
  },
  getAuditName: (state) => {
    return state.Audit_Name;
  },
  getAuditAction: (state) => {
    return state.Audit_Action;
  },
  getAuditItemNo: (state) => {
    return state.Audit_ItemNo;
  },
  getAuditList: (state) => {
    return {
      Audit_Page: state.Audit_Page,
      Audit_Name: state.Audit_Name,
      Audit_Action: state.Audit_Action,
      Audit_ItemNo: state.Audit_ItemNo,
    };
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
