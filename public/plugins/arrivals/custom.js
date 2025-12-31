sf.plugins.arrivals = {
  dataType: 'json',

  url: function(options) {
    return 'api/display';
  },

  formatData: function(response) {
    return response.data;
  }
};
