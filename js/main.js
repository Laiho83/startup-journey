$(document).ready(function(){
  var appImageCircle = {
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function() {
      this.main = $('.main');
      this.fields = $('.field');
      this.container = $('#container');
    },
    bindEvents: function() {
      this.render();
      this.fields.on('click', function(){appModal.modalActive(this)});
    },

    render: function() {
      let width = 100;
      let height = 100;
      let containerWidth = this.container.width();
      let containerHeight = this.container.height();
      let radius = width * 0.35 < 200 ? width * 0.36 : 250;
      let angle = 20;
      let step = (2*Math.PI) / this.fields.length;
      this.fields.each(function() {
        let fieldWidth = ($(this).width() * 100) / containerWidth;
        let fieldHeight = ($(this).height() * 100) / containerHeight;
        var x = Math.round(width/2 + radius * Math.cos(angle) - fieldWidth/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - fieldHeight/2);
        $(this).css({
            left: x + '%',
            top: y + '%'
        });
        angle += step;
      });
    }
  };

  var appModal = {
    init: function() {
      this.cacheDom();
      this.bindEvents();      
    },

    cacheDom: function() {
      this.modal = $('#modal');
      this.close = $('#modal .close');
      this.nav = $('nav');
      this.navItems = $('.nav-item')
      this.spacerEl = $('#spacer');
    },

    bindEvents: function() {
      this.close.on('click', this.toggleModal.bind(this));
      this.navItems.on('click', function() {
        appModal.setModalContent(this);
        appModal.setActiveNav(this)
      });
    },

    modalActive: function(el) {
      this.addSpacer();
      this.toggleModal();
      this.setModalContent(el);
      this.setActiveNav(el);
    },

    addSpacer() {
      this.spacerEl.css({
        height: document.querySelector('.modal-content').scrollHeight-80 + 'px'
      });
    },

    toggleModal: function() {
      this.modal.toggleClass('active');      
    },

    setModalContent(el) {
      let page = $(el).data('page')+'.html';
      $('#pageContent').empty();
      $('#pageContent').load('pages/'+page);
    },

    setActiveNav(el) {
      let elWidth = this.navItems.width() * 1.35;
      this.navItems.removeClass('active');
      let activeEl = $('nav ul').find("[data-id='" + $(el).data('id') + "']");
      activeEl.addClass('active');
      let offset = activeEl.position().left - elWidth;
      this.nav.stop().animate({scrollLeft: offset}, 1000);
    },
  };
  appImageCircle.init();
  appModal.init();
});
