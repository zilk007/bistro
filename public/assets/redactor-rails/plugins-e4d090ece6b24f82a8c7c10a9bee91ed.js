if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.clips = function()
{
	return {
		init: function()
		{
			var items = [
				['Lorem ipsum...', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
				['Red label', '<span class="label-red">Label</span>']
			];

			this.clips.template = $('<ul id="redactor-modal-list">');

			for (var i = 0; i < items.length; i++)
			{
				var li = $('<li>');
				var a = $('<a href="#" class="redactor-clip-link">').text(items[i][0]);
				var div = $('<div class="redactor-clip">').hide().html(items[i][1]);

				li.append(a);
				li.append(div);
				this.clips.template.append(li);
			}

			this.modal.addTemplate('clips', '<section>' + this.utils.getOuterHtml(this.clips.template) + '</section>');

			var button = this.button.add('clips', 'Clips');
			this.button.addCallback(button, this.clips.show);

		},
		show: function()
		{
			this.modal.load('clips', 'Insert Clips', 400);

			this.modal.createCancelButton();

			$('#redactor-modal-list').find('.redactor-clip-link').each($.proxy(this.clips.load, this));

			this.selection.save();
			this.modal.show();
		},
		load: function(i,s)
		{
			$(s).on('click', $.proxy(function(e)
			{
				e.preventDefault();
				this.clips.insert($(s).next().html());

			}, this));
		},
		insert: function(html)
		{
			this.selection.restore();
			this.insert.html(html);
			this.modal.close();
			this.observe.load();
		}
	};
};

if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.fontcolor = function()
	{
		return {
			init: function()
			{
				var colors = [
					'#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00',
					'#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca',
					'#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694',
					'#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314',
					'#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100',
					'#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b',  '#974806', '#7f6000'
				];

				var buttons = ['fontcolor', 'backcolor'];

				for (var i = 0; i < 2; i++)
				{
					var name = buttons[i];

					var button = this.button.add(name, this.lang.get(name));
					var $dropdown = this.button.addDropdown(button);

					$dropdown.width(242);
					this.fontcolor.buildPicker($dropdown, name, colors);

				}
			},
			buildPicker: function($dropdown, name, colors)
			{
				var rule = (name == 'backcolor') ? 'background-color' : 'color';

				var len = colors.length;
				var self = this;
				var func = function(e)
				{
					e.preventDefault();
					self.fontcolor.set($(this).data('rule'), $(this).attr('rel'));
				};

				for (var z = 0; z < len; z++)
				{
					var color = colors[z];

					var $swatch = $('<a rel="' + color + '" data-rule="' + rule +'" href="#" style="float: left; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');
					$swatch.css('background-color', color);
					$swatch.on('click', func);

					$dropdown.append($swatch);
				}

				var $elNone = $('<a href="#" style="display: block; clear: both; padding: 5px; font-size: 12px; line-height: 1;"></a>').html(this.lang.get('none'));
				$elNone.on('click', $.proxy(function(e)
				{
					e.preventDefault();
					this.fontcolor.remove(rule);

				}, this));

				$dropdown.append($elNone);
			},
			set: function(rule, type)
			{
				this.inline.format('span', 'style', rule + ': ' + type + ';');
			},
			remove: function(rule)
			{
				this.inline.removeStyleRule(rule);
			}
		};
	};
})(jQuery);
if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.fontfamily = function()
	{
		return {
			init: function ()
			{
				var fonts = [ 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Monospace' ];
				var that = this;
				var dropdown = {};

				$.each(fonts, function(i, s)
				{
					dropdown['s' + i] = { title: s, func: function() { that.fontfamily.set(s); }};
				});

				dropdown.remove = { title: 'Remove Font Family', func: that.fontfamily.reset };

				var button = this.button.add('fontfamily', 'Change Font Family');
				this.button.addDropdown(button, dropdown);

			},
			set: function (value)
			{
				this.inline.format('span', 'style', 'font-family:' + value + ';');
			},
			reset: function()
			{
				this.inline.removeStyleRule('font-family');
			}
		};
	};
})(jQuery);
if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
  RedactorPlugins.fontsize = function()
  {
    return {
      init: function()
      {
        var fonts = [10, 11, 12, 14, 16, 18, 20, 24, 28, 30];
        var that = this;
        var dropdown = {};

        $.each(fonts, function(i, s)
        {
          dropdown['s' + i] = { title: s + 'px', func: function() { that.fontsize.set(s); } };
        });

        dropdown.remove = { title: 'Remove Font Size', func: that.fontsize.reset };

        var button = this.button.add('fontsize', 'Change Font Size');
        this.button.addDropdown(button, dropdown);
      },
      set: function(size)
      {
        this.inline.format('span', 'style', 'font-size: ' + size + 'px;');
      },
      reset: function()
      {
        this.inline.removeStyleRule('font-size');
      }
    };
  };
})(jQuery);
if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.fullscreen = function()
	{
		return {
			init: function()
			{
				this.fullscreen.isOpen = false;

				var button = this.button.add('fullscreen', 'Fullscreen');
				this.button.addCallback(button, this.fullscreen.toggle);

				if (this.opts.fullscreen) this.fullscreen.toggle();
			},
			enable: function()
			{
				this.button.changeIcon('fullscreen', 'normalscreen');
				this.button.setActive('fullscreen');
				this.fullscreen.isOpen = true;

				if (this.opts.toolbarExternal)
				{
					this.fullscreen.toolcss = {};
					this.fullscreen.boxcss = {};
					this.fullscreen.toolcss.width = this.$toolbar.css('width');
					this.fullscreen.toolcss.top = this.$toolbar.css('top');
					this.fullscreen.toolcss.position = this.$toolbar.css('position');
					this.fullscreen.boxcss.top = this.$box.css('top');
				}

				this.fullscreen.height = this.$editor.height();

				if (this.opts.maxHeight) this.$editor.css('max-height', '');
				if (this.opts.minHeight) this.$editor.css('min-height', '');

				if (!this.$fullscreenPlaceholder) this.$fullscreenPlaceholder = $('<div/>');
				this.$fullscreenPlaceholder.insertAfter(this.$box);

				this.$box.appendTo(document.body);

				this.$box.addClass('redactor-box-fullscreen');
				$('body, html').css('overflow', 'hidden');

				this.fullscreen.resize();
				$(window).on('resize.redactor.fullscreen', $.proxy(this.fullscreen.resize, this));
				$(document).scrollTop(0, 0);

				$('.redactor-toolbar-tooltip').hide();
				this.$editor.focus();
				this.observe.load();
			},
			disable: function()
			{
				this.button.removeIcon('fullscreen', 'normalscreen');
				this.button.setInactive('fullscreen');
				this.fullscreen.isOpen = false;

				$(window).off('resize.redactor.fullscreen');
				$('body, html').css('overflow', '');

				this.$box.insertBefore(this.$fullscreenPlaceholder);
				this.$fullscreenPlaceholder.remove();

				this.$box.removeClass('redactor-box-fullscreen').css({ width: 'auto', height: 'auto' });

				this.code.sync();

				if (this.opts.toolbarExternal)
				{
					this.$box.css('top', this.fullscreen.boxcss.top);
					this.$toolbar.css({
						'width': this.fullscreen.toolcss.width,
						'top': this.fullscreen.toolcss.top,
						'position': this.fullscreen.toolcss.position
					});
				}

				if (this.opts.minHeight) this.$editor.css('minHeight', this.opts.minHeight);
				if (this.opts.maxHeight) this.$editor.css('maxHeight', this.opts.maxHeight);

				$('.redactor-toolbar-tooltip').hide();
				this.$editor.css('height', 'auto');
				this.$editor.focus();
				this.observe.load();
			},
			toggle: function()
			{
				if (this.fullscreen.isOpen)
				{
					this.fullscreen.disable();
				}
				else
				{
					this.fullscreen.enable();
				}
			},
			resize: function()
			{
				if (!this.fullscreen.isOpen) return;

				var toolbarHeight = this.$toolbar.height();

				var height = $(window).height() - toolbarHeight - this.utils.normalize(this.$editor.css('padding-top')) - this.utils.normalize(this.$editor.css('padding-bottom'));
				this.$box.width($(window).width()).height(height);

				if (this.opts.toolbarExternal)
				{
					this.$toolbar.css({
						'top': '0px',
						'position': 'absolute',
						'width': '100%'
					});

					this.$box.css('top', toolbarHeight + 'px');
				}

				this.$editor.height(height);
			}
		};
	};
})(jQuery);
if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.textdirection = function()
	{
		return {
			init: function()
			{
				var that = this;
				var dropdown = {};

				dropdown.ltr = { title: 'Left to Right', func: that.textdirection.setLtr };
				dropdown.rtl = { title: 'Right to Left', func: that.textdirection.setRtl};

				var button = this.button.add('textdirection', 'Change Text Direction');
				this.button.addDropdown(button, dropdown);
			},
			setRtl: function()
			{
				this.buffer.set();
				this.block.setAttr('dir', 'rtl');
			},
			setLtr: function()
			{
				this.buffer.set();
				this.block.removeAttr('dir');
			}
		};
	};
})(jQuery);






