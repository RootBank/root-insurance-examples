const key = 'sandbox_YWI4N2E5MjEtYjJhYy00ODY2LTgzYmMtZDRiY2IyYjIxNzkzLnZrQ3JhN3lxT2hsdllfOTQ4eXVPM1pSNGJZZHFLMWo3';

// Set up the defaults
$.post({
  url: 'https://sandbox.root.co.za/v1/insurance/quotes',
  data: {
    type: 'root_funeral',
    cover_amount: 10000 * 100,
    has_spouse: true,
    number_of_children: 0,
    extended_family_ages: []
  },
  dataType: 'json',
  headers: { Authorization: 'Basic ' + btoa(key + ':') }
}, () => {
  console.log('success');
}).done(() => {
  console.log('second success');
}).fail((e) => {
  console.log('error', e.status);
});
