$(document).ready(function () {

    $.ajax({
        url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/Subscriptions/mysubs',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $("#loadingDivContainer").hide();
            if (result.success) {

                if (result.subscriptions.length > 0) {
                    $("#subscriptionTableContainer").show();

                    const $tableBody = $("#subscriptionsTable tbody");
                    $tableBody.empty();

                    result.subscriptions.forEach(subscription => {
                        let stateText = subscription.isActive ? "Activa" : subscription.isCancelled ? "Cancelada" : "Inactiva";

                        let endDateText;
                        if (subscription.isCancelled) {
                            endDateText = formatStartDatetime(subscription.cancelledDate);
                        } else if (subscription.isAutoRenew) {
                            endDateText = "-";
                        } else {
                            endDateText = formatStartDatetime(subscription.endDate);
                        }

                        const formattedPrice = `$${subscription.latestPrice.toFixed(2)}`;
                
                        const renewalDateText = subscription.renewalDate
                            ? formatStartDatetime(subscription.renewalDate)
                            : "No aplica";
                
                        const rowHtml = `
                            <tr class="text-center ${subscription.isActive ? 'success' : ''}">
                                <td>${subscription.subscriptionId}</td>
                                <td>${subscription.planType}</td>
                                <td>${formatStartDatetime(subscription.startDate)}</td>
                                <td>${endDateText}</td>
                                <td>${stateText}</td>
                                <td>${formattedPrice}</td>
                                <td>${subscription.isAutoRenew ? "Sí" : "No"}</td>
                                <td>${renewalDateText}</td>
                            </tr>
                        `;
                
                        $tableBody.append(rowHtml);
                    });

                    const activeSub = result.subscriptions.find(subscription => subscription.isActive);

                    if (activeSub) {
                        $("#activeSubContainer").show();
                        $("#subscriptionEndDate").text(formatStartDatetime(activeSub.endDate));
                        $("#viewSubscriptionDetailButton").attr("data-id", activeSub.subscriptionId);
                        $("#viewSubscriptionDetailButton").attr("data-isAutoRenew", activeSub.isAutoRenew);
                        if (activeSub.renewalDate != "0001-01-01T00:00:00") {
                            $("#subscriptionEndDate").text(formatStartDatetime(activeSub.renewalDate));
                            $("#subscriptionSpanRenewalDate").show();
                            $("#subscriptionRenewalDate").text(formatStartDatetime(activeSub.renewalDate));
                        }
                    } else {
                        handleNoActiveSubscriptions();
                    }
                } else {
                    handleNoActiveSubscriptions();
                }
            } else {
                $("#modalError").modal('show');
                $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
            }
        },
        error: function (xhr, status, error) {
            $("#modalError").modal('show');
            $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        }
    });

    $("#viewSubscriptionDetailButton").on("click", function () {
        handleSubscriptionDetail();
    });
});

function formatStartDatetime(dateTime) {
    var dateString = new Date(dateTime);
    var month = (dateString.getMonth() + 1)
    var day = dateString.getDate()

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return day + "/" + month + "/" + dateString.getFullYear();
}

function handleNoActiveSubscriptions() {
    $.ajax({
        url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/plans/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            const $planSelect = $("#planSelect");
            $planSelect.empty();

            result.plans.forEach(plan => {
                $planSelect.append(`<option value="${plan.id}|${plan.latestPrice}">${plan.name} ($${plan.latestPrice})</option>`);
            });

            $planSelect.on("change", function () {
                const selectedValue = $(this).val();
                const selectedPrice = parseFloat(selectedValue.split('|')[1]);
                const formattedPrice = `$${selectedPrice.toFixed(2)}`;
        
                $("#paymentAmount strong").text(formattedPrice);
            });
        
            $planSelect.trigger("change");

            $("#continueToPayment").on("click", function (e) {
                e.preventDefault();
        
                const selectedValue = $planSelect.val();
                const [planId, price] = selectedValue.split('|');
                const autoRenew = $("#autoRenewCheckbox").is(":checked");
        
                const payload = {
                    planId: parseInt(planId, 10),
                    isAutoRenew: autoRenew
                };
                
                $("#loadingDivContainer").show();
                $.ajax({
                    url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/subscriptions',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: function (response) {
                        if (response.success && response.mpInitPoint) {
                            window.location.replace(response.mpInitPoint);
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#loadingDivContainer").hide();
                        $("#modalError").modal('show');
                        $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
                    }
                });
            });
        },
        error: function (xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        }
      });
    $("#noSubscriptionMessage").show();
  }

  function handleSubscriptionDetail() {
    $("#loadingDivContainer").show();
    var subId = $("#viewSubscriptionDetailButton").attr("data-id");
    $.ajax({
        url: `https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/subscriptions/` + subId,
        type: "GET",
        contentType: "application/json",
        success: function (subscription) {
            $("#loadingDivContainer").hide();
            $("#allSubscriptions").hide();

            $("#planType").text(subscription.planType);
            $("#startDate").text(formatStartDatetime(subscription.startDate));
            $("#endDate").text(subscription.endDate === "0001-01-01T00:00:00" ? "-" : formatStartDatetime(subscription.endDate));
            $("#latestPrice").text(`$${subscription.latestPrice.toFixed(2)}`);
            $("#renewalDate").text(formatStartDatetime(subscription.renewalDate));
            $("#isAutoRenew").text(subscription.isAutoRenew ? "Activada" : "Desactivada");
            $("#subscriptionStatus").text(subscription.isActive ? "Activa" : "Inactiva");
    
            const buttonText = subscription.isAutoRenew ? "Desactivar Renovación Automática" : "Activar Renovación Automática";
            const buttonClass = subscription.isAutoRenew ? "btn-danger" : "btn-success";
            $("#toggleRenewalButton").text(buttonText).removeClass('btn-success btn-danger').addClass(buttonClass);
    
            $("#suscriptionDetail").show();

            $("#backButton").on("click", function () {
                $("#suscriptionDetail").hide();
                $("#allSubscriptions").show();
            });

            $("#toggleRenewalButton").on("click", function () {

                var subId = $("#viewSubscriptionDetailButton").attr("data-id");
                var subIsAutoRenew = $("#viewSubscriptionDetailButton").attr("data-isAutoRenew");

                $.ajax({
                    url: `https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/subscriptions/toggle-renewal?subscriptionId=${subId}`,
                    type: "PUT",
                    data: { subscriptionId:subId },
                    success: function (response) {
                        var text = subIsAutoRenew ? "La renovación automática de tu suscripción fue desactivada exitosamente. No se realizarán más cobros y podrás utilizar la aplicación hasta su vencimiento" : "Se ha activado correctamente la renovación automática. El próximo cobro se efectuará en la fecha de vencimiento."
                        $("#modalToggleRenewal").text(text)
                        $("#suscriptionDetail").hide();
                        $("#allSubscriptions").show();
                        $("#modalSuccess").modal('show');

                        setTimeout(function() {
                            location.reload();
                        }, 5000)
                    },
                    error: function () {
                        $("#modalError").show();
                    }
                });
            });
        },
        error: function (xhr, status, error) {
            $("#loadingDivContainer").hide();
            $("#errorMessage").show();
        }
    });
  }