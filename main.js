(function($) {
	var fetchUrl = "buttons/getConfig/1";
	var orderUrl = "buttons/saveConfig/1";

	var clickableJson = {};

// Click btn
	$('.btn-clickable').click(function() {
		var value = $(this).data('value');
		clickableJson.clicked = value;
		$('.btn-clickable').removeClass('selected');
		$(this).addClass('selected');
	});

// Drag
	var html = "<div class='btn btn-default'></div>";
	$('li.draggable').draggable({
		cursor: "move",
		containment: 'document',
		cancel: false,
		helper: function(){ return $(html).text($(this).data('value')); }
	});

	$(document).on('change', '.draggable-select select', function(e) {
		var self = $(this);
		var offset = self.offset();

		var draggableDiv = $('<div class="btn btn-default draggable select-draggable" data-value="' + self.val() + '" />').text(self.val());
		$('.draggable-select').append(draggableDiv);

		draggableDiv.draggable({
			cursor: "move",
			containment: 'document',
			cancel: false,
			helper: function(){ return $(html).text($(this).data('value')); }
		});
	});


// Drop
	$("#order-panel").droppable({
		drop: function(event, ui) {
			if ($(ui.draggable).hasClass('draggable')) {
				var value = $(ui.draggable).data('value');
				var clone = $('<li data-value="' + value + '"></li>').append('<button class="btn btn-default">' + value + '</button><span class="close">x</span>');
				$(this).append(clone);
				if (clickableJson.options)
					clickableJson.options.push(value);
				else
					clickableJson.options = [value];
			}

			if ($(ui.draggable).hasClass('select-draggable')) {
				$(ui.draggable).remove();
			}
		},
	});

// Sort
	$('#order-panel').sortable(
	{ 
		cancel: false,
		out: function() {
			makeOptions();
		}
	}).disableSelection();

// Remove option
	$(document).on('click', '#order-panel li span', function() {
		var parent = $(this).parent('li');
		parent.remove();
		makeOptions();
	});

// Make options
	function makeOptions() {
		var options = [];
		$("#order-panel li").each(function(){
			options.push($(this).data('value'));
			clickableJson['options'] = options;
			$(this).removeClass('draggable ui-draggable');
		});
	}

// Order
	$('.btn-order-post').click(function(e) {
		e.preventDefault();

		// $.post(orderUrl, data, function() {
		// });
		$('.preview').find('code').html(JSON.stringify(clickableJson))
	});

})(jQuery);