;(function($) {

  // Simple view changer
  var Breadcrumbs = function (){
    that       = this;
    that.hash  = '#';
    that.breadcrumbsContainers = {};
    that.breadcrumbsPath = [];
    that.breadcrumbsHTML = [];
    that.currentView     = '';
  };

  Breadcrumbs.prototype.init = function() {
    // Get hash or set defualt
    that.hash = window.location.hash || '#'

    // Get and cache the containers with our breadcrumbs list
    that.breadcrumbsContainers = {
      primary:    $('#primary-breadcrumbs').find('ul'),
      secondary:  $('#primary-breadcrumbs').find('ul')
    }

    // If no hash or it's a dashboard path at first time
    if (that.hash === '#' || that.hash === '' || that.hash === '#/dashboard') {
      that.updateView('/dashboard');
    }
    // If it's a hash with some path
    else {
      // Update view to current
      that.updateView(that.hash.substring(1));

      // Update breadcrumbs structure
      that.updateBreadcrumbs();
    }

    that.initButtons();
  };

  Breadcrumbs.prototype.showView = function(view) {
    // Hide every visible view...
    $('.section--body:visible').addClass('hidden');

    // ... and let's unhide selected (our target view)
    $('.section--body[data-target="' + that.path2id() + '"]').removeClass('hidden');
  };

  Breadcrumbs.prototype.path2id = function() {
    return that.breadcrumbsPath.join('_');
  };

  Breadcrumbs.prototype.initButtons = function() {
    $(document.body).on('click', 'button[data-path], a[data-path]', function(e) {
      var $this, path;

      e.preventDefault();
      $this = $(this);
      path  = $this.data('path');

      // Update view to current
      that.updateView(path);

      // Update breadcrumbs structure
      that.updateBreadcrumbs();
    });
  };

  Breadcrumbs.prototype.updateView = function(path) {
    // Get path from button data-path
    that.breadcrumbsPath = path.split('/').slice(1, path.length);

    // Get current view from last element in path
    that.currentView = that.breadcrumbsPath[that.breadcrumbsPath.length - 1];

    // Update hash
    window.location.hash = '#' + path;

    that.showView(that.currentView);
  };

  Breadcrumbs.prototype.updateBreadcrumbs = function() {
    var html = [];
    that.breadcrumbsHTML = [];

    that.clearBreadcrumbs(that.breadcrumbsContainers.primary);

    for (var index in that.breadcrumbsPath) {
      html.push(that.createBreadcrumbsItem(that.breadcrumbsPath[index], index));
    }

    that.breadcrumbsContainers.primary.html(html);
  };

  Breadcrumbs.prototype.createBreadcrumbsItem = function(item, index) {
    var $node, $link, path, isCurrent, temp;

    temp  = that.breadcrumbsPath;
    index = parseInt(index, 10) + 1;
    path  = '/' + temp.slice(0, index).join("/");
    isCurrent = (that.currentView === item) ? 'current' : '';

    $node = $('<li />', { class: isCurrent });
    $link = $('<a />',  { href: '#', text: item, 'data-path': path });

    $node.append($link);

    return $node;
  };

  Breadcrumbs.prototype.clearBreadcrumbs = function($target) {
    $target.find('li:not(.mobile)').remove();
  };

  // Run
  var bc = new Breadcrumbs();
  bc.init();

}(jQuery));
