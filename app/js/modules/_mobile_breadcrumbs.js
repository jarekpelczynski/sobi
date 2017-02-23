;(function($){
  var $mobileBreadcrumbsTrigger = $('#mobile-breadcrumbs');


  $('.show_mobile_options').on('click', function (e) {
    e.preventDefault();

    $mobileBreadcrumbsTrigger.trigger('click');
  });

  $mobileBreadcrumbsTrigger.on('change' , function () {
    window.location.href = this.value;
  });
}(jQuery));
