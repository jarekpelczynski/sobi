;(function($) {

  // Simple view changer
  var Breadcrumbs = function (){
    that       = this;
    that.hash  = '#';
    that.breadcrumbsContainers = {};
    that.list = {};
  };

  Breadcrumbs.prototype.init = function() {
    that.hash = window.location.hash || '#'
    that.breadcrumbsContainers = {
      primary:    $('#primary-breadcrumbs'),
      secondary:  $('#primary-breadcrumbs')
    }

    Breadcrumbs.prototype.showView();

    // We will detect hash changing
    $(window).on('hashchange', function() {
      that.hash = window.location.hash;
      Breadcrumbs.prototype.showView();
    });
  }

  Breadcrumbs.prototype.showView = function() {

    // Hide every visible view...
    // $('.section--body:visible').addClass('hidden');

    // ... and let's unhide selected
    // $(that.hash).removeClass('hidden');
  }

  Breadcrumbs.prototype.updateBreadcrumbs = function() {
  }

  // Run
  var bc = new Breadcrumbs();
  bc.init();

}(jQuery));
