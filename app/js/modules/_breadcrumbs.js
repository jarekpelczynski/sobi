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
    that.hash = window.location.hash || '#'
    that.breadcrumbsContainers = {
      primary:    $('#primary-breadcrumbs').find('ul'),
      secondary:  $('#primary-breadcrumbs').find('ul')
    }

    //Breadcrumbs.prototype.showView();

    // We will detect hash changing
    $(window).on('hashchange', function(e) {
      e.preventDefault();

      that.hash = window.location.hash;
      // Breadcrumbs.prototype.showView();
    });

    that.initButtons();


  };

  Breadcrumbs.prototype.showView = function() {

    // Hide every visible view...
    // $('.section--body:visible').addClass('hidden');

    // ... and let's unhide selected
    // $(that.hash).removeClass('hidden');
  };

  Breadcrumbs.prototype.initButtons = function() {
    $(document.body).on('click', 'button[data-path], a[data-path]', function(e) {
      var $this, path;

      e.preventDefault();
      $this = $(this);
      path  = $this.data('path');

      console.log(path)

      // Get path from url
      that.breadcrumbsPath = path.split('/').slice(1, path.length);

      // Get current view from last element in path
      that.currentView     = that.breadcrumbsPath[that.breadcrumbsPath.length - 1];

      // Update breadcrumbs structure
      that.updateBreadcrumbs();

      // Update hash
      window.location.hash = '#' + path;
    });
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
