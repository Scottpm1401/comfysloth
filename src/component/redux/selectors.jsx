export const mapStateToProps = (state) => ({
  layout: state.updatelayout.layout,
  data: state.data.tempdata,
  maindata: state.data.maindata,
  filter: state.filter,
  cart: state.user.user.cart,
  user: state.user.user,
  purchase: state.user.user.purchase,
  loggedIn: state.user.loggedIn,
});
