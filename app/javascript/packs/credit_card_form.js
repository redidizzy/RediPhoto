$(() => {
  $("#tenant_plan").trigger("change")
  let showError, stripeResponseHandler, submitHandler
  // Function to get params from url
  

  // Form submission handler 
  submitHandler = (e) => {
    let $form = $(e.currentTarget)
    $form.find("input[type=submit]").prop("disabled", true)
    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler)
    } else {
      showError("Failed to load credit card processing functionnality, please reload the page.")
    }
    return false
  }
  
  // Form submission event listener
  $(".cc-form").on("submit", submitHandler)


  // token and credit card handler function
  stripeResponseHandler = (status, response) => {
    let token, $form;
    $form = $(".cc-form")

    if (response.error) {
      console.log(response.error.message)
      showError(response.error.message)
      $form.find("input[type=submit]").prop("disabled", false)
    } else {
      token = response.id
      $form.append($("<input type='hidden' name='payment[token]' />").val(token))
      $("[data-stripe=number]").remove()
      $("[data-stripe=cvv]").remove()
      $("[data-stripe=exp-year]").remove()
      $("[data-stripe=exp-month]").remove()
      $("[data-stripe=label]").remove()
      $form.get(0).submit()

    }
    return false;
  }

  // Function to show stripe errors
  showError = (message) => {
    if ($("#flash-messages").size() < 1) 
      $(".container.main div:first").prepend("<div id='flash-messages' ></div>")
    $("flash-messages").html('<div class="alert alert-warning"><a class="close", data-dismiss="alert">x</a> <div id "flash_alert">' + message + '</div> </div>')
    $(".alert").delay(5000).fadeOut(3000)
    return false
  }
})