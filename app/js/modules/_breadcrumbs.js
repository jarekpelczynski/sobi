;(function($) {

  // Simple view changer
  var Breadcrumbs = function (){
    that                  = this;
    that.hash             = '#';
    that.containers       = {};
    that.primaryPath      = [];
    that.secondaryPath    = [];
    that.breadcrumbsHTML  = [];
    that.currentView      = '';
    that.additionalNav    = '';
  };

  Breadcrumbs.prototype.init = function() {
    // Get hash or set defualt
    that.hash = window.location.hash || '#'

    // Get and cache the containers with our breadcrumbs list
    that.containers = {
      primary:    $('#primary-breadcrumbs').find('ul'),
      secondary:  $('#secodary-breadcrumbs')
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

  Breadcrumbs.prototype.showView = function() {
    var $view;

    // Hide every visible view...
    $('.section--body:visible').addClass('hidden');

    // ...get our selected target...
    $view = $('.section--body[data-target="' + that.path2id() + '"]')

    // ...and let's unhide
    $view.removeClass('hidden');

    // If our view has addition navigation
    that.clearAdditionalNav();
    if ($view.data('nav')) {
      that.additionalNav = $view.data('nav');
      that.showAdditionalNav($view);
    }
  };

  Breadcrumbs.prototype.showAdditionalNav = function($view) {
    var $wrap, nodes, $link, nav, html;

    html  = [];
    nodes = [];
    nav   = [];
    nav   = $view.data('nav').split(',');

    for (var i in nav) {
      html.push(that.createNavItem(nav[i]));
    }

    $wrap = $('<ul />');

    $wrap.append(html);

    that.containers.secondary.html($wrap);

  };

  Breadcrumbs.prototype.createNavItem = function(item) {
    var $node, $link, isCurrent;
    isCurrent = (that.secondaryPath === item) ? 'current' : '';

    $node = $('<li />', { class: isCurrent });
    $link = $('<a />',  { href: '', text: item, 'data-path': '/' + that.primaryPath.join('/') + ',' + item });

    $node.append($link);

    return $node;
  };

  Breadcrumbs.prototype.path2id = function() {
    return that.primaryPath.join('_');
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
    path                = path.split(',');
    that.primaryPath    = path[0];
    that.secondaryPath  = path[1] || [];

    // Get path from button data-path
    that.primaryPath = that.primaryPath.split('/').slice(1, that.primaryPath.length);

    // Get current view from last element in path
    that.currentView = that.primaryPath[that.primaryPath.length - 1];

    // Update hash
    window.location.hash = '#' + path;

    that.showView();
  };

  Breadcrumbs.prototype.updateBreadcrumbs = function() {
    var html = [];
    that.breadcrumbsHTML = [];

    that.clearBreadcrumbs();

    for (var index in that.primaryPath) {
      html.push(that.createBreadcrumbsItem(that.primaryPath[index], index));
    }

    that.containers.primary.html(html);
  };

  Breadcrumbs.prototype.createBreadcrumbsItem = function(item, index) {
    var $node, $link, path, classes, temp;

    classes = [];
    temp  = that.primaryPath;
    index = parseInt(index, 10) + 1;
    path  = '/' + temp.slice(0, index).join("/");

    if (that.currentView === item) {
      classes.push('current');

      if (that.secondaryPath.length) {
        classes.push('active');
      }
    }

    $node = $('<li />', { class: classes.join(' ') });
    $link = $('<a />',  { href: '#', text: item, 'data-path': path });

    $node.append($link);

    return $node;
  };

  Breadcrumbs.prototype.clearBreadcrumbs = function() {
    that.containers.primary.find('li:not(.mobile)').remove();
  };

  Breadcrumbs.prototype.clearAdditionalNav = function() {
    that.containers.secondary.find('ul').remove();
  };

  // Run
  var bc = new Breadcrumbs();
  bc.init();

}(jQuery));
