 $(document).ready(function() {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
      
      $('#external-events div.external-event').each(function() {
        var eventObject = {
          title: $.trim($(this).text())
        };
        $(this).data('eventObject', eventObject);
        $(this).draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        });
        
      });

      $.ajax({
	      url: 'http://local-api.partypic.com/api/reports/',
        type: 'GET',
        dataType: 'json',
        data: { },
	      success: dashboardReportHandler,
	      error: function(xhr,status,error) {   
          $("#loadingDivContainer").hide();
	        $("#modalError").modal('show');
	        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
	      }
	    });

      function dashboardReportHandler(data) {
        if (data) {
          $("#newVenues").text(data.amountOfNewVenues);
          $("#newEvents").text(data.amountOfNewEvents);
          $("#newUploadedImages").text(data.amountOfUploadedImages);
          $("#newVenueManagers").text(data.amountOfNewVenuesManagers);
        }
      }
    
	    $.ajax({
	      url: 'http://local-api.partypic.com/api/events/',
        type: 'GET',
        dataType: 'json',
        data: { },
	      success: dashboardEventHandler,
	      error: function(xhr,status,error) {   
          $("#loadingDivContainer").hide();
	        $("#modalError").modal('show');
	        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
	      }
	    });
      
      var events = [];

	    function dashboardEventHandler(data) {
	      if (data) {
	        events = data.events;
	        $("#loadingDivContainer").hide();
	        var calendar = $('#calendar').fullCalendar({
          header: {
            left: 'title',
            center: 'agendaDay,agendaWeek,month',
            right: 'prev,next today'
          },
          editable: true,
          firstDay: 1,
          selectable: true,
          defaultView: 'month',
          axisFormat: 'h:mm',
          columnFormat: {
            month: 'ddd',
            week: 'ddd d',
            day: 'dddd d/M',
            agendaDay: 'dddd d'
          },
          titleFormat: {
            month: 'MMMM yyyy',
            week: "MMMM yyyy",
            day: 'MMMM yyyy'
          },
          allDaySlot: false,
          selectHelper: true,
          select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
              calendar.fullCalendar('renderEvent',
                {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay
                },
                true
              );
            }
            calendar.fullCalendar('unselect');
          },
          droppable: true,
          drop: function(date, allDay) {
            var originalEventObject = $(this).data('eventObject');
            var copiedEventObject = $.extend({}, originalEventObject);
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
            if ($('#drop-remove').is(':checked')) {
              $(this).remove();
            }
            
          },
          events: events,   
        });
        
      } else {
        alert("Error al cargar los eventos al calendario.")
      }    
    }
  });