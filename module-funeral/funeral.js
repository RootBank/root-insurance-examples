const root = Root();

function formToObj(id) {
  return $(id).serializeArray().reduce((o, v) => {
    o[v.name] = v.value;

    return o;
  }, {});
}

function showStep1() {
  $('#quote-result').hide();
  $('#accept-quote-form').hide();
  $('#spouse-cover-amount-form').hide();
  $('#children-cover-amount-form').hide();
  $('#step-1').show();
  $('#step-2').hide();
  $('#step-3').hide();
}

function showStep2() {
  $('#step-1').hide();
  $('#step-2').show();
  $('#step-3').hide();
}

function showStep3() {
  $('#step-1').hide();
  $('#step-2').hide();
  $('#step-3').show();
}

function showQuoteResult(quote) {
  $('#quote-package-id').val(quote.quote_package_id);
  $('#get-quote-form').hide();
  $('#quote-monthly-premium').text('R ' + root.getRandValue(quote.suggested_premium));
  $('#quote-result').show();
  $('#accept-quote-form').show();
}

$('#include-spouse').change(function() {
  this.checked ? $('#spouse-cover-amount-form').show() : $('#spouse-cover-amount-form').hide();
});

$('#include-children').change(function() {
  this.checked ? $('#children-cover-amount-form').show() : $('#children-cover-amount-form').hide();
});

$('#quote').submit(function(e) {
  e.preventDefault();
  showStep2();
});

$('#get-quote-btn').click(function(e) {
  e.preventDefault();

  $('#get-quote-btn').attr('disabled', 'disabled');
  $('#get-quote-btn').text('Loading...');

  const input = formToObj('#quote');
  const quoteData = {
    age: input.age,
    cover_amount: input.cover_amount,
    spouse_included: !!input.spouse_included,
    children_included: !!input.children_included,
    extended_family_included: false
  };

  if (input.gender !== 'unspecified') {
    quoteData.gender = input.gender;
  }

  if (quoteData.spouse_included) {
    quoteData.spouse_cover_amount = input.spouse_cover_amount;
  }

  if (quoteData.children_included) {
    quoteData.children_cover_amount = input.children_cover_amount;
  }

  root.getQuote('root_funeral', quoteData, (err, quote) => {
    if (err) {
      console.error(err);
      $('#get-quote-btn').removeAttr('disabled');
      $('#get-quote-btn').text('Get quote');
    } else {
      showQuoteResult(quote[0]);
    }
  });
});

$('#policyholder').submit(function (e) {
  e.preventDefault();

  $('#create-policy-btn').attr('disabled', 'disabled');
  $('#create-policy-btn').text('Loading...');

  const input = formToObj(this);
  const policyholderData = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    id: {
      type: 'id',
      country: 'ZA',
      number: input.id_number
    }
  };

  root.createPolicyholder(policyholderData, (err, policyholder) => {
    if (err) {
      console.error(err);
    } else {
      const applicationData = {
        quote_package_id: input.quote_package_id,
        policyholder_id: policyholder.policyholder_id
      };

      root.createApplication(applicationData, (err, application) => {
        if (err) {
          console.error(err);
          $('#create-policy-btn').removeAttr('disabled');
          $('#create-policy-btn').text('Create policy');
        } else {
          root.createPolicy({ application_id: application.application_id }, (err, policy) => {
            if (err) {
              console.error(err);
              $('#create-policy-btn').removeAttr('disabled');
              $('#create-policy-btn').text('Create policy');
            } else {
              $('#policy-number').text(policy.policy_number);
              showStep3();
            }
          });
        }
      });
    }
  });
});

$(document).ready(function() {
  showStep1();
});
